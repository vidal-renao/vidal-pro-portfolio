"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ── Credential data (visual props live here; copy lives in i18n) ──────────────

type Family = "violet" | "fuchsia" | "sky" | "cyan" | "amber";

interface Credential {
  key: string;
  family: Family;
  monogram: string;
  pdf: string;
}

const credentials: Credential[] = [
  { key: "ai_agentprog", family: "violet", monogram: "AI", pdf: "/assets/certs/ai-agent-programming.pdf" },
  { key: "ai_agents", family: "fuchsia", monogram: "AI", pdf: "/assets/certs/ai-zero-to-agents.pdf" },
  { key: "ai_production", family: "sky", monogram: "AI", pdf: "/assets/certs/ai-zero-to-production.pdf" },
  { key: "ccna", family: "cyan", monogram: "CC", pdf: "/assets/certs/CCNA-Cisco.pdf" },
  { key: "diploma", family: "amber", monogram: "DAI", pdf: "/assets/certs/Diplom.pdf" },
];

// Full literal class names so Tailwind's JIT keeps them.
const familyStyles: Record<
  Family,
  { text: string; bar: string; seal: string; badge: string; hoverBorder: string; glow: string; tag: string }
> = {
  violet: {
    text: "text-violet-300",
    bar: "bg-violet-500/70",
    seal: "border-violet-500/30 bg-violet-500/10 text-violet-200",
    badge: "border-violet-500/25 bg-violet-500/10 text-violet-300",
    hoverBorder: "hover:border-violet-500/40",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(139,92,246,0.5)]",
    tag: "border-violet-500/20 bg-violet-500/[0.06] text-violet-200/80",
  },
  fuchsia: {
    text: "text-fuchsia-300",
    bar: "bg-fuchsia-500/70",
    seal: "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-200",
    badge: "border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-300",
    hoverBorder: "hover:border-fuchsia-500/40",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(217,70,239,0.5)]",
    tag: "border-fuchsia-500/20 bg-fuchsia-500/[0.06] text-fuchsia-200/80",
  },
  sky: {
    text: "text-sky-300",
    bar: "bg-sky-500/70",
    seal: "border-sky-500/30 bg-sky-500/10 text-sky-200",
    badge: "border-sky-500/25 bg-sky-500/10 text-sky-300",
    hoverBorder: "hover:border-sky-500/40",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(14,165,233,0.5)]",
    tag: "border-sky-500/20 bg-sky-500/[0.06] text-sky-200/80",
  },
  cyan: {
    text: "text-cyan-300",
    bar: "bg-cyan-500/70",
    seal: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
    badge: "border-cyan-500/25 bg-cyan-500/10 text-cyan-300",
    hoverBorder: "hover:border-cyan-500/40",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(6,182,212,0.5)]",
    tag: "border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-200/80",
  },
  amber: {
    text: "text-amber-300",
    bar: "bg-amber-500/70",
    seal: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    badge: "border-amber-500/25 bg-amber-500/10 text-amber-300",
    hoverBorder: "hover:border-amber-500/40",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(245,158,11,0.5)]",
    tag: "border-amber-500/20 bg-amber-500/[0.06] text-amber-200/80",
  },
};

function CredentialCard({
  credential,
  index,
  inView,
}: {
  credential: Credential;
  index: number;
  inView: boolean;
}) {
  const t = useTranslations("certifications");
  const s = familyStyles[credential.family];
  const k = credential.key;
  const year = t(`${k}_year`);
  const tags = t.raw(`${k}_tags`) as string[];

  return (
    <motion.a
      href={credential.pdf}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl glass-card p-5 pl-6 transition-all duration-300 ${s.hoverBorder} ${s.glow}`}
    >
      {/* Left accent bar — signature device */}
      <span className={`absolute inset-y-0 left-0 w-1 ${s.bar}`} aria-hidden="true" />

      {/* Top row: seal + verified/year meta */}
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl border text-sm font-black tracking-tight ${s.seal}`}
        >
          {credential.monogram}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${s.badge}`}
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {t("verified")}
          </span>
          {year && (
            <span className="font-mono text-[10px] tracking-wider text-white/30">{year}</span>
          )}
        </div>
      </div>

      {/* Meaning eyebrow + title */}
      <div className="flex flex-col gap-1.5">
        <p className={`text-[11px] font-semibold ${s.text}`}>{t(`${k}_meaning`)}</p>
        <h3 className="text-base font-bold leading-snug text-white">{t(`${k}_title`)}</h3>
        <p className="font-mono text-[11px] tracking-tight text-white/35">{t(`${k}_issuer`)}</p>
      </div>

      {/* Description */}
      <p className="flex-1 text-[13px] leading-relaxed text-white/50">{t(`${k}_desc`)}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium ${s.tag}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Open certificate action */}
      <div className="mt-1 flex items-center gap-2 border-t border-white/5 pt-3.5">
        <svg className={`h-4 w-4 flex-none ${s.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <span className="text-xs font-semibold text-white/70 transition-colors group-hover:text-white">
          {t("open")}
        </span>
        <svg
          className="ml-auto h-3.5 w-3.5 flex-none text-white/25 transition-all group-hover:translate-x-0.5 group-hover:text-white/55"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </div>
    </motion.a>
  );
}

export default function Certifications() {
  const t = useTranslations("certifications");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-white/4 px-4 py-12 sm:px-6 sm:py-20 lg:py-28"
      ref={ref}
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-0 h-100 w-150 rounded-full bg-violet-500/4 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 h-75 w-100 rounded-full bg-cyan-500/3 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12 lg:mb-16"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
            {t("label")}
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/50">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Credential grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((c, i) => (
            <CredentialCard key={c.key} credential={c} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl glass-card px-4 py-4 sm:mt-10 sm:flex-row sm:px-8 sm:py-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
              <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{t("trust_title")}</p>
              <p className="mt-0.5 text-xs text-white/40">{t("trust_subtitle")}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            {(t.raw("trust_badges") as string[]).map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/8 px-3 py-1 text-[10.5px] font-medium text-white/50"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
