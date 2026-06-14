"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    num: "01",
    label: "BACKEND",
    title: "HelpDesk AI",
    desc: "Multi-tenant enterprise helpdesk on Next.js 15, Supabase, and Claude AI. AI triage, SLA workflows, RBAC, and Swiss DSG/nDSG compliance.",
    badge: "DSG/nDSG Compliant",
    shield: true,
    href: "https://ticket-system-sigma-pink.vercel.app",
    color: "amber",
  },
  {
    num: "02",
    label: "BRIDGE",
    title: "MCP Server",
    desc: "7 AI tools via Model Context Protocol over HTTP/SSE. Claude Desktop and AI agents can create, triage, and update tickets in natural language.",
    badge: "7 MCP Tools",
    shield: false,
    href: "https://vidal-helpdesk-mcp.vercel.app",
    color: "violet",
  },
  {
    num: "03",
    label: "AUTOMATION",
    title: "Audit Engine",
    desc: "GitHub Actions fires hourly. Vercel function queries Supabase, computes SLA compliance, and delivers executive HTML reports via Resend — fully autonomous.",
    badge: "Hourly CI/CD",
    shield: false,
    href: "https://github.com/vidal-renao/vidal-helpdesk-mcp",
    color: "emerald",
  },
] as const;

type PillarColor = "amber" | "violet" | "emerald";

const colorMap: Record<
  PillarColor,
  {
    border: string;
    icon: string;
    iconText: string;
    badge: string;
    num: string;
    shadow: string;
    label: string;
  }
> = {
  amber: {
    border: "hover:border-amber-500/30",
    icon: "bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500/20 group-hover:border-amber-500/40",
    iconText: "text-amber-400",
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    num: "text-amber-500/25",
    shadow: "hover:shadow-amber-500/8",
    label: "text-amber-400/60",
  },
  violet: {
    border: "hover:border-violet-500/30",
    icon: "bg-violet-500/10 border-violet-500/20 group-hover:bg-violet-500/20 group-hover:border-violet-500/40",
    iconText: "text-violet-400",
    badge: "border-violet-500/30 bg-violet-500/10 text-violet-400",
    num: "text-violet-500/25",
    shadow: "hover:shadow-violet-500/8",
    label: "text-violet-400/60",
  },
  emerald: {
    border: "hover:border-emerald-500/30",
    icon: "bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40",
    iconText: "text-emerald-400",
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    num: "text-emerald-500/25",
    shadow: "hover:shadow-emerald-500/8",
    label: "text-emerald-400/60",
  },
};

function ServerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v.75a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25v-.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 19.41a2.25 2.25 0 01-1.07-1.916V17.25M12 4.5v9m0 0l-3-3m3 3l3-3" />
    </svg>
  );
}

function NetworkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  );
}

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

const iconComponents: Record<PillarColor, (props: { className?: string }) => React.ReactElement> = {
  amber: ServerIcon,
  violet: NetworkIcon,
  emerald: ActivityIcon,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-12 sm:py-20 lg:py-28 px-4 sm:px-6 border-t border-white/4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            Flagship Ecosystem
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Three Pillars, One Platform
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            Backend · Bridge · Automation — each layer operates independently and composes seamlessly into a production AI system.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-5"
        >
          {pillars.map((pillar) => {
            const cl = colorMap[pillar.color];
            const Icon = iconComponents[pillar.color];
            return (
              <motion.a
                key={pillar.num}
                variants={card}
                href={pillar.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className={`group relative flex flex-col p-4 sm:p-7 rounded-2xl border border-white/[0.07] glass-card ${cl.border} hover:shadow-xl ${cl.shadow} transition-colors duration-300`}
                style={{ textDecoration: "none" }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-t-2xl" />

                <span className={`absolute top-5 right-6 text-4xl font-black ${cl.num} select-none`}>
                  {pillar.num}
                </span>

                <span className={`text-[10px] font-bold uppercase tracking-widest ${cl.label} mb-4`}>
                  {pillar.label}
                </span>

                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 transition-colors ${cl.icon}`}>
                  <Icon className={`w-5 h-5 ${cl.iconText}`} />
                </div>

                <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  {pillar.title}
                  <ExternalLinkIcon className="w-3.5 h-3.5 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                <p className="text-sm text-white/50 leading-relaxed flex-1">
                  {pillar.desc}
                </p>

                <div className="mt-5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold ${cl.badge}`}>
                    {pillar.shield && <ShieldIcon className="w-3 h-3" />}
                    {pillar.badge}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
