import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: "Vidal Reñao — IT Infrastructure & AI Solutions Engineer",
    description: isEn
      ? "IT Infrastructure & AI Solutions Engineer in Basel, Switzerland. Azure · M365 · Entra ID · Intune · Claude AI · Next.js · CCNA"
      : "IT Infrastructure & AI Solutions Engineer in Basel, Schweiz. Azure · M365 · Entra ID · Intune · Claude AI · Next.js · CCNA",
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", de: "/de" },
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
