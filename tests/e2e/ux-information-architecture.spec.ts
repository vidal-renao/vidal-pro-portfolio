import { expect, test } from "@playwright/test";

const order = ["specializations", "services", "projects", "experience", "skills", "credentials", "testimonials", "contact"];

for (const locale of ["es", "en", "de"]) {
  test(`UX-002: information hierarchy and direct service navigation in ${locale}`, async ({ page, isMobile }) => {
    await page.goto(`/${locale}`);
    const ids = await page.locator("main > section[id]").evaluateAll((nodes) => nodes.map((node) => node.id));
    expect(ids).toEqual(["top", ...order]);
    if (isMobile) {
      await page.locator("[data-mobile-menu-trigger]").click();
      await expect(page.locator('#mobile-nav a[href="#services"]')).toBeVisible();
      await expect(page.locator('#mobile-nav a[href="#specializations"]')).toBeVisible();
      await page.keyboard.press("Escape");
    } else {
      await expect(page.locator('nav[aria-label="Main"] a[href="#services"]')).toBeVisible();
      await expect(page.locator('nav[aria-label="Main"] a[href="#specializations"]')).toBeVisible();
    }
    await expect(page.locator('#top [data-testid="hero-business-cta"]')).toHaveAttribute("href", "#services");
    await expect(page.locator('#top [data-featured-testimonial]')).toHaveCount(0);
    await expect(page.locator("#testimonials figure").first()).toBeVisible();
  });
}

for (const locale of ["es", "en", "de"]) {
  test(`UX-002 visual hierarchy and balanced tracks in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("#top .hero-content")).toBeVisible();
    await expect(page.locator("#top .hero-portrait")).toHaveCount(1);
    await expect(page.locator("#specializations article")).toHaveCount(2);
    await expect(page.locator("#services article")).toHaveCount(3);
    await expect(page.locator("#services article .service-action")).toHaveCount(3);
    await expect(page.locator("#top a[data-testid=hero-business-cta]")).toBeVisible();
    await expect(page.locator("#top a[data-testid=hero-career-cta]")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  });
}
