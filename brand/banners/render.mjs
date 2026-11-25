// Builds the VIDAL ECOSYSTEM banners as self-contained HTML, exports exact-size PNGs and verifies layout.
// Run from the repo root: node brand/banners/render.mjs
import { chromium } from "@playwright/test";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";

const OUT = "brand/banners";
const CHROME = process.env.PW_CHROMIUM_PATH;
const FONT = readFileSync("node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2").toString("base64");
const MONO = 'ui-monospace,"Cascadia Mono",Consolas,monospace';

const MARK = `<svg class="mark" viewBox="0 0 112 88" aria-hidden="true"><defs><linearGradient id="m" x1="0" y1="0" x2="1" y2="0.9">
<stop offset="0%" stop-color="#17F5E7"/><stop offset="48%" stop-color="#159EFF"/><stop offset="100%" stop-color="#BB58EE"/></linearGradient></defs>
<g fill="url(#m)"><path d="M3 7h21l28 47L82 7h23L52 85z"/><path d="M75 7h35L99 24H65z"/><path d="M62 35h38L89 52H52z"/><path d="M50 63h47L85 80H39z"/></g></svg>`;

const banners = [
  {
    file: "linkedin-1584x396", w: 1584, h: 396,
    brand: { x: 48, y: 36, mark: 56, vidal: 26, eco: 13 },
    pill: { right: 1536, y: 36, font: 15, padY: 9, padX: 18 },
    tagline: { left: 440, right: 1536, cy: 140, font: 46 },
    cards: { y: 214, h: 126, left: [440, 956], right: [1020, 1536], title: 24, stack: 16, pad: 26, gap: 12 },
    connector: { cx: 988, cy: 277, d: 56 },
    halos: { sw: { x: 1180, y: -260, d: 560 }, sys: { x: -200, y: 40, d: 460 }, blur: 100 },
    zone: { kind: "keepout", x0: 0, y0: 180, x1: 420, y1: 396 },
  },
  {
    file: "youtube-2560x1440", w: 2560, h: 1440,
    brand: { x: 531, y: 536, mark: 76, vidal: 36, eco: 18 },
    pill: { right: 2029, y: 540, font: 22, padY: 13, padX: 26 },
    tagline: { left: 507, right: 2053, cy: 668, font: 72 },
    cards: { y: 748, h: 160, left: [531, 1240], right: [1320, 2029], title: 36, stack: 23, pad: 34, gap: 16 },
    connector: { cx: 1280, cy: 828, d: 76 },
    halos: { sw: { x: 1650, y: -420, d: 1400 }, sys: { x: -520, y: 520, d: 1200 }, blur: 240 },
    zone: { kind: "safe", x0: 507, y0: 508, x1: 2053, y1: 931 },
  },
];

