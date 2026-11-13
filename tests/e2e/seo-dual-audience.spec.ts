import { expect, test } from "@playwright/test";

const langs = ["es", "en", "de"] as const;
for (const locale of langs) {
  test(`balanced search metadata, brand and structured data for ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page).toHaveTitle(/Vidal Reñao/);
    const title = await page.title();
    expect(title).toMatch(/System|Sistemas|IT/);
    expect(title).toMatch(/Full-Stack/);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    // VE-PORTFOLIO-BRAND-006: AI stays a search signal through the tagline/description, not the job title.
    expect(description).toMatch(/\bAI\b|\bIA\b|\bKI\b/);
    expect(description).toMatch(/Fullstack|Full-Stack/i);
    expect(description).toMatch(/Automation|Automatisierung|automatización/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://vidal-pro-portfolio.vercel.app/${locale}`);
    for (const lang of langs) await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveAttribute("href", `https://vidal-pro-portfolio.vercel.app/${lang}`);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", "https://vidal-pro-portfolio.vercel.app/en");
    await expect(page.locator('meta[name="google-site-verification"]')).toHaveAttribute("content", "8E5L_H0K-yv5EjGWhb48A08eNjp7iFVGvYeN_cY3i3Y");
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const nodes = scripts.flatMap(s => { const data = JSON.parse(s); return Array.isArray(data) ? data : data["@graph"] || [data]; });
    expect(nodes.some((node: Record<string,unknown>) => node["@type"] === "Person")).toBeTruthy();
    expect(nodes.some((node: Record<string,unknown>) => node["@type"] === "WebSite")).toBeTruthy();
    expect(nodes.some((node: Record<string,unknown>) => node["name"] === "VIDAL ECOSYSTEM")).toBeTruthy();
    const profile = nodes.find((node: Record<string,unknown>) => node["@type"] === "ProfilePage");
    expect(profile).toMatchObject({ "@id": `https://vidal-pro-portfolio.vercel.app/${locale}#webpage`, url: `https://vidal-pro-portfolio.vercel.app/${locale}`, inLanguage: locale, mainEntity: { "@id": "https://vidal-pro-portfolio.vercel.app/#person" } });
    expect(nodes.some((node: Record<string,unknown>) => node["@type"] === "LocalBusiness")).toBe(false);
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
  expect(xml).not.toContain("<lastmod>");
});
