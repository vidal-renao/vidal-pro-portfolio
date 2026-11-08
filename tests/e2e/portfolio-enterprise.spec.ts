import { expect, test } from "@playwright/test";

const locales = ["es", "en", "de"] as const;
const order = ["top", "specializations", "projects", "services", "experience", "skills", "credentials", "testimonials", "contact"];

for (const locale of locales) {
  test(`enterprise section hierarchy and shared anchors are correct in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const sections = await page.locator("main section[id]").evaluateAll((nodes) => nodes.map((node) => node.id));
    expect(sections).toEqual(order);
    for (const id of order.slice(1)) {
      await expect(page.locator(`footer a[href="#${id}"]`)).toHaveCount(1);
    }
    const header = page.locator("header");
    await expect(header.locator('a[href="#specializations"]')).toHaveCount(2);
    await expect(header.locator('a[href="#contact"]')).toHaveCount(2);
  });
}

test("enterprise desktop menu is compact, navigable, and has secondary disclosure", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop only");
  await page.goto("/en");
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav).toBeVisible();
  for (const id of ["specializations", "projects", "services", "experience"]) {
    await expect(nav.locator(`> a[href="#${id}"]`)).toHaveCount(1);
  }
  await expect(nav.locator('a[href="#skills"]')).toBeHidden();
  await nav.locator("details summary").click();
  await expect(nav.locator('a[href="#skills"]')).toBeVisible();
  await expect(nav.locator('a[href="#testimonials"]')).toBeVisible();
  await expect(page.locator("header a[href='#cv']").first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("enterprise mobile menu contains focus, closes on Escape and returns to trigger", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/es");
  const trigger = page.getByRole("button", { name: "Menú" });
  await trigger.click();
  const panel = page.locator("#mobile-nav");
  await expect(panel).toBeVisible();
  await expect(panel.getByRole("link", { name: "Contacto" })).toBeVisible();
  await expect(panel.locator('a[href="#cv"]')).toBeVisible();
  await expect(panel.getByRole("link", { name: "Deutsch" })).toBeVisible();
  const focusedInside = await page.evaluate(() => document.getElementById("mobile-nav")?.contains(document.activeElement));
  expect(focusedInside).toBe(true);
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(page.getByRole("button", { name: "Menú" })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("enterprise mobile menu closes after a section is selected", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/es");
  await page.getByRole("button", { name: "Menú" }).click();
  await page.locator('#mobile-nav a[href="#services"]').click();
  await expect(page.locator("#mobile-nav")).toBeHidden();
  await expect(page).toHaveURL(/#services$/);
});

test("enterprise header stays within a 1024px viewport", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop chromium only");
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/de");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await expect(page.getByRole("button", { name: "Menü" })).toBeVisible();
});
