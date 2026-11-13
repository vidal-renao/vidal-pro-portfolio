import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { routing } from "@/i18n/routing";
import { SITE } from "@/content/site";
import "@/app/globals.css";

const BASE_URL = SITE.url;

const META: Record<string, { title: string; description: string; keywords: string[] }> = {
  en: {
    title: "Vidal Reñao | IT Systems Administrator & Full-Stack Developer",
    description: "Reliable IT today. AI-ready tomorrow. IT Systems Administrator and Full-Stack Developer in Basel: Microsoft 365, Entra ID and networks, plus web applications and AI automation for businesses.",
    keywords: ["Vidal Reñao", "VIDAL ECOSYSTEM", "VIDALECOSYSTEM", "Fullstack Developer Basel", "AI Solutions Switzerland", "AI Automation Basel", "Systems Administrator Basel", "IT Infrastructure Switzerland", "Microsoft 365", "Entra ID", "Next.js", "Supabase"],
  },
  de: {
    title: "Vidal Reñao | IT-Systemadministrator & Full-Stack-Entwickler",
    description: "Zuverlässige IT heute. Bereit für KI morgen. IT-Systemadministrator und Full-Stack-Entwickler in Basel: Microsoft 365, Entra ID und Netzwerke sowie Webanwendungen und KI-Automatisierung für KMU.",
    keywords: ["Vidal Reñao", "VIDAL ECOSYSTEM", "VIDALECOSYSTEM", "Fullstack Entwickler Basel", "KI Automatisierung Schweiz", "KI Lösungen", "Systemadministrator Basel", "IT System Engineer Schweiz", "Microsoft 365", "Entra ID", "Next.js", "Supabase"],
  },
  es: {
    title: "Vidal Reñao | Administrador de Sistemas IT y Desarrollador Full-Stack",
    description: "IT fiable hoy. Preparada para la IA mañana. Administrador de Sistemas IT y Desarrollador Full-Stack en Basilea: Microsoft 365, Entra ID y redes, además de aplicaciones web y automatización con IA para empresas.",
    keywords: ["Vidal Reñao", "VIDAL ECOSYSTEM", "VIDALECOSYSTEM", "Fullstack Developer", "AI Solutions", "IA para empresas", "Automation", "automatización empresarial", "Administrador de Sistemas", "System Admin", "Basilea", "Suiza", "Next.js", "Microsoft 365"],
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    metadataBase: new URL(BASE_URL),
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION || "8E5L_H0K-yv5EjGWhb48A08eNjp7iFVGvYeN_cY3i3Y" },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: { en: `${BASE_URL}/en`, de: `${BASE_URL}/de`, es: `${BASE_URL}/es`, "x-default": `${BASE_URL}/en` },
    },
    openGraph: {
      type: "profile",
      url: `${BASE_URL}/${locale}`,
      title: meta.title,
      description: meta.description,
      siteName: "VIDAL ECOSYSTEM — Vidal Reñao",
      images: [
        {
          url: "/Photo.jpg",
          width: 800,
          height: 800,
          alt: "Vidal Reñao — IT Systems Administrator & Full-Stack Developer",
        },
      ],
      locale: locale === "de" ? "de_CH" : locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/Photo.jpg"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** One consistent identity graph; avoid asserting an unverified registered local business. */
function structuredData(locale: string) {
  const pageUrl = `${BASE_URL}/${locale}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite", "@id": `${BASE_URL}/#website`,
        name: "VIDAL ECOSYSTEM", alternateName: ["Vidal Ecosystem", "VIDALECOSYSTEM", "Vidal Reñao Portfolio"],
        url: BASE_URL, inLanguage: ["de", "en", "es"],
      },
      {
        "@type": "Person", "@id": `${BASE_URL}/#person`,
        name: "Vidal Reñao", alternateName: "Vidal Reñao Lopelo",
        url: BASE_URL, image: `${BASE_URL}${SITE.photo}`,
        jobTitle: ["IT Systems Administrator", "Full-Stack Developer"],
        knowsAbout: ["Artificial intelligence", "AI Automation", "AI Solutions", "Fullstack Development", "Next.js", "TypeScript", "Supabase", "Microsoft 365", "Microsoft Entra ID", "Active Directory", "Windows Server", "IT infrastructure"],
        knowsLanguage: ["de", "en", "es"],
        address: { "@type": "PostalAddress", addressLocality: "Basel", addressCountry: "CH" },
        sameAs: [SITE.linkedin, SITE.github],
      },
      {
        "@type": "ProfilePage", "@id": `${pageUrl}#webpage`,
        url: pageUrl, name: META[locale]?.title ?? META.en.title,
        description: META[locale]?.description ?? META.en.description,
        inLanguage: locale, isPartOf: { "@id": `${BASE_URL}/#website` },
        mainEntity: { "@id": `${BASE_URL}/#person` },
      },
    ],
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Static rendering per locale: copy is resolved on the server; client components get plain props.
  setRequestLocale(locale);

  return (
    <html lang={locale} className={GeistSans.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
