"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const LOCALES = ["en", "de", "es"] as const;
type Locale = (typeof LOCALES)[number];

export default function NavBar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const seg = window.location.pathname.split("/")[1] as Locale;
    setLocale(LOCALES.includes(seg) ? seg : "en");

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (next: Locale) => {
    setLocale(next);
    router.replace(pathname, { locale: next });
  };

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#stack", label: t("stack") },
    { href: "#experience", label: t("experience") },
    { href: "#projects", label: t("projects") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060606]/90 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — photo avatar */}
        <a href="#" className="flex items-center gap-2.5 group">
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
        </a>

        {/* Center links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-white/45 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* 3-language toggle */}
          <div className="flex items-center border border-white/[0.08] rounded-full overflow-hidden text-xs font-medium">
            {LOCALES.map((l, i) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`px-2.5 py-1.5 transition-colors duration-150 ${
                  locale === l
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70"
                } ${i < LOCALES.length - 1 ? "border-r border-white/[0.08]" : ""}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 text-xs font-semibold bg-blue-500 hover:bg-blue-400 text-white rounded-full px-4 py-2 transition-all duration-200"
          >
            {t("hire")}
          </a>
        </div>
      </nav>
    </header>
  );
}
