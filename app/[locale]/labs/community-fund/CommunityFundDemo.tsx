"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatEther } from "viem";
import { sepolia } from "wagmi/chains";
import {
  useBalance,
  useBlockNumber,
  useConnect,
  useConnection,
  useDisconnect,
  useSignMessage,
  useSwitchChain,
} from "wagmi";
import { injected } from "wagmi/connectors";

type Locale = "en" | "de" | "es";
type ProposalId = "privacy" | "learning" | "coordination";

const proposals: Array<{
  id: ProposalId;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  raised: number;
  goal: number;
  contributors: number;
  category: string;
}> = [
  {
    id: "privacy",
    title: {
      en: "Privacy-first community identity",
      de: "Datenschutzorientierte Community-Identitaet",
      es: "Identidad comunitaria con privacidad",
    },
    summary: {
      en: "Portable attestations that prove membership without exposing personal records.",
      de: "Portable Nachweise fuer Mitgliedschaft ohne Offenlegung persoenlicher Daten.",
      es: "Credenciales portables para verificar membresia sin exponer datos personales.",
    },
    raised: 8.42,
    goal: 12,
    contributors: 84,
    category: "Identity",
  },
  {
    id: "learning",
    title: {
      en: "Open learning commons",
      de: "Offene Lernplattform",
      es: "Plataforma abierta de aprendizaje",
    },
    summary: {
      en: "Shared curriculum bounties for community-run research and workshops.",
      de: "Gemeinsame Bounties fuer Community-Forschung und Workshops.",
      es: "Bounties compartidos para investigacion y talleres comunitarios.",
    },
    raised: 14.9,
    goal: 20,
    contributors: 132,
    category: "Education",
  },
  {
    id: "coordination",
    title: {
      en: "Local coordination toolkit",
      de: "Lokales Koordinations-Toolkit",
      es: "Kit de coordinacion local",
    },
    summary: {
      en: "Open-source tools for proposals, events and transparent contribution tracking.",
      de: "Open-Source-Tools fuer Vorschlaege, Events und transparente Beitraege.",
      es: "Herramientas abiertas para propuestas, eventos y seguimiento transparente.",
    },
    raised: 5.16,
    goal: 9,
    contributors: 57,
    category: "Coordination",
  },
];

