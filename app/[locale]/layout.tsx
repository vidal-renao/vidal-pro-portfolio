import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ServiceWorkerRegistration } from "@/app/components/sw-register";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://vidal-pro-portfolio.vercel.app";

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Vidal Reñao — IT Infrastructure & AI Solutions Engineer",
    description:
      "IT Infrastructure & AI Solutions Engineer in Basel, Switzerland. Azure · M365 · Entra ID · Intune · Claude AI · Next.js · CCNA",
  },
  de: {
    title: "Vidal Reñao — IT-Infrastruktur & KI-Lösungsingenieur",
    description:
      "IT-Infrastruktur & KI-Lösungsingenieur in Basel, Schweiz. Azure · M365 · Entra ID · Intune · Claude AI · Next.js · CCNA",
  },
  es: {
    title: "Vidal Reñao — Ingeniero de Infraestructura IT & Soluciones IA",
    description:
      "Ingeniero de Infraestructura IT & Soluciones IA en Basilea, Suiza. Azure · M365 · Entra ID · Intune · Claude AI · Next.js · CCNA",
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
          alt: "Vidal Reñao — IT Infrastructure & AI Solutions Engineer",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vidal Reñao",
  jobTitle: "IT Infrastructure & AI Solutions Engineer",
  url: "https://vidal-pro-portfolio.vercel.app",
  image: "https://vidal-pro-portfolio.vercel.app/Photo.jpg",
  email: "vidalrenao.lab@outlook.com",
  telephone: "+41779726299",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Basel",
    addressCountry: "CH",
  },
  sameAs: [
    "https://linkedin.com/in/vidalrenao",
    "https://github.com/vidal-renao",
  ],
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#060606] text-white antialiased">
        <ServiceWorkerRegistration />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
