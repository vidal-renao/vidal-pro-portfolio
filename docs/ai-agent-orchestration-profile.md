# AI agent orchestration profile

Approved scope: 2026-11-28. Content-only update on feature branch; no production release approval.

## EARS and acceptance
- AI-01: WHEN viewing the software specialization in ES, EN or DE, the site SHALL describe CLI agent orchestration, SDD/EARS and controlled quality gates.
- AI-02: WHEN selecting the fullstack CV, the profile and competencies SHALL include AI-assisted engineering and automation, without implying unverified employment or deployed runtime orchestration.
- AI-03: The systems specialization, systems CV, career history and career API schema SHALL remain unchanged.
- AI-04: The three dictionaries SHALL preserve their existing keys, array positions and types.
- AI-05: The branch SHALL not be merged or released without explicit approval.

QA: observable content and structural checks; claims are based on owner-provided methodology, not independent certification. No new dependencies or architecture changes. Risks: longer text may affect CV pagination; API consumers may display revised text. Validate locale parity, CV variants, API and layout on preview.

Plan: (1) add content regression test; (2) update three dictionaries; (3) compare invariants against main; (4) review CI and preview, including PDF/DOCX; (5) draft PR for review. No production merge.
