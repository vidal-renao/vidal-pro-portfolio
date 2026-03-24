"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// ── Service card data (icons + colors, labels from i18n) ──────────────────────

type ServiceKey = "cloud" | "apps" | "network";

const services: Array<{
  key: ServiceKey;
  icon: React.ReactNode;
  accentColor: string;
  borderHover: string;
  tagColor: string;
  benefitColor: string;
  bgGlow: string;
}> = [
  {
    key: "cloud",
    accentColor: "text-blue-400",
    borderHover: "hover:border-blue-500/25",
    tagColor: "bg-blue-500/08 text-blue-400/80 border-blue-500/20",
    benefitColor: "text-blue-300",
    bgGlow: "group-hover:shadow-blue-500/08",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    key: "apps",
    accentColor: "text-violet-400",
    borderHover: "hover:border-violet-500/25",
    tagColor: "bg-violet-500/08 text-violet-400/80 border-violet-500/20",
    benefitColor: "text-violet-300",
    bgGlow: "group-hover:shadow-violet-500/08",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" />
      </svg>
    ),
  },
  {
    key: "network",
    accentColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/25",
    tagColor: "bg-emerald-500/08 text-emerald-400/80 border-emerald-500/20",
    benefitColor: "text-emerald-300",
    bgGlow: "group-hover:shadow-emerald-500/08",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
];

export default function Services() {
  const t = useTranslations("services");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="py-28 px-6 border-t border-white/[0.04] relative overflow-hidden"
      ref={ref}
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/04 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            {t("label")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-sm leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* ── Service cards ── */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {services.map((svc, i) => {
            const tags = t.raw(`${svc.key}_tags`) as string[];
            return (
              <motion.div
                key={svc.key}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className={`group glass-card rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 hover:shadow-xl ${svc.borderHover} ${svc.bgGlow}`}
              >
                {/* Icon + title */}
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] ${svc.accentColor} flex-none`}>
                    {svc.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base leading-tight">
                      {t(`${svc.key}_title`)}
                    </h3>
                    {/* Benefit headline */}
                    <p className={`text-xs font-semibold mt-1 ${svc.benefitColor}`}>
                      {t(`${svc.key}_benefit`)}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed flex-1">
                  {t(`${svc.key}_desc`)}
                </p>

                {/* Case study (apps only) */}
                {svc.key === "apps" && (
                  <p className="text-xs text-violet-400/70 italic border-l-2 border-violet-500/30 pl-3">
                    {t("apps_case")}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className={`text-[10.5px] font-medium border rounded-full px-2.5 py-0.5 ${svc.tagColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-semibold text-white text-lg">
              {t("cta")}
            </p>
            <p className="text-sm text-white/40 mt-1">
              Basel, Switzerland · Liechtenstein · Remote
            </p>
          </div>

          <div className="flex items-center gap-3 flex-none">
            <a
              href="#contact"
              className="group flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-full px-7 py-3 text-sm transition-all duration-200 shadow-lg shadow-blue-500/20"
            >
              {t("cta")}
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="mailto:vidal-31@hotmail.com"
              className="flex items-center gap-2 border border-white/[0.1] hover:border-white/20 text-white/60 hover:text-white rounded-full px-5 py-3 text-sm transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
