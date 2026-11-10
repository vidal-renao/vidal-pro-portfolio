# AGENTS.md — VIDAL ECOSYSTEM Portfolio

## Purpose and professional identity
This portfolio represents two **equal, independent professional sectors**:
- **Fullstack AI Engineer:** application engineering, SaaS, AI agents and process automation.
- **Systems Administrator:** Windows Server, Active Directory, Microsoft 365, Entra ID/Intune, virtualization, networks and user support.

Preserve both tracks in navigation, marketing copy, experience and CV variants. Do not describe course completion as professional certification or invent employment results, metrics or technical claims. Market: Swiss / DACH, Basel and Liechtenstein.

## Source of truth
- Requirements, scope and release gates: `docs/portfolio-premium-2026-11.md`.
- Site details / section map: `content/site.ts`.
- Projects and status: `content/projects.ts`; localizations: `messages/{es,en,de}.json`.
- Credentials: `content/credentials.ts`.
- Career profile shared with JobPilot AI: existing `/api/career-profile`, schemaVersion 1. Changes to this contract need explicit approval.
- `README.md` documents commands and architecture.

## Technology actually present
- Next.js 16 App Router; React 19; TypeScript strict.
- Tailwind CSS 4 and `app/globals.css` tokens; self-hosted Geist.
- next-intl ES/EN/DE; server-rendered page sections where practical.
- Playwright E2E in `tests/e2e`.
- Nodemailer contact route with validation and rate limiting.
- Vercel preview per feature branch and production on `main`.

Do not add or assume Framer Motion, PWA, Supabase, Stripe, Web3 or analytics integrations unless actually required by a concrete feature and approved.

## Architecture and user experience
- Home: `app/[locale]/page.tsx`.
- Header/footer: `components/layout/`; logo: `components/ui/BrandMark.tsx`.
- Section components: `components/sections/`; dual track: `Specializations.tsx`.
- Interactive islands: project explorer, mobile navigation, contact and CV download.
- Design: dark navy, restrained cyan-blue-violet branding, readable contrast, generous space, accessible touch targets.
- Avoid extra JS and decorative animation. Respect `prefers-reduced-motion`.
- Ensure links, statuses, dates and evidence are honest; private source code is not linked.

## Engineering workflow
1. Read existing docs and code before changing implementation.
2. Define requirements in EARS and QA them; plan tasks (max 10 per phase).
3. Write or update relevant tests before behavior changes.
4. Work in a feature branch, never push unreviewed changes directly to `main`.
5. Run `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e` and `npm run audit`. Document anything not executed.
6. Test desktop/mobile, ES/DE/EN, keyboards, reduced motion, CV variants and JobPilot schema contract.
7. Provide a reviewable Vercel preview. Do not merge or publish without explicit release approval.

## Security, privacy and maintenance
- Minimum privilege; do not expose secrets or personal documents in builds.
- Validate untrusted input at the boundary (Zod for contact/API as applicable), prevent abusive submissions and keep `rel="noopener noreferrer"` on outbound new tabs.
- Respect Swiss nDSG; do not assert compliance without a specific assessment.
- Update existing documentation when a user-facing route, API, design convention or architecture actually changes.
- Prefer small components, clear semantics and no speculative abstractions.
