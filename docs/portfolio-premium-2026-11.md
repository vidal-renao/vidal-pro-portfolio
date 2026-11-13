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


## VE-PORTFOLIO-ENT-003 — Enterprise navigation and information architecture (approved 2026-11-08)

**Scope decision:** implement on existing feature branch only. Do not merge to main, deploy production, modify career-profile schema, alter historic roles or make new unsupported claims. Keep ES/EN/DE parity and CV download behavior.

### EARS requirements (QA-reviewed before implementation)
- **ENT-NAV-01:** WHEN a visitor opens any locale on desktop, the header SHALL show brand, primary section links (Specializations, Projects, Services, Experience), a secondary navigation disclosure, a language switch and a Contact CTA without horizontal overflow.
- **ENT-NAV-02:** WHEN a visitor opens the mobile menu, focus SHALL enter the menu; while it is open, Escape and its close control SHALL close it, keyboard focus SHALL stay in the menu, and closing SHALL return focus to its trigger.
- **ENT-NAV-03:** WHEN a visitor activates a section link, the menu SHALL close and the target SHALL remain visible below the fixed header.
- **ENT-NAV-04:** WHEN a visitor navigates in any locale, section links in header, footer and floating rail SHALL share a single typed section map and follow the actual DOM order.
- **ENT-NAV-05:** WHEN a visitor uses a keyboard or requests reduced motion, the navigation and optional draggable rail SHALL remain operable without forced animations or focus loss.
- **ENT-UX-01:** WHEN a client arrives, Hero and Specializations SHALL communicate solution areas before detailed technical tool lists.
- **ENT-UX-02:** WHEN a visitor scrolls the home page, content SHALL use the ordered hierarchy Hero → Specializations → Projects → Services → Experience → Skills → Credentials → Testimonials → Contact; existing content and verified evidence SHALL be retained.
- **ENT-UX-03:** WHEN a reader scans section headings, a consistent spacing, type scale, card treatment and anchor offset SHALL apply without decorative runtime dependencies.
- **ENT-I18N-01:** WHEN locale is ES, EN or DE, new navigation names and controls SHALL be translated consistently.
- **ENT-REG-01:** WHEN building and testing the update, CV PDF/Word routes, contact behavior, project links, identity and the JobPilot career-profile schema v1 SHALL remain unchanged.
- **ENT-REL-01:** UNTIL the user separately authorizes production release, the branch SHALL remain a Preview and main SHALL not be merged.

### Specification QA
- Every requirement has an observable DOM/keyboard/viewport test; terminology names visible links, states and navigation destinations.
- Navigation map is the single source for primary/secondary links, section order, rail and footer, not a second hard-coded array.
- Brand and CV service boundaries are unchanged. The new accessibility behaviors require regression tests; WCAG 2.2 AA is a target, not a compliance claim.
- Responsive sizes under test: 360, 375, 768, 1024, 1280 and 1440 CSS pixels. Mobile menu remains the sole navigation below the desktop breakpoint.
- Risk: compact header must not steal focus during anchor navigation; native section anchors remain available without JS.
- Risk: floating rail can overlay mobile content; do not add a second floating CTA.

### Approved plan (≤10 tasks per phase)
**Phase 1 — Contracts and tests**
1. Review source, existing CI and design tokens.
2. Record requirements, acceptance criteria and architecture decision.
3. Add E2E tests for desktop hierarchy, mobile focus, section ordering and locale parity.

**Phase 2 — Enterprise header**
1. Implement four primary links and secondary disclosure from the section map.
2. Add compact contact CTA, language switch and responsive spacing.
3. Implement accessible mobile navigation (open/close/Escape/focus return/trap).
4. Preserve CV download entry points and active-section feedback.

**Phase 3 — Section system**
1. Align DOM/section map with new hierarchy.
2. Harmonize heading and section surface spacing and deliberate visual grouping.
3. Preserve server components, existing technical disclosures and project evidence.

**Phase 4 — Verification**
1. Run lint and TypeScript check.
2. Run production build and Playwright E2E (desktop/mobile/keyboard).
3. Run dependency audit and check Vercel Preview state.
4. Record unresolved manual visual/performance/security limitations.
5. Require separate acceptance to merge/publish.

### ADR — NAV-ENT-001
**Decision:** keep native links and a server-owned typed section map. Header uses four first-level links, native secondary disclosure and a client-side accessible mobile menu. Main page keeps SSR components. No new package, heavy animation or router migration.

**Alternatives rejected:** showing all eight links in the header (visual crowding), separate mobile/desktop section maps (drift), sticky secondary navbar with two full-height rows (space cost).

**Consequences:** reduced top-level density and predictable hierarchy; manual design QA still required on real mobile and at 1280 px; focus management becomes a tested part of the client island.

