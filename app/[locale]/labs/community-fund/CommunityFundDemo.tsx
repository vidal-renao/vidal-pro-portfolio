"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
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
  raised: number;
  goal: number;
  contributors: number;
}> = [
  {
    id: "privacy",
    raised: 8.42,
    goal: 12,
    contributors: 84,
  },
  {
    id: "learning",
    raised: 14.9,
    goal: 20,
    contributors: 132,
  },
  {
    id: "coordination",
    raised: 5.16,
    goal: 9,
    contributors: 57,
  },
];

type ProposalCopy = Record<ProposalId, {
  category: string;
  title: string;
  summary: string;
}>;

function shorten(value: string) {
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export default function CommunityFundDemo({ locale }: { locale: Locale }) {
  const t = useTranslations("web3Lab");
  const proposalCopy = t.raw("proposalItems") as ProposalCopy;
  const bullets = t.raw("bullets") as string[];
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
        t("messageTitle"),
        `${t("messageProposal")}: ${selected.id}`,
        `${t("messageWallet")}: ${connection.address ?? t("notConnected")}`,
        `${t("messageNetwork")}: Sepolia`,
        `${t("messageValue")}: 0 ETH`,
        `${t("messagePurpose")}: ${t("messageNoTransaction")}`,
      ].join("\n"),
    [connection.address, selected.id, t],
  );

  return (
    <main className="grid-bg min-h-screen bg-[#060606] pt-20 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_4%,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(139,92,246,0.15),transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-8 md:py-12">
        <nav className="mb-10 flex items-center justify-between gap-5">
          <Link href={`/${locale}#projects`} className="text-sm text-white/55 transition hover:text-white">
            &larr; {t("back")}
          </Link>
          <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">
            Sepolia Testnet
          </span>
        </nav>

        <section className="mb-9 grid gap-7 lg:grid-cols-[1fr_350px]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-blue-400">{t("badge")}</p>
            <h1 className="mb-5 text-5xl font-semibold tracking-tight md:text-7xl">
              {t("titlePrefix")}<span className="gradient-text">{t("titleAccent")}</span>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/64 md:text-lg">{t("subtitle")}</p>
            <div className="mt-7 inline-flex rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/62">
              {t("stack")}
            </div>
          </div>
          <div className="glass-card rounded-3xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.21em] text-blue-400">{t("verified")}</p>
            <p className="mt-3 text-sm leading-6 text-white/56">{t("demoData")}</p>
            <div className="mt-6 rounded-2xl border border-white/8 bg-black/25 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/38">{t("block")}</div>
              <div className="mt-2 font-mono text-xl text-white">
                {block.data ? `#${block.data.toLocaleString()}` : "--"}
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <section className="glass-card rounded-3xl p-5 md:p-7">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t("proposals")}</h2>
              <span className="text-xs text-white/38">{t("demoBadge")}</span>
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
                        ? "border-blue-400/45 bg-blue-400/[0.08]"
                        : "border-white/8 bg-white/[0.025] hover:border-white/18"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">{proposalCopy[proposal.id].category}</span>
                      {active && <span className="text-xs text-blue-300">{t("selected")}</span>}
                    </div>
                    <h3 className="mb-2 text-base font-medium text-white">{proposalCopy[proposal.id].title}</h3>
                    <p className="mb-5 text-sm leading-6 text-white/52">{proposalCopy[proposal.id].summary}</p>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                      <div className="h-full rounded-full bg-blue-400" style={{ width: `${completion}%` }} />
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-white/48">
                      <span>{proposal.raised.toFixed(2)} / {proposal.goal} ETH - {completion}% {t("funded")}</span>
                      <span>{proposal.contributors} {t("contributors")}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="space-y-6">
            <section className="glass-card rounded-3xl p-5 md:p-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{t("wallet")}</h2>
                {connection.isConnected && (
                  <button
                    type="button"
                    onClick={() => disconnect.mutate()}
                    className="text-xs text-white/45 transition hover:text-white"
                  >
                    {t("disconnect")}
                  </button>
                )}
              </div>

              {!connection.isConnected ? (
                <>
                  <p className="mb-5 text-sm leading-6 text-white/54">{t("noWallet")}</p>
                  <button
                    type="button"
                    onClick={() => connect.mutate({ connector: injected() })}
                    disabled={connect.isPending}
                    className="w-full rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 disabled:opacity-50"
                  >
                    {connect.isPending ? "..." : t("connect")}
                  </button>
                  {connect.error && <p className="mt-3 text-xs text-rose-300">{connect.error.message}</p>}
                </>
              ) : (
                <div className="space-y-4">
                  <Signal label={t("account")} value={connection.address ? shorten(connection.address) : "--"} mono />
                  <Signal label={t("network")} value={connection.chain?.name ?? `Chain ${connection.chainId}`} />
                  {onSepolia ? (
                    <Signal
                      label={t("balance")}
                      value={balance.data ? `${Number(formatEther(balance.data.value)).toFixed(4)} ETH` : "--"}
                      mono
                    />
                  ) : (
                    <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.07] p-4">
                      <p className="mb-3 text-xs leading-5 text-amber-100/75">{t("wrongNetwork")}</p>
                      <button
                        type="button"
                        onClick={() => switchChain.mutate({ chainId: sepolia.id })}
                        className="rounded-lg border border-amber-200/30 px-3 py-2 text-xs font-medium text-amber-100"
                      >
                        {t("switch")}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="glass-card rounded-3xl p-5 md:p-7">
              <h2 className="mb-2 text-lg font-semibold">{t("intention")}</h2>
              <p className="mb-5 text-sm leading-6 text-white/54">{t("signText")}</p>
              <button
                type="button"
                disabled={!connection.isConnected || !onSepolia || signMessage.isPending}
                onClick={() => signMessage.mutate({ message })}
                className="w-full rounded-xl border border-blue-400/35 bg-blue-400/[0.08] px-5 py-3 text-sm font-semibold text-blue-100 transition hover:bg-blue-400/[0.14] disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30"
              >
                {signMessage.isPending ? "..." : t("sign")}
              </button>
              {signMessage.data && (
                <div className="mt-4 rounded-xl border border-blue-400/18 bg-blue-400/[0.06] p-4">
                  <p className="mb-2 text-xs font-semibold text-blue-200">{t("signed")}</p>
                  <p className="mb-2 break-all font-mono text-[10px] leading-5 text-white/52">{signMessage.data}</p>
                  <p className="text-xs leading-5 text-white/46">{t("signatureNote")}</p>
                </div>
              )}
              {signMessage.error && <p className="mt-3 text-xs text-rose-300">{signMessage.error.message}</p>}
            </section>
          </div>
        </div>

        <section className="glass-card mt-6 rounded-3xl p-6 md:p-8">
          <h2 className="mb-6 text-lg font-semibold">{t("architecture")}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {bullets.map((bullet) => (
              <div key={bullet} className="flex gap-3 rounded-xl border border-white/7 bg-white/[0.025] p-4 text-sm leading-6 text-white/60">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-400" />
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
