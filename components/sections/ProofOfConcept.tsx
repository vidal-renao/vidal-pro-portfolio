"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PhaseColor = "blue" | "violet" | "amber" | "emerald" | "rose" | "cyan";

const phases: {
  phase: string;
  label: string;
  src: string;
  caption: string;
  metrics: string[];
  color: PhaseColor;
}[] = [
  {
    phase: "INPUT",
    label: "Client Request · Mobile",
    src: "/screenshots/screenshot-01-mobile-form.png",
    caption: "Mobile ticket form — AI will categorize, route, and generate a response automatically.",
    metrics: ["Software · Alta", "ES interface", "AI routing"],
    color: "blue",
  },
  {
    phase: "INPUT",
    label: "Client Request · Desktop",
    src: "/screenshots/screenshot-02-desktop-form.png",
    caption: "Desktop form with Critical SLA priority — triggers immediate escalation path.",
    metrics: ["Critical (SLA)", "EN interface", "Auto-triage"],
    color: "blue",
  },
  {
    phase: "AI TRIAGE",
    label: "Automatic Classification",
    src: "/screenshots/screenshot-03-ai-triage.png",
    caption: "42% confidence · Urgent sentiment detected · Smart response generated · ~8h resolution estimate.",
    metrics: ["42% conf.", "Urgent sentiment", "~8h ETA"],
    color: "violet",
  },
  {
    phase: "TEAM",
    label: "Collaboration Thread",
    src: "/screenshots/screenshot-04-collaboration.png",
    caption: "Full ticket thread: agent internal note + client reply + admin escalation — all logged with DE/EN/ES translation.",
    metrics: ["Activity (3)", "Internal notes", "DE/EN/ES"],
    color: "amber",
  },
  {
    phase: "DASHBOARD",
    label: "Executive Dashboard",
    src: "/screenshots/screenshot-05-executive-dashboard.png",
    caption: "Real-time operations overview: open tickets, critical count, By Category analytics, AI Performance panel.",
    metrics: ["5 open tickets", "1 critical", "0 SLA breached"],
    color: "emerald",
  },
  {
    phase: "QUEUE",
    label: "Urgent SLA Queue",
    src: "/screenshots/screenshot-06-urgent-queue.png",
    caption: "Admin queue flags tickets as URGENT / SLA BREACHED — one-click Assign for immediate response.",
    metrics: ["5 open · 1 urgent", "SLA monitoring", "Critical priority"],
    color: "rose",
  },
  {
    phase: "CI/CD",
    label: "Autonomous Audit",
    src: "/screenshots/screenshot-07-github-actions.png",
    caption: "GitHub Actions Remote Audit #9 — fully autonomous, zero human intervention, 10s execution.",
    metrics: ["Status: Success", "10s total", "No intervention"],
    color: "cyan",
  },
  {
    phase: "REPORT",
    label: "SLA Email Report",
    src: "/screenshots/screenshot-08-email-report.png",
    caption: "Branded report via Resend: 100% SLA compliance across 5 tickets, 3 VIP risks flagged. Swiss DSG certified.",
    metrics: ["100% compliance", "3 VIP risks", "Swiss DSG"],
    color: "emerald",
  },
];

const colorMap: Record<PhaseColor, { badge: string; border: string; glow: string }> = {
  blue:    { badge: "bg-blue-500/10 text-blue-400 border-blue-500/25",    border: "hover:border-blue-500/25",    glow: "hover:shadow-blue-500/8"    },
  violet:  { badge: "bg-violet-500/10 text-violet-400 border-violet-500/25",  border: "hover:border-violet-500/25",  glow: "hover:shadow-violet-500/8"  },
  amber:   { badge: "bg-amber-500/10 text-amber-400 border-amber-500/25",   border: "hover:border-amber-500/25",   glow: "hover:shadow-amber-500/8"   },
  emerald: { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25", border: "hover:border-emerald-500/25", glow: "hover:shadow-emerald-500/8" },
  rose:    { badge: "bg-rose-500/10 text-rose-400 border-rose-500/25",    border: "hover:border-rose-500/25",    glow: "hover:shadow-rose-500/8"    },
  cyan:    { badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",    border: "hover:border-cyan-500/25",    glow: "hover:shadow-cyan-500/8"    },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function ProofOfConcept() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i === null ? null : (i - 1 + phases.length) % phases.length)), []);
  const next = useCallback(() => setLightbox((i) => (i === null ? null : (i + 1) % phases.length)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, close, prev, next]);

  return (
    <>
      <section id="proof" className="py-28 px-6 border-t border-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-violet-500/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">
                Proof of Concept
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Real Production Data
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              End-to-End Demo
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              Two live demos — from client request to executive SLA report. Every screenshot is real production data, no mocks.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {[
                { label: "100% SLA Compliance", color: "text-emerald-400" },
                { label: "0 SLA Breached", color: "text-blue-400" },
                { label: "<11s Audit Run", color: "text-violet-400" },
                { label: "AI Triage Automatic", color: "text-amber-400" },
              ].map((m) => (
                <span key={m.label} className={`text-xs font-semibold ${m.color} bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1`}>
                  {m.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 gap-5"
          >
            {phases.map((phase, idx) => {
              const cl = colorMap[phase.color];
              return (
                <motion.div
                  key={phase.label}
                  variants={item}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => setLightbox(idx)}
                  className={`group glass-card relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] ${cl.border} hover:shadow-xl ${cl.glow} transition-colors duration-300 cursor-pointer`}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-t-2xl" />

                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={phase.src}
                      alt={phase.label}
                      className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wider ${cl.badge}`}>
                        {phase.phase}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-3">
                    <h3 className="text-sm font-semibold text-white">{phase.label}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{phase.caption}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {phase.metrics.map((m) => (
                        <span key={m} className="text-[10px] text-white/40 bg-white/[0.04] border border-white/[0.06] rounded-full px-2 py-0.5">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={close}
                className="absolute -top-10 right-0 text-white/50 hover:text-white transition-colors"
              >
                <CloseIcon className="w-6 h-6" />
              </button>

              <div className="rounded-xl overflow-hidden border border-white/[0.1]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={phases[lightbox].src}
                  alt={phases[lightbox].label}
                  className="w-full object-contain max-h-[75vh]"
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{phases[lightbox].label}</p>
                  <p className="text-xs text-white/50 mt-0.5">{phases[lightbox].caption}</p>
                </div>
                <div className="flex items-center gap-2 flex-none">
                  <button
                    onClick={prev}
                    className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-white/30 w-12 text-center">{lightbox + 1} / {phases.length}</span>
                  <button
                    onClick={next}
                    className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
