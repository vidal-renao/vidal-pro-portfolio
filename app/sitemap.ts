import { MetadataRoute } from "next";

const BASE_URL = "https://vidal-pro-portfolio.vercel.app";
const locales = ["en", "de", "es"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: locale === "en" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}`])
        ),
      },
    },
    {
      url: `${BASE_URL}/${locale}/labs/community-fund`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}/labs/community-fund`])
        ),
      },
    },
  ]);
}
