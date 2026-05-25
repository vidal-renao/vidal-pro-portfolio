"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type ProjectTranslation = {
  title: string;
  description: string;
  tags: string[];
  metrics: string[];
  status: string;
};

type ArchitectureTranslation = {
  label: string;
  title: string;
  intro: string;
  achievements: string[];
  stack: string[];
};

type ColorKey = "violet" | "blue" | "emerald" | "cyan" | "amber" | "rose" | "indigo";

const projectStatic: {
  color: ColorKey;
  githubUrl: string;
  demoUrl: string | null;
  dsg?: boolean;
}[] = [
  { color: "cyan",    githubUrl: "https://github.com/vidal-renao/limpiezas-najip-maritza", demoUrl: "https://www.dnamar.ch" },
  { color: "amber",   githubUrl: "https://github.com/vidal-renao/ticket-system",           demoUrl: "https://ticket-system-sigma-pink.vercel.app", dsg: true },
  { color: "rose",    githubUrl: "https://github.com/vidal-renao/vidal-helpdesk-mcp",      demoUrl: "https://vidal-helpdesk-mcp.vercel.app/health" },
  { color: "violet",  githubUrl: "https://github.com/vidal-renao/matchpoint-ai",           demoUrl: "https://matchpoint-gq5tnfo93-vidal-renaos-projects.vercel.app" },
  { color: "blue",    githubUrl: "https://github.com/vidal-renao/invoice-auto",            demoUrl: "https://invoice-auto-3xjvcf07t-vidal-renaos-projects.vercel.app" },
  { color: "emerald", githubUrl: "https://github.com/vidal-renao/cv-platform",             demoUrl: "https://cv-platform-fzmv9ksb4-vidal-renaos-projects.vercel.app" },
];

const colorMap: Record<ColorKey, { badge: string; tag: string; dot: string; border: string }> = {
  amber: { badge: "bg-amber-500/10 text-amber-400 border-amber-500/20", tag: "bg-amber-500/08 text-amber-400/80 border-amber-500/15", dot: "bg-amber-400", border: "hover:border-amber-500/20" },
  blue: { badge: "bg-blue-500/10 text-blue-400 border-blue-500/20", tag: "bg-blue-500/08 text-blue-400/80 border-blue-500/15", dot: "bg-blue-400", border: "hover:border-blue-500/20" },
  violet: { badge: "bg-violet-500/10 text-violet-400 border-violet-500/20", tag: "bg-violet-500/08 text-violet-400/80 border-violet-500/15", dot: "bg-violet-400", border: "hover:border-violet-500/20" },
  emerald: { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", tag: "bg-emerald-500/08 text-emerald-400/80 border-emerald-500/15", dot: "bg-emerald-400", border: "hover:border-emerald-500/20" },
  cyan: { badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", tag: "bg-cyan-500/08 text-cyan-400/80 border-cyan-500/15", dot: "bg-cyan-400", border: "hover:border-cyan-500/20" },
  rose: { badge: "bg-rose-500/10 text-rose-400 border-rose-500/20", tag: "bg-rose-500/08 text-rose-400/80 border-rose-500/15", dot: "bg-rose-400", border: "hover:border-rose-500/20" },
  indigo: { badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", tag: "bg-indigo-500/08 text-indigo-400/80 border-indigo-500/15", dot: "bg-indigo-400", border: "hover:border-indigo-500/20" },
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Projects() {
  const t = useTranslations("projects");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const items = t.raw("items") as ProjectTranslation[];
  const architecture = t.raw("architecture") as ArchitectureTranslation;
  const projects = items.map((item, i) => ({ ...item, ...projectStatic[i] }));

  return (
    <section id="projects" className="py-28 px-6 border-t border-white/[0.04]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8 overflow-hidden rounded-[28px] border border-cyan-500/20 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(17,24,39,0.88))] p-7 md:p-9 shadow-[0_30px_120px_rgba(34,211,238,0.08)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_28%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-300/80">
                {architecture.label}
              </p>
              <h3 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
                {architecture.title}
              </h3>
              <p className="max-w-2xl text-sm leading-7 text-cyan-50/78 md:text-[15px]">
                {architecture.intro}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                SME Standard Highlights
              </p>
              <div className="mb-5 flex flex-wrap gap-2.5">
                {architecture.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-3">
                {architecture.achievements.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-white/78">
                    <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.65)]" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-5"
          variants={gridVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {projects.map((project) => {
            const colors = colorMap[project.color];
            const isDSG = project.dsg === true;
            return (
              <motion.div
                key={project.title}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.22 }}
                className={`group glass-card relative flex flex-col gap-5 overflow-hidden rounded-2xl p-6 transition-colors duration-300 ${colors.border} hover:shadow-xl`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <h3 className="font-semibold text-white text-lg">{project.title}</h3>
                    {isDSG && (
                      <span className="inline-flex w-fit items-center gap-1 text-[10px] font-semibold text-emerald-400 border border-emerald-500/25 bg-emerald-500/08 rounded-full px-2 py-0.5">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                        DSG/nDSG Compliant
                      </span>
                    )}
                  </div>
                  <span className={`flex-none flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-1 ${colors.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    {project.status}
                  </span>
                </div>

                <p className="text-sm text-white/50 leading-relaxed flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.metrics.map((m) => (
                    <span key={m} className="text-xs text-white/40 bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-1">{m}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/[0.05]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className={`text-xs border rounded-full px-2 py-0.5 ${colors.tag}`}>{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 flex-none">
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-white"
                        whileHover={{ x: 2 }}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {t("view")}
                      </motion.a>
                    )}
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-white"
                      whileHover={{ x: 2 }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      {t("code")}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
