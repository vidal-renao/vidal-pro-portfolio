# Portfolio audit — 23 September 2026

Every project on the portfolio was checked against four sources: the GitHub
repository, the Vercel deployment, the Supabase database behind it, and the
public URL opened as an anonymous visitor (no Vercel session). The ranking
below is what a visitor can verify, not what the copy claims.

## Evidence

| Project | Commits | Files | Tests | CI | Repo | Demo as a stranger | Database |
|---|---:|---:|---:|:--:|---|---|---|
| HelpDesk AI (ticket-system) | 204 | 462 | 38 | ✅ | public | ✅ live | own project, 89 tables / 1 034 rows |
| D'NAMAR | 69 | 180 | 0 | ❌ | public | ✅ live on dnamar.ch | — |
| Invoice Auto | 34 | 197 | 10 files / 132 cases | ❌ | public | ✅ public demo | 8 tables |
| SolarPilot | 17 | 84 | 8 files / 137 cases | ❌ | public | ✅ live | 3 tables |
| NATURÆ | 49 | 160 | 5 | ❌ | **private** | ✅ live | 13 tables |
| WAAI SaaS | 43 | 612 | 5 | ✅ | public | ✅ staging | waai_* with real messages |
| Parcel Tracker (cv-platform) | 62 | 352 | 9 | ✅ | public | ✅ live | 9 tables |
| Ticket Auditor (helpdesk-mcp) | 50 | 98 | 20 | ✅ | public | ⚠️ JSON endpoint, not a demo | — |
| Aura AI | 5 | 60 | 1 | ❌ | public | ✅ live | own schema, 6 tables |
| MatchPoint AI | 15 | 137 | 0 | ❌ | public | ✅ live (URL was wrong) | 8 tables / 137 rows |

## What was wrong

1. **The star project was the weakest repository.** Aura AI led the portfolio
   with 5 commits, one test file and a demo whose browser tab read
   *"Create Next App"*. The cause: the newest commit had never been pushed, so
   production was running an older build. Pushed; the demo now shows its real
   title. Aura AI moves to position 8.
2. **A dead link for every visitor.** The NATURÆ card linked to a private
   repository — a 404 for anyone not logged in as the owner.
3. **MatchPoint's demo pointed at a login wall.** Its current deployment is
   public; the card used an old per-deployment URL that redirects to Vercel.
4. **A JSON endpoint presented as a demo.** "Ticket Auditor" linked to
   `/health`, which returns `{"status":"running"}`. It is a scheduled service
   with no interface.
5. **Stale and unverifiable claims.** The card and banner for HelpDesk AI
   advertised "8/8 tests" (the repo has 38 test files); Aura AI's banner
   claimed a "82.4% token-context reduction" that is not backed by anything in
   the current source.
6. **Three cards out of twelve had an image**, so the grid looked half-finished.
7. **Fragile wiring.** The lab cards resolved their route by array index
   (`i === 8`), so any reordering would silently point them elsewhere.

## What was done

- Re-ranked the cards by verifiable evidence; HelpDesk AI is the new star and
  the architecture banner was rewritten around it with checkable facts.
- Removed the private-repo link, fixed the MatchPoint URL, removed the fake
  demo link, and corrected the stale/unverifiable claims.
- Screenshots captured from the live demos for every card that has one
  (9 of 10; Ticket Auditor has no interface).
- Statuses made honest: Aura AI is "public demo", MatchPoint is "MVP" with its
  last activity stated.
- Cards now resolve by `slug`, so reordering cannot mislink a lab.
- Accessibility: the blue CTAs were 3.76:1 (AA needs 4.5:1) → now 5.25:1;
  QR code without an accessible name → labelled; links under 24 px → padded.
  axe reports 0 violations in es/en/de, desktop and mobile.

## Recommendations (owner's call)

1. **Projects worth adding** — live, public, and stronger than what is on the
   portfolio today: StayPilot (booking engine, 18 tables / 1 679 rows),
   OpsPilot, Omnisciencia, Lumen Invoice, JobPilot Pharma. All have private
   repos, so they would be demo-only cards, like NATURÆ.
2. **MatchPoint AI**: revive or retire. Five months without commits and no
   tests, sitting next to projects with CI.
3. **Aura AI**: the interface is good; the repository is not. A test suite and
   real commit history would move it back up.
4. **`invoice-auto` on GitHub** has no description or website set, unlike
   `solarpilot`.
5. **First paint on a slow phone** is ~4–6 s, dominated by JavaScript
   execution (240 KB, every section is a client component). Moving the static
   sections to Server Components is the one change that would move that number.
