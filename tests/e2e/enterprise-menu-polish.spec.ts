import { expect, test } from "@playwright/test";

const supported = ["es", "en", "de"] as const;

for (const locale of supported) {
  test(`navigation design is consistent and accessible in ${locale}`, async ({page}) => {
    await page.goto(`/${locale}`);
    const header=page.locator("header");
    await expect(header.locator('[data-site-brand]')).toBeVisible();
    await expect(header.locator('[data-header-primary]')).toHaveCount(1);
    await expect(header.locator('[data-mobile-menu-trigger]')).toHaveCount(1);
    await expect(header.locator('[data-language-switch]').first()).toBeVisible();
    await expect(header.locator('a[href="#contact"]')).toHaveCount(2);
    expect(await page.evaluate(() => Math.max(0,document.documentElement.scrollWidth - innerWidth))).toBeLessThan(2);
  });
}

test("desktop navigation shows a meaningful active state", async ({page,isMobile})=>{
  test.skip(isMobile,"desktop only");
  await page.goto("/es");
  const primary=page.locator("[data-header-primary]");
  await expect(primary).toBeVisible();
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect.poll(async()=>primary.locator('a[href="#projects"]').getAttribute("aria-current")).toBe("location");
  await primary.locator("details summary").click();
  await expect(primary.locator('a[href="#testimonials"]')).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(primary.locator("details")).not.toHaveAttribute("open","");
});

test("mobile drawer presents grouped navigation, language, and contact actions",async({page,isMobile})=>{
  test.skip(!isMobile,"mobile only");
  await page.goto("/es");
  const trigger=page.locator("[data-mobile-menu-trigger]");
  await trigger.click();
  const drawer=page.locator("#mobile-nav");
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole("navigation")).toBeVisible();
  await expect(drawer.locator('[data-mobile-primary] a')).toHaveCount(4);
  await expect(drawer.locator('[data-mobile-secondary] a')).toHaveCount(4);
  await expect(drawer.locator('[data-language-switch]')).toBeVisible();
  await expect(drawer.locator('[data-mobile-actions] a[href="#contact"]')).toBeVisible();
  await expect(drawer.locator('[data-mobile-actions] a[href="#cv"]')).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded","true");
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("header and drawer remain within viewport at 360, 375, 768, 1024, 1280, 1440",async({page,isMobile})=>{
  test.skip(isMobile,"responsive desktop browser coverage");
  for (const width of [360,375,768,1024,1280,1440]) {
    await page.setViewportSize({width,height:800});
    await page.goto("/de");
    expect(await page.evaluate(()=>document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    if(width<1280) {
      await page.locator("[data-mobile-menu-trigger]").click();
      const drawer=await page.locator("#mobile-nav").boundingBox();
      expect(drawer).not.toBeNull();
      expect(drawer!.x).toBeGreaterThanOrEqual(0);
      expect(drawer!.x+drawer!.width).toBeLessThanOrEqual(width+1);
      await page.keyboard.press("Escape");
    } else {
      await expect(page.locator("[data-header-primary]")).toBeVisible();
    }
  }
});
