import { getTranslations } from "next-intl/server";
import { SECTIONS, SITE } from "@/content/site";
import { BrandMark } from "@/components/ui/BrandMark";
import { ArrowUp, GitHub, LinkedIn } from "@/components/ui/icons";

export async function SiteFooter({ locale }: { locale: string }) {
  const [ui, nav] = await Promise.all([
    getTranslations({ locale, namespace: "ui.footer" }),
    getTranslations({ locale, namespace: "ui.nav" }),
  ]);
  return (
    <footer className="relative overflow-hidden border-t border-line-strong bg-raised/60 px-4 pb-8 pt-14 sm:px-6 sm:pt-16">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr]">
        <div data-footer-brand className="max-w-sm">
          <a href="#top" className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-offset-4" aria-label="VIDAL ECOSYSTEM">
            <BrandMark className="h-11 w-14" />
            <span className="flex flex-col leading-tight">
              <strong className="text-lg tracking-[0.15em] text-ink">VIDAL</strong>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-accent">ECOSYSTEM</span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-7 text-muted">{ui("tagline")}</p>
          <p className="mt-4 inline-flex rounded-full border border-line bg-white/[0.025] px-3 py-1.5 text-xs text-dim">Basel, Switzerland · CH / LI</p>
        </div>
        <div data-footer-explore>
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{ui("explore")}</h2>
          <nav aria-label={ui("explore")} className="grid grid-cols-2 gap-x-4 gap-y-1">
            {SECTIONS.map(({ id, key }) => (
              <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center rounded-lg px-2 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-ink">{nav(key)}</a>
            ))}
          </nav>
        </div>
        <div data-footer-contact className="sm:col-span-2 lg:col-span-1">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{nav("contact")}</h2>
          <a href={`mailto:${SITE.email}`} className="inline-block min-h-11 break-all rounded-lg py-2 text-sm font-medium text-ink underline-offset-4 hover:text-accent hover:underline">{SITE.email}</a>
          <div data-footer-social className="mt-4 flex items-center gap-3">
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"><LinkedIn size={17} /></a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"><GitHub size={17} /></a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-line-strong pt-6">
        <p className="text-xs text-dim">© {new Date().getFullYear()} VIDAL ECOSYSTEM · {ui("rights")}</p>
        <a href="#top" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line px-3 text-xs font-medium text-muted transition-colors hover:border-line-strong hover:bg-white/[0.05] hover:text-ink"><ArrowUp size={15} />{ui("top")}</a>
      </div>
    </footer>
  );
}
