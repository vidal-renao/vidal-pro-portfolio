# Vidal Reñao — Professional Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Supabase](https://img.shields.io/badge/Supabase-Labs-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![Zod](https://img.shields.io/badge/Zod-4-3E67B1)](https://zod.dev)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-SMTP-22C55E)](https://nodemailer.com)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel)](https://vidal-pro-portfolio.vercel.app)
[![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20DE%20%7C%20ES-4F46E5)](https://next-intl-docs.vercel.app)
[![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8)](https://developer.chrome.com/docs/workbox/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-F97316)](https://developers.google.com/web/tools/lighthouse)
[![Swiss DSG](https://img.shields.io/badge/Swiss%20DSG-Compliant-10B981)](https://www.fedlex.admin.ch/eli/cc/2022/491/de)

**Live:** [vidal-pro-portfolio.vercel.app](https://vidal-pro-portfolio.vercel.app)

Production portfolio and SaaS-facing presentation for IT Infrastructure and AI Solutions services in Switzerland and the DACH market. Built to Lighthouse 100/100 standards with full i18n support across EN, DE and ES. PWA-installable, SEO-indexed, Swiss DSG compliant.

---

## Architecture

```text
app/
├── [locale]/                   ← next-intl localized routes (EN / DE / ES)
│   ├── labs/
│   │   ├── community-fund/     ← CivicFund Web3 Lab (wagmi · viem · Sepolia)
│   │   └── tempo-tutor/        ← TempoTutor Marketplace Lab (Stripe · Supabase Auth)
│   ├── print/                  ← Print-optimized CV view (@media print)
│   ├── layout.tsx              ← Locale shell: fonts · i18n provider · JSON-LD schemas
│   └── page.tsx                ← Main portfolio page (all sections assembled)
├── api/
│   ├── contact/route.ts        ← Zod validation · honeypot (inline style) · IP rate limit (3/hr) · Nodemailer SMTP
│   ├── download/route.ts       ← CV asset delivery: format=pdf|word · Content-Disposition · security headers
│   └── webhooks/stripe/        ← Stripe idempotent webhook (TempoTutor lab)
├── components/sw-register.tsx  ← PWA service worker registration
├── globals.css                 ← Tailwind v4 @theme inline · glass-card · animate-shine · @keyframes
├── layout.tsx                  ← Root layout (delegates to locale shell)
├── robots.ts                   ← robots.txt generation
└── sitemap.ts                  ← XML sitemap (3 locales × all routes)

components/
├── NavBar.tsx                  ← Sticky nav · locale switcher · mobile drawer
├── marketing/
│   └── Logo.jsx                ← SVG inline wordmark
├── sections/                   ← One component per portfolio section (no business logic)
│   ├── Hero.tsx                ← Photo · availability badge · stats · dual CTA
│   ├── Services.tsx            ← Cloud · Custom Apps · Hybrid Networking
│   ├── Certifications.tsx      ← CCNA · AI Dev · E-commerce (Credly links)
│   ├── TechStack.tsx           ← Skill bars · SVG Radar chart
│   ├── Experience.tsx          ← Timeline (2010 → present)
│   ├── Projects.tsx            ← Star project (Aura AI) + 8-card grid
│   ├── Testimonials.tsx        ← Client reviews (D'Namar GmbH · Basel)
│   └── Contact.tsx             ← Corporate card · form · CV selector · DownloadCenter
└── ui/
    ├── BrandLogo.tsx           ← VR+ monogram SVG · group-hover:animate-shine
    ├── DownloadCenter.tsx      ← RSC download widget: PDF · Word · print view
    ├── DownloadCVButton.tsx    ← Hero inline download CTA
    └── PrintTrigger.tsx        ← window.print() client button

messages/
├── en.json                     ← English content (all sections)
├── de.json                     ← German content
└── es.json                     ← Spanish content

public/
├── assets/
│   ├── Vidal_Renao_CV_EN.pdf   ← CV for download (PDF)
│   └── certs/                  ← CCNA · AI Dev · Diplom credential files
├── screenshots/                ← Proof-of-concept production screenshots (4 images)
├── icons/                      ← PWA icon set (72 · 96 · 128 · 144 · 152 · 180 · 192 · 384 · 512 px)
└── manifest.json               ← PWA manifest (name · icons · display: standalone)

i18n/
├── routing.ts                  ← Locale list · default locale
├── request.ts                  ← next-intl server config
└── navigation.ts               ← Typed locale-aware Link / useRouter exports
```

---

## Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Framework | Next.js 16 · App Router · RSC | SSG per locale, Edge-compatible API routes |
| Language | TypeScript 5 · strict mode | End-to-end type safety |
| Styling | Tailwind CSS v4 · `@theme inline` | Utility-first, CSS-native design tokens |
| Animation | Framer Motion 12 | Scroll-triggered reveals, `whileHover` micro-interactions |
| i18n | next-intl 4 | Static params SSG · `useTranslations` RSC-compatible |
| Email | Nodemailer · SMTP (env-configured) | Independent transactional email, no third-party dependency |
| Validation | Zod 4 · server-side only | Schema validation at API boundaries |
| Database | Supabase · PostgreSQL · RLS | Labs only (TempoTutor, CivicFund) |
| Payments | Stripe Checkout · Connect | TempoTutor lab — test mode |
| Web3 | wagmi · viem · Sepolia | CivicFund lab — wallet connect + EVM signing |
| Testing | Playwright | E2E coverage: marketplace selection and booking path |
| Hosting | Vercel · Edge Functions | CI/CD from `main` branch · Edge-compatible routes |
| PWA | @ducanh2912/next-pwa | Service worker, install prompt, offline shell |

---

## API Routes

| Route | Method | Rate Limit | Purpose |
| --- | --- | --- | --- |
| `/api/download?format=pdf` | `GET` | — | Serves `public/assets/Vidal_Renao_CV_EN.pdf` · `Content-Disposition: attachment` · 1-hour cache |
| `/api/download?format=word` | `GET` | — | Serves `public/assets/Vidal_Renao_CV_EN.docx` · `Content-Disposition: attachment` |
| `/api/contact` | `POST` | 3 req/hr per IP | Zod-validated · honeypot field (inline style) · in-memory IP rate limiting · Nodemailer SMTP |

---

## Lighthouse Performance

All scores measured on production at `https://vidal-pro-portfolio.vercel.app/en`.

| Metric | Score |
| --- | --- |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

**Key optimizations:**

- Geist font loaded via `next/font/google` with `display: swap` — zero layout shift
- Images served via `next/image` with explicit `sizes` and `priority` on above-fold hero photo
- No third-party scripts — zero render-blocking resources, no analytics pixel
- Critical CSS inlined via Tailwind v4 `@theme inline` compile-time tokens
- PWA service worker caches static assets for instant repeat visits
- `generateStaticParams` pre-renders all 3 locale routes at build time

---

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `SMTP_HOST` | Core | SMTP server hostname (`mail.novatrend.ch` for Swiss DSG-compliant hosting) |
| `SMTP_PORT` | Core | `465` for implicit SSL/TLS · `587` for STARTTLS |
| `SMTP_USER` | Core | SMTP authentication username |
| `SMTP_PASS` | Core | SMTP authentication password |
| `CONTACT_TO` | Core | Recipient address for contact form submissions |
| `NEXT_PUBLIC_SUPABASE_URL` | Lab only | Supabase project URL (TempoTutor lab) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Lab only | Supabase anon key (TempoTutor lab) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Lab only | Stripe publishable key (TempoTutor lab) |
| `STRIPE_SECRET_KEY` | Lab only | Stripe secret key — server-side only, never exposed to client |
| `STRIPE_WEBHOOK_SECRET` | Lab only | Stripe webhook signature secret for event verification |

> The portfolio runs fully without lab variables. Missing SMTP vars degrade gracefully — the contact form returns 503 and logs the attempt server-side.

---

## Swiss DSG / nDSG Compliance Matrix

| Requirement | Implementation | Status |
| --- | --- | --- |
| **Data minimization** | Contact form collects name · email · subject · message only — no device fingerprinting | ✅ |
| **No third-party trackers** | Zero analytics scripts, no external pixel, no CDN-hosted web fonts | ✅ |
| **Independent email infrastructure** | Nodemailer/SMTP on Swiss-hosted NOVATREND — no Resend, SendGrid, or Postmark | ✅ |
| **Immutable audit trail** | INSERT-only schema pattern in Supabase lab tables — no UPDATE/DELETE permitted | ✅ |
| **Structured data hygiene** | JSON-LD `ProfilePage` + `LocalBusiness` — no sensitive PII in HTML markup | ✅ |
| **Rate limiting** | IP-based 3 req/hr on `/api/contact` — no CAPTCHA friction for legitimate users | ✅ |
| **Honeypot anti-spam** | Hidden field via inline `style` object (not CSS class) — transparent discard on fill | ✅ |
| **Security response headers** | `X-Content-Type-Options: nosniff` · `X-Frame-Options: DENY` · `Referrer-Policy: strict-origin-when-cross-origin` on all API responses | ✅ |
| **Swiss data residency** | SMTP transport on NOVATREND Swiss infrastructure — contact data never leaves CH | ✅ |
| **No persistent PII storage** | Contact submissions forwarded to inbox only — no database write for form data | ✅ |

---

## SEO & Structured Data

Two JSON-LD graphs injected in `<head>` per locale via `app/[locale]/layout.tsx`:

```json
[
  {
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Vidal Reñao",
      "jobTitle": "IT Infrastructure & AI Solutions Engineer",
      "address": { "addressLocality": "Basel", "addressCountry": "CH" }
    }
  },
  {
    "@type": "LocalBusiness",
    "name": "Vidal Reñao — IT & AI Consulting",
    "areaServed": ["CH", "LI"],
    "address": { "addressLocality": "Basel", "addressRegion": "Basel-Stadt" }
  }
]
```

OpenGraph and Twitter Card metadata generated server-side per locale:

- `en_US` → English portfolio
- `de_CH` → German portfolio (Swiss German market targeting)
- `es_ES` → Spanish portfolio

Sitemap at `/sitemap.xml` covers all 3 locale routes. `robots.ts` allows all crawlers.

---

## Routes

| Route | Description |
| --- | --- |
| `/en` | English portfolio |
| `/de` | German portfolio |
| `/es` | Spanish portfolio |
| `/en/labs/community-fund` | CivicFund Web3 Lab (wagmi · viem · Sepolia) |
| `/en/labs/tempo-tutor` | TempoTutor Marketplace Lab (Stripe · Supabase Auth) |
| `/en/print` | Print-optimized CV view |
| `/api/download?format=pdf` | CV download — PDF, `Content-Disposition: attachment` |
| `/api/download?format=word` | CV download — Word .docx |
| `/api/contact` | Contact form handler (POST) |

---

## Commands

```bash
npm install          # install dependencies
npm run dev          # development server (localhost:3000)
npm run build        # production build (static pre-render all locales)
npm run start        # production server
npm run lint         # ESLint check
npm run test:e2e     # Playwright E2E tests
```

Production CI/CD via Vercel from the `main` branch. Locale routing handled by `middleware.ts` (next-intl). All locale routes pre-rendered at build time via `generateStaticParams`.
