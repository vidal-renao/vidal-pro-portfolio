import { expect, test } from "@playwright/test";

for (const locale of ["es", "en", "de"] as const) {
  test(`release smoke: navigation anchors and canonical metadata are coherent in ${locale}`, async ({page}) => {
    await page.goto(`/${locale}`);
    await expect(page.locator('html')).toHaveAttribute("lang",locale);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",`https://vidal-pro-portfolio.vercel.app/${locale}`);
    for (const language of ["es", "en", "de"]) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${language}"]`)).toHaveAttribute("href",`https://vidal-pro-portfolio.vercel.app/${language}`);
    }
    const broken=await page.locator('header a[href^="#"],footer a[href^="#"]').evaluateAll((links)=>
      links.map((a)=>a.getAttribute("href")?.slice(1)??"").filter((id)=>id && !document.getElementById(id)));
    expect(broken).toEqual([]);
    const external = await page.locator('a[href^="http"]').evaluateAll((links)=>
      links.map((a)=>a.getAttribute("href")??""));
    expect(external.every((url)=>url.startsWith("https://"))).toBe(true);
  });
}

test("release smoke: robots and sitemap are generated for three locales", async ({request}) => {
  const robots=await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  const r=await robots.text();
  expect(r).toContain("sitemap.xml");
  const sitemap=await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml=await sitemap.text();
  for(const locale of ["es","en","de"]) {
    expect(xml).toContain(`https://vidal-pro-portfolio.vercel.app/${locale}`);
  }
});

test("release smoke: search filters projects locally without changing navigation",async ({page})=>{
  await page.goto("/es");
  const search=page.locator('#projects input[type="search"]');
  await expect(search).toBeVisible();
  await search.fill("unlikely-portfolio-project-lookup-zzqx");
  await expect(page.locator("#projects article")).toHaveCount(0);
  await search.fill("");
  await expect(page.locator("#projects article").first()).toBeVisible();
  expect(new URL(page.url()).hash).toBe("");
});
