"use client";

import { motion } from "framer-motion";

type Locale = "en" | "de" | "es";

interface DownloadCVButtonProps {
  locale?: Locale;
  className?: string;
  variant?: "primary" | "ghost";
}

const labels: Record<Locale, string> = {
  en: "Download Profile",
  de: "Profil herunterladen",
  es: "Descargar Perfil",
};

export default function DownloadCVButton({
  locale = "en",
  className = "",
  variant = "primary",
}: DownloadCVButtonProps) {
  const label = labels[locale];

  const baseClasses =
    "group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 overflow-hidden";

  const variantClasses =
    variant === "primary"
      ? "bg-white/[0.06] border border-white/[0.12] text-white hover:border-blue-500/40 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-violet-500/10 shadow-lg shadow-black/20 hover:shadow-blue-500/10"
      : "border border-white/[0.08] text-white/70 hover:text-white hover:border-white/20";

  return (
    <a
      href={`/${locale}/print`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variantClasses} ${className}`}
      aria-label={label}
    >
      {/* Gradient shimmer on hover */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/05 to-violet-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      </span>

      {/* Download icon with bounce animation */}
      <motion.svg
        className="w-4 h-4 flex-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        whileHover={{ y: [0, 3, 0] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </motion.svg>

      <span className="relative">{label}</span>

      {/* Arrow indicator */}
      <svg
        className="w-3.5 h-3.5 text-white/30 group-hover:text-blue-400/70 transition-colors duration-300 flex-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        />
      </svg>
    </a>
  );
}
