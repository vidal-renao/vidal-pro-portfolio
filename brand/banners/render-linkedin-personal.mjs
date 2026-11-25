// Premium version of Vidal's personal LinkedIn banner (1584x396 layout, exported at 2x), same copy and left-aligned structure.
// Run from the repo root: node brand/banners/render-linkedin-personal.mjs
import { chromium } from "@playwright/test";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";

const OUT = "brand/banners/linkedin-personal-1584x396";
const CHROME = process.env.PW_CHROMIUM_PATH;
const FONT = readFileSync("node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2").toString("base64");
const MONO = 'ui-monospace,"Cascadia Mono",Consolas,monospace';
const X = 470;

const MARK = `<svg width="159" height="125" viewBox="0 0 112 88" aria-hidden="true"><defs><linearGradient id="m" x1="0" y1="0" x2="1" y2="0.9">
<stop offset="0%" stop-color="#17F5E7"/><stop offset="48%" stop-color="#159EFF"/><stop offset="100%" stop-color="#BB58EE"/></linearGradient></defs>
<g fill="url(#m)"><path d="M3 7h21l28 47L82 7h23L52 85z"/><path d="M75 7h35L99 24H65z"/><path d="M62 35h38L89 52H52z"/><path d="M50 63h47L85 80H39z"/></g></svg>`;

const chip = (kind, label, i) => `<span class="chip ${kind}" data-text="chip-${i}">${label}</span>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Vidal Reñao Lopelo · LinkedIn</title><style>
@font-face{font-family:"Geist";src:url(data:font/woff2;base64,${FONT}) format("woff2");font-weight:100 900}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1584px;height:396px;overflow:hidden}
body{position:relative;font-family:"Geist",sans-serif;color:#F5F8FD;background:linear-gradient(180deg,#0E1A31,#0A1222);-webkit-font-smoothing:antialiased}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(160,196,236,.085) 1px,transparent 1px),linear-gradient(90deg,rgba(160,196,236,.085) 1px,transparent 1px);background-size:48px 48px;-webkit-mask-image:linear-gradient(100deg,transparent 12%,#000 55%,#000)}
.halo{position:absolute;border-radius:50%;filter:blur(100px)}
.abs{position:absolute;left:${X}px;white-space:nowrap}
.name{top:34px;font-size:17px;line-height:24px;font-weight:700;letter-spacing:.34em;color:#F5F8FD}
.rule{position:absolute;left:${X}px;top:68px;width:72px;height:4px;border-radius:4px;background:linear-gradient(90deg,#22D3EE,#818CF8,#A78BFA)}
h1{top:86px;font-size:58px;line-height:66px;font-weight:800;letter-spacing:-.03em}
h1 span{display:block;width:max-content}
.grad{background:linear-gradient(100deg,#B7C0FF,#A78BFA 40%,#8BE9F5);-webkit-background-clip:text;background-clip:text;color:transparent}
.role{top:236px;font-size:25px;line-height:32px;font-weight:700}
.role .a{color:#8BE9F5}.role .b{color:#B7C0FF}.role .amp{color:#9CACC5;padding:0 6px}
.stack{top:300px;display:flex;align-items:center;gap:10px}
.chip{display:inline-block;padding:6px 14px;border-radius:999px;font:700 17px/22px ${MONO};border:1px solid}
.sys{color:#C9F6FC;border-color:rgba(103,232,249,.65);background:linear-gradient(180deg,rgba(255,255,255,.14),rgba(34,211,238,.1));box-shadow:inset 0 1px 0 rgba(255,255,255,.28)}
.sw{color:#DDE2FF;border-color:rgba(165,180,252,.65);background:linear-gradient(180deg,rgba(255,255,255,.14),rgba(129,140,248,.13));box-shadow:inset 0 1px 0 rgba(255,255,255,.28)}
.link{width:36px;height:36px;border-radius:50%;border:2px solid transparent;background:linear-gradient(#101A2B,#101A2B) padding-box,linear-gradient(90deg,#22D3EE,#818CF8) border-box;box-shadow:-5px 0 18px -5px rgba(34,211,238,.7),5px 0 18px -5px rgba(129,140,248,.75);display:flex;align-items:center;justify-content:center}
.card{position:absolute;right:64px;top:34px;width:300px;height:234px;border-radius:24px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;border:1px solid rgba(255,255,255,.34);background:linear-gradient(150deg,rgba(255,255,255,.17),rgba(255,255,255,.05) 45%,rgba(255,255,255,.02) 70%,rgba(255,255,255,.08));box-shadow:0 1px 0 rgba(255,255,255,.35) inset,0 30px 70px -24px rgba(79,70,229,.6),0 0 60px -24px rgba(34,211,238,.45)}
.card i{position:absolute;left:0;right:0;top:0;height:4px;background:linear-gradient(90deg,#22D3EE,#818CF8 55%,#A78BFA)}
.card svg{filter:drop-shadow(0 0 16px rgba(36,178,255,.35))}
.vidal{font-size:23px;line-height:26px;font-weight:700;letter-spacing:.16em;text-align:center;padding-left:.16em}
.eco{font-size:13px;line-height:18px;font-weight:700;letter-spacing:.3em;color:#C5D8F0;text-align:center;padding-left:.34em}
.pill{position:absolute;right:64px;top:348px;display:flex;align-items:center;gap:10px;padding:6px 18px;border-radius:999px;border:1px solid rgba(103,232,249,.6);background:linear-gradient(180deg,rgba(255,255,255,.13),rgba(34,211,238,.1));font:700 16px/20px ${MONO};letter-spacing:.08em;white-space:nowrap}
.pill b{width:8px;height:8px;border-radius:50%;background:#34D399;box-shadow:0 0 12px rgba(52,211,153,.8)}
</style></head><body>
<div class="halo" style="left:1100px;top:-250px;width:620px;height:560px;background:rgba(129,140,248,.28)"></div>
<div class="halo" style="left:300px;top:190px;width:520px;height:420px;background:rgba(34,211,238,.11)"></div>
<div class="halo" style="left:-220px;top:-220px;width:480px;height:420px;background:rgba(51,114,165,.16)"></div>
<div class="grid"></div>
<div class="abs name" data-box="name" data-text="name">VIDAL REÑAO LOPELO</div>
<div class="rule"></div>
<h1 class="abs" data-box="headline"><span data-text="line-1">Reliable IT today.</span><span class="grad" data-text="line-2">AI-ready tomorrow.</span></h1>
<div class="abs role" data-box="role" data-text="role"><span class="a">IT Systems Administrator</span><span class="amp">&amp;</span><span class="b">Full-Stack Developer</span></div>
<div class="abs stack" data-box="stack">${["Microsoft 365", "Entra ID", "Azure"].map((l, i) => chip("sys", l, i)).join("")}
<span class="link" data-box="connector"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#F5F8FD" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4 4 8l4 4M4 8h16M16 12l4 4-4 4M20 16H4"/></svg></span>
${["Next.js", "AI Automation", "Web Apps for SMEs"].map((l, i) => chip("sw", l, i + 3)).join("")}</div>
<div class="card" data-box="brand"><i></i>${MARK}<div><div class="vidal" data-text="vidal">VIDAL</div><div class="eco" data-text="ecosystem">ECOSYSTEM</div></div></div>
<div class="pill" data-box="pill"><b></b><span data-text="location">SWITZERLAND &amp; LIECHTENSTEIN</span></div>
</body></html>`;

