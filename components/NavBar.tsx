"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/marketing/Logo";

const LOCALES = ["en", "de", "es"] as const;
type Locale = (typeof LOCALES)[number];

export default function NavBar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const homeAnchor = (section: string) =>
    pathname === "/" ? `#${section}` : `/${locale}#${section}`;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: homeAnchor("services"), label: t("services") },
    { href: homeAnchor("certifications"), label: t("certifications") },
    { href: homeAnchor("stack"), label: t("stack") },
    { href: homeAnchor("experience"), label: t("experience") },
    { href: homeAnchor("projects"), label: t("projects") },
    { href: homeAnchor("contact"), label: t("contact") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isMenuOpen
            ? "bg-[#060606]/95 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand */}
          <a href={`/${locale}`} className="group shrink-0" aria-label="Vidal Reñao home">
            <Logo
              variant="inline"
              className="h-10 w-auto max-w-[170px] sm:max-w-[245px] transition-opacity group-hover:opacity-90"
            />
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-3 lg:gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="whitespace-nowrap text-sm text-white/45 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language toggle */}
            <div className="flex items-center border border-white/[0.08] rounded-full overflow-hidden text-xs font-medium">
              {LOCALES.map((l, i) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  className={`px-2 py-1.5 sm:px-2.5 transition-colors duration-150 ${
                    locale === l
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:text-white/70"
                  } ${i < LOCALES.length - 1 ? "border-r border-white/[0.08]" : ""}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA — desktop only */}
            <a
              href={homeAnchor("contact")}
              className="hidden md:flex whitespace-nowrap items-center gap-2 text-xs font-semibold bg-blue-500 hover:bg-blue-400 text-white rounded-full px-4 py-2 transition-all duration-200"
            >
              {t("hire")}
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white transition-colors duration-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span className="relative flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
                <span
                  className={`block h-px w-4 bg-current transition-all duration-300 origin-center ${
                    isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
                  }`}
                />
                <span
                  className={`block h-px w-4 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-px w-4 bg-current transition-all duration-300 origin-center ${
                    isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu — slide down */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-6 pt-3 border-t border-white/[0.06] bg-[#060606]/95 backdrop-blur-md">
            <ul className="flex flex-col gap-0.5 mb-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-3 py-3 text-sm text-white/55 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={homeAnchor("contact")}
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-400 active:scale-[0.98]"
            >
              {t("hire")}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
          style={{ top: "64px" }}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
