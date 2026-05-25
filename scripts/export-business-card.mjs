/**
 * Puppeteer export script — renders /export/business-card-{a,b} and saves PNGs.
 *
 * Prerequisites: `npm run dev` must be running on port 3000.
 * Output:
 *   public/assets/ads/cara_A.png  — Face A: Executive contact  (1004×650px @ ~300 DPI)
 *   public/assets/ads/cara_B.png  — Face B: QR connector       (1004×650px @ ~300 DPI)
 *
 * Format: European business card 85×55mm
 * Physical pixels: 1004×650 (502×325 CSS px × deviceScaleFactor 2)
 *
 * Usage:
 *   npm run export:card
 *
 * Override browser path:
 *   BROWSER_PATH="C:\path\to\chrome.exe" npm run export:card
 */

import puppeteer from "puppeteer-core";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

// 85×55mm @ 300 DPI → 1004×650px physical (502×325 CSS px × 2× deviceScaleFactor)
const CARD_W = 502;
const CARD_H = 325;

const outputDir = path.join(__dirname, "..", "public", "assets", "ads");
if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: findBrowser(),
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width: CARD_W, height: CARD_H, deviceScaleFactor: 2 });

const FACES = [
  { route: "business-card-a", filename: "cara_A.png", label: "Face A — Executive contact" },
  { route: "business-card-b", filename: "cara_B.png", label: "Face B — QR connector" },
];

for (const { route, filename, label } of FACES) {
  await page.goto(`http://localhost:3000/export/${route}`, {
    waitUntil: "networkidle0",
    timeout: 30_000,
  });

  const outPath = path.join(outputDir, filename);
  await page.screenshot({
    path: outPath,
    clip: { x: 0, y: 0, width: CARD_W, height: CARD_H },
  });

  console.log(`✅ Exported → ${outPath}  [${label}]`);
}

await browser.close();

console.log("");
console.log(`   Viewport  : ${CARD_W}×${CARD_H} CSS px`);
console.log(`   PNG size  : ${CARD_W * 2}×${CARD_H * 2} physical px (2× / ~300 DPI print)`);
console.log(`   Format    : European business card 85×55mm`);
