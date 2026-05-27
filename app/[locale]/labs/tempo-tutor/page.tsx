import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NavBar from "@/components/NavBar";
import { getIntegrationStatus } from "@/lib/tempo-tutor/integrations";
import TempoTutorDemo from "./TempoTutorDemo";

type Locale = "en" | "de" | "es";

function getLocale(locale: string): Locale {
  return locale === "de" || locale === "es" ? locale : "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: getLocale(locale), namespace: "tempoTutorLab" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TempoTutorPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ checkout?: string; connect?: string }>;
}) {
  const { locale } = await params;
  const result = await searchParams;

  return (
    <>
      <NavBar />
      <TempoTutorDemo
        locale={getLocale(locale)}
        integrationStatus={getIntegrationStatus()}
        checkoutResult={result.checkout}
        connectResult={result.connect}
      />
    </>
  );
}
