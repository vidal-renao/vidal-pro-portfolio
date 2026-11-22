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
