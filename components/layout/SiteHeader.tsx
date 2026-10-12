"use client";
import { useEffect, useState } from "react";
import { Close, Download, Menu } from "@/components/ui/icons";

interface Props {
  locale: string;
  brand: string;
  sections: { id: string; label: string }[];
  labels: { cv: string; menu: string; close: string; language: string; skip: string };
}

const LOCALES = [
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
];

/** Sticky header: section links with the current one highlighted, language switch, CV shortcut, mobile sheet. */
export function SiteHeader({ locale, brand, sections, labels }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, [sections]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); };
  }, [open]);

  const languageSwitch = (
    <div role="group" aria-label={labels.language} className="flex rounded-full border border-line p-0.5">
      {LOCALES.map((l) => (
        <a key={l.code} href={`/${l.code}`} hrefLang={l.code} lang={l.code} aria-label={l.name} aria-current={l.code === locale ? "true" : undefined}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${l.code === locale ? "bg-white/10 text-ink" : "text-dim hover:text-ink"}`}>
          {l.label}
        </a>
      ))}
    </div>
  );

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">{labels.skip}</a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-xl" : "border-b border-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight text-ink">
            <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-sm font-bold text-accent-ink">VR</span>
            <span className="text-sm sm:text-base">{brand}</span>
          </a>
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "location" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${active === s.id ? "bg-white/[0.07] text-ink" : "text-muted hover:text-ink"}`}>
                {s.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">{languageSwitch}</div>
            <a href="#cv" className="hidden items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong md:inline-flex">
              <Download size={15} />{labels.cv}
            </a>
            <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? labels.close : labels.menu}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden">
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
        <div id="mobile-nav" hidden={!open} className="border-t border-line px-4 pb-6 pt-3 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)}
                className={`flex min-h-12 items-center border-b border-line text-lg ${active === s.id ? "text-accent" : "text-ink"}`}>
                {s.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex items-center justify-between gap-3">
            {languageSwitch}
            <a href="#cv" onClick={() => setOpen(false)} className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink">
              <Download size={15} />{labels.cv}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
