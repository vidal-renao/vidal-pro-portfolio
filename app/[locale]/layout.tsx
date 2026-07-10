import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ServiceWorkerRegistration } from "@/app/components/sw-register";
import { Geist, Geist_Mono } from "next/font/google";
import { BrightnessControl } from "@/components/ui/BrightnessControl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://vidal-pro-portfolio.vercel.app";
const BASE = BASE_URL;

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Vidal Reñao — Senior Fullstack & AI Developer",
    description:
      "Senior Fullstack & AI Developer in Basel, Switzerland. Next.js · TypeScript · Supabase · Claude AI · AI Agents · RAG · Digital Personal Branding · HR-Tech · CCNA",
  },
  de: {
    title: "Vidal Reñao — Senior Fullstack & AI Developer",
    description:
      "Senior Fullstack & AI Developer in Basel, Schweiz. Next.js · TypeScript · Supabase · Claude AI · KI-Agenten · RAG · Digitale Personenmarke · HR-Tech · CCNA",
  },
  es: {
    title: "Vidal Reñao — Senior Fullstack & AI Developer",
    description:
      "Senior Fullstack & AI Developer en Basilea, Suiza. Next.js · TypeScript · Supabase · Claude AI · Agentes IA · RAG · Imagen Personal Digital · RRHH-Tech · CCNA",
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
          alt: "Vidal Reñao — Senior Fullstack & AI Developer",
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
    name: "Vidal Reñao — Senior Fullstack & AI Developer",
    url: BASE,
    description:
      "Senior Fullstack & AI Developer based in Basel, Switzerland. Next.js, TypeScript, Supabase, Claude AI agents, digital personal branding, and HR-tech.",
    mainEntity: {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      name: "Vidal Reñao",
      jobTitle: "Senior Fullstack & AI Developer",
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
        name: "Senior Fullstack & AI Developer",
        occupationLocation: { "@type": "Country", name: "Switzerland" },
        skills:
          "Next.js, TypeScript, Supabase, PostgreSQL, Claude AI, AI Agents, RAG, MCP, Digital Personal Branding, HR-Tech, CCNA",
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
    name: "Vidal Reñao — Fullstack & AI Development",
    description:
      "Fullstack & AI development, AI-powered SaaS, and digital personal branding for Swiss SMEs. Available across Switzerland and Liechtenstein.",
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

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-[#060606] text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ServiceWorkerRegistration />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <BrightnessControl />
      </body>
    </html>
  );
}