**Current release state:** scope approved; production not authorized.


## VE-PORTFOLIO-ENT-004 — Mobile navigation and pagination refinement (approved follow-up 2026-11-08)

### EARS / QA
- NAV-MOB-01: WHEN mobile menu opens, it SHALL present a viewport-contained drawer with a dismissible backdrop, keep keyboard focus inside and disable page scrolling until closed.
- NAV-MOB-02: WHEN the visitor dismisses the backdrop or presses Escape, the drawer SHALL close, release scroll lock and restore keyboard focus to the menu trigger.
- NAV-MOB-03: WHEN the viewport changes to desktop size, the mobile drawer SHALL close instead of retaining scroll lock.
- NAV-SCROLL-01: WHEN the visitor scrolls to the end of the document, the pagination SHALL show the final section and disable further forward navigation.
- NAV-SCROLL-02: WHEN the visitor opens the pagination selector, it SHALL list all nine section anchors in source order and permit direct navigation.
- NAV-SCROLL-03: WHEN a visitor drags the floating rail or resizes the viewport, the navigation SHALL stay within the screen bounds and not trap normal wheel/touch scroll.
- NAV-SCROLL-04: WHILE the mobile menu is visible, the floating rail SHALL be hidden to prevent competing overlay controls.
- NAV-I18N-01: The new selection control SHALL have accessible text in Spanish, English and German.
- NAV-REG-01: Existing section-link destinations, PDF/Word CV, testimonials, experience data and project content SHALL remain unchanged.

### Decisions / plan
- Test first: mobile drawer dismiss, focus/scroll unlock, final-section count, direct section picker and viewport resize.
- Implement: correct active-index calculation using the section positions and document-bottom detection; add a compact section chooser inside the existing movable rail.
- Implement: convert mobile menu to a narrow side drawer with backdrop and viewport-safe overflow; close on desktop breakpoint and suppress floating rail while modal navigation is open.
- Verify: lint, typecheck, build, Playwright desktop/mobile and dependency audit; record Preview and production separately.
- Exclusions: do not replace the browser scroll system with forced snap pagination, add tracking or new packages, or publish to production.

### Limitations
- Mobile touch/rotation must be confirmed with real-device QA beyond emulated browser tests; no full WCAG certification without separate audit.
- The scroll rail is movable within a session; persisted coordinates and a reset-location control remain outside this routine remediation.



## VE-PORTFOLIO-SCROLL-005 — Viewport pagination correction (2026-11-08)

### Verified defect and design decision
Arrow navigation previously jumped between variable-height sections, sometimes nearly two viewports. The previous 01/09 indicator counted sections rather than visible viewport pages. The floating arrows now move a bounded 82% viewport step, while the separate chooser retains direct navigation to named sections. The counter is calculated from document height and the current viewport size.

### EARS acceptance
- SCR-01: WHEN the user activates a pagination arrow, the site SHALL move no more than one viewport height per press.
- SCR-02: WHEN native touch or wheel movement occurs, the page indicator SHALL update without automatic section snapping or changes to the URL hash.
- SCR-03: WHEN repeated same-direction presses occur, the page SHALL avoid compounding multiple scroll transitions; reversal SHALL remain available.
- SCR-04: WHILE more content remains below Contact, the down arrow SHALL remain enabled until the actual document bottom.
- SCR-05: WHEN an accessible section name is selected, the chooser SHALL retain the corresponding named anchor.
- SCR-06: WHEN reduced motion is requested, scrolling controls SHALL not animate.
- SCR-07: WHEN native input interrupts an arrow transition, that transition SHALL be cancelable.

### Implementation and QA
The arrow motion uses a bounded requestAnimationFrame transition and instantaneous frame positions, avoiding overlapping native smooth animations. No new dependencies or production changes. Browser tests cover desktop/mobile viewport step, wheel update, rapid input, reverse navigation, named selection and end of document. CI/CD #133 completed successfully with 89 passed E2E tests and 13 skipped, plus lint, TypeScript, build and dependency audit. Real phone and visual/manual performance testing remain outstanding. Production merge is explicitly excluded.


## VE-PORTFOLIO-ENT-006 — Enterprise menu polish and release readiness (2026-11-08)

### Approved scope and invariant
Improve header and desktop/tablet/mobile menu presentation on the premium branch; keep working viewport-pagination scroll untouched. Audit application, search/filter, external links and discoverability before considering a production release. No merge/deploy production without user acceptance and release gate.

