# VIDAL ECOSYSTEM — Formspree release checklist

Date: 2026-11-10
Integration PR: #17 (`feat/premium-formspree-release` → `feat/portfolio-premium-dual-career`)
Release authorization: **not granted**. Do not merge or publish.

## Verified

- React form uses public Formspree endpoint `https://formspree.io/f/xbggnyab`; no private token in client code.
- Browser sends `FormData` with JSON response requested; success/failure states and direct Outlook mailto fallback are present.
- Browser form includes Formspree's native hidden `_gotcha` field and disclosure in DE/EN/ES.
- A controlled submission from Vercel preview was actually received in `vidalrenao.lab@outlook.com` at 2026-11-10 09:18:42 UTC. Subject: `QA Portfolio Premium 2.0 - Formspree`. This was **before** the newly branded subject change.
- A later code change adds `VIDAL ECOSYSTEM | ` to the notification subject, keeps the visitor's subject (or uses `Portfolio contact`), and adds a `source=Portfolio Premium 2.0` field.
- Formspree HTML notification templates and custom sender domains require a **Business** subscription; this project does not assume a paid plan.

## Provider dashboard checks — pending, manual, read-only until approved settings are known

1. Open form `xbggnyab` in Formspree and confirm plan, owner, linked email and enabled target notifications.
2. In **Settings → Spam protection**, check CAPTCHA setting. Formspree supports built-in CAPTCHA and honeypot; decide whether an additional challenge is necessary. Do not disable existing protections.
3. In **Project Settings → Restrict to Domain**, confirm whether a domain restriction exists. Before enabling, identify the stable **production domain**. A strict restriction can classify preview submissions as spam. Do not whitelist a transient deployment-specific URL by default.
4. Inspect Inbox, Spam and any Over Limit folder, provider submission quota, and retention/storage behavior. The free tier has a 30-day submission history and monthly limits (vendor docs); verify the current plan.
5. Confirm no unsolicited autoresponse or third-party workflow is enabled. Autoresponse and advanced spam filtering can depend on plan.
6. Review data-controller identification, purposes, Formspree as processor, applicable cross-border transfer, retention, deletion requests and up-to-date privacy notice under the Swiss nDSG (and GDPR if applicable). The short disclosure beside the form is not a complete legal privacy-policy review.

## Audit and release gates

- GitHub CI: lint, typecheck, production build, Playwright mock success/error, npm production dependency audit.
- Enterprise audit for integrated PR #17: responsive screenshots, axe-core on locales and mobile/desktop, Lighthouse ES mobile / DE desktop, external link checks. Check CI run and uploaded evidence, including failures; a skipped/failed job is not a pass.
- Check that branded subject and new source metadata pass mocked E2E tests.
- Make **one** controlled live submission on the integrated preview only after green CI; confirm branded subject and content in Outlook.
- Check visually on real mobile and desktop, keyboard navigation, links, layout and contrast.
- Obtain explicit merge and production deployment approval.
- After production release, recheck form and HTTPS on real production hostname. No release has occurred as part of this work.

## Known architectural limit

The public form posts directly to Formspree, so locally defined validation on the legacy `/api/contact` Resend/SMTP route does **not** provide server-side security to Formspree submissions. Actual abuse protection depends on Formspree settings and provider controls. Do not claim the old route's API tests cover the current Formspree route.
