"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const LOCALES = ["en", "de", "es"] as const;
type Locale = (typeof LOCALES)[number];

export default function NavBar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close drawer on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
  };

  const isHome = pathname === "/";

  const navLinks = [
    { href: isHome ? "#services" : "/#services", label: t("services") },
    { href: isHome ? "#certifications" : "/#certifications", label: t("certifications") },
    { href: isHome ? "#stack" : "/#stack", label: t("stack") },
    { href: isHome ? "#experience" : "/#experience", label: t("experience") },
    { href: isHome ? "#projects" : "/#projects", label: t("projects") },
    { href: "/brand", label: t("brand"), isBrand: true },
    { href: isHome ? "#contact" : "/#contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060606]/90 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo — photo avatar */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/20 group-hover:ring-blue-400/60 transition-all duration-200">
            <Image
              src="/Photo.jpg"
              alt="Vidal Reñao"
              fill
              className="object-cover object-top"
              sizes="32px"
            />
          </div>
          <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors hidden sm:block">
            Vidal Reñao
          </span>
        </Link>

        {/* Center links — desktop only */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  link.isBrand && pathname.startsWith("/brand")
                    ? "text-blue-400 font-medium"
                    : "text-white/45 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 3-language toggle */}
          <div className="flex items-center border border-white/[0.08] rounded-full overflow-hidden text-xs font-medium">
            {LOCALES.map((l, i) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`px-2 sm:px-2.5 py-1.5 transition-colors duration-150 ${
                  locale === l
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70"
                } ${i < LOCALES.length - 1 ? "border-r border-white/[0.08]" : ""}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CTA — desktop */}
          <Link
            href={isHome ? "#contact" : "/#contact"}
            className="hidden md:flex items-center gap-2 text-xs font-semibold bg-blue-500 hover:bg-blue-400 text-white rounded-full px-4 py-2 transition-all duration-200"
          >
            {t("hire")}
          </Link>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer — overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer — panel */}
      <div
        ref={drawerRef}
        className={`md:hidden fixed top-16 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#060606]/95 backdrop-blur-lg transition-all duration-300 ease-out ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                link.isBrand && pathname.startsWith("/brand")
                  ? "text-blue-400 bg-blue-500/10"
                  : "text-white/55 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA — mobile */}
          <Link
            href={isHome ? "#contact" : "/#contact"}
            onClick={closeMobile}
            className="flex items-center justify-center gap-2 mt-2 text-sm font-semibold bg-blue-500 hover:bg-blue-400 text-white rounded-xl px-4 py-3 transition-all duration-200"
          >
            {t("hire")}
          </Link>
        </div>
      </div>
    </header>
  );
}
