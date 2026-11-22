# VE-PORTFOLIO-UX-003 — Distinct visual redesign

Status: owner requested execution on 2026-11-22. Implementation on feature branch only; production publication requires preview QA.

## Problem and objective
The deployed UX-002 is visually too close to the previous portfolio. Redesign the first screen as a distinct branded composition with two equal, unmistakable entry points for engineering/AI and systems administration. Preserve the verified content, identity, ES/EN/DE, career-profile API v1 and CV functionality.

## EARS requirements
- V3-01: WHEN any locale opens, the hero SHALL show a visible branded editorial introduction, an integrated photograph and two equal professional-path cards.
- V3-02: WHEN a visitor activates the engineering path, the page SHALL navigate to projects; WHEN activating systems, it SHALL navigate to experience.
- V3-03: WHEN a business visitor uses the primary CTA, the page SHALL navigate to services; WHEN a recruiter uses the secondary CTA, it SHALL navigate to experience.
- V3-04: WHEN a visitor uses a mobile viewport, the hero and professional paths SHALL stack without horizontal overflow.
- V3-05: WHEN reduced motion is enabled, the page SHALL not require animation to access information.
- V3-06: WHEN navigating ES/EN/DE, existing translated copy SHALL be reused without introducing unsupported claims.
- V3-07: WHEN publishing, CV downloads, contact intent and /api/career-profile v1 SHALL retain their contracts.

## QA of specification
Each requirement has an observable selector, navigation target or regression test. Two professional paths receive equal surface and type hierarchy. No new claims, metrics, dependencies, or personal data are introduced.

## Plan
1. Baseline (3 tasks): inspect existing source, document EARS, add tests first.
2. Visual architecture (5 tasks): rebuild hero composition, add distinct pathway cards, update section framing, unify surface tokens, keep accessible semantics.
3. Quality (6 tasks): lint, typecheck, build, E2E, desktop/mobile/i18n, a11y/SEO/link checks where supported.
4. Release (3 tasks): inspect preview, review against approved direction, merge only after verified release decision.

## Exclusions
No framework upgrade, backend change, database, analytics, external font, new images, invented accomplishments, or production deployment before QA.

© VIDAL ECOSYSTEM
