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

## Solutions-first UX refinement (approved 2026-11-08)
**Audience principle:** clients need clear outcomes without jargon; recruiters and technical evaluators need depth on demand. Do not put exhaustive technology labels in the hero or as unstructured clouds.

- First level: plain-language benefits, services, two equally prominent sectors and direct evidence.
- Second level: native, keyboard-accessible `details/summary` exposing technical capabilities for each sector; skills and service tool lists remain readable in HTML when expanded.
- Third level (future separate scope): dedicated project case studies and search-indexable sector pages. A client-side filter alone is not an SEO substitute.
- Keep terminology accurate, preserve original CV record and its API schema; no inflated claims or invented outcomes.
- Native HTML interactions avoid a new dependency or extra hydration.

**EARS additions**
- UX-DETAIL-01: WHEN a visitor opens a specialization, the system SHALL initially show outcome-oriented capabilities while technical labels remain optional.
- UX-DETAIL-02: WHEN an evaluator activates the technical disclosure, the system SHALL reveal the stack without navigating away.
- UX-DETAIL-03: WHEN a visitor sees the skills and services sections, the system SHALL initially avoid full technology tag clouds and SHALL expose details on request.
- UX-I18N-02: Technical disclosure labels SHALL be available in DE/EN/ES.
- UX-MOTION-02: Disclosure controls SHALL remain usable with keyboard and reduced-motion preferences.

**Domain / purchase:** deferred explicitly. No price/offer checks and no domain purchase as part of this change.


## VE-PORTFOLIO-QA-002 — Audit remediation (approved 2026-11-08)

### EARS requirements
- SEC-EMAIL-01: WHEN a visitor sends contact data, the HTML email SHALL escape name, address, subject and body, while preserving readable plain text.
- NAV-ALL-01: WHEN navigating the portfolio, the header, footer and vertical rail SHALL include all nine sections, including testimonials.
- CAREER-01: WHEN selecting IT experience, the timeline SHALL suppress the non-IT temporary assignment; WHEN selecting full history, it SHALL display the complete, unchanged chronology.
- AI-CONSISTENCY-01: WHEN viewing AI skills in DE/EN/ES, the detail SHALL include ChatGPT, Codex, Claude, Claude Code, Gemini, OpenCode and OpenAI API.
- TRUTH-01: WHEN showing AI training metrics, the hero SHALL avoid describing all courses as professional certifications.

### QA review
Requirements have direct observables; the full chronology, CV routes and the JobPilot career-profile schema remain unchanged. Tests were authored before implementation. User consent covers the draft branch, not the final production release.

### Phase A — Approved tasks (7)
1. Review existing sources, branches, tests and audit findings.
2. Add security, navigation, career and content regression tests.
3. Escape HTML email content.
4. Include Testimonials in the section navigation.
5. Add IT-only/full-history experience presentation without altering employment source.
6. Align AI skill labels, and make AI education metric terminology accurate in DE/EN/ES.
7. Run CI and independently inspect preview where tools permit; record exclusions.

### Phase B — Evidence and SEO preparation (separate execution gate)
- Verify live app/repository links and project statuses, particularly FieldForce Pro, before creating project case studies.
- Reconcile certificates and testimonials against original evidence and publication consent.
- Review Google/Bing indexing and plan dedicated indexable specialization/project pages.
- Controlled SMTP email delivery test, visual mobile/desktop assessment, accessibility and performance measurements.
- Floating rail persistence, restored positioning and distributed rate limiting require specific acceptance criteria before implementation.

### Excluded
No merging to main, production deployment, domain purchase, new analytics, unverifiable public claims or data migrations.
