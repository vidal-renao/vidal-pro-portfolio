"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Experience() {
  const t = useTranslations("experience");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const roles = t.raw("roles") as Array<{
    title: string;
    company: string;
    location: string;
    period: string;
    highlights: string[];
  }>;

  return (
    <section
      id="experience"
      className="py-28 px-6 border-t border-white/[0.04]"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">
            Career
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">{t("subtitle")}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-white/[0.06]" />

          <div className="space-y-10">
            {roles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-6"
              >
                {/* Dot */}
                <div className="relative flex-none">
                  <div
                    className={`w-[23px] h-[23px] rounded-full border-2 flex items-center justify-center z-10 relative ${
                      i === 0
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-white/20 bg-[#060606]"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        i === 0 ? "bg-blue-400" : "bg-white/30"
                      }`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="glass-card rounded-2xl p-6 flex-1 hover:border-white/12 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-white text-base leading-snug">
                        {role.title}
                      </h3>
                      <p className="text-sm text-blue-400 mt-0.5">
                        {role.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-white/50 font-medium">
                        {role.period}
                      </span>
                      <p className="text-xs text-white/30 mt-0.5">
                        {role.location}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-1.5">
                    {role.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/50">
                        <span className="text-blue-500 mt-1 flex-none">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