const ui = {
  en: {
    back: "Back to portfolio",
    badge: "Web3 product laboratory",
    title: "CivicFund",
    subtitle:
      "A privacy-aware public goods interface for discovering initiatives, connecting a wallet and signing support intentions on Sepolia.",
    stack: "Next.js 16 / TypeScript / wagmi / viem / Sepolia",
    verified: "Live blockchain signals",
    demoData: "Proposal cards are product demo data. Wallet state, testnet balance, blocks and signatures are real.",
    wallet: "Wallet",
    connect: "Connect wallet",
    disconnect: "Disconnect",
    noWallet: "Connect an injected wallet such as MetaMask to test the Web3 flow.",
    account: "Connected account",
    network: "Network",
    balance: "Sepolia balance",
    block: "Latest Sepolia block",
    wrongNetwork: "Switch to Sepolia to read your testnet balance and sign safely.",
    switch: "Switch to Sepolia",
    proposals: "Community proposals",
    selected: "Selected initiative",
    contributors: "contributors",
    funded: "funded",
    intention: "Support intention",
    signText:
      "Sign a non-financial support intention. No transaction is sent and no funds leave your wallet.",
    sign: "Sign support intention",
    signed: "Signature captured locally",
    signatureNote: "This EVM signature proves wallet interaction without initiating a donation.",
    architecture: "What this demonstrates",
    bullets: [
      "Wallet connection and chain switching through wagmi connectors.",
      "Sepolia balance and live block reads powered by viem-compatible hooks.",
      "Message signing flow with clear, non-financial consent UX.",
      "Responsive product UI for a community-governed funding concept.",
    ],
  },
  de: {
    back: "Zurueck zum Portfolio",
    badge: "Web3 Produktlabor",
    title: "CivicFund",
    subtitle:
      "Eine datenschutzbewusste Public-Goods-Oberflaeche zum Entdecken von Initiativen, Verbinden einer Wallet und Signieren von Support-Intentionen auf Sepolia.",
    stack: "Next.js 16 / TypeScript / wagmi / viem / Sepolia",
    verified: "Live Blockchain-Signale",
    demoData: "Die Projektkarten sind Demo-Daten. Wallet-Status, Testnet-Saldo, Bloecke und Signaturen sind real.",
    wallet: "Wallet",
    connect: "Wallet verbinden",
    disconnect: "Trennen",
    noWallet: "Verbinde eine Browser-Wallet wie MetaMask, um den Web3-Ablauf zu testen.",
    account: "Verbundenes Konto",
    network: "Netzwerk",
    balance: "Sepolia-Saldo",
    block: "Aktueller Sepolia-Block",
    wrongNetwork: "Wechsle zu Sepolia, um den Testnet-Saldo zu lesen und sicher zu signieren.",
    switch: "Zu Sepolia wechseln",
    proposals: "Community-Vorschlaege",
    selected: "Gewaehlt",
    contributors: "Beitragende",
    funded: "finanziert",
    intention: "Support-Intention",
    signText:
      "Signiere eine nicht finanzielle Unterstuetzungserklaerung. Es wird keine Transaktion gesendet und kein Guthaben bewegt.",
    sign: "Support-Intention signieren",
    signed: "Signatur lokal erfasst",
    signatureNote: "Diese EVM-Signatur belegt Wallet-Interaktion, ohne eine Spende auszuloesen.",
    architecture: "Technischer Nachweis",
    bullets: [
      "Wallet-Verbindung und Chain-Wechsel ueber wagmi Connectors.",
      "Sepolia-Saldo und Live-Blockdaten ueber viem-kompatible Hooks.",
      "Message-Signing mit klarer, nicht finanzieller Einwilligungs-UX.",
      "Responsive Produktoberflaeche fuer Community-finanzierte Initiativen.",
    ],
  },
  es: {
    back: "Volver al portfolio",
    badge: "Laboratorio de producto Web3",
    title: "CivicFund",
    subtitle:
      "Una interfaz de bienes publicos orientada a privacidad para descubrir iniciativas, conectar una wallet y firmar intenciones de apoyo en Sepolia.",
    stack: "Next.js 16 / TypeScript / wagmi / viem / Sepolia",
    verified: "Senales blockchain en vivo",
    demoData: "Las tarjetas son datos de demostracion. Wallet, saldo testnet, bloques y firmas son reales.",
    wallet: "Wallet",
    connect: "Conectar wallet",
    disconnect: "Desconectar",
    noWallet: "Conecta una wallet del navegador como MetaMask para probar el flujo Web3.",
    account: "Cuenta conectada",
    network: "Red",
    balance: "Saldo Sepolia",
    block: "Ultimo bloque Sepolia",
    wrongNetwork: "Cambia a Sepolia para leer el saldo testnet y firmar de forma segura.",
    switch: "Cambiar a Sepolia",
    proposals: "Propuestas comunitarias",
    selected: "Seleccionada",
    contributors: "colaboradores",
    funded: "financiado",
    intention: "Intencion de apoyo",
    signText:
      "Firma una intencion de apoyo no financiera. No se envia ninguna transaccion ni sale saldo de tu wallet.",
    sign: "Firmar intencion de apoyo",
    signed: "Firma capturada localmente",
    signatureNote: "Esta firma EVM demuestra interaccion con wallet sin iniciar una donacion.",
    architecture: "Que demuestra",
    bullets: [
      "Conexion de wallet y cambio de red mediante conectores wagmi.",
      "Saldo Sepolia y lectura de bloques en vivo mediante hooks compatibles con viem.",
      "Firma de mensaje con consentimiento claro y sin operacion financiera.",
      "Interfaz responsive para un concepto de financiacion gobernado por comunidad.",
    ],
  },
} satisfies Record<Locale, {
  back: string;
  badge: string;
  title: string;
  subtitle: string;
  stack: string;
  verified: string;
  demoData: string;
  wallet: string;
  connect: string;
  disconnect: string;
  noWallet: string;
  account: string;
  network: string;
  balance: string;
  block: string;
  wrongNetwork: string;
  switch: string;
  proposals: string;
  selected: string;
  contributors: string;
  funded: string;
  intention: string;
  signText: string;
  sign: string;
  signed: string;
  signatureNote: string;
  architecture: string;
  bullets: string[];
}>;

