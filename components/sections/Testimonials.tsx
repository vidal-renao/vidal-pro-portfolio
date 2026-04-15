"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      className="py-20 px-6 border-t border-white/[0.04]"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            {t("label")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card rounded-2xl p-8 md:p-10 relative"
        >
          {/* Quote mark */}
          <svg
            className="absolute top-7 left-8 w-8 h-8 text-emerald-500/20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <p className="text-white/70 text-base md:text-lg leading-relaxed italic pl-4 pt-2">
            {t("quote")}
          </p>

          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              {/* Avatar initials */}
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center flex-none">
                <span className="text-cyan-400 font-bold text-sm">NR</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Nadjib Rasuly</p>
                <p className="text-white/40 text-xs mt-0.5">
                  Geschäftsführer · D&apos;Namar GmbH · Basel, Schweiz
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <a
                href="https://www.dnamar.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400/60 hover:text-cyan-400 transition-colors"
              >
                dnamar.ch · April 2026
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