function html(b) {
  const { brand, pill, tagline, cards, connector: c, halos } = b;
  const card = (side, [x0, x1], title, stack) => `
  <div class="card ${side}" data-card="${side}" style="left:${x0}px;top:${cards.y}px;width:${x1 - x0}px;height:${cards.h}px">
    <i class="top"></i>
    <div class="title" data-text="${side}-title">${title}</div>
    <div class="stack" data-text="${side}-stack">${stack}</div>
  </div>`;
  const halo = (h, color) => `<div class="halo" style="left:${h.x}px;top:${h.y}px;width:${h.d}px;height:${h.d}px;background:${color}"></div>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>VIDAL ECOSYSTEM ${b.w}x${b.h}</title><style>
@font-face{font-family:"Geist";src:url(data:font/woff2;base64,${FONT}) format("woff2");font-weight:100 900}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${b.w}px;height:${b.h}px;overflow:hidden}
body{position:relative;font-family:"Geist",sans-serif;color:#F5F8FD;background:linear-gradient(180deg,#0B1425,#080E1C);-webkit-font-smoothing:antialiased}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(127,166,204,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(127,166,204,.045) 1px,transparent 1px);background-size:76px 76px;-webkit-mask-image:linear-gradient(to bottom,#000,transparent 92%)}
.halo{position:absolute;border-radius:50%;filter:blur(${halos.blur}px)}
.brand{position:absolute;left:${brand.x}px;top:${brand.y}px;display:flex;align-items:center;gap:${Math.round(brand.mark * 0.22)}px}
.mark{height:${brand.mark}px;width:${Math.round((brand.mark * 112) / 88)}px;filter:drop-shadow(0 0 8px rgba(36,178,255,.25))}
.vidal{font-size:${brand.vidal}px;font-weight:700;letter-spacing:.14em;line-height:1.1}
.eco{font-size:${brand.eco}px;font-weight:600;letter-spacing:.23em;color:#5B8DB8;line-height:1.4}
.pill{position:absolute;right:${b.w - pill.right}px;top:${pill.y}px;display:flex;align-items:center;gap:${Math.round(pill.font * 0.65)}px;padding:${pill.padY}px ${pill.padX}px;border-radius:999px;border:1px solid rgba(34,211,238,.3);background:rgba(34,211,238,.1);font:600 ${pill.font}px/1.2 ${MONO};letter-spacing:.08em;white-space:nowrap}
.pill b{width:${Math.round(pill.font * 0.55)}px;height:${Math.round(pill.font * 0.55)}px;border-radius:50%;background:#34D399;box-shadow:0 0 12px rgba(52,211,153,.8)}
.tagline{position:absolute;left:${tagline.left}px;width:${tagline.right - tagline.left}px;top:${tagline.cy - tagline.font * 0.65}px;height:${tagline.font * 1.3}px;display:flex;justify-content:center;align-items:center;font-size:${tagline.font}px;font-weight:800;letter-spacing:-.025em;white-space:nowrap}
.tagline .inner{display:inline-block;line-height:1.25}
.grad{background:linear-gradient(100deg,#B7C0FF,#A78BFA 40%,#8BE9F5);-webkit-background-clip:text;background-clip:text;color:transparent}
.card{position:absolute;overflow:hidden;border-radius:24px;border:1px solid rgba(183,208,242,.24);background:linear-gradient(160deg,rgba(255,255,255,.045),rgba(255,255,255,.01) 45%,transparent),#101A2B;box-shadow:0 1px 0 rgba(255,255,255,.05) inset,0 12px 40px -12px rgba(0,0,0,.55);display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:${cards.gap}px;padding:0 ${cards.pad}px}
.top{position:absolute;left:0;right:0;top:0;height:4px}
.sys .top{background:linear-gradient(90deg,#22D3EE,rgba(52,211,153,.6),transparent)}
.sw .top{background:linear-gradient(90deg,#818CF8,rgba(167,139,250,.6),transparent)}
.sys{box-shadow:0 1px 0 rgba(255,255,255,.05) inset,0 12px 40px -12px rgba(0,0,0,.55),0 20px 60px -30px rgba(8,145,178,.45)}
.sw{box-shadow:0 1px 0 rgba(255,255,255,.05) inset,0 12px 40px -12px rgba(0,0,0,.55),0 20px 60px -30px rgba(79,70,229,.5)}
.title{font-size:${cards.title}px;font-weight:700;letter-spacing:-.02em;line-height:1.25;white-space:nowrap}
.sys .title{color:#8BE9F5}.sw .title{color:#B7C0FF}
.stack{font:600 ${cards.stack}px/1.4 ${MONO};color:#B7C5D9;white-space:nowrap}
.link{position:absolute;left:${c.cx - c.d / 2}px;top:${c.cy - c.d / 2}px;width:${c.d}px;height:${c.d}px;border-radius:50%;border:2px solid transparent;background:linear-gradient(#101A2B,#101A2B) padding-box,linear-gradient(90deg,#22D3EE,#818CF8) border-box;box-shadow:-8px 0 28px -6px rgba(34,211,238,.65),8px 0 28px -6px rgba(129,140,248,.7);display:flex;align-items:center;justify-content:center}
</style></head><body>
${halo(halos.sw, "rgba(129,140,248,.2)")}${halo(halos.sys, "rgba(34,211,238,.1)")}<div class="grid"></div>
<div class="brand" data-box="brand">${MARK}<div><div class="vidal" data-text="vidal">VIDAL</div><div class="eco" data-text="ecosystem">ECOSYSTEM</div></div></div>
<div class="pill" data-box="pill"><b></b><span data-text="location">SWITZERLAND &amp; LIECHTENSTEIN</span></div>
<div class="tagline"><span class="inner" data-box="tagline" data-text="tagline">Reliable IT today. <span class="grad">AI-ready tomorrow.</span></span></div>
${card("sys", cards.left, "IT Systems &amp; Cloud", "M365 · Entra ID · Windows/Linux · Veeam")}
${card("sw", cards.right, "Software &amp; AI", "Next.js · Supabase · AI Agents · Automation")}
<div class="link" data-box="connector"><svg width="${c.d * 0.52}" height="${c.d * 0.52}" viewBox="0 0 24 24" fill="none" stroke="#F5F8FD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4 4 8l4 4M4 8h16M16 12l4 4-4 4M20 16H4"/></svg></div>
</body></html>`;
}

