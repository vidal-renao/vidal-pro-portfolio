import { expect, test } from "@playwright/test";

const langs = ["es", "en", "de"] as const;
for (const locale of langs) {
  test(`balanced search metadata, brand and structured data for ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page).toHaveTitle(/Vidal Reñao/);
    const title = await page.title();
    expect(title).toMatch(/AI|IA|KI/);
    expect(title).toMatch(/System|Sistemas|IT/);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toMatch(/Fullstack|Full-Stack/i);
    expect(description).toMatch(/Automation|Automatisierung|automatización/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://vidal-pro-portfolio.vercel.app/${locale}`);
    for (const lang of langs) await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveAttribute("href", `https://vidal-pro-portfolio.vercel.app/${lang}`);
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const nodes = scripts.flatMap(s => { const data = JSON.parse(s); return Array.isArray(data) ? data : data["@graph"] || [data]; });
    expect(nodes.some((node: Record<string,unknown>) => node["@type"] === "Person")).toBeTruthy();
    expect(nodes.some((node: Record<string,unknown>) => node["@type"] === "WebSite")).toBeTruthy();
    expect(nodes.some((node: Record<string,unknown>) => node["name"] === "VIDAL ECOSYSTEM")).toBeTruthy();
  });
}

test("production canonical URLs and multilingual sitemap are crawlable", async({request})=>{
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("sitemap.xml");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  for (const locale of langs) expect(xml).toContain(`https://vidal-pro-portfolio.vercel.app/${locale}`);
});
