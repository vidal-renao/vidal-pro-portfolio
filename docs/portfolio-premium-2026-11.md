# VE-PORTFOLIO-PREMIUM-001 — Design specification & delivery plan

Status: Approved scope (2026-11-08). Implementation branch: `feat/portfolio-premium-dual-career`. Production release: **not yet authorized**.

## Objective and audiences
Present VIDAL ECOSYSTEM as a coherent technical brand while retaining two equal professional pillars:
1. **Fullstack AI Engineer** — SaaS, web engineering, AI agents and automation.
2. **Systems Administrator** — enterprise infrastructure, Microsoft 365, Entra ID, Windows Server, networking and virtualisation.

Audiences: (a) Swiss / DACH SMB decision-makers seeking projects; (b) recruiters evaluating a permanent technology role. Neither career pillar may be represented as a qualification, title or job achievement unless supported by the source material.

## Scope
Visual tokens, restrained SVG identity, responsive header, hero messaging, dual specialization section, project presentation, section hierarchy, contact and footer. Maintain ES/DE/EN support; client-specific and system-specific CV variants; original careers, dates, education and links.

## Exclusions and invariants
No database, authentication, new analytics tracking, external fonts or new paid services. No new claims, invented ROI or credentials. Preserve `/api/career-profile` schema v1 and existing CV download behavior. No merge to `main` or production publish before acceptance. No package upgrades.

## EARS requirements
- **BR-01** The site SHALL display VIDAL ECOSYSTEM identity with a vector monogram, independent of external asset hosts.
- **DUAL-01** When a user visits any supported locale, the homepage SHALL offer two equally prominent cards: Fullstack AI Engineer and Systems Administrator.
- **DUAL-02** When a user activates the AI engineering card, the site SHALL navigate to projects.
- **DUAL-03** When a user activates the systems card, the site SHALL navigate to professional experience.
- **NAV-01** On desktop, the header SHALL expose a direct link to the specializations; on small viewports the menu SHALL expose the same section and remain keyboard accessible.
- **NAV-02** When the viewport is narrow, the layout SHALL not introduce horizontal overflow.
- **I18N-01** The two specializations and their labels SHALL appear in ES, EN, and DE.
- **A11Y-01** When reduced motion is requested, entrance animations SHALL be disabled.
- **CV-01** The user SHALL be able to choose either Fullstack/AI or Systems CV focus without changing the existing PDF/Word interface.
- **REG-01** The career-profile API SHALL preserve schemaVersion 1 and its existing output contract.
- **PROD-01** Only after review and explicit release approval MAY the branch be merged and deployed to production.

## Design system
Background #080E1C; raised panel #101A2B; text #F5F8FD; secondary #B7C5D9; cyan accent #74DEF4; gradient icon cyan/blue/violet. Geist sans, generous spacing, lightweight CSS transitions, restrained gradients. Preserve dark-theme accessibility and touch targets.

## Navigation
Hero -> Specializations -> Projects -> Experience -> Skills -> Credentials -> Services -> Testimonials -> Contact.
Primary business path: Hero > specialization > evidence > contact.
Recruiter path: Hero > systems or fullstack focus > experience / projects > credentials > targeted CV.

## Architecture
Maintain App Router server-side sections and typed content modules; use one server-rendered `Specializations` component and existing next-intl dictionaries. Do not modify API schemas. CSS custom properties remain the single source for visual tokens. Browser JS remains limited to existing islands.

## Phases / tasks (max 10 per phase)
1. Specification and QA: inspect source of truth, define boundaries, add E2E acceptance tests.
2. Design: tokens, accessible logo, header, hero, specializations, footer.
3. Content: localized value proposition, scanability for all sections, evidence and testimonials review.
4. Verification: lint, typecheck, build, Playwright desktop/mobile, accessibility, contrast and visual inspection on preview.
5. Release: user acceptance, explicit merge/deploy approval, post-release smoke test.

## Risks and mitigations
- **Navigation width**: seven links can crowd 1024px. Switch to mobile navigation until 1280px and test 375/768/1024/1280.
- **Content accuracy**: do not invent success statistics. Project links and roles remain as recorded; audit stale evidence separately.
- **i18n consistency**: add same keys to all three dictionaries; run build and language E2E.
- **Brand rollout**: branch derives from the approved VE brand branch; don't merge two competing brand implementations.
- **Regressions**: preserve career-profile and CV formats, validate existing E2E.

## Acceptance gates
All existing CI jobs pass (lint, TS, build, Playwright and security audit), new dual-track tests pass in ES/DE/EN, responsive layout visually reviewed, and production remains unchanged until explicit release authorization.

## Evidence log
2026-11-08: inspected SiteHeader, Hero, sections, project data, three dictionaries, CV selector and existing Playwright suite through GitHub connector.
2026-11-08: acceptance tests committed before main UI implementation.
Build, CI and preview inspection: pending external verification, not asserted as passed here.