### EARS and QA
- MENU-VIS-01: WHEN the portfolio is rendered at desktop width, the header SHALL display a restrained segmented primary navigation, a distinct active state and secondary disclosure with readable contrast.
- MENU-VIS-02: WHEN the viewport is below the desktop breakpoint, a drawer SHALL group four primary destinations, three secondary destinations and separate Contact/CV actions.
- MENU-UX-03: WHEN the drawer opens, focus SHALL move inside; WHEN it closes by Escape, backdrop or close button, focus SHALL return to the trigger and native page scrolling SHALL resume.
- MENU-I18N-04: WHEN language changes among ES/EN/DE, the menu SHALL retain navigation destinations and localized labels.
- MENU-RSP-05: WHEN the viewport is 360, 375, 768, 1024, 1280 or 1440 pixels wide, navigation SHALL avoid horizontal overflow and remain within viewport bounds.
- MENU-REG-06: WHILE menu styling changes, existing scroll pagination, CV selection, contact form, external project links and the career-profile schema SHALL remain unchanged.
- RELEASE-SEO-07: WHEN rendered in ES/EN/DE, the page SHALL provide canonical metadata, valid section anchors, sitemap entries and robots directives.
- RELEASE-SEARCH-08: WHEN using the projects search, the filtered results SHALL update without changing the page route or URL hash.

### Architecture decision (ADR-MENU-002)
Retain typed SECTIONS and native anchor links, with a small accessible client-side header island; use CSS Tailwind utility classes and existing design tokens instead of new animation/UI libraries. Mobile drawer groups content by intent and exposes Contact and CV as separate actions. Desktop uses a segmented navigation surface; keep scroll controls unchanged. No new dependencies or changes to production.

### Execution and release checklist
1. Test-first E2E for responsive hierarchy, accessible menu, locale parity, and focus.
2. Apply visual and component refinements inside SiteHeader only.
3. Run CI lint, typecheck, build and existing E2E.
4. Add read-only release smoke for canonical metadata, internal links, robots/sitemap and client-side search.
5. Compare Preview deployment and production deployment branches.
6. Manually review real devices, external URL health, search-engine indexing, SMTP configuration/delivery, and performance before production approval.

### Evidence boundaries and blockers
GitHub Actions and Vercel provide automated CI and deployment-state evidence. The public-site web audit could not retrieve the live URL; internet resolution is unavailable from the working container, so external URL health and indexing are NOT verified. Search Console/Bing Webmaster Tools, Lighthouse/Core Web Vitals and live SMTP delivery have NOT been checked. The contact endpoint currently uses in-memory per-process rate limiting; evaluate distributed abuse controls before asserting enterprise-grade anti-spam reliability. These are release gates, not claims of failure. Avoid production release until resolved or explicitly risk-accepted.


## VE-PORTFOLIO-SEO-NAV-007 — Search discoverability and menu/footer refinement (2026-11-08)

### Public search audit (read-only)
Search-engine web queries for site:vidal-pro-portfolio.vercel.app and the brand name did not provide a verifiable indexed result for the portfolio. Other listings mentioning the developer and the URL were visible. This is insufficient to conclude that the site is or is not indexed. The web fetch of the public homepage was not accessible through the research environment. Search Console and Bing Webmaster URL Inspection remain the authoritative owner-side verification steps.

### SEO keyword mapping (proposal, not measured search volumes)
- Business services DE Basel: KI Automatisierung Basel, Webentwicklung Basel, SaaS Entwicklung Schweiz.
- Business services EN: AI automation Basel, AI integration Switzerland, SaaS developer Switzerland.
- Hiring DE: ICT System Engineer Basel, Microsoft 365 Administrator Schweiz, Fullstack Entwickler Basel.
- Hiring EN: Fullstack TypeScript Developer Basel, Systems Administrator Switzerland.
- Branded: Vidal Reñao, VIDAL ECOSYSTEM. Avoid meta-keywords and keyword stuffing.

### Review findings
Each locale includes a descriptive canonical title and meta description, alternate language URLs, OG tags and a sitemap. The present single-page architecture limits unique search intents; dedicated indexable project and specialty landing pages require an approved content/SEO spec and evidence. Search Console verification, sitemap submission, Google/Bing indexing, external project availability and field performance remain unverified.

### EARS and design decision
- HOVER-01: WHEN a fine mouse pointer enters More, the desktop disclosure SHALL open without a click.
- HOVER-02: WHILE the pointer moves into the dropdown, the disclosure SHALL remain visible; WHEN it leaves, it SHALL close unless keyboard focus remains inside.
- HOVER-03: WHEN interacting by keyboard or touch, the disclosure SHALL preserve native activation and Escape behavior.
- FOOTER-01: WHEN viewed at mobile, tablet and desktop breakpoints, the footer SHALL present distinct brand, section navigation and contact zones without horizontal overflow.
- FOOTER-02: WHEN a footer anchor is selected, it SHALL target a real section; links SHALL retain sufficient tap-target size.
- NAV-REG: Header refinements SHALL not modify the working pagination controls or the career-profile API.

