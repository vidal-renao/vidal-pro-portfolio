import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy for a static site with one external form endpoint (Formspree).
 * 'unsafe-inline' scripts are required by Next.js hydration and the JSON-LD block without nonces;
 * 'unsafe-eval' only in development (React refresh). vercel.live = Vercel preview toolbar.
 */
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live",
  "connect-src 'self' https://formspree.io https://vercel.live wss://ws-us3.pusher.com",
  "frame-src https://vercel.live",
  "form-action 'self' https://formspree.io",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // Pages removed in the 2026-10 redesign: old links (and printed QR codes) land on the contact section.
  async redirects() {
    return [
      { source: "/:locale(en|de|es)/:page(consultation|brand|labs)/:rest*", destination: "/:locale#contact", permanent: true },
      { source: "/:locale(en|de|es)/:page(consultation|brand|labs)", destination: "/:locale#contact", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      // Replacement service worker that removes the old PWA cache must never be cached itself.
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }] },
    ];
  },
};

export default withNextIntl(nextConfig);
