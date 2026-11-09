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
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "es", flag: "🇪🇸", name: "Español" },
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
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (moreRef.current?.open) moreRef.current.open = false;
    };
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
    <div data-language-switch role="group" aria-label={labels.language}
      className="inline-flex items-center gap-1 rounded-2xl border border-line-strong bg-white/[0.035] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      {LOCALES.map((l) => (
        <a key={l.code} href={`/${l.code}`} hrefLang={l.code} lang={l.code}
          aria-label={l.name} title={l.name} aria-current={l.code === locale ? "page" : undefined}
          onClick={mobile ? () => setOpen(false) : undefined}
          className={`group relative inline-flex ${mobile ? "h-11 w-11" : "h-10 w-10"} shrink-0 items-center justify-center rounded-xl border text-xl leading-none transition-[background-color,border-color,transform,box-shadow] duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${l.code === locale
            ? "border-accent/40 bg-accent/15 shadow-[0_0_14px_rgba(116,222,244,0.09)]"
            : "border-transparent bg-transparent hover:scale-105 hover:border-line-strong hover:bg-white/[0.07] motion-reduce:hover:scale-100"}`}>
          <span aria-hidden="true" className="inline-flex items-center justify-center drop-shadow-sm">{l.flag}</span>
          <span className="sr-only">{l.name}</span>
          {l.code === locale && <span aria-hidden="true" className="absolute bottom-0.5 h-0.5 w-3 rounded-full bg-accent" />}
        </a>
      ))}
    </div>
  );

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
        {labels.skip}
      </a>
      <header data-enterprise-header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ${scrolled || open ? "border-line-strong bg-bg/95 shadow-lg shadow-black/10" : "border-line bg-bg/95"}`}>
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 xl:px-8">
          <a data-site-brand href="#top" aria-label={`${brand} — VIDAL ECOSYSTEM`} className="group flex shrink-0 items-center gap-2.5 rounded-xl px-1 py-1.5 text-ink transition-colors hover:bg-white/[0.035]">
            <BrandMark className="h-10 w-11 shrink-0" />
            <span className="flex flex-col leading-tight">
              <strong className="text-sm tracking-[0.14em] sm:text-base">VIDAL</strong>
              <span className="text-[9px] font-semibold tracking-[0.23em] text-accent sm:text-[10px]">ECOSYSTEM</span>
            </span>
          </a>

          <nav data-header-primary aria-label="Main" className="hidden items-center gap-0.5 rounded-2xl border border-line bg-white/[0.025] p-1 xl:flex">
            {primary.map((s) => (
              <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "location" : undefined}
                className={`relative inline-flex min-h-10 items-center rounded-xl px-3 py-2 text-[13px] font-medium transition-[background-color,color,box-shadow] duration-200 ${active === s.id ? "bg-accent/10 text-accent shadow-[inset_0_0_0_1px_rgba(116,222,244,0.18)]" : "text-muted hover:bg-white/[0.06] hover:text-ink"}`}>
                {s.label}
              </a>
            ))}
            <details ref={moreRef} className="group relative"
  onPointerEnter={(event) => { if (event.pointerType === "mouse" && moreRef.current) moreRef.current.open = true; }}
  onPointerLeave={(event) => {
    if (event.pointerType !== "mouse" || !moreRef.current) return;
    if (!moreRef.current.contains(document.activeElement)) moreRef.current.open = false;
  }}
  onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null) && moreRef.current) moreRef.current.open = false;
  }}>
              <summary onClick={(event) => { if (event.detail > 0 && window.matchMedia("(hover: hover) and (pointer: fine)").matches) event.preventDefault(); }} className="flex min-h-10 cursor-pointer items-center gap-2 rounded-xl px-3 text-[13px] font-medium text-muted transition-colors hover:bg-white/[0.06] hover:text-ink">
                {labels.more}
                <span aria-hidden="true" className="text-xs transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <div className="absolute right-0 top-full min-w-56 pt-2">
                <div className="rounded-2xl border border-line-strong bg-raised/95 p-2 shadow-2xl shadow-black/35 backdrop-blur-xl">
                {secondary.map((s) => (
                  <a key={s.id} href={`#${s.id}`}
                    onClick={() => { if (moreRef.current) moreRef.current.open = false; }}
                    className="block min-h-11 rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-white/[0.06] hover:text-ink">
                    {s.label}
                  </a>
                ))}
                </div>
              </div>
            </details>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">{languageSwitch()}</div>
            <a href="#cv" className="hidden min-h-10 items-center gap-1.5 rounded-xl border border-line-strong px-3 text-xs font-semibold text-ink transition-colors hover:bg-white/[0.06] xl:inline-flex">
              <Download size={15} />{labels.cv}
            </a>
            <a href="#contact" className="hidden min-h-10 items-center rounded-xl bg-accent px-4 text-xs font-semibold text-accent-ink transition-[background-color,box-shadow] hover:bg-accent-strong hover:shadow-[0_0_24px_rgba(116,222,244,0.12)] xl:inline-flex">
              {labels.contact}
            </a>
            <button data-mobile-menu-trigger ref={menuTriggerRef} type="button" onClick={() => setOpen((value) => !value)}
              aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? labels.close : labels.menu}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-white/[0.04] text-ink transition-colors hover:border-accent/50 hover:bg-accent/10 xl:hidden">
              {open ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && <div data-mobile-menu-backdrop aria-hidden="true"
          onClick={() => { setOpen(false); menuTriggerRef.current?.focus(); }}
          className="fixed inset-x-0 bottom-0 top-[72px] z-0 bg-black/55 backdrop-blur-[2px] xl:hidden" />}
        <div ref={mobilePanelRef} id="mobile-nav" hidden={!open}
          className="fixed bottom-0 right-0 top-[72px] z-10 w-[min(23rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain border-l border-line-strong bg-bg px-4 pb-6 pt-5 shadow-2xl sm:px-6 xl:hidden">
          <div className="mb-5 flex items-center justify-between gap-2 border-b border-line pb-4">
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">VIDAL ECOSYSTEM</p>
              <p className="mt-1 text-sm font-semibold text-ink">{labels.menu}</p>
            </div>
            <button type="button" onClick={() => { setOpen(false); menuTriggerRef.current?.focus(); }}
              aria-label={labels.close} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line-strong text-ink hover:bg-white/[0.06]">
              <Close size={18} />
            </button>
          </div>
          <nav aria-label="Mobile" className="space-y-5">
            <div data-mobile-primary className="grid gap-1">
              {primary.map((s, i) => (
                <a key={s.id} href={"#" + s.id} aria-current={active === s.id ? "location" : undefined}
                  onClick={() => setOpen(false)}
                  className={"group flex min-h-12 items-center gap-3 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors " + (active === s.id ? "border-accent/30 bg-accent/10 text-accent" : "border-transparent text-ink hover:border-line hover:bg-white/[0.04]")}>
                  <span aria-hidden="true" className="w-6 shrink-0 font-mono text-[11px] text-dim">{"0" + (i + 1)}</span>
                  <span className="min-w-0 flex-1">{s.label}</span>
                  <span aria-hidden="true" className="text-dim transition-transform group-hover:translate-x-0.5">↗</span>
                </a>
              ))}
            </div>
            <div className="border-t border-line pt-4">
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-dim">{labels.more}</p>
              <div data-mobile-secondary className="grid gap-1">
                {secondary.map((s) => (
                  <a key={s.id} href={"#" + s.id} aria-current={active === s.id ? "location" : undefined}
                    onClick={() => setOpen(false)}
                    className={"flex min-h-11 items-center rounded-xl px-3 text-sm transition-colors " + (active === s.id ? "bg-accent/10 font-semibold text-accent" : "text-muted hover:bg-white/[0.04] hover:text-ink")}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>
          <div data-mobile-actions className="mt-5 grid gap-2 border-t border-line pt-5">
            <a href="#contact" onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-ink hover:bg-accent-strong">{labels.contact}</a>
            <a href="#cv" onClick={() => setOpen(false)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line-strong px-4 text-sm font-semibold text-ink hover:bg-white/[0.06]">
              <Download size={16} />{labels.cv}
            </a>
          </div>
          <div className="mt-5 flex justify-center border-t border-line pt-5">{languageSwitch(true)}</div>
        </div>
      </header>
    </>
  );
}
