import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NavBar from "@/components/NavBar";
import CommunityFundDemo from "./CommunityFundDemo";
import Web3Providers from "@/components/web3/Web3Providers";

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
  const t = await getTranslations({ locale: getLocale(locale), namespace: "web3Lab" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CommunityFundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <NavBar />
      <Web3Providers>
        <CommunityFundDemo locale={getLocale(locale)} />
      </Web3Providers>
    </>
  );
}
