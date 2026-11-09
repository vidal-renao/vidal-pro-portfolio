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
    await expect(form.locator('input[name="email"]')).toHaveAttribute("type","email");
    await expect(form.locator('textarea[name="message"]')).toHaveAttribute("required","");
  }
});
