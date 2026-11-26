import { test, expect } from "@playwright/test";
import de from "../../messages/de.json";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import { selectRoles } from "../../lib/cv/profileContent";

const cases = [
  { locale: "de", data: de, disk: /Festplatten/, dates: "März 2013 – Feb. 2014" },
  { locale: "en", data: en, disk: /hard drives/, dates: "Mar 2013 – Feb 2014" },
  { locale: "es", data: es, disk: /discos duros/, dates: "mar. 2013 – feb. 2014" },
] as const;
for (const { locale, data, disk, dates } of cases) {
  test(`IT career content and systems CV: ${locale}`, async ({ page, request }) => {
    const roles = data.experience.roles;
    expect(roles.find(r => r.id === "deinta-2013")?.period).toBe(dates);
    expect(roles.find(r => r.id === "nsc-2017")?.highlights.join(" ")).toMatch(disk);
    const integration = roles.find(r => r.id === "servo-carejob-2023");
    expect(integration?.company).toBe("");
    expect(integration?.highlights).toHaveLength(1);
    const selected = selectRoles(roles, "systems");
    expect(selected.full.find(r => r.id === "nsc-2017")?.highlights.join(" ")).toMatch(disk);
    expect(selected.full.some(r => r.id === "sprinet-2016")).toBe(true);
    expect(selected.full.some(r => r.id === "deinta-2013")).toBe(true);
    await page.goto(`/${locale}`);
    await expect(page.locator('[data-role="servo-carejob-2023"]')).toHaveCount(0);
    const response = await request.get("/api/career-profile");
    expect(response.ok()).toBe(true);
    const profile = await response.json();
    expect(profile.schemaVersion).toBe(1);
    expect(profile.locales[locale].experience.map((r: {id: string}) => r.id)).toEqual(roles.map(r => r.id));
  });
}
