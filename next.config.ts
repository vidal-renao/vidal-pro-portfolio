import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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
      // Replacement service worker that removes the old PWA cache must never be cached itself.
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }] },
    ];
  },
};

export default withNextIntl(nextConfig);