const browser = await chromium.launch(CHROME && existsSync(CHROME) ? { executablePath: CHROME } : {});
const page = await browser.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
const problems = await page.evaluate(() => {
  const found = [];
  const rect = (el) => el.getBoundingClientRect();
  const hits = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
  const check = (list, name) => {
    for (let i = 0; i < list.length; i++)
      for (let j = i + 1; j < list.length; j++)
        if (hits(rect(list[i]), rect(list[j]))) found.push(`overlap: ${list[i].dataset[name]} / ${list[j].dataset[name]}`);
  };
  const texts = [...document.querySelectorAll("[data-text]")];
  const boxes = [...document.querySelectorAll("[data-box]:not([data-box=connector])")];
  check(texts, "text");
  check(boxes, "box");
  for (const el of texts) {
    const s = getComputedStyle(el);
    const content = rect(el).height - parseFloat(s.paddingTop) - parseFloat(s.paddingBottom) - parseFloat(s.borderTopWidth) - parseFloat(s.borderBottomWidth);
    if (content > parseFloat(s.lineHeight) * 1.6) found.push(`${el.dataset.text}: wraps`);
  }
  for (const el of [...texts, ...boxes]) {
    const r = rect(el), id = el.dataset.text ?? el.dataset.box;
    if (r.left < 0 || r.top < 0 || r.right > 1584 || r.bottom > 396) found.push(`${id}: outside canvas`);
    if (hits(r, { left: 0, top: 180, right: 420, bottom: 396 })) found.push(`${id}: inside the profile photo zone`);
  }
  if (!document.fonts.check('800 40px "Geist"')) found.push("Geist not loaded");
  return found;
});
writeFileSync(`${OUT}.html`, html);
await page.screenshot({ path: `brand/banners/linkedin-personal-3168x792.png` });
const png = readFileSync("brand/banners/linkedin-personal-3168x792.png");
console.log(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)} ${(statSync("brand/banners/linkedin-personal-3168x792.png").size / 1024).toFixed(0)} KB`);
console.log(problems.length ? `PROBLEMS: ${problems.join("; ")}` : "layout checks: OK");
await browser.close();
process.exitCode = problems.length ? 1 : 0;
