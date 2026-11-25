import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SITE } from "@/content/site";
import { PROJECTS } from "@/content/projects";
import { CREDENTIALS } from "@/content/credentials";
import { ArrowDown, ArrowUpRight, Code, Download, Pin, Server } from "@/components/ui/icons";
import { PILLAR, type Pillar } from "@/components/ui/pillar";

interface HeroTrack {
  title: string;
  subtitle: string;
  summary: string;
  action: string;
  href: string;
}

/** Track order in `specializations.tracks`: Software & AI first, IT Systems & Cloud second. */
const TRACK_PILLAR: Pillar[] = ["software", "systems"];

const CTA_BASE = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold focus-visible:outline-offset-4";

/** Commercial first impression: value proposition, framed portrait, proof numbers and both career pathways. */
export async function Hero({ locale }: { locale: string }) {
  const [t, ui, nav, specializations] = await Promise.all([
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "ui.hero" }),
    getTranslations({ locale, namespace: "ui.nav" }),
    getTranslations({ locale, namespace: "specializations" }),
  ]);
  const tracks = specializations.raw("tracks") as HeroTrack[];
  const stats = [
    { value: PROJECTS.filter((p) => p.status !== "lab").length, label: ui("statProjects") },
    { value: CREDENTIALS.filter((c) => c.group === "ai").length, label: ui("statCerts") },
    { value: SITE.languages.length, label: ui("statLanguages") },
  ];

  return (
    <section id="top" className="v3-hero relative isolate overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-32">
      <div aria-hidden="true" className="v3-hero-glow pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-sw/20 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/2 h-[26rem] w-[26rem] rounded-full bg-sys/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl" data-ux-v3-hero>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div className="hero-content relative z-10 min-w-0">
            <p className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-sys/30 bg-sys/10 px-3.5 py-1.5 text-sm font-medium text-ink">
              <span aria-hidden="true" className="relative flex h-2 w-2 flex-none"><span className="timeline-node-pulse absolute inset-0 rounded-full bg-sys-2" /><span className="relative h-2 w-2 rounded-full bg-sys-2" /></span>
              <Pin size={14} className="flex-none text-sys-soft" /><span className="min-w-0">{ui("eyebrow")}</span>
            </p>
            <div className="flex items-center gap-4">
              <Image src={SITE.photo} alt="" width={80} height={80} loading="eager" sizes="64px" className="h-16 w-16 flex-none rounded-2xl border border-sw/40 object-cover shadow-[0_8px_30px_-8px_rgba(79,70,229,0.6)] lg:hidden" />
              <h1 className="min-w-0 text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[1] tracking-tight text-ink">{SITE.name}</h1>
            </div>
            <p className="mt-6 max-w-3xl text-xl font-bold leading-snug tracking-tight sm:text-2xl"><span className="text-gradient-brand">{ui("role")}</span></p>
            <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-muted sm:text-lg"><strong className="font-semibold text-ink">{t("title2")}</strong> {t("subtitle")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a data-testid="hero-business-cta" href="#services" className={`${CTA_BASE} cta-sw text-white`}><Code size={18} />{ui("primary")}<ArrowDown size={16} /></a>
              <a data-testid="hero-career-cta" href="#experience" className={`${CTA_BASE} cta-sys text-sys-ink`}><Server size={18} />{ui("secondary")}<ArrowDown size={16} /></a>
              <a href="#cv" className={`${CTA_BASE} border border-line-strong bg-white/[0.04] text-ink transition-colors hover:border-white/40 hover:bg-white/[0.08]`}><Download size={18} />{nav("cv")}</a>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col rounded-2xl border border-line bg-white/[0.03] px-3 py-3 sm:px-4">
                  <dt className="text-sm leading-snug text-muted">{s.label}</dt>
                  <dd className="order-first font-mono text-2xl font-bold tabular-nums text-ink sm:text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="hero-portrait relative mx-auto hidden w-full max-w-[300px] lg:block">
            <div className="portrait-ring rounded-[2rem] p-[2px]">
              <div className="overflow-hidden rounded-[calc(2rem-2px)] bg-bg">
                <Image src={SITE.photo} alt={SITE.name} width={320} height={400} loading="eager" sizes="300px" className="aspect-[4/5] w-full object-cover" />
              </div>
            </div>
            <div aria-hidden="true" className="absolute -bottom-5 -left-6 flex items-center gap-2 rounded-2xl border border-line-strong bg-raised px-4 py-2.5 font-mono text-sm font-semibold text-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]">
              <span className="h-2 w-2 rounded-full bg-sys-2" />{SITE.languages.join(" · ")}
            </div>
          </div>
        </div>
        <div className="mt-14 sm:mt-16">
          <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">{specializations("label")}</p>
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {tracks.map((track, index) => {
              const kind = TRACK_PILLAR[index] ?? "software";
              const pillar = PILLAR[kind];
              return (
                <a key={track.title} data-ux-v3-path href={track.href} className={`v3-path card-elevated ${pillar.card} group relative flex min-h-[200px] flex-col overflow-hidden rounded-3xl border border-line-strong bg-raised p-6 focus-visible:outline-offset-4 sm:p-7`}>
                  <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${pillar.topLine}`} />
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs font-semibold tracking-[0.08em] ${pillar.chip}`}>0{index + 1} · {track.subtitle}</span>
                    <span aria-hidden="true" className={`v3-path-symbol flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${pillar.iconBox}`}>{kind === "software" ? <Code size={22} /> : <Server size={22} />}</span>
                  </div>
                  <h2 className="max-w-[27ch] text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[1.75rem]">{track.title}</h2>
                  <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-muted">{track.summary}</p>
                  <span className={`mt-auto inline-flex items-center gap-2 pt-5 text-base font-semibold ${pillar.text}`}>{track.action}<ArrowUpRight size={18} className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-1 motion-reduce:transform-none" /></span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
