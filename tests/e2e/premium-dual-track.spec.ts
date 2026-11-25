import { expect, test } from "@playwright/test";

for (const locale of ["es", "de", "en"]) {
  test(`two equal professional sectors are discoverable in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const sectors = page.locator("#specializations article");
    await expect(sectors).toHaveCount(2);
    await expect(sectors.nth(0)).toContainText(locale === "en" ? "Full-Stack Developer" : locale === "de" ? "Full-Stack-Entwickler" : "Desarrollador Full-Stack");
    await expect(sectors.nth(1)).toContainText(locale === "en" ? "IT Systems Administrator" : locale === "de" ? "IT-Systemadministrator" : "Administrador de Sistemas IT");
    await expect(sectors.nth(0).locator("[data-track-action]")).toHaveAttribute("href", "#projects");
    await expect(sectors.nth(1).locator("[data-track-action]")).toHaveAttribute("href", "#experience");
    await expect(page.locator('nav[aria-label="Main"] a[href="#specializations"]')).toHaveCount(1);
    await expect(page.locator("footer a[href='#specializations']")).toHaveCount(1);
  });
}

test("hero offers clear business and career routes without removing either specialization", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("#top [data-testid=hero-business-cta]")).toBeVisible();
  await expect(page.locator("#top [data-testid=hero-career-cta]")).toBeVisible();
  await expect(page.locator("#specializations article")).toHaveCount(2);
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
