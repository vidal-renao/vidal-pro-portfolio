import { expect, test } from "@playwright/test";

for (const locale of ["es", "de", "en"]) {
  test(`two equal professional sectors are discoverable in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const sectors = page.locator("#specializations article");
    await expect(sectors).toHaveCount(2);
    await expect(sectors.nth(0)).toContainText("Fullstack AI Engineer");
    await expect(sectors.nth(1)).toContainText("Systems Administrator");
    await expect(sectors.nth(0).getByRole("link")).toHaveAttribute("href", "#projects");
    await expect(sectors.nth(1).getByRole("link")).toHaveAttribute("href", "#experience");
    await expect(page.locator('nav[aria-label="Main"] a[href="#specializations"]')).toHaveCount(1);
    await expect(page.locator("footer a[href='#specializations']")).toHaveCount(1);
  });
}

test("hero offers a clear route to both career tracks", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("#top a[href='#specializations']")).toBeVisible();
  await expect(page.locator("#top a[href='#contact']")).toBeVisible();
});

test("premium header remains accessible on mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/es");
  await page.getByRole("button", { name: "Menú" }).click();
  await expect(page.locator('#mobile-nav a[href="#specializations"]')).toBeVisible();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
});

for (const locale of ["es", "de", "en"]) {
  test(`technical detail is optional while solution benefits are visible in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const cards = page.locator("#specializations article");
    await expect(cards).toHaveCount(2);
    for (const card of await cards.all()) {
      await expect(card.locator("ul").first()).toBeVisible();
      const details = card.locator("details");
      await expect(details).toHaveCount(1);
      await expect(details).not.toHaveAttribute("open", "");
      await details.locator("summary").click();
      await expect(details).toHaveAttribute("open", "");
      await expect(details.locator("ul li").first()).toBeVisible();
    }
    await expect(page.locator("#skills details").first()).not.toHaveAttribute("open", "");
  });
}


for (const locale of ["es", "de", "en"]) {
  test(`AI toolchain names are discoverable on demand in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const ai = page.locator("#specializations article").first();
    await ai.locator("details summary").click();
    for (const technology of ["ChatGPT", "OpenAI API", "Codex", "Claude", "Claude Code", "Gemini", "OpenCode"]) {
      await expect(ai.locator("details li", { hasText: technology }).first()).toBeVisible();
    }
    const automation = page.locator("#services article").nth(1);
    await automation.locator("details summary").click();
    await expect(automation).toContainText("Codex");
    await expect(automation).toContainText("ChatGPT");
  });
}

test("section navigation scrolls progressively up and down", async ({ page }) => {
  await page.goto("/es");
  const controls = page.getByRole("navigation", { name: "Navegación por secciones" });
  await expect(controls).toBeVisible();
  await controls.getByRole("button", { name: "Siguiente sección" }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
  await expect(page).toHaveURL(/#specializations$/);
  await controls.getByRole("button", { name: "Sección anterior" }).click();
  await expect(page).toHaveURL(/#top$/);
});

test("section navigation remains operable with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/es");
  await page.getByRole("navigation", { name: "Navegación por secciones" }).getByRole("button", { name: "Siguiente sección" }).click();
  await expect(page).toHaveURL(/#specializations$/);
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});

test("section controls use a compact vertical translucent rail", async ({ page }) => {
  await page.goto("/es");
  const rail = page.getByRole("navigation", { name: "Navegación por secciones" });
  await expect(rail).toBeVisible();
  const dimensions = await rail.evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return { width: rect.width, height: rect.height, center: rect.top + rect.height / 2, viewportCenter: innerHeight / 2 };
  });
  expect(dimensions.height).toBeGreaterThan(dimensions.width);
  expect(dimensions.width).toBeLessThanOrEqual(64);
  expect(Math.abs(dimensions.center - dimensions.viewportCenter)).toBeLessThan(30);
  await expect(rail).toHaveCSS("flex-direction", "column");
  await expect(rail).toHaveCSS("background-color", /0[.]4/);
  await rail.getByRole("button", { name: "Siguiente sección" }).click();
  await expect(page).toHaveURL(/#specializations$/);
});
