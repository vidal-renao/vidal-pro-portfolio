import { expect, test } from "@playwright/test";
import { PROJECTS } from "../../content/projects";
import { CREDENTIALS } from "../../content/credentials";

const cards = (page: import("@playwright/test").Page) => page.locator("#projects article");

test.describe("projects explorer", () => {
  test("lists every project and filters by search, category and stack", async ({ page }) => {
    await page.goto("/es");
    await expect(cards(page)).toHaveCount(PROJECTS.length);

    const search = page.getByRole("searchbox");
    await search.fill("pgvector");
    await expect(cards(page)).toHaveCount(1);
    await expect(cards(page).first().locator("h3")).toHaveText("WAAI SaaS");

    await search.fill("ALEMAN"); // accent- and case-insensitive
    await expect(cards(page)).toHaveCount(2);

    await search.fill("zzzz");
    await expect(page.getByText("Ningún proyecto coincide con la búsqueda.")).toBeVisible();
    await page.locator("#projects").getByRole("button", { name: "Limpiar filtros" }).last().click();
    await expect(cards(page)).toHaveCount(PROJECTS.length);

    const client = page.getByRole("button", { name: /Proyecto de cliente/ });
    await client.click();
    await expect(client).toHaveAttribute("aria-pressed", "true");
    await expect(cards(page)).toHaveCount(PROJECTS.filter((p) => p.categories.includes("client")).length);

    await page.getByRole("button", { name: /Todos/ }).click();
    await cards(page).first().getByRole("button", { name: "MCP" }).click();
    await expect(search).toHaveValue("MCP");
    await expect(cards(page)).toHaveCount(1);
  });

  test("every project links out safely; private repos show no code link", async ({ page }) => {
    await page.goto("/en");
    const links = await page.locator('#projects a:has-text("Open")').evaluateAll((as) =>
      as.map((a) => ({ href: a.getAttribute("href") ?? "", target: a.getAttribute("target"), rel: a.getAttribute("rel") ?? "" })),
    );
    expect(links).toHaveLength(PROJECTS.length);
    for (const l of links) {
      expect(l.href.startsWith("https://")).toBe(true);
      expect(l.target).toBe("_blank");
      expect(l.rel).toContain("noopener");
    }
    await expect(page.locator("#projects article", { hasText: "JobPilot AI" }).getByText("Private code")).toBeVisible();
  });
});

test.describe("content", () => {
  test("credentials: every AI certificate is listed and every PDF exists", async ({ page, request }) => {
    await page.goto("/de");
    await expect(page.locator("#credentials ul").first().locator("> li")).toHaveCount(CREDENTIALS.filter((c) => c.group === "ai").length);
    for (const c of CREDENTIALS.filter((c) => c.pdf)) {
      expect((await request.head(c.pdf!)).status(), c.pdf!).toBe(200);
    }
  });

  test("experience: recent roles open, older ones expand on demand", async ({ page }) => {
    await page.goto("/es");
    const older = page.locator("#experience details").nth(2);
    await expect(older).not.toHaveAttribute("open", "");
    await older.locator("summary").click();
    await expect(older).toHaveAttribute("open", "");
  });

  test("CV download offers both focuses in three languages", async ({ page, request }) => {
    await page.goto("/en");
    await expect(page.locator("#cv a")).toHaveCount(6);
    await page.locator("#cv").getByRole("button", { name: "IT systems" }).click();
    await expect(page.locator("#cv a").first()).toHaveAttribute("href", /variant=systems/);
    const word = await request.get("/api/download?format=word&locale=de&email=outlook&variant=fullstack");
    expect(word.status()).toBe(200);
    expect(word.headers()["content-type"]).toContain("wordprocessingml");
  });

  test("career profile API keeps its contract (JobPilot sync)", async ({ request }) => {
    const res = await request.get("/api/career-profile");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.schemaVersion).toBe(1);
    expect(Object.keys(body.locales).sort()).toEqual(["de", "en", "es"]);
    expect(body.contentHash).toMatch(/^[a-f0-9]{64}$/);
    // CV, letter and portfolio share one source: what the printed CV states is what JobPilot receives.
    expect(body.workPreferences.seeksPermanent).toBe(true);
    expect(body.locales.de.availability).toBe("Sofort verfügbar · Gesucht: Festanstellung 80–100 %");
    expect(body.locales.de.commitment).toBe("Bereit für Pikett, Reisen, flexible Arbeitszeiten und Umzug");
  });

  test("removed pages redirect to contact", async ({ request }) => {
    const res = await request.get("/es/consultation", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toContain("/es#contact");
  });
});

test.describe("navigation", () => {
  test("desktop: section links mark the current section; skip link comes first", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop navigation");
    await page.goto("/es");
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveText("Saltar al contenido");
    const link = page.locator('nav[aria-label="Main"] a[href="#experience"]');
    await link.click();
    await expect(link).toHaveAttribute("aria-current", "location");
  });

  test("mobile: menu opens, navigates, closes with Escape and switches language", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile navigation");
    await page.goto("/de");
    const menu = page.locator("#mobile-nav");
    await expect(menu).toBeHidden();
    await page.getByRole("button", { name: "Menü" }).click();
    await expect(menu).toBeVisible();
    await menu.locator('a[href="#credentials"]').click();
    await expect(menu).toBeHidden();
    await page.getByRole("button", { name: "Menü" }).click();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await page.getByRole("button", { name: "Menü" }).click();
    await menu.getByRole("link", { name: "English" }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  });
});