ADR: Use native details with pointer-hover enhancement for fine mouse input, keep keyboard/touch native fallback, and replace the visual dropdown margin with a continuous hoverable padded area. Footer uses the existing server component and tokens; no new package. GitHub Actions E2E must cover mouse, keyboard, multi-locale anchors and 360–1440px widths.

### Production gates
Do not merge to main before independent visual review, confirmed indexing/URLs and live form delivery as appropriate. Search-engine rankings are not guaranteed. Code-level SEO checks do not prove indexing.


## VE-PORTFOLIO-SEO-007 — Search Console follow-up (2026-11-10)

### Verified external observations
Google Search Console confirms verified ownership via HTML meta tag; sitemap submission accepted. The live tests for `/de`, `/en` and `/es` each report indexability and one valid ProfilePage enhancement, but none is indexed yet. `/es` is recorded as discovered via sitemap; `/de` and `/en` initially reported unknown. Daily manual indexing quota has been reached. These observations are not evidence of actual indexing or search ranking.

### EARS acceptance and QA
- SEO-I18N-01: WHEN a localized landing page renders, it SHALL declare its own canonical URL and alternates for the three supported languages, plus `x-default` pointing to the English fallback `/en`.
- SEO-SCHEMA-02: WHEN a localized page renders structured data, it SHALL have a unique ProfilePage URL and `@id` for that locale, and reference one stable Person identity across locales.
- SEO-VERIFY-03: WHILE ownership relies on the HTML meta verification method, all supported localized pages SHALL retain the approved Google site-verification token.
- SEO-SITEMAP-04: WHEN the sitemap is generated, it SHALL list all three locales without inventing modification dates.
- SEO-TRUTH-05: UNTIL verified organization registration and supporting evidence are supplied, public structured data SHALL avoid claims of an independently registered LocalBusiness.

### Result and limits
The existing Premium implementation already satisfies SEO-SCHEMA-02, SEO-VERIFY-03, SEO-SITEMAP-04 and SEO-TRUTH-05 by source review; regression assertions added. `x-default` and its test added on the Premium integration branch only. CI results and browser verification must be recorded separately. Production changes, merge and Search Console indexing requests are excluded from this branch change.


## VE-PORTFOLIO-BRAND-006 — Unified identity with LinkedIn (approved 2026-11-13)

**Scope:** align the public identity of the portfolio with the LinkedIn profile. Branch `feat/brand-unified-identity`; Preview only, production release not authorized.

### EARS requirements
- **ID-01:** The title SHALL be identical in metadata, Open Graph, JSON-LD, hero, footer and specialization cards — EN "IT Systems Administrator & Full-Stack Developer"; DE "IT-Systemadministrator & Full-Stack-Entwickler"; ES "Administrador de Sistemas IT y Desarrollador Full-Stack".
- **ID-02:** The hero SHALL lead with the tagline — EN "Reliable IT today. AI-ready tomorrow."; DE "Zuverlässige IT heute. Bereit für KI morgen."; ES "IT fiable hoy. Preparada para la IA mañana."
- **VIS-01:** The accent SHALL be steel blue #5B8DB8 (hover #7FA6CC); accent on background and accent-ink on accent SHALL reach ≥ 4.5:1 (measured 5.46:1 and 4.71:1). WCAG AA is a target, not a compliance claim.
- **DOC-01:** `CLAUDE.md`, `AGENTS.md` and `README.md` SHALL describe the owner with the unified title and a sober tone.
- **REG-01:** CV PDF/Word routes, contact behaviour and `/api/career-profile` schema v1 SHALL remain unchanged. CV variant roles (`cv.role`, `cvSystems.role`) are intentionally untouched: they are tailored per application and feed JobPilot.

### Decisions
- AI remains a search signal through the tagline and meta description instead of the job title; `seo-dual-audience` test updated accordingly.
- Specialization card titles: "Full-Stack Developer" and "IT Systems Administrator" (localized).
- Hard-coded cyan/violet utilities replaced by accent tokens. The VE monogram gradient (`public/icons/ve-mark.svg`) is a brand asset and is left unchanged pending a separate decision.

### Evidence (2026-11-13, local)
- New E2E tests failed before implementation (5/5), as expected.
- After implementation: lint ✓, typecheck ✓, build ✓, Playwright 170 passed / 58 skipped (desktop + mobile), `npm audit` 0 vulnerabilities.
- Visual inspection: desktop 1440 px (EN) and mobile 390 px (DE) screenshots reviewed.
- Pending: Vercel Preview check, user acceptance, separate production release authorization.
