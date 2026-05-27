# Vidal Renao | Professional Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)
![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20DE%20%7C%20ES-blue)

**Live:** [vidal-pro-portfolio.vercel.app](https://vidal-pro-portfolio.vercel.app)

Online profile and SaaS-facing presentation for IT Infrastructure and AI
Solutions services in Switzerland and the DACH market.

## Scope

This repository owns only the production web experience:

| Area | Purpose |
| --- | --- |
| `app/[locale]/` | Localized portfolio routes in EN, DE and ES |
| `components/sections/` | Online profile, services, projects and contact content |
| `messages/` | Translation content |
| `public/assets/` | Public web assets and downloadable credentials |
| `app/[locale]/labs/tempo-tutor/` | Marketplace product lab with Stripe/Supabase integration |

Physical marketing production, cards, flyers and tailored CV working files are
maintained independently in the sibling `cv-workspace` repository.

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 with App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Internationalization | next-intl |
| Hosting | Vercel |

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run test:e2e
npm run start
```

## Routes

| Route | Description |
| --- | --- |
| `/en` | English online portfolio |
| `/de` | German online portfolio |
| `/es` | Spanish online portfolio |

## Deployment

Production delivery is managed through Vercel from the web application source:

```text
https://vidal-pro-portfolio.vercel.app
```
