"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import DownloadCVButton from "@/components/ui/DownloadCVButton";

type Locale = "en" | "de" | "es";

interface HeroProps {
  locale?: Locale;
}

export default function Hero({ locale = "en" }: HeroProps) {
  const t = useTranslations("hero");

  return (
    <section className="relative flex flex-col justify-center overflow-hidden grid-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-violet-500/6 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 pt-20">
        <div className="grid sm:min-h-[calc(100vh-120px)] items-center gap-6 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex flex-col items-start gap-6 lg:order-1">
            <div className="flex flex-col gap-2">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex w-fit items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-1.5 text-xs text-white/60"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t("badge")}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex w-fit items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/5 px-4 py-1.5 text-xs text-amber-300/80"
              >
                <span className="text-sm leading-none">CH</span>
                {t("availability_swiss")}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="flex w-fit items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-1.5 text-xs text-sky-200/85"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                {t("sectors")}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/40">
                {t("title")}
              </p>
              <h1 className="gradient-text text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[42px]">
                {t("title2")}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex flex-col gap-2"
            >
              <p className="max-w-lg text-sm leading-relaxed text-white/50 md:text-base">
                {t("subtitle")}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-white/30">
                <svg className="h-3.5 w-3.5 flex-none text-blue-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t("collaboration")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.a
                href={`/${locale}/consultation`}
                className="group flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-400"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {t("cta_primary")}
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
              <DownloadCVButton locale={locale} variant="ghost" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="flex w-full items-center gap-4 sm:gap-8 border-t border-white/[0.06] pt-6"
            >
              {[
                { value: t("stat1_value"), label: t("stat1_label") },
                { value: t("stat2_value"), label: t("stat2_label") },
                { value: t("stat3_value"), label: t("stat3_label") },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col gap-1"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-white/35">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 scale-125 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 opacity-20 blur-3xl" />
              <div className="absolute inset-0 scale-105 rounded-full bg-gradient-to-bl from-blue-400/30 to-violet-600/20 blur-xl" />

              <div className="relative rounded-full bg-gradient-to-tr from-blue-500 via-violet-400 to-blue-400 p-[3px]">
                <div className="rounded-full bg-[#060606] p-[3px]">
                  <div className="relative h-50 w-50 overflow-hidden rounded-full sm:h-65 sm:w-65 md:h-80 md:w-80 lg:h-90 lg:w-90">
                    <Image
                      src="/Photo.jpg"
                      alt="Vidal Reñao — Fullstack Developer & IT Specialist"
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 640px) 200px, (max-width: 768px) 260px, (max-width: 1024px) 320px, 360px"
                    />
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="glass-card absolute -bottom-3 -left-4 flex items-center gap-2 rounded-xl border border-white/[0.1] px-3 py-2"
              >
                <span className="text-base">CH</span>
                <div>
                  <p className="text-xs font-semibold leading-none text-white">Basel, Switzerland</p>
                  <p className="mt-0.5 text-[10px] text-white/40">EN C1 · DE B2 · ES Native</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="glass-card absolute -right-4 -top-2 flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/5 px-3 py-2"
              >
                <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-xs font-semibold text-blue-300">Web · Apps · IT</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      </motion.div>
    </section>
  );
}
