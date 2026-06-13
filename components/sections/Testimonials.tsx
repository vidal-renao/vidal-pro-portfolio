"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  initials: string;
  url: string;
  urlLabel: string;
};

const avatarColors = [
  { bg: "bg-cyan-500/15", border: "border-cyan-500/20", text: "text-cyan-400" },
  { bg: "bg-emerald-500/15", border: "border-emerald-500/20", text: "text-emerald-400" },
] as const;

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const items = t.raw("items") as TestimonialItem[];

  return (
    <section
      id="testimonials"
      className="py-20 px-6 border-t border-white/[0.04]"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto">
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

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item, i) => {
            const avatar = avatarColors[i % avatarColors.length];
            return (
              <motion.div
                key={item.author}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card rounded-2xl p-5 md:p-8 relative flex flex-col"
              >
                {/* Quote mark */}
                <svg
                  className="absolute top-7 left-8 w-8 h-8 text-emerald-500/20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-white/70 text-sm md:text-base leading-relaxed italic pl-4 pt-2 flex-1">
                  {item.quote}
                </p>

                <div className="mt-7 pt-5 border-t border-white/[0.06] flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl ${avatar.bg} border ${avatar.border} flex items-center justify-center flex-none`}
                    >
                      <span className={`${avatar.text} font-bold text-xs`}>
                        {item.initials}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm leading-snug">
                        {item.author}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5 leading-snug break-words">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 flex-none">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <svg key={s} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400/60 hover:text-cyan-400 transition-colors"
                    >
                      {item.urlLabel}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
