import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PROJECTS } from "@/content/projects";
import { CREDENTIALS } from "@/content/credentials";
import { SITE } from "@/content/site";
import { ArrowDown, Pin } from "@/components/ui/icons";

/** First screen: who, what, where — and the numbers behind it, counted from the content modules. */
export async function Hero({ locale }: { locale: string }) {
  const [t, ui, reviews, nav] = await Promise.all([
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "ui.hero" }),
    getTranslations({ locale, namespace: "testimonials" }),
    getTranslations({ locale, namespace: "ui.nav" }),
  ]);
  const featured = (reviews.raw("items") as { quote: string; author: string; role: string }[])[0];
  const stats = [
    { value: String(PROJECTS.length), label: ui("statProjects") },
    { value: String(CREDENTIALS.filter((c) => c.group === "ai").length), label: ui("statCerts") },
    { value: String(SITE.languages.length), label: `${ui("statLanguages")} · ${SITE.languages.join(" ")}` },
  ];

  return (
    <section id="top" className="relative isolate overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pb-28 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_65%_70%_at_50%_0%,rgba(91,141,184,0.10),transparent_72%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            <Pin size={13} />{ui("eyebrow")}
          </p>
          <div className="flex items-center gap-4">
            <Image src={SITE.photo} alt="" width={128} height={128} loading="eager" sizes="64px" className="h-16 w-16 flex-none rounded-2xl border border-line object-cover lg:hidden" />
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">{SITE.name}</h1>
          </div>
          <p className="mt-5 text-xl font-medium text-accent sm:text-2xl">{ui("role")}</p>
          {featured && <aside data-featured-testimonial aria-label={reviews("title")} className="premium-panel mt-6 max-w-2xl rounded-2xl border border-accent/25 bg-raised px-4 py-4 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">{reviews("title")}</span>
              <a href="#testimonials" className="text-xs font-semibold text-accent underline underline-offset-4 hover:text-accent-strong">{nav("testimonials")}</a>
            </div>
            <blockquote className="mt-2 line-clamp-2 text-sm leading-6 text-ink">“{featured.quote}”</blockquote>
            <p className="mt-2 text-xs text-muted">{featured.author} · {featured.role}</p>
          </aside>}
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{t("title2")} {t("subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#specializations" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong">
              {ui("primary")}<ArrowDown size={16} />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/[0.05]">
              {ui("secondary")}
            </a>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs leading-5 text-dim sm:text-sm">{s.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto hidden w-full max-w-[340px] lg:block">
          <div aria-hidden className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-transparent blur-2xl" />
          <Image src={SITE.photo} alt={SITE.name} width={680} height={720} loading="eager" sizes="340px"
            className="relative aspect-[17/18] w-full rounded-[1.75rem] border border-line object-cover" />
        </div>
      </div>
    </section>
  );
}
