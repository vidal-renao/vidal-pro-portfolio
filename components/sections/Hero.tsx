import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SITE } from "@/content/site";
import { ArrowDown, Pin } from "@/components/ui/icons";

interface HeroTrack {
  title: string;
  subtitle: string;
  summary: string;
  action: string;
  href: string;
}

/** Compact dual-career entry: both pathways are visible without scrolling on desktop. */
export async function Hero({ locale }: { locale: string }) {
  const [t, ui, specializations] = await Promise.all([
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "ui.hero" }),
    getTranslations({ locale, namespace: "specializations" }),
  ]);
  const tracks = specializations.raw("tracks") as HeroTrack[];

  return (
    <section id="top" className="v3-hero relative isolate overflow-hidden border-b border-line px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28">
      <div aria-hidden="true" className="v3-hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl" data-ux-v3-hero>
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_190px] lg:gap-12">
          <div className="hero-content relative z-10">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-ink">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-strong" />
              <Pin size={13} />{ui("eyebrow")}
            </p>
            <div className="flex items-center gap-4">
              <Image src={SITE.photo} alt="" width={80} height={80} loading="eager" sizes="56px" className="h-14 w-14 flex-none rounded-xl border border-line-strong object-cover lg:hidden" />
              <h1 className="text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-ink">{SITE.name}</h1>
            </div>
            <p className="mt-4 max-w-3xl border-l-2 border-accent pl-4 text-base font-semibold leading-snug text-accent-strong sm:text-xl">{ui("role")}</p>
            <p className="mt-4 max-w-[70ch] text-sm leading-6 text-muted sm:text-base">{t("title2")} {t("subtitle")}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a data-testid="hero-business-cta" href="#services" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong">{ui("primary")}<ArrowDown size={16} /></a>
              <a data-testid="hero-career-cta" href="#experience" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line-strong bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white/[0.09]">{ui("secondary")}</a>
            </div>
          </div>
          <div className="hero-portrait relative mx-auto hidden w-full max-w-[190px] lg:block">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[1.8rem] border border-accent/20 bg-accent/[0.035]" />
            <Image src={SITE.photo} alt={SITE.name} width={320} height={400} loading="eager" sizes="190px" className="relative aspect-[4/5] w-full rounded-2xl border border-line-strong object-cover shadow-[0_22px_65px_rgba(0,0,0,0.3)]" />
          </div>
        </div>
        <div className="mt-8 border-t border-line-strong pt-5">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-strong">{specializations("label")}</p>
          <div className="grid gap-4 md:grid-cols-2">
            {tracks.map((track, index) => (
              <a key={track.title} data-ux-v3-path href={track.href} className="v3-path group relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl border border-line-strong bg-raised p-5 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-1 hover:border-accent/60 hover:bg-[#16263b] focus-visible:outline-offset-4 motion-reduce:transform-none sm:p-6">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-sky-300/40 to-transparent" />
                <span className="mb-3 font-mono text-[11px] tracking-[0.16em] text-accent-strong">0{index + 1} / 02 · {track.subtitle}</span>
                <h2 className="max-w-[27ch] text-xl font-semibold leading-tight tracking-tight text-ink sm:text-2xl">{track.title}</h2>
                <p className="mt-2 max-w-[58ch] text-sm leading-6 text-muted">{track.summary}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent-strong">{track.action}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">↗</span></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
