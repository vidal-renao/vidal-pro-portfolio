import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE } from "@/content/site";

/** One URL per locale, each declaring its language alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `${SITE.url}/${l}`]));
  return routing.locales.map((locale) => ({
    url: `${SITE.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
