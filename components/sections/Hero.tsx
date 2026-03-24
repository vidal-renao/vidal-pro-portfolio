"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/08 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/06 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-120px)]">

          {/* ── Left: Text content ── */}
          <div className="flex flex-col items-start gap-6 order-2 lg:order-1">

            {/* Badge row */}
            <div className="flex flex-col gap-2">
              {/* Open to Work badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 border border-white/[0.1] rounded-full px-4 py-1.5 text-xs text-white/60 bg-white/[0.03] w-fit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t("badge")}
              </motion.div>

              {/* Availability Switzerland + Liechtenstein badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-2 border border-amber-500/25 rounded-full px-4 py-1.5 text-xs text-amber-300/80 bg-amber-500/05 w-fit"
              >
                <span className="text-sm leading-none">🇨🇭</span>
                {t("availability_swiss")}
              </motion.div>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none text-white"
            >
              {t("title")}
              <br />
              <span className="gradient-text">{t("title2")}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex flex-col gap-2"
            >
              <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-lg">
                {t("subtitle")}
              </p>
              {/* Collaboration line */}
              <p className="text-xs text-white/30 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-blue-400/60 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t("collaboration")}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-full px-6 py-3 text-sm transition-all duration-200 shadow-lg shadow-blue-500/20"
              >
                {t("cta_primary")}
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 border border-white/[0.1] hover:border-white/20 text-white/70 hover:text-white font-semibold rounded-full px-6 py-3 text-sm transition-all duration-200"
              >
                {t("cta_secondary")}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="flex items-center gap-8 pt-6 border-t border-white/[0.06] w-full"
            >
              {[
                { value: t("stat1_value"), label: t("stat1_label") },
                { value: t("stat2_value"), label: t("stat2_label") },
                { value: t("stat3_value"), label: t("stat3_label") },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-xs text-white/35 font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              {/* Outer diffused glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 blur-3xl opacity-20 scale-125" />
              {/* Second glow layer */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-blue-400/30 to-violet-600/20 blur-xl scale-105" />

              {/* Gradient ring border */}
              <div className="relative rounded-full p-[3px] bg-gradient-to-tr from-blue-500 via-violet-400 to-blue-400">
                <div className="rounded-full p-[3px] bg-[#060606]">
                  <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full overflow-hidden">
                    <Image
                      src="/Photo.jpg"
                      alt="Vidal Reñao — Cloud Infrastructure Consultant"
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 360px"
                    />
                  </div>
                </div>
              </div>

              {/* Badge — bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -bottom-3 -left-4 glass-card rounded-xl px-3 py-2 flex items-center gap-2 border border-white/[0.1]"
              >
                <span className="text-base">🇨🇭</span>
                <div>
                  <p className="text-xs font-semibold text-white leading-none">Basel, Switzerland</p>
                  <p className="text-[10px] text-white/40 mt-0.5">EN C1 · DE B2 · ES Native</p>
                </div>
              </motion.div>

              {/* Badge — top right */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-2 -right-4 glass-card rounded-xl px-3 py-2 flex items-center gap-2 border border-amber-500/20 bg-amber-500/05"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-xs font-semibold text-amber-300">CH + FL</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      </motion.div>
    </section>
  );
}
