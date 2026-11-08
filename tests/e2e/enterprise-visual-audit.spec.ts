import { expect, test } from "@playwright/test";

const locales = ["es", "en", "de"] as const;
const viewports = [
  { name: "mobile-360", width: 360, height: 780 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "desktop-1280", width: 1280, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 },
] as const;

async function capture(page: import("@playwright/test").Page, name: string) {
  await page.evaluate(() => document.fonts.ready);
  const bytes = await page.screenshot({ fullPage: true, animations: "disabled" });
  await test.info().attach(name, { body: bytes, contentType: "image/png" });
}

for (const locale of locales) {
  for (const viewport of viewports) {
    test(`visual evidence ${locale} ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`/${locale}`, { waitUntil: "networkidle" });
      const dimensions = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - innerWidth,
        scrollHeight: document.documentElement.scrollHeight,
        title: document.title,
      }));
      expect(dimensions.overflow).toBeLessThanOrEqual(1);
      expect(dimensions.scrollHeight).toBeGreaterThan(viewport.height);
      expect(dimensions.title.length).toBeGreaterThan(15);

      await capture(page, `${locale}-${viewport.name}-full`);

      if (viewport.width < 1280) {
        await page.locator("[data-mobile-menu-trigger]").click();
        await expect(page.locator("#mobile-nav")).toBeVisible();
        await capture(page, `${locale}-${viewport.name}-drawer`);
        await page.keyboard.press("Escape");
        await expect(page.locator("#mobile-nav")).toBeHidden();
      } else {
        const summary = page.locator("[data-header-primary] details summary");
        await summary.hover();
        await expect(page.locator("[data-header-primary] details")).toHaveAttribute("open", "");
        await capture(page, `${locale}-${viewport.name}-more-hover`);
      }
      await page.locator("footer").scrollIntoViewIfNeeded();
      await capture(page, `${locale}-${viewport.name}-footer`);
    });
  }
}

test("enterprise accessibility smoke: named controls and clear heading hierarchy", async ({page}) => {
  await page.goto("/en");
  await expect(page.locator("h1")).toHaveCount(1);
  const broken = await page.locator("img").evaluateAll((images) =>
    images.filter((img) => !img.hasAttribute("alt")).map((img) => img.getAttribute("src")));
  expect(broken).toEqual([]);
  const controls = await page.locator("button").evaluateAll((buttons) =>
    buttons.filter((el) => !el.textContent?.trim() && !el.getAttribute("aria-label") && !el.getAttribute("title"))
      .map((el) => el.outerHTML.slice(0, 180)));
  expect(controls).toEqual([]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});
