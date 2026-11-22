import { test, expect } from "@playwright/test";

const locales = ["es", "en", "de"] as const;

for (const locale of locales) {
  test(`${locale}: audience routes and contextual service inquiry`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const business = page.locator('[data-testid="hero-business-cta"]');
    const career = page.locator('[data-testid="hero-career-cta"]');
    await expect(business).toHaveAttribute("href", "#services");
    await expect(career).toHaveAttribute("href", "#experience");
    await expect(page.locator('[data-testid="service-contact-cta"]')).toHaveCount(3);
    await page.locator('[data-testid="service-contact-cta"]').nth(1).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.getByTestId("contact-purpose")).toHaveValue("business");
    await expect(page.getByTestId("contact-service")).toHaveValue("ai");
    await page.getByTestId("contact-purpose").selectOption("career");
    await expect(page.getByTestId("contact-purpose")).toHaveValue("career");
  });
}
