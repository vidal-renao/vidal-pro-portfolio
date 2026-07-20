"use client";

import { useState } from "react";
import { FileText, Download, FileType } from "lucide-react";
import type { EmailVariant } from "@/lib/cv/emailVariants";
import { EMAIL_ADDRESSES } from "@/lib/cv/emailVariants";

type Locale = "en" | "de" | "es";

interface DownloadCenterProps {
  locale?: Locale;
}

const ui: Record<
  Locale,
  { heading: string; hint: string; pdf: string; word: string; emailLabel: string }
> = {
  en: {
    heading: "Download CV",
    hint: "Pick a language and email, then choose PDF or Word.",
    pdf: "PDF",
    word: "Word",
    emailLabel: "Contact email",
  },
  de: {
    heading: "Lebenslauf herunterladen",
    hint: "Sprache und E-Mail wählen, dann PDF oder Word auswählen.",
    pdf: "PDF",
    word: "Word",
    emailLabel: "Kontakt-E-Mail",
  },
  es: {
    heading: "Descargar CV",
    hint: "Elige idioma y correo, luego PDF o Word.",
    pdf: "PDF",
    word: "Word",
    emailLabel: "Correo de contacto",
  },
};

const LANGS: { code: Locale; label: string; flag: string }[] = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

const EMAIL_OPTIONS: { code: EmailVariant; label: string }[] = [
  { code: "outlook", label: EMAIL_ADDRESSES.outlook },
  { code: "gmx", label: EMAIL_ADDRESSES.gmx },
];

export default function DownloadCenter({ locale = "en" }: DownloadCenterProps) {
  const t = ui[locale];
  const [email, setEmail] = useState<EmailVariant>("outlook");

  return (
    <div className="glass-card rounded-2xl p-5">
      {/* Header */}
      <div className="mb-1.5 flex items-center gap-2">
        <FileText className="h-4 w-4 flex-none text-blue-400" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
          {t.heading}
        </p>
      </div>
      <p className="mb-3.5 text-xs text-white/35">{t.hint}</p>

      {/* Email selector */}
      <div className="mb-3.5">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">
          {t.emailLabel}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {EMAIL_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => setEmail(opt.code)}
              className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                email === opt.code
                  ? "border-blue-500/40 bg-blue-500/[0.08] text-blue-200"
                  : "border-white/[0.07] bg-white/[0.02] text-white/45 hover:border-white/15 hover:text-white/70"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Language options */}
      <div className="grid grid-cols-3 gap-2">
        {LANGS.map((lang) => (
          <div
            key={lang.code}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-2 py-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-blue-500/[0.06]"
          >
            <span className="text-xl leading-none" aria-hidden="true">
              {lang.flag}
            </span>
            <span className="text-xs font-semibold text-white/75">{lang.label}</span>

            <div className="mt-1 flex w-full flex-col gap-1">
              <a
                href={`/${lang.code}/print?print=1&email=${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center justify-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[10px] font-medium text-white/40 transition-colors hover:border-blue-500/30 hover:text-blue-300/90"
              >
                <Download className="h-3 w-3" aria-hidden="true" />
                {t.pdf}
              </a>
              <a
                href={`/api/download?format=word&locale=${lang.code}&email=${email}`}
                className="group/btn flex items-center justify-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[10px] font-medium text-white/40 transition-colors hover:border-blue-500/30 hover:text-blue-300/90"
              >
                <FileType className="h-3 w-3" aria-hidden="true" />
                {t.word}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
