import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const baseURL = process.env.AUDIT_BASE_URL ?? "http://localhost:3102";
const axeSource = readFileSync("audit-tools/package/axe.min.js", "utf8");
const browser = await chromium.launch({ headless: true });
const report = [];
try {
  for (const locale of ["es", "en", "de"]) {
    for (const width of [375, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(`${baseURL}/${locale}`, { waitUntil: "networkidle" });
      await page.evaluate(axeSource);
      const result = await page.evaluate(async () => {
        const axe = /** @type {any} */ (globalThis.axe);
        return axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
        });
      });
      const findings = result.violations.map(({ id, impact, description, nodes }) => ({
        id, impact, description, elements: nodes.map((n) => n.target).slice(0, 15),
      }));
      report.push({ locale, width, passed: result.passes.length, violations: findings });
      console.log(`axe ${locale}/${width}: ${result.passes.length} passes, ${findings.length} violations`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
mkdirSync("audit-results", { recursive: true });
writeFileSync("audit-results/accessibility.json", JSON.stringify({ generatedAt: new Date().toISOString(), report }, null, 2));
if (report.some((x) => x.violations.some((v) => ["critical", "serious"].includes(v.impact)))) {
  console.error("Accessibility gate: serious/critical violations exist. See artifact.");
  process.exitCode = 1;
}
