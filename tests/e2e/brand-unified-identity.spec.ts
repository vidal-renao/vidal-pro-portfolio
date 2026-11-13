import { expect, test } from "@playwright/test";

/**
 * VE-PORTFOLIO-BRAND-006 — one identity across portfolio and LinkedIn.
 * ID-01 title, ID-02 tagline, VIS-01 steel-blue accent with AA contrast.
 */
const IDENTITY = {
  en: {
    title: "IT Systems Administrator & Full-Stack Developer",
    tagline: "Reliable IT today. AI-ready tomorrow.",
    tracks: ["Full-Stack Developer", "IT Systems Administrator"],
  },
  de: {
    title: "IT-Systemadministrator & Full-Stack-Entwickler",
    tagline: "Zuverlässige IT heute. Bereit für KI morgen.",
    tracks: ["Full-Stack-Entwickler", "IT-Systemadministrator"],
  },
  es: {
    title: "Administrador de Sistemas IT y Desarrollador Full-Stack",
    tagline: "IT fiable hoy. Preparada para la IA mañana.",
    tracks: ["Desarrollador Full-Stack", "Administrador de Sistemas IT"],
  },
} as const;

for (const [locale, id] of Object.entries(IDENTITY)) {
  test(`ID-01/ID-02 unified title and tagline in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page).toHaveTitle(`Vidal Reñao | ${id.title}`);
    await expect(page.locator("#top")).toContainText(id.title);
    await expect(page.locator("#top")).toContainText(id.tagline);
    const sectors = page.locator("#specializations article");
    await expect(sectors.nth(0)).toContainText(id.tracks[0]);
    await expect(sectors.nth(1)).toContainText(id.tracks[1]);
    await expect(page.locator("footer")).not.toContainText("Fullstack AI");
    await expect(page.locator("body")).not.toContainText("Fullstack AI Engineer");
  });
}

test("ID-01 structured data uses the unified job titles", async ({ page }) => {
  await page.goto("/en");
  const json = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(json).toContain("IT Systems Administrator");
  expect(json).toContain("Full-Stack Developer");
  expect(json).not.toContain("Fullstack AI Developer");
});

test("VIS-01 steel-blue accent meets WCAG AA contrast", async ({ page }) => {
  await page.goto("/en");
  const tokens = await page.evaluate(() => {
    const s = getComputedStyle(document.documentElement);
    return {
      accent: s.getPropertyValue("--accent").trim().toLowerCase(),
      ink: s.getPropertyValue("--accent-ink").trim().toLowerCase(),
      bg: s.getPropertyValue("--bg").trim().toLowerCase(),
    };
  });
  expect(tokens.accent).toBe("#5b8db8");
  const lum = (hex: string) => {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const ratio = (a: string, b: string) => {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
  };
  expect(ratio(tokens.accent, tokens.bg)).toBeGreaterThanOrEqual(4.5);
  expect(ratio(tokens.ink, tokens.accent)).toBeGreaterThanOrEqual(4.5);
});
