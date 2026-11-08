"use client";

import { useEffect, useRef, useState } from "react";
import { Close, Download, Menu } from "@/components/ui/icons";
import { BrandMark } from "@/components/ui/BrandMark";

interface Props {
  locale: string;
  brand: string;
  sections: { id: string; label: string }[];
  labels: {
    cv: string; menu: string; close: string; language: string;
    skip: string; more: string; contact: string;
  };
}

const LOCALES = [
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
] as const;

const PRIMARY_IDS = new Set(["specializations", "projects", "services", "experience"]);
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** One navigation model for all viewports: primary desktop links, native More, accessible mobile sheet. */
export function SiteHeader({ locale, brand, sections, labels }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDetailsElement>(null);
  const primary = sections.filter((s) => PRIMARY_IDS.has(s.id));
  const secondary = sections.filter((s) => !PRIMARY_IDS.has(s.id) && s.id !== "contact");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      }),
      { rootMargin: "-40% 0px -50% 0px" },
    );
    sections.forEach(({ id }) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [sections]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.mobileMenuOpen = "true";
    const panel = mobilePanelRef.current;
    const getFocusables = () => Array.from(panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    getFocusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuTriggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = getFocusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && (document.activeElement === first || !panel?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !panel?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      delete document.body.dataset.mobileMenuOpen;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) moreRef.current.open = false;
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && moreRef.current?.open) {
        moreRef.current.open = false;
        moreRef.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const onResize = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", onResize);
    return () => media.removeEventListener("change", onResize);
  }, []);

  const languageSwitch = (mobile = false) => (
    <div role="group" aria-label={labels.language} className="inline-flex items-center gap-0.5 rounded-full border border-line-strong bg-white/[0.025] p-1">
      {LOCALES.map((l) => (
        <a key={l.code} href={`/${l.code}`} hrefLang={l.code} lang={l.code}
          aria-label={l.name} aria-current={l.code === locale ? "page" : undefined}
          onClick={mobile ? () => setOpen(false) : undefined}
          className={`inline-flex min-h-9 min-w-10 items-center justify-center rounded-full px-2 text-xs font-semibold transition-colors ${l.code === locale ? "bg-accent/15 text-accent" : "text-muted hover:bg-white/[0.06] hover:text-ink"}`}>
          {l.label}
        </a>
      ))}
    </div>
  );

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
        {labels.skip}
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ${scrolled || open ? "border-line-strong bg-bg/95 shadow-lg shadow-black/10 backdrop-blur-xl" : "border-line bg-bg/85 backdrop-blur-lg"}`}>
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#top" aria-label={`${brand} — VIDAL ECOSYSTEM`} className="flex shrink-0 items-center gap-2.5 rounded-lg text-ink">
            <BrandMark className="h-10 w-11 shrink-0" />
            <span className="flex flex-col leading-tight">
              <strong className="text-sm tracking-[0.14em] sm:text-base">VIDAL</strong>
              <span className="text-[9px] font-semibold tracking-[0.23em] text-accent sm:text-[10px]">ECOSYSTEM</span>
            </span>
          </a>

          <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
            {primary.map((s) => (
              <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "location" : undefined}
                className={`rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${active === s.id ? "bg-white/[0.09] text-ink" : "text-muted hover:bg-white/[0.05] hover:text-ink"}`}>
                {s.label}
              </a>
            ))}
            <details ref={moreRef} className="group relative">
              <summary className="flex min-h-10 cursor-pointer items-center gap-2 rounded-full px-3 text-[13px] font-medium text-muted hover:bg-white/[0.05] hover:text-ink">
                {labels.more}
                <span aria-hidden="true" className="text-xs transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <div className="absolute right-0 top-full mt-3 min-w-48 rounded-2xl border border-line-strong bg-raised p-2 shadow-2xl shadow-black/35">
                {secondary.map((s) => (
                  <a key={s.id} href={`#${s.id}`}
                    onClick={() => { if (moreRef.current) moreRef.current.open = false; }}
                    className="block rounded-xl px-4 py-2.5 text-sm text-muted hover:bg-white/[0.06] hover:text-ink">
                    {s.label}
                  </a>
                ))}
              </div>
            </details>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">{languageSwitch()}</div>
            <a href="#cv" className="hidden min-h-10 items-center gap-1.5 rounded-full border border-line-strong px-3 text-xs font-semibold text-ink transition-colors hover:bg-white/[0.06] xl:inline-flex">
              <Download size={15} />{labels.cv}
            </a>
            <a href="#contact" className="hidden min-h-10 items-center rounded-full bg-accent px-4 text-xs font-semibold text-accent-ink transition-colors hover:bg-accent-strong xl:inline-flex">
              {labels.contact}
            </a>
            <button ref={menuTriggerRef} type="button" onClick={() => setOpen((value) => !value)}
              aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? labels.close : labels.menu}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white/[0.025] text-ink hover:bg-white/[0.06] xl:hidden">
              {open ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && <div data-mobile-menu-backdrop aria-hidden="true"
          onClick={() => { setOpen(false); menuTriggerRef.current?.focus(); }}
          className="fixed inset-x-0 bottom-0 top-[72px] z-0 bg-black/55 backdrop-blur-[2px] xl:hidden" />}
        <div ref={mobilePanelRef} id="mobile-nav" hidden={!open}
          className="fixed bottom-0 right-0 top-[72px] z-10 w-[min(21rem,calc(100vw-3rem))] overflow-y-auto overscroll-contain border-l border-line-strong bg-bg px-4 pb-6 pt-3 shadow-2xl sm:px-6 xl:hidden">
          <nav aria-label="Mobile" className="grid gap-0.5">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "location" : undefined}
                onClick={() => setOpen(false)}
                className={`flex min-h-11 items-center rounded-xl px-4 text-sm font-medium ${active === s.id ? "bg-accent/10 text-accent" : "text-ink hover:bg-white/[0.06]"}`}>
                {s.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            {languageSwitch(true)}
            <a href="#cv" onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold text-ink">
              <Download size={16} />{labels.cv}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
