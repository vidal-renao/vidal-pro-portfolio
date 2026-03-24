"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ── Certification static data (icons + color themes) ─────────────────────────

const certs = [
  {
    key: "ccna",
    accentColor: "text-cyan-400",
    borderHover: "hover:border-cyan-500/30",
    tagColor: "bg-cyan-500/08 text-cyan-400/80 border-cyan-500/20",
    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    bgGlow: "group-hover:shadow-cyan-500/08",
    verifyHref: "https://www.credly.com/badges",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    issuerIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.258 12C1.258 6.071 6.07 1.258 12 1.258S22.742 6.071 22.742 12 17.929 22.742 12 22.742 1.258 17.929 1.258 12zm3.01 0c0 4.27 3.462 7.732 7.732 7.732s7.732-3.462 7.732-7.732S16.27 4.268 12 4.268 4.268 7.73 4.268 12zm2.967 0A4.768 4.768 0 0112 7.235 4.768 4.768 0 0116.765 12 4.768 4.768 0 0112 16.765 4.768 4.768 0 017.235 12z"/>
      </svg>
    ),
  },
  {
    key: "ai",
    accentColor: "text-violet-400",
    borderHover: "hover:border-violet-500/30",
    tagColor: "bg-violet-500/08 text-violet-400/80 border-violet-500/20",
    badgeColor: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    bgGlow: "group-hover:shadow-violet-500/08",
    verifyHref: "#",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    issuerIcon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    key: "ecommerce",
    accentColor: "text-amber-400",
    borderHover: "hover:border-amber-500/30",
    tagColor: "bg-amber-500/08 text-amber-400/80 border-amber-500/20",
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    bgGlow: "group-hover:shadow-amber-500/08",
    verifyHref: "#",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    issuerIcon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
] as const;

type CertKey = (typeof certs)[number]["key"];

export default function Certifications() {
  const t = useTranslations("certifications");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="certifications"
      className="py-28 px-6 border-t border-white/[0.04] relative overflow-hidden"
      ref={ref}
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-violet-500/04 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-cyan-500/03 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">
            {t("label")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-sm leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* ── Cert cards ── */}
        <div className="grid md:grid-cols-3 gap-5">
          {certs.map((cert, i) => {
            const tags = t.raw(`${cert.key}_tags`) as string[];
            return (
              <motion.div
                key={cert.key}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className={`group glass-card rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 hover:shadow-xl ${cert.borderHover} ${cert.bgGlow}`}
              >
                {/* Icon + title */}
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] ${cert.accentColor} flex-none`}>
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-base leading-tight">
                      {t(`${cert.key}_title`)}
                    </h3>
                    {/* Issuer badge */}
                    <div className={`inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${cert.badgeColor}`}>
                      <span className={cert.accentColor}>{cert.issuerIcon}</span>
                      {t(`${cert.key}_issuer`)}
                    </div>
                  </div>
                </div>

                {/* Guarantee headline */}
                <div className="flex flex-col gap-1">
                  <p className={`text-xs font-bold uppercase tracking-wider ${cert.accentColor}`}>
                    {t(`${cert.key}_guarantee_label`)}
                  </p>
                  <p className="text-sm font-semibold text-white leading-snug">
                    {t(`${cert.key}_guarantee`)}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed flex-1">
                  {t(`${cert.key}_desc`)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className={`text-[10.5px] font-medium border rounded-full px-2.5 py-0.5 ${cert.tagColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Verify button */}
                <a
                  href={cert.verifyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full rounded-xl py-2.5 text-xs font-semibold border transition-all duration-200 ${cert.badgeColor} hover:brightness-125`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  {t(`${cert.key}_verify`)}
                  <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom trust strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 glass-card rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-none">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{t("trust_title")}</p>
              <p className="text-xs text-white/40 mt-0.5">{t("trust_subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
            {(t.raw("trust_badges") as string[]).map((badge: string) => (
              <span key={badge} className="text-[10.5px] font-medium border border-white/[0.08] rounded-full px-3 py-1 text-white/50">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
