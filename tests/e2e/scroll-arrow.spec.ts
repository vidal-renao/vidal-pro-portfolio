import { expect, test, type Page } from "@playwright/test";

const IDS = ["top", "specializations", "services", "projects", "experience", "skills", "credentials", "testimonials", "contact"];
/** Distance between a section's top and the bottom edge of the fixed header (72px). */
const offsetOf = (page: Page, id: string) => page.locator(`#${id}`).evaluate((el) => Math.abs(el.getBoundingClientRect().top - 72));
const atBottom = (page: Page) => page.evaluate(() => Math.abs(document.documentElement.scrollHeight - innerHeight - scrollY));

test("down then up walk through every section without sticking or skipping", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/es");
  const down = page.getByTestId("scroll-down");
  for (const id of IDS.slice(1)) {
    await down.click();
    await expect.poll(async () => Math.min(await offsetOf(page, id), await atBottom(page))).toBeLessThan(3);
  }
  const up = page.getByTestId("scroll-up");
  await page.locator("#testimonials").evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 72));
  for (const id of ["credentials", "skills", "experience"]) {
    await up.click();
    await expect.poll(() => offsetOf(page, id)).toBeLessThan(3);
  }
});

for (const [locale, toBottom, toTop] of [["de", "Ganz nach unten", "Ganz nach oben"], ["en", "Go to bottom", "Back to top"], ["es", "Ir abajo del todo", "Ir arriba del todo"]]) {
  test(`edges jump to the opposite end with localized labels in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const up = page.getByTestId("scroll-up");
    await expect(up).toHaveAccessibleName(toBottom);
    await up.click();
    await expect.poll(() => atBottom(page), { timeout: 10_000 }).toBeLessThan(5);
    const down = page.getByTestId("scroll-down");
    await expect(down).toHaveAccessibleName(toTop);
    await down.click();
    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 10_000 }).toBeLessThan(5);
  });

  test(`hero studio notice preselects a business inquiry in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await page.getByTestId("hero-studio-cta").click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.getByTestId("contact-purpose")).toHaveValue("business");
  });
}
