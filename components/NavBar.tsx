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
  const homeAnchor = (section: string) =>
    pathname === "/" ? `#${section}` : `/${locale}#${section}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
  };

  const navLinks = [
    { href: homeAnchor("services"), label: t("services") },
    { href: homeAnchor("certifications"), label: t("certifications") },
    { href: homeAnchor("stack"), label: t("stack") },
    { href: homeAnchor("experience"), label: t("experience") },
    { href: homeAnchor("projects"), label: t("projects") },
    { href: `/${locale}/labs/tempo-tutor`, label: t("productLab") },
    { href: `/${locale}/labs/community-fund`, label: t("lab") },
    { href: homeAnchor("contact"), label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060606]/90 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <a href={`/${locale}`} className="group" aria-label="Vidal Reñao home">
          <Logo
            variant="inline"
            className="h-10 w-auto max-w-[170px] sm:max-w-[245px] transition-opacity group-hover:opacity-90"
          />
        </a>

        {/* Center links */}
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
        <div className="flex items-center gap-3">
          {/* 3-language toggle */}
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

          {/* CTA */}
          <a
            href={homeAnchor("contact")}
            className="hidden whitespace-nowrap md:flex items-center gap-2 text-xs font-semibold bg-blue-500 hover:bg-blue-400 text-white rounded-full px-4 py-2 transition-all duration-200"
          >
            {t("hire")}
          </a>
        </div>
      </nav>
      <div className="flex justify-center gap-2 px-4 pb-3 md:hidden">
        <a
          href={`/${locale}/labs/tempo-tutor`}
          className="rounded-full border border-fuchsia-400/25 bg-fuchsia-400/10 px-3.5 py-1.5 text-xs font-semibold text-fuchsia-200 transition-colors hover:bg-fuchsia-400/20"
        >
          {t("productLab")}
        </a>
        <a
          href={`/${locale}/labs/community-fund`}
          className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-200 transition-colors hover:bg-cyan-400/20"
        >
          {t("lab")}
        </a>
      </div>
    </header>
  );
}