function shorten(value: string) {
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export default function CommunityFundDemo({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const [selectedId, setSelectedId] = useState<ProposalId>("privacy");
  const connection = useConnection();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const switchChain = useSwitchChain();
  const signMessage = useSignMessage();
  const onSepolia = connection.chainId === sepolia.id;
  const balance = useBalance({
    address: connection.address,
    chainId: sepolia.id,
    query: { enabled: connection.isConnected && onSepolia },
  });
  const block = useBlockNumber({ chainId: sepolia.id, watch: true });
  const selected = proposals.find((proposal) => proposal.id === selectedId) ?? proposals[0];
  const message = useMemo(
    () =>
      [
        "CivicFund support intention",
        `proposal: ${selected.id}`,
        `wallet: ${connection.address ?? "not-connected"}`,
        "network: Sepolia",
        "value: 0 ETH",
        "purpose: public-goods demonstration; no transaction requested",
      ].join("\n"),
    [connection.address, selected.id],
  );

  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_4%,rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(99,102,241,0.18),transparent_28%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,auto,52px_52px,52px_52px]" />
      <div className="relative mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-9">
        <nav className="mb-10 flex items-center justify-between gap-5">
          <Link href={`/${locale}#projects`} className="text-sm text-white/55 transition hover:text-white">
            &larr; {t.back}
          </Link>
          <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-200">
            Sepolia Testnet
          </span>
        </nav>

        <section className="mb-9 grid gap-7 lg:grid-cols-[1fr_350px]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-teal-300">{t.badge}</p>
            <h1 className="mb-5 text-5xl font-semibold tracking-tight md:text-7xl">
              Civic<span className="text-teal-300">Fund</span>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/64 md:text-lg">{t.subtitle}</p>
            <div className="mt-7 inline-flex rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/62">
              {t.stack}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.21em] text-teal-300">{t.verified}</p>
            <p className="mt-3 text-sm leading-6 text-white/56">{t.demoData}</p>
            <div className="mt-6 rounded-2xl border border-white/8 bg-black/25 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/38">{t.block}</div>
              <div className="mt-2 font-mono text-xl text-white">
                {block.data ? `#${block.data.toLocaleString()}` : "--"}
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 md:p-7">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t.proposals}</h2>
              <span className="text-xs text-white/38">MVP / demo</span>
            </div>
            <div className="space-y-4">
              {proposals.map((proposal) => {
                const active = proposal.id === selected.id;
                const completion = Math.round((proposal.raised / proposal.goal) * 100);

                return (
                  <button
                    key={proposal.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(proposal.id);
                      signMessage.reset();
                    }}
                    className={`w-full rounded-2xl border p-5 text-left transition ${
                      active
                        ? "border-teal-300/45 bg-teal-300/[0.08]"
                        : "border-white/8 bg-white/[0.025] hover:border-white/18"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-300/85">{proposal.category}</span>
                      {active && <span className="text-xs text-teal-200">{t.selected}</span>}
                    </div>
                    <h3 className="mb-2 text-base font-medium text-white">{proposal.title[locale]}</h3>
                    <p className="mb-5 text-sm leading-6 text-white/52">{proposal.summary[locale]}</p>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                      <div className="h-full rounded-full bg-teal-300" style={{ width: `${completion}%` }} />
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-white/48">
                      <span>{proposal.raised.toFixed(2)} / {proposal.goal} ETH - {completion}% {t.funded}</span>
                      <span>{proposal.contributors} {t.contributors}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 md:p-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{t.wallet}</h2>
                {connection.isConnected && (
                  <button
                    type="button"
                    onClick={() => disconnect.mutate()}
                    className="text-xs text-white/45 transition hover:text-white"
                  >
                    {t.disconnect}
                  </button>
                )}
              </div>

              {!connection.isConnected ? (
                <>
                  <p className="mb-5 text-sm leading-6 text-white/54">{t.noWallet}</p>
                  <button
                    type="button"
                    onClick={() => connect.mutate({ connector: injected() })}
                    disabled={connect.isPending}
                    className="w-full rounded-xl bg-teal-300 px-5 py-3 text-sm font-semibold text-[#041114] transition hover:bg-teal-200 disabled:opacity-50"
                  >
                    {connect.isPending ? "..." : t.connect}
                  </button>
                  {connect.error && <p className="mt-3 text-xs text-rose-300">{connect.error.message}</p>}
                </>
              ) : (
                <div className="space-y-4">
                  <Signal label={t.account} value={connection.address ? shorten(connection.address) : "--"} mono />
                  <Signal label={t.network} value={connection.chain?.name ?? `Chain ${connection.chainId}`} />
                  {onSepolia ? (
                    <Signal
                      label={t.balance}
                      value={balance.data ? `${Number(formatEther(balance.data.value)).toFixed(4)} ETH` : "--"}
                      mono
                    />
                  ) : (
                    <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.07] p-4">
                      <p className="mb-3 text-xs leading-5 text-amber-100/75">{t.wrongNetwork}</p>
                      <button
                        type="button"
                        onClick={() => switchChain.mutate({ chainId: sepolia.id })}
                        className="rounded-lg border border-amber-200/30 px-3 py-2 text-xs font-medium text-amber-100"
                      >
                        {t.switch}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 md:p-7">
              <h2 className="mb-2 text-lg font-semibold">{t.intention}</h2>
              <p className="mb-5 text-sm leading-6 text-white/54">{t.signText}</p>
              <button
                type="button"
                disabled={!connection.isConnected || !onSepolia || signMessage.isPending}
                onClick={() => signMessage.mutate({ message })}
                className="w-full rounded-xl border border-teal-300/35 bg-teal-300/[0.08] px-5 py-3 text-sm font-semibold text-teal-100 transition hover:bg-teal-300/[0.14] disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30"
              >
                {signMessage.isPending ? "..." : t.sign}
              </button>
              {signMessage.data && (
                <div className="mt-4 rounded-xl border border-teal-300/18 bg-teal-300/[0.06] p-4">
                  <p className="mb-2 text-xs font-semibold text-teal-200">{t.signed}</p>
                  <p className="mb-2 break-all font-mono text-[10px] leading-5 text-white/52">{signMessage.data}</p>
                  <p className="text-xs leading-5 text-white/46">{t.signatureNote}</p>
                </div>
              )}
              {signMessage.error && <p className="mt-3 text-xs text-rose-300">{signMessage.error.message}</p>}
            </section>
          </div>
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <h2 className="mb-6 text-lg font-semibold">{t.architecture}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {t.bullets.map((bullet) => (
              <div key={bullet} className="flex gap-3 rounded-xl border border-white/7 bg-white/[0.025] p-4 text-sm leading-6 text-white/60">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-teal-300" />
                <p>{bullet}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Signal({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/20 p-4">
      <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-white/38">{label}</p>
      <p className={`text-sm text-white/78 ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}
