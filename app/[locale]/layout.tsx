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
    title: "Vidal Reñao — Fullstack Developer & IT Specialist",
    description:
      "Websites, apps and AI automation for your business — gyms, restaurants, salons, clinics, shops and agencies. Fullstack developer & IT specialist in Basel: Next.js, AI, Windows, Linux, networks, Microsoft 365, CCNA.",
  },
  de: {
    title: "Vidal Reñao — Fullstack-Entwickler & IT-Spezialist",
    description:
      "Websites, Apps und KI-Automatisierung für dein Unternehmen — Fitnessstudios, Restaurants, Friseure, Praxen, Läden und Agenturen. Fullstack-Entwickler & IT-Spezialist in Basel: Next.js, KI, Windows, Linux, Netzwerke, Microsoft 365, CCNA.",
  },
  es: {
    title: "Vidal Reñao — Desarrollador Fullstack & Especialista IT",
    description:
      "Webs, apps y automatización con IA para tu negocio — gimnasios, restaurantes, peluquerías, clínicas, tiendas y agencias. Desarrollador fullstack y especialista IT en Basilea: Next.js, IA, Windows, Linux, redes, Microsoft 365, CCNA.",
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
          alt: "Vidal Reñao — Fullstack Developer & IT Specialist",
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
    name: "Vidal Reñao — Fullstack Developer & IT Specialist",
    url: BASE,
    description:
      "Fullstack developer & IT specialist based in Basel, Switzerland. Websites, apps and AI automation for businesses of every sector, plus systems administration: Windows, Linux, networks and Microsoft 365.",
    mainEntity: {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      name: "Vidal Reñao",
      jobTitle: "Fullstack Developer & IT Specialist",
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
        name: "Fullstack Developer & IT Specialist",
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
      "Websites, apps, AI automation and IT support for small businesses of every sector — gyms, restaurants, salons, clinics and shops. Available across Switzerland and Liechtenstein.",
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
