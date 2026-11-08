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
    <footer className="relative overflow-hidden border-t border-line bg-raised/60 px-4 py-12 sm:px-6 sm:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <a href="#top" className="inline-flex items-center gap-3" aria-label="VIDAL ECOSYSTEM">
            <BrandMark className="h-11 w-14" />
            <span className="flex flex-col leading-tight">
              <strong className="text-lg tracking-[0.15em] text-ink">VIDAL</strong>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-accent">ECOSYSTEM</span>
            </span>
          </a>
          <p className="mt-5 text-sm leading-7 text-muted">{ui("tagline")}</p>
          <p className="mt-3 text-xs text-dim">Basel, Switzerland · CH / LI</p>
        </div>
        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-dim">{ui("explore")}</h2>
          <nav aria-label={ui("explore")} className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-1">
            {SECTIONS.map(({ id, key }) => (
              <a key={id} href={`#${id}`} className="text-sm text-muted transition-colors hover:text-ink">{nav(key)}</a>
            ))}
          </nav>
        </div>
        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-dim">{nav("contact")}</h2>
          <a href={`mailto:${SITE.email}`} className="break-all text-sm text-ink underline-offset-4 hover:underline">{SITE.email}</a>
          <div className="mt-5 flex items-center gap-3">
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"><LinkedIn size={17} /></a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"><GitHub size={17} /></a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="text-xs text-dim">© {new Date().getFullYear()} VIDAL ECOSYSTEM · {ui("rights")}</p>
        <a href="#top" className="inline-flex min-h-10 items-center gap-2 text-xs text-muted transition-colors hover:text-ink"><ArrowUp size={15} />{ui("top")}</a>
      </div>
    </footer>
  );
}
