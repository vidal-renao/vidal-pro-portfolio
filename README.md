# Vidal Reñao — Professional Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel) ![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen) ![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20DE%20%7C%20ES-blue) ![License](https://img.shields.io/badge/License-Private-red)

**Live:** [vidal-pro-portfolio.vercel.app](https://vidal-pro-portfolio.vercel.app)

IT Infrastructure & AI Solutions Engineer — Basel, Switzerland. Production portfolio showcasing enterprise IT, AI-powered SaaS infrastructure, and full-stack delivery for Swiss & DACH SMEs.

---

## Architecture

```
app/
├── [locale]/               ← next-intl routing (EN / DE / ES)
│   ├── layout.tsx          ← locale-aware HTML shell + providers
│   ├── page.tsx            ← main portfolio page (all sections)
│   └── print/
│       └── page.tsx        ← printable CV / PDF-ready resume
├── export/                 ← headless export routes (noindex)
│   ├── layout.tsx          ← minimal HTML shell for Puppeteer capture
│   ├── ad-banner/
│   │   └── page.tsx        ← renders OptimizedAdBanner at 1200×900
│   ├── business-card-a/
│   │   └── page.tsx        ← renders BusinessCard Face A (contact)
│   └── business-card-b/
│       └── page.tsx        ← renders BusinessCard Face B (QR)
└── layout.tsx              ← root layout (delegates to locale shell)

components/
├── NavBar.tsx              ← sticky navigation with locale switcher
├── sections/               ← page sections (no business logic)
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Stack.tsx
│   ├── Certifications.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Testimonials.tsx
│   └── Contact.tsx         ← QR code, CV selector, social links
├── marketing/              ← standalone marketing assets
│   ├── OptimizedAdBanner.jsx  ← Livo.li print ad (1200×900, DE)
│   └── BusinessCard.jsx       ← European business card (85×55mm, 2 faces, print-ready)
└── ui/                     ← primitives (PrintTrigger, etc.)

messages/
├── en.json                 ← English copy
├── de.json                 ← German copy
└── es.json                 ← Spanish copy

public/
├── assets/
│   ├── certs/              ← downloadable credentials (CCNA, AI, Diplom)
│   └── ads/                ← Puppeteer-exported ad PNGs (gitignored)
└── icons/                  ← PWA icons (192, 512, 180px)

scripts/
├── export-ad-banner.mjs    ← Puppeteer screenshot → ads/livo-banner.png
└── export-business-card.mjs ← Puppeteer screenshot → ads/cara_A.png + cara_B.png
```

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, RSC) |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| i18n | next-intl (EN / DE / ES) |
| QR Code | qrcode.react (client-side SVG, no CDN) |
| Export | puppeteer-core + system Chrome/Edge |
| Deployment | Vercel |

---

## Marketing Infrastructure

### OptimizedAdBanner

Purpose-built React component for print ad exports targeting Livo.li (Liechtenstein regional directory) and equivalent SME media channels.

| Property | Value |
|---|---|
| Target | Livo.li print format |
| Language | German (DE) |
| Dimensions | 1200 × 900 CSS px |
| Output PNG | 2400 × 1800 physical px (2× retina) |
| QR target | vidal-pro-portfolio.vercel.app |
| Config | Single `CONFIG` object — edit for future publications |

**Export pipeline:**

```
npm run dev          ← dev server must be running on :3000
npm run export:ad    ← Puppeteer → public/assets/ads/livo-banner.png
```

The script auto-detects Chrome or Edge on Windows. Override with:
```bash
BROWSER_PATH="C:\path\to\chrome.exe" npm run export:ad
```

---

### BusinessCard

Two-sided European business card component for physical print distribution at DACH events and SME prospecting.

| Property | Value |
|---|---|
| Format | European business card (85×55mm) |
| Faces | A: Executive contact · B: QR connector |
| Language | German (DACH market) |
| Dimensions | 502×325 CSS px |
| Output PNG | 1004×650 physical px (2× / ~300 DPI print) |
| QR target | vidal-pro-portfolio.vercel.app |
| Config | Single `CONFIG` object in `BusinessCard.jsx` |

**Face A — Executive contact:** VR gradient monogram · name · role · contact details (T / E / W)  
**Face B — QR connector:** centered QR code · "Scannen für Live-Projekte & Referenzen" · cyan URL

**Export pipeline:**

```
npm run dev           ← dev server must be running on :3000
npm run export:card   ← Puppeteer → cara_A.png + cara_B.png
```

---

## Commands

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # production server
npm run lint         # ESLint
npm run export:ad    # export Livo.li ad banner as high-res PNG
npm run export:card  # export business card → cara_A.png + cara_B.png (85×55mm / ~300 DPI)
```

---

## Key Pages

| Route | Description |
|---|---|
| `/` → `/en` | Portfolio (redirects to detected locale) |
| `/de`, `/es` | German, Spanish portfolio |
| `/en/print` | Printable CV — IT Infrastructure & AI Solutions Engineer |
| `/export/ad-banner` | Headless export route (Puppeteer target, noindex) |
| `/export/business-card-a` | Business card Face A — executive contact (noindex) |
| `/export/business-card-b` | Business card Face B — QR connector (noindex) |

---

## Certifications (downloadable)

| Credential | Path |
|---|---|
| CCNA — Cisco Networking Academy | `/assets/certs/CCNA-Cisco.pdf` |
| AI Development: 0 to Production | `/assets/certs/Certificado-IA.pdf` |
| Técnico Superior DAI — IES Pablo Serrano 2012 | `/assets/certs/Diplom.pdf` |

---

## Deployment

Continuous deployment via Vercel. Every push to `main` triggers a production build.

```
Production: https://vidal-pro-portfolio.vercel.app
```

Metrics: 100/100 Lighthouse · Trilingual · PWA installable · Google Search Console verified
