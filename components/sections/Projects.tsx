"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "CV Platform",
    description:
      "Full-stack multi-tenant platform for managing professional CVs and service packages. Built for logistics and staffing agencies with real-time tracking, client portals, and analytics dashboard.",
    tags: ["Next.js 15", "TypeScript", "Tailwind", "PostgreSQL"],
    color: "blue",
    status: "Production",
    metrics: ["Multi-tenant", "Real-time dashboard", "i18n ready"],
    githubUrl: "https://github.com/vidal-renao",
    demoUrl: null,
  },
  {
    title: "Dnamar Operations",
    description:
      "Enterprise operations platform for facility services (cleaning & logistics). Features multilingual support (ES/DE/EN/FR), service tracking, employee management, and automated reporting.",
    tags: ["Next.js", "next-intl", "Prisma", "Tailwind"],
    color: "violet",
    status: "Production",
    metrics: ["4 languages", "Service tracking", "Automated reports"],
    githubUrl: "https://github.com/vidal-renao",
    demoUrl: null,
  },
  {
    title: "Enterprise IT Lab",
    description:
      "Full hybrid identity home lab: Windows Server 2025 Domain Controller with AD, OUs, GPO policies, Entra ID Connect, Microsoft Intune, Autopilot enrollment, and Azure Arc integration.",
    tags: ["Windows Server 2025", "Entra ID", "Intune", "Azure Arc", "PowerShell"],
    color: "emerald",
    status: "Ongoing",
    metrics: ["Hybrid AD + Entra ID", "Autopilot enrolled", "Azure Arc connected"],
    githubUrl: "https://github.com/vidal-renao",
    demoUrl: null,
  },
  {
    title: "Linux Network Lab",
    description:
      "Debian-based router and firewall with NAT, nftables rules, and controlled network access for Windows domain clients. Simulates enterprise perimeter security.",
    tags: ["Debian", "nftables", "NAT", "Bash", "Networking"],
    color: "cyan",
    status: "Ongoing",
    metrics: ["Perimeter firewall", "NAT gateway", "Domain integration"],
    githubUrl: "https://github.com/vidal-renao",
    demoUrl: null,
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
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-none text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1"
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
