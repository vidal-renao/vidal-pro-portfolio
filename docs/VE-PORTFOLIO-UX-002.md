# VE-PORTFOLIO-UX-002 — UX redesign

Status: UX direction and plan approved by owner on 2026-11-22. Phase 1 implemented in feature branch; pending CI, preview QA, and explicit production approval.

## Goal and users
Make the portfolio easier to navigate for Swiss/DACH SMB customers seeking IT/AI services and recruiters evaluating either of two independent career tracks.

## EARS acceptance
- UX-01: WHEN a visitor enters the home page, the hero SHALL offer separate business and career routes.
- UX-02: WHEN a visitor scans the home page, the section order SHALL be Hero, Specializations, Services, Projects, Experience, Skills, Credentials, Testimonials, Contact.
- UX-03: WHEN a desktop visitor uses primary navigation, Services and Specializations SHALL be directly accessible.
- UX-04: WHEN a business visitor selects a service, the contact form SHALL preserve the contextual intent behavior introduced in CONV-001.
- UX-05: WHEN a recruiter uses career content, existing experience, CV downloads and /api/career-profile v1 SHALL remain compatible.
- UX-06: WHEN using narrow viewports, navigation SHALL remain keyboard operable and avoid horizontal overflow.
- UX-07: WHEN changing locale, navigation and content SHALL remain available in ES/EN/DE.
- UX-08: WHEN viewing testimonials, their complete existing section SHALL remain present but not interrupt the hero.

## QA of requirements
Each requirement has an observable route, DOM order, interaction, or regression check. No invented performance figures, testimonials, certifications, or employment claims are allowed. Section map and DOM order must remain aligned.

## Phases
1. Navigation and information architecture (5 tasks): test first; reorder sections; align typed section map; surface Services in header; simplify hero testimonial duplication.
2. Visual hierarchy (up to 8 tasks): inspect preview; refine hero, card spacing, mobile hierarchy and CTAs; validate visual consistency.
3. Content scanability (up to 8 tasks): service outcomes, project evidence and experience hierarchy without inventing claims; i18n.
4. QA (up to 8 tasks): lint, TS, build, Playwright, production audit, accessibility, desktop/mobile, keyboard and CV/API regression.
5. Release (up to 4 tasks): preview review, approval, merge, smoke test.

## Phase 1 evidence
New E2E acceptance test committed before UI changes. Updated the section order, primary navigation and hero testimonial duplication. CI, preview and manual checks pending. No production changes authorized for this branch.

## Exclusions
No dependency upgrades, database, authentication, paid services, analytics or API schema changes.

© VIDAL ECOSYSTEM
