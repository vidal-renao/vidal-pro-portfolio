# VIDAL ECOSYSTEM — Formspree contact integration
Date: 2026-11-10
Branch: `feat/portfolio-premium-dual-career`
Release authorization: **not yet granted**.

## Approved configuration
- Formspree form ID: `xbggnyab`.
- Public endpoint: `https://formspree.io/f/xbggnyab` (form IDs are public identifiers, not secrets).
- Destination intended by owner: `vidalrenao.lab@outlook.com`.
- The Formspree account, mailbox ownership, confirmed notification recipient and successful inbox delivery **have not been independently verified**.
- The existing React contact form sends a multipart `FormData` POST using `Accept: application/json` directly to Formspree. This follows the provider's AJAX integration pattern without changing dependencies or UI strings.
- Formspree-native honeypot field `_gotcha` replaces `_honey` in the browser form.
- The old `/api/contact` Resend/SMTP handler remains in source for potential future migrations; the public portfolio UI no longer calls it. Its CI API regression tests remain independent.

## Tests and release limitations
- Playwright intercepts Formspree POSTs, asserts payload and tests 200 success / 429 failure without delivering emails or using free-plan quota. Tests run for DE, EN, ES.
- Formspree server-side spam filtering, deliverability and notifications require one controlled real submission from an approved preview. No real messages are sent during CI.
- A successful Formspree HTTP response is evidence of **acceptance by the provider**, not proof of Outlook inbox delivery.
- The user must confirm Formspree Settings > target email is `vidalrenao.lab@outlook.com`, that notifications are enabled and that the Formspree account is verified. Check Outlook Inbox and Junk.
- For production, consider restricting the form's allowed domain to the production Vercel hostname after validating preview; restricting too early would break preview submissions. Ensure preview is not erroneously blocked.
- Verify the form is compliant with any applicable privacy notice / handling of contact data. Keep third-party processor disclosure accurate.
- The legacy Resend route is not needed to use Formspree; do not put the existing Resend key in browser code.

## Release sequence
1. All GitHub CI jobs pass for the exact branch head.
2. Vercel preview for the exact SHA is READY and browser smoke tests pass.
3. One controlled email arrives in Outlook and reply behavior is validated.
4. Owner authorizes merge and production deployment explicitly.
5. Verify production form once and record result, then submit production sitemap / inspect ES EN DE in Search Console.

The Google indexing timeline and inclusion are controlled by Google; ownership verification and sitemap submission remain separate from this integration.
