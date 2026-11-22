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

for (const locale of ["es", "en", "de"]) {
  test(`UX-003 polish: mobile pathways and navigation in ${locale}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`/${locale}`);
    const paths = page.locator("#top [data-ux-v3-path]");
    await expect(paths).toHaveCount(2);
    for (const path of await paths.all()) {
      await expect(path).toBeVisible();
      await expect(path.locator(".v3-path-symbol svg")).toBeVisible();
      expect((await path.boundingBox())?.width ?? 0).toBeGreaterThan(300);
    }
    for (const target of ["services", "projects", "experience"]) {
      await expect(page.locator(`#${target}`)).toHaveCount(1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  });
}
