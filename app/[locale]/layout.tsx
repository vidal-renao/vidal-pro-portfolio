import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";

const BASE_URL = "https://vidal-pro-portfolio.vercel.app";
const BASE = BASE_URL;

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Vidal Reñao — Fullstack AI Engineer & Systems Administrator",
    description:
      "Fullstack AI engineering and enterprise systems administration in Basel, Switzerland. SaaS development, AI automation, Microsoft 365, Windows Server, Entra ID and networking.",
  },
  de: {
    title: "Vidal Reñao — Fullstack AI Engineer & Systemadministrator",
    description:
      "Websites, Apps und KI-Automatisierung für dein Unternehmen — Fitnessstudios, Restaurants, Friseure, Praxen, Läden und Agenturen. Fullstack AI Engineer & Systemadministrator in Basel: Next.js, KI, Windows, Linux, Netzwerke, Microsoft 365, CCNA.",
  },
  es: {
    title: "Vidal Reñao — Fullstack AI Engineer & Administrador de Sistemas",
    description:
      "Ingeniería Fullstack con IA y administración de sistemas en Basilea: desarrollo SaaS, automatización, Microsoft 365, Windows Server, Entra ID y redes empresariales.",
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
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: { en: "/en", de: "/de", es: "/es" },
    },
    openGraph: {
      type: "profile",
      url: `${BASE_URL}/${locale}`,
      title: meta.title,
      description: meta.description,
      siteName: "Vidal Reñao — Portfolio",
      images: [
        {
          url: "/Photo.jpg",
          width: 800,
          height: 800,
          alt: "Vidal Reñao — Fullstack AI Engineer & Systems Administrator",
        },
      ],
      locale: locale === "de" ? "de_CH" : locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/Photo.jpg"],
      creator: "@vidalrenao",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${BASE}/#webpage`,
    name: "Vidal Reñao — Fullstack AI Engineer & Systems Administrator",
    url: BASE,
    description:
      "Fullstack AI Engineer and Systems Administrator based in Basel, Switzerland. SaaS, AI automation, Microsoft 365, Windows Server, Entra ID and enterprise networks.",
    mainEntity: {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      name: "Vidal Reñao",
      jobTitle: "Fullstack AI Engineer & Systems Administrator",
      url: BASE,
      image: `${BASE}/Photo.jpg`,
      email: "vidalrenao.lab@outlook.com",
      telephone: "+41779726299",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Basel",
        addressRegion: "Basel-Stadt",
        addressCountry: "CH",
      },
      knowsLanguage: ["en", "de", "es"],
      hasOccupation: {
        "@type": "Occupation",
        name: "Fullstack AI Engineer & Systems Administrator",
        occupationLocation: { "@type": "Country", name: "Switzerland" },
        skills:
          "Next.js, TypeScript, Supabase, Claude AI, Web Development, App Development, Windows Server, Active Directory, Linux, VMware, Networking, Microsoft 365, CCNA",
      },
      sameAs: [
        "https://linkedin.com/in/vidalrenao",
        "https://github.com/vidal-renao",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE}/#business`,
    name: "Vidal Reñao — Web, Apps & IT",
    description:
      "Fullstack software and AI solutions, systems administration and infrastructure support for companies across Switzerland and Liechtenstein.",
    url: BASE,
    telephone: "+41779726299",
    email: "vidalrenao.lab@outlook.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Basel",
      addressRegion: "Basel-Stadt",
      addressCountry: "CH",
    },
    areaServed: ["CH", "LI"],
    priceRange: "$$",
    employee: { "@id": `${BASE}/#person` },
  },
];

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
