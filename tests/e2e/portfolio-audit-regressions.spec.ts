import { expect, test } from "@playwright/test";
import { escapeHtml } from "../../lib/contact/escapeHtml";

test("HTML escaping rejects markup and preserves readable punctuation", () => {
  expect(escapeHtml('<img src=x onerror="alert(1)"> & \'hello\'')).toBe("&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &#39;hello&#39;");
});

for (const locale of ["es", "en", "de"]) {
  test(`all nine content sections are represented in the rail in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const rail = page.locator('nav').filter({ has: page.getByRole("button", { name: /Mover control|Move navigation|Navigationssteuerung/ }) });
    await expect(rail).toBeVisible();
    const steps = await page.locator("main section[id]").evaluateAll((nodes) => nodes.map((n) => n.id));
    expect(steps).toEqual(["top", "specializations", "projects", "services", "experience", "skills", "credentials", "testimonials", "contact"]);
    await expect(rail).toContainText("09");
    await expect(page.locator('footer a[href="#testimonials"]')).toHaveCount(1);
  });
}

test("skills reveal the same core AI tools available under specializations", async ({ page }) => {
  await page.goto("/es");
  const area = page.locator("#skills details").filter({ hasText: "IA y Automatización" });
  await area.locator("summary").click();
  await expect(area).toContainText("ChatGPT");
  await expect(area).toContainText("Codex");
  await expect(area).toContainText("Gemini");
});

test("recruiters can focus the experience timeline on relevant IT roles", async ({ page }) => {
  await page.goto("/es");
  const scope = page.locator("#experience");
  await scope.getByRole("button", { name: "Experiencia IT" }).click();
  await expect(scope.getByText("Trabajos temporales fuera del sector IT")).toHaveCount(0);
  await expect(scope.getByText("Lutelco Instalaciones SL")).toBeVisible();
  await scope.getByRole("button", { name: "Trayectoria completa" }).click();
  await expect(scope.getByText("Trabajos temporales fuera del sector IT")).toBeVisible();
});
