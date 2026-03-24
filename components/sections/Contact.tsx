"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

// ─── CVSelector sub-component ───────────────────────────────────────────────

type CVOption = {
  key: string;
  icon: string;
  titleKey: string;
  descKey: string;
  file: string;
  color: "blue" | "violet" | "emerald";
};

const cvOptions: CVOption[] = [
  {
    key: "cloud",
    icon: "☁️",
    titleKey: "cv_cloud",
    descKey: "cv_cloud_desc",
    file: "/cv-cloud-infrastructure.pdf",
    color: "blue",
  },
  {
    key: "systems",
    icon: "🖥️",
    titleKey: "cv_systems",
    descKey: "cv_systems_desc",
    file: "/cv-systems-network.pdf",
    color: "violet",
  },
  {
    key: "support",
    icon: "🎧",
    titleKey: "cv_support",
    descKey: "cv_support_desc",
    file: "/cv-it-support.pdf",
    color: "emerald",
  },
];

const cvColorMap = {
  blue: "hover:border-blue-500/25 hover:bg-blue-500/05",
  violet: "hover:border-violet-500/25 hover:bg-violet-500/05",
  emerald: "hover:border-emerald-500/25 hover:bg-emerald-500/05",
};

function CVSelector() {
  const t = useTranslations("contact");

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-4 h-4 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <p className="text-xs font-semibold text-white/60 uppercase tracking-widest">
          {t("cv_title")}
        </p>
      </div>
      <p className="text-xs text-white/30 mb-3">{t("cv_subtitle")}</p>

      <div className="space-y-2">
        {cvOptions.map((opt) => (
          <a
            key={opt.key}
            href={opt.file}
            download
            className={`group flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-200 ${cvColorMap[opt.color]}`}
          >
            <span className="text-lg leading-none">{opt.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white/75 group-hover:text-white transition-colors leading-snug">
                {t(opt.titleKey)}
              </p>
              <p className="text-xs text-white/35 mt-0.5">{t(opt.descKey)}</p>
            </div>
            <svg
              className="w-4 h-4 text-white/20 group-hover:text-white/55 flex-none transition-all group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Contact links data ──────────────────────────────────────────────────────

const links = [
  {
    label: "Email",
    value: "vidal-31@hotmail.com",
    href: "mailto:vidal-31@hotmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/vidalrenao",
    href: "https://linkedin.com/in/vidalrenao",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/vidal-renao",
    href: "https://github.com/vidal-renao",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+41 77 972 62 99",
    href: "tel:+41779726299",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
];

// ─── Main Contact component ──────────────────────────────────────────────────

export default function Contact() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vidal-31@hotmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-28 px-6 border-t border-white/[0.04]"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">

        {/* ── Main grid ── */}
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-lg mb-5">
              {t("subtitle")}
            </p>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/05 text-emerald-400 rounded-full px-4 py-2 text-xs font-medium mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t("availability")}
            </div>

            {/* Contact links */}
            <div className="space-y-2.5">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group flex items-center gap-4 glass-card rounded-xl px-5 py-3.5 hover:border-white/15 transition-all duration-200"
                >
                  <span className="text-white/40 group-hover:text-white/70 transition-colors">
                    {link.icon}
                  </span>
                  <div>
                    <p className="text-xs text-white/30 font-medium">{link.label}</p>
                    <p className="text-sm text-white/70 group-hover:text-white transition-colors">
                      {link.value}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-white/50 ml-auto transition-all group-hover:translate-x-0.5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-6 flex flex-col items-center gap-5 min-w-[220px] text-center"
          >
            {/* Photo */}
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-white/10">
              <Image
                src="/Photo.jpg"
                alt="Vidal Reñao"
                fill
                className="object-cover object-top"
                sizes="80px"
              />
            </div>
            <div>
              <p className="font-semibold text-white">Vidal Reñao</p>
              <p className="text-xs text-white/40 mt-1">Basel, Switzerland 🇨🇭</p>
            </div>
            <div className="w-full border-t border-white/[0.06]" />
            <div className="flex flex-col gap-2 w-full text-xs text-white/40">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Azure · M365 · Entra ID
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                Intune · CCNA · PowerShell
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                EN C1 · DE B2 · ES Native
              </span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 rounded-xl py-2.5 text-xs font-semibold transition-all duration-200"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {t("copied")}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {t("copy")}
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* ── CV Selector — full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8"
        >
          <CVSelector />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/25">
            © 2026 Vidal Reñao Lopelo · Basel, Switzerland
          </p>
          <p className="text-xs text-white/25">
            Built with Next.js · next-intl · Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
