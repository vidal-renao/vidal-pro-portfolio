import { expect, test } from "@playwright/test";

const origin = "https://vidal-pro-portfolio.vercel.app";
const locales = ["en", "de", "es"] as const;

test.describe("SEO indexability and internationalization", () => {
  for (const locale of locales) {
    test(`/${locale} exposes canonical, language alternates and identity data`, async ({ page }) => {
      const response = await page.goto(`/${locale}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${origin}/${locale}`);
      await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
      for (const alternate of locales) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${alternate}"]`)).toHaveAttribute("href", `${origin}/${alternate}`);
      }
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", `${origin}/en`);
      await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
      await expect(page).toHaveTitle(/Vidal Reñao/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Basel|Basilea/);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `${origin}/${locale}`);
      const identity = await page.locator('script[type="application/ld+json"]').textContent();
      const graph = JSON.parse(identity ?? "{}")["@graph"] as Array<Record<string, unknown>>;
      expect(graph.find((node) => node["@type"] === "Person")?.name).toBe("Vidal Reñao");
      const profile = graph.find((node) => node["@type"] === "ProfilePage");
      expect(profile?.url).toBe(`${origin}/${locale}`);
      expect(profile?.inLanguage).toBe(locale);
    });
  }

  test("sitemap publishes only canonical locales and matching x-default alternates", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();
    for (const locale of locales) {
      expect(xml).toContain(`<loc>${origin}/${locale}</loc>`);
      expect(xml).toContain(`hreflang="x-default" href="${origin}/en"`);
    }
    expect((xml.match(/<loc>/g) ?? [])).toHaveLength(locales.length);
  });

  test("robots allows public pages and points to sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const robots = await response.text();
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${origin}/sitemap.xml`);
  });
});
