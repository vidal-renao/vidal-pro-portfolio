import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PROJECTS } from "@/content/projects";
import { CREDENTIALS } from "@/content/credentials";
import { SITE } from "@/content/site";
import { ArrowDown, Pin } from "@/components/ui/icons";

/** First screen: who, what, where — and the numbers behind it, counted from the content modules. */
export async function Hero({ locale }: { locale: string }) {
  const [t, ui] = await Promise.all([
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "ui.hero" }),
  ]);
  const stats = [
    { value: String(PROJECTS.length), label: ui("statProjects") },
    { value: String(CREDENTIALS.filter((c) => c.group === "ai").length), label: ui("statCerts") },
    { value: String(SITE.languages.length), label: `${ui("statLanguages")} · ${SITE.languages.join(" ")}` },
  ];

  return (
    <section id="top" className="hero-stage relative isolate overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_65%_70%_at_50%_0%,rgba(91,141,184,0.10),transparent_72%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:min-h-[590px] lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="hero-content relative z-10">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            <Pin size={13} />{ui("eyebrow")}
          </p>
          <div className="flex items-center gap-4">
            <Image src={SITE.photo} alt="" width={128} height={128} loading="eager" sizes="64px" className="h-16 w-16 flex-none rounded-2xl border border-line object-cover lg:hidden" />
            <h1 className="text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-ink">{SITE.name}</h1>
          </div>
          <p className="mt-5 text-xl font-medium text-accent sm:text-2xl">{ui("role")}</p>
          <p className="mt-7 max-w-[59ch] text-base leading-7 text-muted sm:text-lg sm:leading-8">{t("title2")} {t("subtitle")}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a data-testid="hero-business-cta" href="#services" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong">
              {ui("primary")}<ArrowDown size={16} />
            </a>
            <a data-testid="hero-career-cta" href="#experience" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/[0.05]">
              {ui("secondary")}
            </a>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-line-strong pt-7 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs leading-5 text-dim sm:text-sm">{s.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero-portrait relative mx-auto hidden w-full max-w-[390px] lg:block">
          <div aria-hidden className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-transparent blur-2xl" />
          <Image src={SITE.photo} alt={SITE.name} width={680} height={720} loading="eager" sizes="340px"
            className="relative aspect-[4/5] w-full rounded-[1.75rem] border border-line-strong object-cover shadow-[0_28px_90px_rgba(0,0,0,0.32)]" />
        </div>
      </div>
    </section>
  );
}
