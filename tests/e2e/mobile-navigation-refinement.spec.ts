import { expect, test } from "@playwright/test";

test("mobile menu is dismissible by backdrop and does not trap background scrolling after close", async ({page,isMobile}) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/es");
  await page.getByRole("button", {name:"Menú"}).click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await expect(page.locator("[data-mobile-menu-backdrop]")).toBeVisible();
  await page.locator("[data-mobile-menu-backdrop]").click({position:{x:10,y:100}});
  await expect(page.locator("#mobile-nav")).toBeHidden();
  await expect(page.locator("body")).not.toHaveCSS("overflow","hidden");
  await expect(page.getByRole("button",{name:"Menú"})).toBeFocused();
});

test("mobile menu shows direct section route and supports keyboard Tab containment",async ({page,isMobile})=>{
  test.skip(!isMobile,"mobile only");
  await page.goto("/es");
  await page.getByRole("button",{name:"Menú"}).click();
  const panel=page.locator("#mobile-nav");
  await expect(panel.locator('a[href="#contact"]')).toHaveCount(1);
  await expect(panel.locator('a[href="#services"]')).toHaveCount(1);
  await page.keyboard.press("Shift+Tab");
  expect(await page.evaluate(() => document.getElementById("mobile-nav")?.contains(document.activeElement))).toBe(true);
});
