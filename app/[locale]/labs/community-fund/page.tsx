import type { Metadata } from "next";
import CommunityFundDemo from "./CommunityFundDemo";
import Web3Providers from "@/components/web3/Web3Providers";

type Locale = "en" | "de" | "es";

const content: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "CivicFund Web3 Lab | Vidal Renao",
    description:
      "A Web3 public-goods funding interface built with Next.js, TypeScript, wagmi and viem on Sepolia.",
  },
  de: {
    title: "CivicFund Web3 Lab | Vidal Renao",
    description:
      "Eine Web3-Finanzierungsoberflaeche fuer Public Goods mit Next.js, TypeScript, wagmi und viem auf Sepolia.",
  },
  es: {
    title: "CivicFund Web3 Lab | Vidal Renao",
    description:
      "Interfaz Web3 para financiacion de bienes publicos creada con Next.js, TypeScript, wagmi y viem sobre Sepolia.",
  },
};

function getLocale(locale: string): Locale {
  return locale === "de" || locale === "es" ? locale : "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = content[getLocale(locale)];

  return {
    title: copy.title,
    description: copy.description,
  };
}

export default async function CommunityFundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <Web3Providers>
      <CommunityFundDemo locale={getLocale(locale)} />
    </Web3Providers>
  );
}
