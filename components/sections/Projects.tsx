"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "MatchPoint AI",
    description:
      "AI-powered job matching platform. Candidates upload their CV and Claude AI extracts their full profile automatically, then matches them against live job offers using 4-dimensional scoring: Hard Skills, Experience, Culture Fit, and Logistics. Recruiters only see candidates above 90% match — alerts via WhatsApp and email.",
    tags: ["Next.js 16", "Claude AI", "Supabase", "Framer Motion"],
    color: "violet",
    status: "Production",
    metrics: ["AI CV parsing", "4D match scoring", "WhatsApp alerts"],
    githubUrl: "https://github.com/vidal-renao",
    demoUrl: null,
  },
  {
    title: "Invoice Auto",
    description:
      "Freelancer invoice automation SaaS. Upload a receipt photo or PDF and Claude Vision AI extracts all fields — client, amount, date, VAT — and generates a professional invoice ready to send. No manual data entry. Multi-currency (EUR/CHF), PWA installable, fiscal validation for Spain and Switzerland.",
    tags: ["Next.js 16", "Claude Vision AI", "Supabase", "PWA"],
    color: "blue",
    status: "Production",
    metrics: ["AI OCR extraction", "Auto invoice generation", "EUR · CHF"],
    githubUrl: "https://github.com/vidal-renao",
    demoUrl: null,
  },
  {
    title: "Parcel Tracker SaaS",
    description:
      "Parcel management platform for courier offices. Three-tier RBAC (Admin / Staff / Client), full package lifecycle tracking, digital proof of delivery with signature capture, and multi-channel notifications via WhatsApp and email. Public tracking page in 6 languages.",
    tags: ["Next.js 14", "Node.js", "PostgreSQL", "Twilio"],
    color: "emerald",
    status: "Production",
    metrics: ["3-tier RBAC", "Digital signature", "6 languages"],
    githubUrl: "https://github.com/vidal-renao",
    demoUrl: null,
  },
  {
    title: "D'NAMAR GmbH",
    description:
      "Corporate website for a Swiss cleaning services company — live at dnamar.ch (Go-live April 2026). Trilingual (DE/EN/ES), 100/100 Lighthouse score across all metrics, JSON-LD structured data for local SEO, indexed on Google and verified in Google Search Console.",
    tags: ["Next.js 16", "Tailwind 4", "Supabase", "Resend"],
    color: "cyan",
    status: "Production",
    metrics: ["100/100 Lighthouse", "3 languages", "Google Search Console"],
    githubUrl: "https://github.com/vidal-renao",
    demoUrl: "https://www.dnamar.ch",
  },
];

const colorMap: Record<
  string,
  { badge: string; tag: string; dot: string; border: string }
> = {
  blue: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    tag: "bg-blue-500/08 text-blue-400/80 border-blue-500/15",
    dot: "bg-blue-400",
    border: "hover:border-blue-500/20",
  },
  violet: {
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    tag: "bg-violet-500/08 text-violet-400/80 border-violet-500/15",
    dot: "bg-violet-400",
    border: "hover:border-violet-500/20",
  },
  emerald: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    tag: "bg-emerald-500/08 text-emerald-400/80 border-emerald-500/15",
    dot: "bg-emerald-400",
    border: "hover:border-emerald-500/20",
  },
  cyan: {
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    tag: "bg-cyan-500/08 text-cyan-400/80 border-cyan-500/15",
    dot: "bg-cyan-400",
    border: "hover:border-cyan-500/20",
  },
};

export default function Projects() {
  const t = useTranslations("projects");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="py-28 px-6 border-t border-white/[0.04]"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const colors = colorMap[project.color];
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group glass-card rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 ${colors.border} hover:shadow-xl`}
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-white text-lg">
                    {project.title}
                  </h3>
                  <span
                    className={`flex-none flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-1 ${colors.badge}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    {project.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2">
                  {project.metrics.map((m) => (
                    <span
                      key={m}
                      className="text-xs text-white/40 bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-1"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Tags + Links */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/[0.05]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs border rounded-full px-2 py-0.5 ${colors.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 flex-none">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {t("view")}
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      {t("code")}
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
