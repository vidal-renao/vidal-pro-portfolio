# VIDAL PRO PORTFOLIO — AGENT RULES

## Project Identity
**Vidal Reñao** — Senior Engineer & AI-Powered SaaS Architect
Portfolio: https://vidal-pro-portfolio.vercel.app
Market: Swiss & DACH SMEs · Basel, Switzerland

## Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, RSC) |
| Language | TypeScript 5 strict |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| i18n | next-intl (EN / DE / ES) |
| Database | Supabase (PostgreSQL + RLS) |
| Deployment | Vercel |
| PWA | @ducanh2912/next-pwa |
| Testing | Playwright E2E |
| Email | Nodemailer + Resend |
| Payments | Stripe |
| Web3 | wagmi + viem |

## Execution Rules (Non-Negotiable)
1. **Zero filler** — direct to solution. No "analyzing...", "exploring...", "perfect!".
2. **Clean Architecture**: separation of concerns, single responsibility.
3. **Strict typing**: no `any`, no `as unknown`, interfaces over types for public contracts.
4. **SOLID everywhere**: especially Open/Closed for AI features and Single Responsibility in Server Actions.
5. **Swiss standard docs**: Mermaid (architecture), Shields.io (badges), ADRs (decisions), structured SEO.
6. **Autonomy**: update README when detecting changes in APIs, Schema, or env vars.
7. **Security first**: validate at boundaries (user input, external APIs). No internal code validation.
8. **No over-engineering**: 0 speculative abstractions. Only the complexity the task requires.

## UI/UX Standards
- **Dark mode native**: background `#060606`, glassmorphism with `rgba(255,255,255,0.04)`
- **Grid system**: max-w-6xl, px-6, gap-5/gap-6
- **Animations**: Framer Motion `initial/animate/transition` — `once: true` on scroll triggers
- **Typography**: Geist Sans variable, tracking-tight on headings, text-white/50 for muted

## Section Map (NavBar → Page)
| NavBar Link | Section Component | ID |
|---|---|---|
| Services | Services.tsx | #services |
| Certifications | Certifications.tsx | #certifications |
| Stack | TechStack.tsx | #stack |
| Experience | Experience.tsx | #experience |
| Projects | Projects.tsx | #projects |
| Brand | /brand route | /brand |
| Contact | Contact.tsx | #contact |

## Sections Removed (Optimized)
- ~~EcosystemSection.tsx~~ — removed (redundant with Projects section)
- ~~ProofOfConcept.tsx~~ — removed (redundant with Projects section)

## Sections NOT in NavBar (hidden from nav)
- Hero.tsx — always first, no nav link needed
- Testimonials.tsx — accessible via Contact section

## Project Links (audited 2026-09-23 — see docs/portfolio-audit-2026-09.md)

Card order in `projects.items` is the audit ranking; `projectStatic` in
Projects.tsx must stay index-aligned with it (each entry carries its `slug`).

| # | Project | Demo (anonymous visitor) | Repo | Evidence |
|---|---|---|---|---|
| ★ | HelpDesk AI + OmniCommand | https://ticket-system-sigma-pink.vercel.app ✅ | ticket-system (public) | 204 commits · 38 test files · CI · own Supabase (89 tables) |
| 1 | D'NAMAR | https://www.dnamar.ch ✅ | limpiezas-najip-maritza (public) | real client, own domain · 69 commits |
| 2 | Invoice Auto | /es/demo/payments ✅ | invoice-auto (public) | 132 tests · pain.001 XSD-validated |
| 3 | SolarPilot | https://solarpilot-psi.vercel.app ✅ | solarpilot (public) | 137 tests · 0 WCAG AA violations |
| 4 | NATURÆ Cosmetics | https://naturae-cosmetics.vercel.app ✅ | **private** → no code link rendered | 49 commits · live PWA |
| 5 | WAAI SaaS | https://waai-saas.vercel.app ✅ (staging) | waai-saas (public) | 612 files · CI · waai_* tables with traffic |
| 6 | Parcel Tracker | https://cv-platform-theta.vercel.app ✅ | cv-platform (public) | 62 commits · CI · 9 test files |
| 7 | Ticket Auditor | none — it is a service, /health is not a demo | vidal-helpdesk-mcp (public) | 50 commits · 20 test files · CI |
| 8 | Aura AI | https://aura-ai-smoky.vercel.app ✅ | aura-ai (public) | polished demo, thin repo: 5 commits, 1 test file |
| 9 | MatchPoint AI | https://matchpoint-ai.vercel.app ✅ | matchpoint-ai (public) | 15 commits · no tests · untouched since 2026-04 |

Not on the portfolio but live and public (candidates, all private repos):
StayPilot, OpsPilot, Omnisciencia, Lumen Invoice, JobPilot Pharma.

## Compliance (Swiss DSG/nDSG)
- RLS mandatory on all Supabase tables with user data
- Immutable audit logs for critical operations (INSERT-only)
- PIIDetection before persisting sensitive data
- Retention defined per project — document in ADR
- No data transfer outside Swiss jurisdiction without explicit consent

## Git Workflow
- Pre-commit hook runs documentation sync
- `docs/update-script-registry.ps1` regenerates script docs
- `git config core.hooksPath .githooks` binds automation

## Code Quality Standards
- **ESLint**: Use next/core-web-vitals + typescript configs
- **Prettier**: Format code on save
- **Husky**: Pre-commit hooks for linting
- **Commitlint**: Conventional commits enforcement

## Security Standards
- **Input Validation**: Zod schemas at all API boundaries
- **Rate Limiting**: IP-based rate limiting on all POST endpoints
- **CSRF Protection**: SameSite cookies, CSRF tokens where applicable
- **XSS Prevention**: React auto-escaping, sanitize user inputs
- **Secrets Management**: Environment variables only, never hardcoded
- **Dependencies**: Regular audit with `npm audit`

## Performance Standards
- **Lighthouse Score**: Maintain 100/100 on all metrics
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: Monitor with `next build` output
- **Image Optimization**: Use next/image with proper sizing
- **Font Optimization**: Use next/font with display: swap

## Testing Standards
- **E2E Coverage**: Critical user journeys with Playwright
- **Unit Tests**: Optional but recommended for complex logic
- **Integration Tests**: API route testing
- **Visual Regression**: Screenshot comparisons for UI components

## Documentation Standards
- **README.md**: Always up-to-date with latest changes
- **ARCHITECTURE.md**: Mermaid diagrams for complex flows
- **ADR.md**: Architecture Decision Records for significant choices
- **API Documentation**: OpenAPI/Swagger for public APIs
- **Component Storybook**: Visual documentation for UI components

## Deployment Standards
- **CI/CD**: GitHub Actions with automated testing
- **Preview Deployments**: PR previews for all changes
- **Production Deployment**: Manual approval required
- **Rollback Strategy**: Vercel instant rollback capability
- **Monitoring**: Vercel Analytics + Speed Insights

## Environment Variables
See `.env.example` for complete list of required and optional variables.

## Commands
```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run typecheck    # TypeScript type checking
npm run test:e2e     # Playwright E2E tests
npm run format       # Prettier formatting
npm run audit        # Security audit
```
