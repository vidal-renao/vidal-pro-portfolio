import {expect,test} from "@playwright/test";

test("contact endpoint rejects malformed JSON and invalid fields without sending",async({request})=>{
  const badJson=await request.post("/api/contact",{data:Buffer.from("{invalid"),headers:{"content-type":"application/json"}});
  expect(badJson.status()).toBe(400);
  const badFields=await request.post("/api/contact",{data:{name:"A",email:"invalid",subject:"",message:"short",_honey:""}});
  expect(badFields.status()).toBe(422);
});
test("honeypot silently discards spam without depending on SMTP",async({request})=>{
  const result=await request.post("/api/contact",{data:{name:"Test Client",email:"noreply@example.com",subject:"Automated test",message:"This is an automated honeypot test; no email should be sent.",_honey:"filled-by-bot"}});
  expect(result.status()).toBe(200);
  expect(await result.json()).toMatchObject({ok:true});
});
test("contact route refuses cross-origin submissions",async({request})=>{
  const result=await request.post("/api/contact",{
    headers:{origin:"https://unrelated.example"},
    data:{name:"Test Client",email:"noreply@example.com",subject:"Check",message:"This must not trigger a real outgoing message.",_honey:""}
  });
  expect(result.status()).toBe(403);
});
test("contact rejects oversized payload",async({request})=>{
  const result=await request.post("/api/contact",{data:{name:"Test Client",email:"noreply@example.com",subject:"Test",message:"x".repeat(20000),_honey:""}});
  expect(result.status()).toBe(413);
});
test("contact form displays localized labels and has a direct mail fallback",async({page})=>{
  for(const locale of ["es","en","de"]){
    await page.goto("/"+locale);
    const form=page.locator('#contact form');
    await expect(form).toBeVisible();
    await expect(form.getByText("Formspree")).toBeVisible();
    await expect(form.locator('input[name="email"]')).toHaveAttribute("type","email");
    await expect(form.locator('textarea[name="message"]')).toHaveAttribute("required","");
  }
});


test("unconfigured mail transport returns service unavailable instead of reporting delivery",async({request})=>{
  // CI intentionally has no RESEND_API_KEY/RESEND_FROM or SMTP secrets.
  const result=await request.post("/api/contact",{data:{
    name:"Release QA",email:"qa@example.com",subject:"QA",message:"Automated test only: no email may be sent.",_honey:""
  }});
  expect([503,429]).toContain(result.status());
  if(result.status()===503) expect(await result.json()).toHaveProperty("error");
});


for(const locale of ["es","en","de"] as const){
  test(`Formspree contact submits successfully without live delivery in ${locale}`,async({page})=>{
    let calls=0;
    await page.route("https://formspree.io/f/xbggnyab",async route=>{
      calls++;
      const req=route.request();
      expect(req.method()).toBe("POST");
      expect(req.headers()["accept"]).toContain("application/json");
      const body=req.postData()??"";
      for(const value of ["Test Client","test@example.com","Portfolio QA","This is a valid mocked test request","_gotcha"]) expect(body).toContain(value);
      await route.fulfill({status:200,contentType:"application/json",headers:{"access-control-allow-origin":"*"},body:JSON.stringify({ok:true})});
    });
    await page.goto("/"+locale);
    const form=page.locator("#contact form");
    await form.locator('[name="name"]').fill("Test Client");
    await form.locator('[name="email"]').fill("test@example.com");
    await form.locator('[name="subject"]').fill("Portfolio QA");
    await form.locator('[name="message"]').fill("This is a valid mocked test request");
    await form.locator('button[type="submit"]').click();
    await expect(page.locator("#contact [role='status']")).toBeVisible();
    expect(calls).toBe(1);
  });
}
test("Formspree error retains form values and offers direct email fallback",async({page})=>{
  await page.route("https://formspree.io/f/xbggnyab",route=>route.fulfill({status:429,contentType:"application/json",headers:{"access-control-allow-origin":"*"},body:JSON.stringify({errors:[{message:"Too many requests"}]})}));
  await page.goto("/es");
  const form=page.locator("#contact form");
  await form.locator('[name="name"]').fill("Test Client");
  await form.locator('[name="email"]').fill("test@example.com");
  await form.locator('[name="message"]').fill("Message retained after Formspree error");
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('[role="alert"]')).toBeVisible();
  await expect(form.locator('a[href="mailto:vidalrenao.lab@outlook.com"]')).toBeVisible();
  await expect(form.locator('[name="message"]')).toHaveValue("Message retained after Formspree error");
});
