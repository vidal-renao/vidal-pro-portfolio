import { expect, test } from "@playwright/test";

test("scroll arrow points down, advances a section, and turns into back-to-top at the end", async ({ page }) => {
  await page.goto("/es");
  const arrow = page.getByTestId("scroll-arrow");
  await expect(arrow).toHaveAttribute("data-direction", "down");
  await expect(arrow).toHaveAccessibleName("Siguiente sección");
  await arrow.click();
  await expect.poll(() => page.locator("#specializations").evaluate((el) => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(190);
  await arrow.click();
  await expect.poll(() => page.locator("#services").evaluate((el) => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(190);
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect(arrow).toHaveAttribute("data-direction", "up");
  await expect(arrow).toHaveAccessibleName("Volver arriba");
  await arrow.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
  await expect(arrow).toHaveAttribute("data-direction", "down");
});
