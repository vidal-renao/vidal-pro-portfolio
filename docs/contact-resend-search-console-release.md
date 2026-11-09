# VIDAL ECOSYSTEM — Contact and indexing release gates
Date: 2026-11-09 | Branch: feat/portfolio-premium-dual-career | Production release: NOT authorized

## Contact: accepted implementation, delivery still unverified
- The public /api/contact endpoint validates origin, content type, payload size, schema, honeypot and an instance-local rate limit.
- It now prefers the Resend HTTPS API when BOTH RESEND_API_KEY and RESEND_FROM are present.
- Resend acknowledges API acceptance with an email id; this is **not proof of inbox delivery**.
- The sender is deliberately NOT hardcoded to onboarding@resend.dev or an unverified personal address.
- If Resend is not fully configured, the route can fall back to SMTP_HOST, SMTP_USER, SMTP_PASS (legacy transport). When neither is configured it returns HTTP 503 and shows the direct email fallback.
- Recipient: CONTACT_TO, else NOTIFICATION_EMAIL, else the public portfolio contact address. Verify the chosen recipient.
- A failed API response is not reported as success. No real message was sent during implementation.
- Existing rate limiter uses memory per runtime instance; production abuse protection should be tested and, if needed, moved to a shared durable provider.
- A successful API test does not establish receipt, SPF/DKIM/DMARC alignment or replies.

### Required external configuration (Vercel preview first, then production only with approval)
1. In the Resend dashboard, verify a domain/subdomain intended for the portfolio, including DNS/SPF/DKIM as Resend requires.
2. Set RESEND_FROM to a verified sender e.g. `VIDAL ECOSYSTEM <contact@your-verified-domain>` — illustrative only, do NOT copy unless verified.
3. RESEND_API_KEY already exists according to a metadata-only check. Confirm it has permission for the verified domain, without exposing its value.
4. Set CONTACT_TO if different from NOTIFICATION_EMAIL; check the mailbox where the message should arrive.
5. Redeploy a single preview after changing environment variables; environment variables are snapshot-at-deploy.
6. Send one controlled message from the preview form to the approved contact mailbox. Verify **Resend accepted**, **mail received** (including spam), and **Reply-To** returns to the original submitter. Record evidence with personal data masked. Do not test by sending to unrelated recipients.
7. Test SMTP fallback only in a controlled isolated environment; do not configure both accidentally.

## Search visibility: technical work versus Google's decision
- Page canonical and hreflang link ES/EN/DE at https://vidal-pro-portfolio.vercel.app/.
- robots.txt and sitemap.xml exist with locale alternatives, and no fabricated lastmod.
- GOOGLE_SITE_VERIFICATION is an optional environment variable consumed by app/[locale]/layout.tsx to render Search Console HTML verification. Do NOT add untrusted verification tokens to git.
- In Search Console, add a URL-prefix property `https://vidal-pro-portfolio.vercel.app/`. If using HTML-tag verification, set GOOGLE_SITE_VERIFICATION to the token from Google's content attribute and rebuild/deploy production after authorization. DNS verification for the vercel.app hostname is not presumed to be under our control.
- In Search Console submit `https://vidal-pro-portfolio.vercel.app/sitemap.xml` and inspect `/es`, `/en`, `/de` separately with the URL Inspection tool.
- The Google index state, selected canonical, crawl status, impressions and positions are UNKNOWN until the property is verified and Google reports them. Do NOT claim indexation from `site:` search alone.
- User may optionally connect a Search Console reporting service; reporting access is not equivalent to property ownership verification.
- Canonical URLs point at production. Do not ask Google to index protected preview URLs or deploy an indexable alternative origin.

## Release gates
- Latest GitHub Actions run must pass build, lint, typecheck, functional and accessibility checks.
- A preview for the exact tested commit must be READY and browsable, with correct email environment configuration.
- Email **actual inbox receipt** and Contact fallback confirmed.
- Search Console property ownership verified, sitemap submitted, 3 URLs inspected. Google may take days to index even an eligible site.
- User explicitly authorizes the main merge and production deployment. No automatic publication.
