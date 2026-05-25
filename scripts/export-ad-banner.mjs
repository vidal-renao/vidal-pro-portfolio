/**
 * Puppeteer export script — renders /export/ad-banner and saves PNG.
 *
 * Prerequisites: `npm run dev` must be running on port 3000.
 * Output: public/assets/ads/livo-banner.png  (2400×1800px @ 2x retina)
 *
 * Usage:
 *   npm run export:ad
 *
 * Override browser path:
 *   BROWSER_PATH="C:\path\to\chrome.exe" npm run export:ad
 */

import puppeteer from "puppeteer-core";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Browser detection (Windows Chrome / Edge fallback) ──────────────────────
const WINDOWS_BROWSERS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

function findBrowser() {
  if (process.env.BROWSER_PATH && existsSync(process.env.BROWSER_PATH)) {
    return process.env.BROWSER_PATH;
  }
  for (const p of WINDOWS_BROWSERS) {
    if (existsSync(p)) return p;
  }
  throw new Error(
    "No browser found. Install Chrome/Edge or set BROWSER_PATH env var."
  );
}

// ── Paths ────────────────────────────────────────────────────────────────────
const executablePath = findBrowser();
const outputDir = path.join(__dirname, "..", "public", "assets", "ads");
const outputPath = path.join(outputDir, "livo-banner.png");

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

// ── Render & Screenshot ──────────────────────────────────────────────────────
const browser = await puppeteer.launch({
  executablePath,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  headless: true,
});

const page = await browser.newPage();

// deviceScaleFactor: 2 → physical PNG is 2400×1800 (retina/print quality)
await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });

await page.goto("http://localhost:3000/export/ad-banner", {
  waitUntil: "networkidle0",
  timeout: 30_000,
});

await page.screenshot({
  path: outputPath,
  clip: { x: 0, y: 0, width: 1200, height: 900 },
});

await browser.close();

console.log(`✅ Exported → ${outputPath}`);
console.log(`   Viewport : 1200×900 CSS px`);
console.log(`   PNG size : 2400×1800 physical px (2× retina)`);
