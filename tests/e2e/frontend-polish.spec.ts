import { expect, test } from "@playwright/test";
import { PROJECTS } from "../../content/projects";

const locales = ["en", "de", "es"] as const;

test("language menu opens on mouse hover and lists every language", async ({ page, isMobile }) => {
  test.skip(isMobile, "hover is a desktop pointer interaction");
  await page.goto("/en");
  const menu = page.locator("header [data-language-switch]").first();
  await expect(menu).not.toHaveAttribute("open", "");
  await menu.locator("summary").hover();
  await expect(menu).toHaveAttribute("open", "");
  for (const name of ["Deutsch", "English", "Español"]) await expect(menu.getByRole("link", { name })).toBeVisible();
  // Moving onto the panel keeps it open (no dead gap), leaving the header closes it.
  await menu.getByRole("link", { name: "Deutsch" }).hover();
  await expect(menu).toHaveAttribute("open", "");
  await page.mouse.move(600, 500);
  await expect(menu).not.toHaveAttribute("open", "");
});

for (const locale of locales) {
  test(`technology badges are grouped by category in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    for (const card of await page.locator("#specializations article").all()) {
      await card.locator("details summary").click();
      const groups = card.locator("[data-tech-group]");
      expect(await groups.count()).toBeGreaterThanOrEqual(4);
      for (const group of await groups.all()) {
        await expect(group.locator("p")).not.toBeEmpty();
        expect(await group.locator("li").count()).toBeGreaterThan(0);
      }
    }
  });

  test(`phones: no horizontal overflow and a compact projects section in ${locale}`, async ({ page }) => {
    for (const width of [360, 375]) {
      await page.setViewportSize({ width, height: 780 });
      await page.goto(`/${locale}`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      // Highlights beyond the first are collapsed on phones.
      const card = page.locator("#projects article").first();
      await expect(card.locator("details summary")).toBeVisible();
      const projectsHeight = await page.locator("#projects").evaluate((el) => el.getBoundingClientRect().height);
      expect(projectsHeight).toBeLessThan(6200);
      const visibleCards = await page.locator("#projects article").evaluateAll((as) => as.filter((a) => getComputedStyle(a).display !== "none").length);
      expect(visibleCards).toBe(6);
      await page.locator("[data-show-all-projects]").click();
      const allCards = await page.locator("#projects article").evaluateAll((as) => as.filter((a) => getComputedStyle(a).display !== "none").length);
      expect(allCards).toBe(PROJECTS.length);
    }
  });
}

test("desktop project cards keep all facts visible", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop layout");
  await page.goto("/en");
  const card = page.locator("#projects article").first();
  await expect(card.locator("ul.sm\\:flex li").first()).toBeVisible();
  await expect(card.locator("details")).toBeHidden();
});
