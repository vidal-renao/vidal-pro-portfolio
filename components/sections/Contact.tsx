"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Phone, Mail, MapPin } from "lucide-react";
import DownloadCenter from "@/components/ui/DownloadCenter";
import BrandLogo from "@/components/ui/BrandLogo";

// ─── Types ───────────────────────────────────────────────────────────────────

type Locale = "en" | "de" | "es";
type FormStatus = "idle" | "submitting" | "success" | "error";

interface ContactProps {
  locale?: Locale;
}

const EMAIL = "vidalrenao.lab@outlook.com";
const ROLE = "Fullstack Developer & IT Specialist";
const ROLE_SPEC = "Web · Apps · IA · Sistemas";

// ─── External links (single source — no duplication elsewhere) ────────────────

const socialLinks = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/vidalrenao",
    href: "https://linkedin.com/in/vidalrenao",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/vidal-renao",
    href: "https://github.com/vidal-renao",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "+41 77 972 62 99",
    href: "https://wa.me/41779726299",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-base text-white placeholder-white/25 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all duration-200";

// ─── Contact form (message only — identity lives in the left column) ──────────

function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      _honey: (form.elements.namedItem("_honey") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Request failed");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
        {t("form_label")}
      </p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center gap-3 py-8 text-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/10">
            <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-white">{t("form_success_title")}</p>
          <p className="text-xs text-white/40">{t("form_success_msg")}</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-1 text-xs text-blue-400 transition-colors hover:text-blue-300"
          >
            {t("form_send_another")}
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
          {/* Honeypot */}
          <input
            name="_honey"
            type="text"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0, overflow: "hidden" }}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/40" htmlFor="cf-name">
                {t("form_name")}
              </label>
              <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder={t("form_name_ph")} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/40" htmlFor="cf-email">
                {t("form_email")}
              </label>
              <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder={t("form_email_ph")} className={inputCls} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/40" htmlFor="cf-subject">
              {t("form_subject")}
            </label>
            <input id="cf-subject" name="subject" type="text" placeholder={t("form_subject_ph")} className={inputCls} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/40" htmlFor="cf-message">
              {t("form_message")}
            </label>
            <textarea id="cf-message" name="message" required rows={5} placeholder={t("form_message_ph")} className={`${inputCls} resize-none`} />
          </div>

          {status === "error" && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-400">
              {errorMsg || t("form_error_msg")}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t("form_submitting")}
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                {t("form_submit")}
              </>
            )}
          </button>

          {/* Copy email shortcut */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 py-1 text-xs text-white/30 transition-colors hover:text-white/55"
          >
            {copied ? (
              <>
                <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-400">{t("copied")}</span>
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{t("copy")}</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function Contact({ locale = "en" }: ContactProps) {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="border-t border-white/4 px-4 py-12 sm:px-6 sm:py-20 lg:py-28" ref={ref}>
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-6 text-center sm:mb-10 lg:mb-12"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">{t("label")}</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">{t("title")}</h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/50">{t("subtitle")}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {t("availability")}
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
          {/* ── Left column: single canonical identity + links + CV download ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="flex flex-col gap-4"
          >
            {/* Identity card (the only place name / phone / email / QR appear) */}
            <div className="glass-card rounded-2xl border-l-2 border-blue-500/40 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 flex-none shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
                    <Image src="/Photo.jpg" alt="Vidal Reñao" fill className="object-cover object-top" sizes="56px" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-bold leading-tight tracking-tight text-white">Vidal Reñao Lopelo</p>
                    <p className="mt-0.5 text-xs leading-snug text-white/45">{ROLE}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-blue-300/70">{ROLE_SPEC}</p>
                  </div>
                </div>
                <QRCodeSVG
                  value="https://vidal-pro-portfolio.vercel.app"
                  size={52}
                  bgColor="transparent"
                  fgColor="rgba(255,255,255,0.32)"
                  level="M"
                  className="flex-none shrink-0"
                />
              </div>

              {/* Direct contact details */}
              <div className="mt-4 space-y-2.5 border-t border-white/6 pt-4">
                <a href="tel:+41779726299" className="group flex items-center gap-3 py-0.5">
                  <Phone className="h-4 w-4 flex-none text-white/30 transition-colors group-hover:text-blue-400" aria-hidden="true" />
                  <span className="font-mono text-sm tracking-tight text-white/65 transition-colors group-hover:text-white">+41 77 972 62 99</span>
                </a>
                <a href={`mailto:${EMAIL}`} className="group flex items-center gap-3 py-0.5">
                  <Mail className="h-4 w-4 flex-none text-white/30 transition-colors group-hover:text-blue-400" aria-hidden="true" />
                  <span className="break-all text-sm text-white/65 transition-colors group-hover:text-white">{EMAIL}</span>
                </a>
                <div className="flex items-center gap-3 py-0.5">
                  <MapPin className="h-4 w-4 flex-none text-white/30" aria-hidden="true" />
                  <span className="text-sm text-white/65">Basel, Switzerland</span>
                </div>
              </div>

              {/* Market badges */}
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/6 pt-3.5">
                <span className="rounded-full border border-blue-500/20 bg-blue-500/6 px-2.5 py-0.5 text-[10px] font-medium text-blue-300/75">
                  🇨🇭 Switzerland
                </span>
                <span className="rounded-full border border-white/[0.07] px-2.5 py-0.5 text-[10px] text-white/40">DACH Region</span>
                <span className="rounded-full border border-white/[0.07] px-2.5 py-0.5 text-[10px] text-white/40">Hybrid · Remote</span>
              </div>
            </div>

            {/* Social links (single source) */}
            <div className="space-y-1.5">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.12 + i * 0.07 }}
                  whileHover={{ x: 4, y: -1 }}
                  className="group flex items-center gap-4 rounded-xl glass-card px-4 py-3 transition-all duration-200 hover:border-white/15"
                >
                  <span className="flex-none text-white/35 transition-colors group-hover:text-white/70">{link.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-xs font-medium leading-none text-white/30">{link.label}</p>
                    <p className="truncate text-sm text-white/65 transition-colors group-hover:text-white">{link.value}</p>
                  </div>
                  <svg className="ml-auto h-4 w-4 flex-none text-white/20 transition-all group-hover:translate-x-0.5 group-hover:text-white/45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* CV download — multilingual */}
            <DownloadCenter locale={locale} />
          </motion.div>

          {/* ── Right column: message form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Footer — brand + copyright only (social links live above, no duplication) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/4 pt-6 sm:mt-16 sm:flex-row sm:pt-8"
        >
          <BrandLogo />
          <p className="text-xs text-white/20">© 2026 Vidal Reñao · Basel, Switzerland</p>
        </motion.div>
      </div>
    </section>
  );
}
