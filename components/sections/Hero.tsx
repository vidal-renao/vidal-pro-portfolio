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

/** Editorial introduction and two equal professional pathways; all copy from existing locales. */
export async function Hero({ locale }: { locale: string }) {
  const [t, ui, specializations] = await Promise.all([
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "ui.hero" }),
    getTranslations({ locale, namespace: "specializations" }),
  ]);
  const tracks = specializations.raw("tracks") as HeroTrack[];

  return (
    <section id="top" className="v3-hero relative isolate overflow-hidden border-b border-line px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
      <div aria-hidden="true" className="v3-hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl" data-ux-v3-hero>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.62fr)] lg:gap-16">
          <div className="hero-content relative z-10">
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-medium text-ink">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-strong" />
              <Pin size={13} />{ui("eyebrow")}
            </p>
            <div className="mb-5 flex items-center gap-4">
              <Image src={SITE.photo} alt="" width={96} height={96} loading="eager" sizes="64px" className="h-16 w-16 flex-none rounded-2xl border border-line-strong object-cover lg:hidden" />
              <h1 className="max-w-[12ch] text-[clamp(3rem,6.7vw,6.4rem)] font-semibold leading-[0.97] tracking-[-0.065em] text-ink">{SITE.name}</h1>
            </div>
            <p className="mt-7 max-w-2xl border-l-2 border-accent pl-5 text-lg font-semibold leading-snug text-accent-strong sm:text-2xl">{ui("role")}</p>
            <p className="mt-7 max-w-[59ch] text-base leading-8 text-muted sm:text-lg">{t("title2")} {t("subtitle")}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a data-testid="hero-business-cta" href="#services" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong">{ui("primary")}<ArrowDown size={16} /></a>
              <a data-testid="hero-career-cta" href="#experience" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line-strong bg-white/[0.04] px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/[0.09]">{ui("secondary")}</a>
            </div>
          </div>
          <div className="hero-portrait relative mx-auto hidden w-full max-w-[360px] lg:block">
            <div aria-hidden="true" className="absolute -inset-5 rounded-[2.5rem] border border-accent/10 bg-accent/[0.035]" />
            <div aria-hidden="true" className="absolute -inset-2 rounded-[2rem] border border-accent/25" />
            <Image src={SITE.photo} alt={SITE.name} width={640} height={760} loading="eager" sizes="(max-width: 1024px) 0px, 360px" className="relative aspect-[4/5] w-full rounded-[1.6rem] border border-line-strong object-cover shadow-[0_36px_90px_rgba(0,0,0,0.38)]" />
          </div>
        </div>
        <div className="mt-14 border-t border-line-strong pt-7 sm:mt-20">
          <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-strong">{specializations("label")}</p>
          <div className="grid gap-4 md:grid-cols-2">
            {tracks.map((track, index) => (
              <a key={track.title} data-ux-v3-path href={track.href} className="v3-path group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-line-strong bg-raised p-6 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-1 hover:border-accent/60 hover:bg-[#16263b] focus-visible:outline-offset-4 motion-reduce:transform-none sm:p-7">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-sky-300/40 to-transparent" />
                <span className="mb-5 font-mono text-xs tracking-[0.2em] text-accent-strong">0{index + 1} / 02 · {track.subtitle}</span>
                <h2 className="max-w-[23ch] text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-[1.75rem]">{track.title}</h2>
                <p className="mt-3 max-w-[55ch] text-sm leading-6 text-muted">{track.summary}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-accent-strong">{track.action}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">↗</span></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
