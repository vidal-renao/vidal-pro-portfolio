# Portfolio audit — 13 October 2026 (v2)

Follow-up to [`portfolio-audit-2026-09.md`](portfolio-audit-2026-09.md). Rule for v2: a
project, certificate or claim appears only if a visitor can open it and check it.

## Projects shown

| Project | Status shown | Public URL | Code link |
|---|---|---|---|
| HelpDesk AI | production · featured | ticket-system-sigma-pink.vercel.app | public repo |
| JobPilot AI | production · featured | jobpilot-ai-lake.vercel.app/install | private (no link rendered) |
| Invoice Auto | demo | public demo | public repo |
| WAAI SaaS | staging | staging URL | public repo |
| Aura AI | demo | live | public repo |
| SolarPilot | demo | live | public repo |
| D'NAMAR | production | dnamar.ch | public repo |
| NATURÆ | production | live | private (no link rendered) |

Statuses were corrected to what the URL actually is (demo / staging / production),
instead of labelling everything as production.

## Not shown — to be fixed later

| Project | URL | Why it is out |
|---|---|---|
| Parcel Tracker (cv-platform) | https://cv-platform-theta.vercel.app | Raw i18n keys visible in the UI, invented statistics, placeholder phone number, canonical pointing to another domain |
| MatchPoint AI | https://matchpoint-ai.vercel.app | Job listings 199 days old; metrics on the page cannot be verified |
| Ticket Auditor (helpdesk-mcp) | — | JSON endpoint only, no interface a visitor can use |
| Labs (CivicFund, TempoTutor) | /labs/* (now redirect to #contact) | Experiments, not products; Stripe/Web3 code without production use |

Once fixed, each can come back by adding one entry to `content/projects.ts` plus its texts.

## Certificates — Drive vs. portfolio

| Certificate | In Drive | On portfolio before | Now |
|---|:--:|:--:|---|
| Iniciación al Desarrollo con IA (BIG School · MoureDev) | ✅ | ✅ | PDF linked |
| Iniciación al Marketing Digital con IA (BIG School · BIGSEO) | ✅ | ✅ | PDF linked |
| **Iniciación a la IA: El Nuevo ChatGPT (BIG School · Jon Hernández)** | ✅ | ❌ | **Added**; PDF "on request" (Drive file 9 MB, not copied) |
| Programación de Agentes IA (BIG School · MoureDev) | ✅ | ✅ | PDF linked |
| IA: De Cero a Agentes (BIG School) | ✅ | ✅ | PDF linked |
| IA: De Cero a Producción (BIG School) | ✅ | ✅ | PDF linked |
| CCNA training (Cisco Networking Academy) | — | ✅ | PDF linked |
| ASIR (FP Grado Superior) | — | ❌ | Added from CV data; PDF "on request" |
| DAI (IES Pablo Serrano) | — | ✅ | PDF linked |

Every linked PDF is checked by the e2e suite (HTTP 200).

## Removed

- `/consultation` form and `/api/leads` (service-role Supabase endpoint) → 308 to `#contact`.
- `/brand` kit (card/flyer print pages) and `/labs/*` with their Stripe/Web3 APIs → 308 to `#contact`.
- PWA (manifest, offline worker). `public/sw.js` is now a kill-switch that clears old caches
  and unregisters itself for returning visitors.
- Docker files, theme/brightness toggles, network-mesh canvas, skill bars/radar (unverifiable
  percentages), trust badges without evidence, Framer Motion and wagmi/viem dependencies.

## Kept as provided

- Testimonials (D'Namar): client statements, not independently verifiable.
- CV data (`cv`, `cvSystems`, `experience` in `messages/*.json`) untouched — it feeds
  `/api/career-profile` for JobPilot. The freelance entry still names MatchPoint AI and
  "Ticket System"; to be revised together with the CV.

## Performance (Lighthouse mobile, production build, `/es`)

| Metric | Before | After |
|---|---:|---:|
| Performance | 53 | 92–93 |
| Accessibility | — | 100 |
| Best practices | — | 100 |
| SEO | — | 92 (local only: canonical points to the production domain) |
| LCP | 4.1 s | 2.7–2.8 s |
| TBT | 3.2 s | 0.2 s |
| CLS | — | 0 |
| Transfer size | 457 KB | 306 KB |

Main route is static (SSG per locale). `/api/career-profile` response hash unchanged.
