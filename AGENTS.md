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

## Project Links (Verified 2026-07-05)
| Project | Demo URL | Status |
|---|---|---|
| Aura AI | https://aura-ai-smoky.vercel.app | ✅ |
| D'NAMAR | https://www.dnamar.ch | ✅ |
| WAAI SaaS | https://waai-saas.vercel.app | ✅ |
| Ticket System | https://ticket-system-sigma-pink.vercel.app | ✅ |
| HelpDesk MCP | https://vidal-helpdesk-mcp.vercel.app | ✅ |
| CV Platform | https://cv-platform-theta.vercel.app | ✅ |
| MatchPoint AI | https://matchpoint-gq5tnfo93-vidal-renaos-projects.vercel.app | ❌ Vercel login |
| Invoice Auto | https://invoice-auto-3xjvcf07t-vidal-renaos-projects.vercel.app | ❌ Vercel login |

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
