import Link from "next/link";
import { FileText, Download } from "lucide-react";

type Locale = "en" | "de" | "es";

interface DownloadCenterProps {
  locale?: Locale;
}

const ui: Record<Locale, { heading: string; hint: string; save: string }> = {
  en: {
    heading: "Download CV",
    hint: "Pick a language — opens a print-ready CV you can save as PDF.",
    save: "PDF · A4",
  },
  de: {
    heading: "Lebenslauf herunterladen",
    hint: "Sprache wählen — öffnet einen druckfertigen Lebenslauf zum Speichern als PDF.",
    save: "PDF · A4",
  },
  es: {
    heading: "Descargar CV",
    hint: "Elige un idioma — abre un CV listo para imprimir que puedes guardar como PDF.",
    save: "PDF · A4",
  },
};

const LANGS: { code: Locale; label: string; flag: string }[] = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function DownloadCenter({ locale = "en" }: DownloadCenterProps) {
  const t = ui[locale];

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

      {/* Language options */}
      <div className="grid grid-cols-3 gap-2">
        {LANGS.map((lang) => (
          <Link
            key={lang.code}
            href={`/${lang.code}/print?print=1`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-2 py-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-blue-500/[0.06]"
          >
            <span className="text-xl leading-none" aria-hidden="true">
              {lang.flag}
            </span>
            <span className="text-xs font-semibold text-white/75 transition-colors group-hover:text-white">
              {lang.label}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-medium text-white/30 transition-colors group-hover:text-blue-300/80">
              <Download className="h-3 w-3" aria-hidden="true" />
              {t.save}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
