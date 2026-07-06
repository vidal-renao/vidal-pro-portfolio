# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to vidalrenao.lab@outlook.com. All security vulnerabilities will be promptly addressed.

## Security Measures

### Authentication & Authorization
- **Supabase Auth**: Row Level Security (RLS) enabled on all tables
- **Session Management**: Secure, HTTP-only cookies
- **CSRF Protection**: SameSite cookies, CSRF tokens where applicable

### Input Validation
- **Zod Schemas**: All API inputs validated with Zod
- **Server-side Validation**: Never trust client-side validation alone
- **Sanitization**: Sanitize user inputs to prevent XSS attacks

### Rate Limiting
- **IP-based Rate Limiting**: 3 requests per hour on `/api/contact`
- **Honeypot Protection**: Hidden fields to detect bots

### Data Protection
- **Swiss DSG/nDSG Compliance**: Full compliance with Swiss data protection laws
- **Data Minimization**: Collect only necessary data
- **No Persistent PII Storage**: Contact form submissions forwarded to inbox only
- **Immutable Audit Logs**: INSERT-only schema pattern in Supabase

### Infrastructure Security
- **Environment Variables**: All secrets stored in environment variables
- **No Hardcoded Secrets**: Never commit secrets to version control
- **HTTPS Enforcement**: All production traffic over HTTPS
- **Security Headers**: 
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`

### Dependency Security
- **Regular Audits**: Run `npm audit` regularly
- **Automated Updates**: Dependabot for dependency updates
- **Lock Files**: Commit lock files for reproducible builds

## Security Best Practices

### For Developers
1. **Never commit secrets** to version control
2. **Use environment variables** for all configuration
3. **Validate all inputs** at API boundaries
4. **Use parameterized queries** to prevent SQL injection
5. **Sanitize user inputs** to prevent XSS attacks
6. **Implement proper error handling** without leaking sensitive information
7. **Use HTTPS** for all production traffic
8. **Keep dependencies updated** to patch security vulnerabilities

### For Deployment
1. **Use secure environment variables** in Vercel
2. **Enable security headers** in next.config.ts
3. **Configure CORS** properly
4. **Set up monitoring** for suspicious activity
5. **Implement proper logging** without sensitive data

## Compliance

### Swiss DSG/nDSG
- **Data Minimization**: Contact form collects name, email, subject, message only
- **No Third-party Trackers**: Zero analytics scripts, no external pixels
- **Independent Email Infrastructure**: Nodemailer/SMTP on Swiss-hosted NOVATREND
- **Immutable Audit Trail**: INSERT-only schema pattern in Supabase lab tables
- **Structured Data Hygiene**: JSON-LD schemas without sensitive PII in HTML markup
- **Rate Limiting**: IP-based 3 req/hr on `/api/contact`
- **Honeypot Anti-spam**: Hidden field via inline style object
- **Security Response Headers**: Applied to all API responses
- **Swiss Data Residency**: SMTP transport on NOVATREND Swiss infrastructure
- **No Persistent PII Storage**: Contact submissions forwarded to inbox only

## Security Updates

This document is regularly updated to reflect current security practices and requirements.

Last updated: 2026-07-06
