import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE } from "@/content/site";

/** Keep sitemap language alternates in sync with generateMetadata() in the locale layout. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(routing.locales.map((locale) => [locale, `${SITE.url}/${locale}`])),
    "x-default": `${SITE.url}/${routing.defaultLocale}`,
  };
  return routing.locales.map((locale) => ({
    url: `${SITE.url}/${locale}`,
    alternates: { languages },
  }));
}
