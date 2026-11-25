import { getTranslations } from "next-intl/server";
import { ContactIntentLink } from "@/components/features/contact/ContactIntentLink";
import { Section } from "@/components/ui/Section";
import { Globe, Server, Sparkles } from "@/components/ui/icons";
import { PILLAR, type Pillar } from "@/components/ui/pillar";

interface Service { title: string; desc: string; evidence: string; tags: string[] }

/** Services in message order: websites & apps, AI automation, IT support. */
const SERVICE_META = [
  { service: "web", pillar: "software", Icon: Globe },
  { service: "ai", pillar: "software", Icon: Sparkles },
  { service: "it", pillar: "systems", Icon: Server },
] as const satisfies ReadonlyArray<{ service: "web" | "ai" | "it"; pillar: Pillar; Icon: typeof Globe }>;

/** Three services, each naming the projects or roles that back it. */
export async function Services({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "services" });
  const items = t.raw("items") as Service[];
  return (
    <Section id="services" label={t("label")} title={t("title")} subtitle={t("subtitle")}>
      <div className="grid items-stretch gap-6 md:grid-cols-3 lg:gap-8">
        {items.map((s, i) => {
          const meta = SERVICE_META[i] ?? SERVICE_META[0];
          const pillar = PILLAR[meta.pillar];
          return (
            <article key={s.title} className={`card-elevated ${pillar.card} reveal group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line-strong bg-raised p-6 lg:p-8`}>
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${pillar.topLine}`} />
              <div className="flex items-center justify-between gap-3">
                <span aria-hidden="true" className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${pillar.iconBox}`}><meta.Icon size={24} /></span>
                <span className={`font-mono text-sm font-semibold tabular-nums ${pillar.text}`}>0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">{s.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{s.desc}</p>
              <p className="mt-5 border-t border-line pt-4 text-base leading-relaxed text-muted"><span className="font-semibold text-ink">{t("evidenceLabel")}:</span> {s.evidence}</p>
              <div className="service-action mt-6 mb-6"><ContactIntentLink intent={{ purpose: "business", service: meta.service }} label={t("contactCta")} /></div>
              <details className="group/stack mt-auto border-t border-line pt-5">
                <summary className={`flex min-h-11 items-center justify-between gap-2 text-sm font-semibold ${pillar.text}`}>
                  {t("technicalLabel")}
                  <span aria-hidden="true" className="text-lg transition-transform group-open/stack:rotate-45">+</span>
                </summary>
                <ul className="flex flex-wrap gap-1.5 pt-3">
                  {s.tags.map((tag) => <li key={tag} className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-muted">{tag}</li>)}
                </ul>
              </details>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
