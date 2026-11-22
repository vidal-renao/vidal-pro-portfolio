import { expect, test } from "@playwright/test";

for (const locale of ["es", "en", "de"]) {
  test(`UX-003: distinct first screen and equal professional paths in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("#top [data-ux-v3-hero]")).toBeVisible();
    await expect(page.locator("#top [data-ux-v3-path]")).toHaveCount(2);
    await expect(page.locator('#top [data-ux-v3-path][href="#projects"]')).toBeVisible();
    await expect(page.locator('#top [data-ux-v3-path][href="#experience"]')).toBeVisible();
    await expect(page.locator('#top [data-testid="hero-business-cta"]')).toHaveAttribute("href", "#services");
    await expect(page.locator('#top [data-testid="hero-career-cta"]')).toHaveAttribute("href", "#experience");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  });
}
