import { expect, test } from "@playwright/test";
import { PROJECTS } from "../../content/projects";

const PILLARS = {
  en: { systems: "IT Systems & Cloud", software: "Software & AI", licence: "Driving License Cat. B" },
  de: { systems: "IT-Systeme & Cloud", software: "Software & KI", licence: "Führerschein Kat. B" },
  es: { systems: "Sistemas IT y Cloud", software: "Software e IA", licence: "Permiso de conducir Cat. B" },
} as const;

for (const [locale, copy] of Object.entries(PILLARS)) {
  test(`both pillars are named, grouped and bridged in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const sectors = page.locator("#specializations article");
    await expect(sectors.nth(0)).toContainText(copy.software);
    await expect(sectors.nth(1)).toContainText(copy.systems);
    await expect(page.locator("#specializations [data-pillar-bridge]")).toContainText("HelpDesk AI");

    await expect(page.locator("#skills [data-skill-group]")).toHaveCount(2);
    await expect(page.locator('#skills [data-skill-group="systems"] h3')).toHaveText(copy.systems);
    await expect(page.locator('#skills [data-skill-group="software"] h3')).toHaveText(copy.software);
    await expect(page.locator('#skills [data-skill-group="systems"]')).toContainText("Veeam Backup & Replication");
    await expect(page.locator('#skills [data-skill-group="systems"]')).toContainText("Acronis Cyber Protect");

    await expect(page.locator("#projects [data-project-bridge]")).toHaveCount(PROJECTS.filter((p) => p.bridge).length);
    await expect(page.locator("#projects article", { hasText: "Enterprise M365 & Hybrid Identity Lab" })).toHaveCount(1);
    await expect(page.locator("#projects article", { hasText: "MatchPoint AI" })).toHaveCount(1);
  });

  test(`systems CV states 8+ years, 1st/2nd level and ${copy.licence} in ${locale}`, async ({ request }) => {
    const res = await request.get("/api/career-profile");
    expect(res.ok()).toBe(true);
    const profile = await res.json();
    const data = profile.locales[locale];
    expect(data.license).toBe(copy.licence);
    expect(data.variants.systems.profile).toMatch(/8\+ years|über 8 Jahren|más de 8 años/);
    expect(data.variants.systems.profile).toContain("Entra Connect");
    expect(JSON.stringify(data.variants.systems)).toContain("Intune");
    expect(JSON.stringify(data)).not.toMatch(/3rd|3\.er|2nd\/3rd/);
    // Contract: knowledge entries stay { area, detail } only.
    for (const k of data.variants.fullstack.knowledge) expect(Object.keys(k).sort()).toEqual(["area", "detail"]);
  });
}

test("track contact links preselect the right purpose", async ({ page }) => {
  await page.goto("/en");
  const tracks = page.locator("#specializations [data-testid=track-contact-cta]");
  await expect(tracks).toHaveCount(2);
  await tracks.nth(1).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByTestId("contact-purpose")).toHaveValue("career");
  await tracks.nth(0).click();
  await expect(page.getByTestId("contact-purpose")).toHaveValue("business");
});

test("security headers are sent", async ({ request }) => {
  const res = await request.get("/en");
  const headers = res.headers();
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["content-security-policy"]).toContain("https://formspree.io");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
});

for (const locale of ["en", "de", "es"]) {
  test(`1200x630 share image per locale (${locale})`, async ({ page, request }) => {
    await page.goto(`/${locale}`);
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(og).toContain(`/${locale}/opengraph-image`);
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
    const img = await request.get(new URL(og!).pathname + new URL(og!).search);
    expect(img.ok()).toBe(true);
    expect(img.headers()["content-type"]).toContain("image/png");
  });
}
