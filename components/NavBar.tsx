"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NavBar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const seg = window.location.pathname.split("/")[1];
    setLocale(seg === "de" ? "de" : "en");

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = () => {
    const next = locale === "en" ? "de" : "en";
    setLocale(next);
    router.replace(pathname, { locale: next });
  };

  const navLinks = [
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
          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-white transition-colors border border-white/[0.08] rounded-full px-3 py-1.5"
          >
            <span className={locale === "en" ? "text-white" : ""}>EN</span>
            <span className="text-white/20">/</span>
            <span className={locale === "de" ? "text-white" : ""}>DE</span>
          </button>

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