/** Runs in the page: returns every layout problem found. */
function inspect({ zone, w, h }) {
  const problems = [];
  const rect = (el) => el.getBoundingClientRect();
  const hits = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
  const texts = [...document.querySelectorAll("[data-text]")];
  for (const el of texts) {
    const name = el.dataset.text;
    const range = document.createRange();
    range.selectNodeContents(el);
    const lines = new Set([...range.getClientRects()].map((r) => Math.round((r.top + r.bottom) / 20)));
    const style = getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.3;
    if (rect(el).height > lineHeight * 1.6 || lines.size > 2) problems.push(`${name}: wraps onto two lines`);
    if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) problems.push(`${name}: clipped`);
    const card = el.closest("[data-card]");
    if (card) {
      const c = rect(card), r = rect(el);
      if (r.left < c.left + 8 || r.right > c.right - 8 || r.top < c.top + 4 || r.bottom > c.bottom - 4) problems.push(`${name}: leaves its card`);
    }
  }
  for (let i = 0; i < texts.length; i++)
    for (let j = i + 1; j < texts.length; j++)
      if (hits(rect(texts[i]), rect(texts[j]))) problems.push(`overlap: ${texts[i].dataset.text} / ${texts[j].dataset.text}`);
  const connector = document.querySelector("[data-box=connector]");
  for (const el of texts) if (hits(rect(el), rect(connector))) problems.push(`overlap: connector / ${el.dataset.text}`);
  const boxes = [...document.querySelectorAll("[data-box],[data-card]")];
  for (const el of boxes) {
    const name = el.dataset.box ?? `card-${el.dataset.card}`;
    const r = rect(el);
    if (r.left < 0 || r.top < 0 || r.right > w || r.bottom > h) problems.push(`${name}: outside canvas`);
    if (zone.kind === "keepout" && hits(r, { left: zone.x0, top: zone.y0, right: zone.x1, bottom: zone.y1 })) problems.push(`${name}: inside the profile photo zone`);
    if (zone.kind === "safe" && (r.left < zone.x0 || r.top < zone.y0 || r.right > zone.x1 || r.bottom > zone.y1)) problems.push(`${name}: outside the safe area`);
  }
  const brand = rect(document.querySelector("[data-box=brand]"));
  const pill = rect(document.querySelector("[data-box=pill]"));
  const tagline = rect(document.querySelector("[data-box=tagline]"));
  if (hits(brand, pill)) problems.push("overlap: brand / pill");
  if (hits(brand, tagline) || hits(pill, tagline)) problems.push("overlap: tagline / header row");
  const measured = Object.fromEntries(boxes.map((el) => {
    const r = rect(el);
    return [el.dataset.box ?? `card-${el.dataset.card}`, [r.left, r.top, r.right, r.bottom].map(Math.round).join(",")];
  }));
  return { problems, measured, font: document.fonts.check('800 40px "Geist"') };
}

const browser = await chromium.launch(CHROME && existsSync(CHROME) ? { executablePath: CHROME } : {});
let failed = false;
for (const b of banners) {
  writeFileSync(`${OUT}/${b.file}.html`, html(b));
  const page = await browser.newPage({ viewport: { width: b.w, height: b.h }, deviceScaleFactor: 1 });
  await page.setContent(html(b), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const { problems, measured, font } = await page.evaluate(inspect, { zone: b.zone, w: b.w, h: b.h });
  await page.screenshot({ path: `${OUT}/${b.file}.png` });
  // Review copy with the restricted zone outlined in red.
  await page.evaluate((z) => {
    const d = document.createElement("div");
    d.style.cssText = `position:absolute;left:${z.x0}px;top:${z.y0}px;width:${z.x1 - z.x0}px;height:${z.y1 - z.y0}px;border:3px solid #ff2d2d;background:${z.kind === "keepout" ? "rgba(255,45,45,.18)" : "transparent"};z-index:10`;
    document.body.appendChild(d);
  }, b.zone);
  await page.screenshot({ path: `${OUT}/${b.file}-review.png` });
  const png = readFileSync(`${OUT}/${b.file}.png`);
  console.log(`${b.file}.png ${png.readUInt32BE(16)}x${png.readUInt32BE(20)} ${(statSync(`${OUT}/${b.file}.png`).size / 1024).toFixed(0)} KB, Geist loaded: ${font}`);
  console.log("  boxes", JSON.stringify(measured));
  console.log(problems.length ? `  PROBLEMS: ${problems.join("; ")}` : "  layout checks: OK");
  if (problems.length || !font) failed = true;
  await page.close();
}
await browser.close();
process.exitCode = failed ? 1 : 0;
