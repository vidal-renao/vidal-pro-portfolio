import Link from "next/link";
import { Download, FileText } from "lucide-react";

interface DownloadCenterProps {
  locale?: "en" | "de" | "es";
}

const labels = {
  en: {
    heading: "Download Profile",
    pdf: "Curriculum Vitae — PDF",
    pdf_desc: "Print-ready · A4 · Optimized",
    word: "Curriculum Vitae — Word",
    word_desc: "Editable · .docx · A4",
    print: "Open Print View",
    print_desc: "Browser-optimized · vidal-pro-portfolio.vercel.app",
  },
  de: {
    heading: "Profil herunterladen",
    pdf: "Lebenslauf — PDF",
    pdf_desc: "Druckfertig · A4 · Optimiert",
    word: "Lebenslauf — Word",
    word_desc: "Bearbeitbar · .docx · A4",
    print: "Druckansicht öffnen",
    print_desc: "Browseroptimiert · vidal-pro-portfolio.vercel.app",
  },
  es: {
    heading: "Descargar Perfil",
    pdf: "Currículum Vitae — PDF",
    pdf_desc: "Listo para imprimir · A4 · Optimizado",
    word: "Currículum Vitae — Word",
    word_desc: "Editable · .docx · A4",
    print: "Abrir vista de impresión",
    print_desc: "Optimizado · vidal-pro-portfolio.vercel.app",
  },
} as const;

export default function DownloadCenter({ locale = "en" }: DownloadCenterProps) {
  const t = labels[locale];

  return (
    <div className="glass-card rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-blue-400 flex-none" aria-hidden="true" />
        <p className="text-xs font-semibold text-white/60 uppercase tracking-widest">
          {t.heading}
        </p>
      </div>

      {/* PDF */}
      <a
        href="/api/download?format=pdf"
        download
        className="group flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-red-500/25 hover:bg-red-500/[0.04] transition-all duration-200 mb-2"
      >
        <div className="w-9 h-9 rounded-lg border border-red-500/20 bg-red-500/10 flex items-center justify-center flex-none">
          <FileText className="w-4 h-4 text-red-400" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white/75 group-hover:text-white transition-colors leading-snug">
            {t.pdf}
          </p>
          <p className="text-xs text-white/30 mt-0.5">{t.pdf_desc}</p>
        </div>
        <Download
          className="w-4 h-4 text-white/20 group-hover:text-red-400/70 flex-none transition-all group-hover:translate-y-0.5"
          aria-hidden="true"
        />
      </a>

      {/* Word */}
      <a
        href="/api/download?format=word"
        download
        className="group flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/25 hover:bg-blue-500/[0.04] transition-all duration-200 mb-2"
      >
        <div className="w-9 h-9 rounded-lg border border-blue-500/20 bg-blue-500/10 flex items-center justify-center flex-none">
          <FileText className="w-4 h-4 text-blue-400" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white/75 group-hover:text-white transition-colors leading-snug">
            {t.word}
          </p>
          <p className="text-xs text-white/30 mt-0.5">{t.word_desc}</p>
        </div>
        <Download
          className="w-4 h-4 text-white/20 group-hover:text-blue-400/70 flex-none transition-all group-hover:translate-y-0.5"
          aria-hidden="true"
        />
      </a>

      {/* Print view */}
      <Link
        href={`/${locale}/print`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/25 hover:bg-violet-500/[0.04] transition-all duration-200"
      >
        <div className="w-9 h-9 rounded-lg border border-violet-500/20 bg-violet-500/10 flex items-center justify-center flex-none">
          <svg
            className="w-4 h-4 text-violet-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white/75 group-hover:text-white transition-colors leading-snug">
            {t.print}
          </p>
          <p className="text-xs text-white/30 mt-0.5 truncate">{t.print_desc}</p>
        </div>
        <svg
          className="w-4 h-4 text-white/20 group-hover:text-violet-400/70 flex-none transition-all group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}
