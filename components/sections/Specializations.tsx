import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { ContactIntentLink, type ContactPurpose } from "@/components/features/contact/ContactIntentLink";
import { ArrowLeftRight, CheckCircle, Code, Server } from "@/components/ui/icons";
import { PILLAR, type Pillar } from "@/components/ui/pillar";

/** Track order in `specializations.tracks`: Software & AI first, IT Systems & Cloud second. */
const TRACK_PILLAR: Pillar[] = ["software", "systems"];

interface TechGroup { label: string; items: string[] }

interface Track {
  title: string;
  subtitle: string;
  summary: string;
  capabilities: string[];
  technical: TechGroup[];
  proof: string;
  action: string;
  href: string;
  /** Second call to action: opens the contact form with this purpose preselected. */
  contact: string;
  intent: ContactPurpose;
}

export async function Specializations({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "specializations" });
  const tracks = t.raw("tracks") as Track[];

  return (
    <Section id="specializations" label={t("label")} title={t("title")} subtitle={t("subtitle")}>
      <div className="relative grid items-stretch gap-4 lg:grid-cols-2 lg:gap-8">
        {tracks.map((track, index) => {
          const kind = TRACK_PILLAR[index] ?? "software";
          const pillar = PILLAR[kind];
          return (
          <Fragment key={track.title}>
          {index === 1 && (
            <div aria-hidden="true" data-pillar-connector className="pillar-connector z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
              <ArrowLeftRight size={24} className="rotate-90 lg:rotate-0" />
            </div>
          )}
          <article className={`card-elevated ${pillar.card} group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line-strong bg-raised p-6 lg:p-9`}>
            <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${pillar.topLine}`} />
            <div className="mb-7 flex items-center justify-between gap-3">
              <span aria-hidden="true" className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${pillar.iconBox}`}>{kind === "software" ? <Code size={24} /> : <Server size={24} />}</span>
              <span className={`rounded-full border px-3 py-1 font-mono text-xs font-semibold ${pillar.chip}`}>0{index + 1} · {track.subtitle}</span>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{track.title}</h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">{track.summary}</p>
            <ul className="mt-7 grid gap-3" aria-label={track.title}>
              {track.capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3 text-base leading-relaxed text-ink/90">
                  <CheckCircle size={20} className={`mt-0.5 shrink-0 ${pillar.bullet}`} />
                  {capability}
                </li>
              ))}
            </ul>
            <details className="group/tech mt-7 rounded-2xl border border-line bg-white/[0.025] px-4 py-3">
              <summary className="flex min-h-8 cursor-pointer items-center justify-between gap-4 text-sm font-medium text-ink">
                <span>{t("technicalLabel")}</span>
                <span aria-hidden="true" className="text-accent transition-transform group-open/tech:rotate-45">+</span>
              </summary>
              <div className="grid gap-4 pb-2 pt-4">
                {track.technical.map((group) => (
                  <div key={group.label} data-tech-group>
                    <p className={`mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] ${pillar.text}`}>{group.label}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {group.items.map((tech) => (
                        <li key={tech} className="rounded-lg border border-line bg-bg/50 px-2.5 py-1.5 text-sm text-muted">{tech}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
            <p className="mt-6 border-t border-line pt-5 text-base leading-relaxed text-muted">{track.proof}</p>
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
              <a data-track-action href={track.href} className="inline-flex min-h-11 w-fit items-center focus-visible:outline-offset-4 gap-2 rounded-full border border-line-strong bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:bg-white/[0.08]">
                {track.action}<span aria-hidden="true">↗</span>
              </a>
              <ContactIntentLink testId="track-contact-cta" intent={track.intent === "career" ? { purpose: "career" } : { purpose: "business", service: "web" }} label={track.contact} />
            </div>
          </article>
          </Fragment>
          );
        })}
      </div>
      <div data-pillar-bridge className="mx-auto mt-10 max-w-3xl rounded-3xl border border-line-strong bg-white/[0.03] p-6 text-center lg:p-8">
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-sm font-semibold">
          <span className={`rounded-full border px-3 py-1 ${PILLAR.software.chip}`}>{tracks[0]?.subtitle}</span>
          <ArrowLeftRight size={22} className="text-ink" />
          <span className={`rounded-full border px-3 py-1 ${PILLAR.systems.chip}`}>{tracks[1]?.subtitle}</span>
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("bridge")}</p>
      </div>
    </Section>
  );
}
