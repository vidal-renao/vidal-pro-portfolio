import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
