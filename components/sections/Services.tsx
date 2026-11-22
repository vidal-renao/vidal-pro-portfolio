import { getTranslations } from "next-intl/server";
import { ContactIntentLink } from "@/components/features/contact/ContactIntentLink";
import { Section } from "@/components/ui/Section";

interface Service { title: string; desc: string; evidence: string; tags: string[] }

/** Three services, each naming the projects or roles that back it. */
export async function Services({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "services" });
  const items = t.raw("items") as Service[];
  return (
    <Section id="services" label={t("label")} title={t("title")} subtitle={t("subtitle")}>
      <div className="grid items-stretch gap-5 md:grid-cols-3">
        {items.map((s, i) => (
          <article key={s.title} className="premium-panel reveal group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-raised p-6 sm:p-7">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/70 via-accent/20 to-transparent" /><span className="font-mono text-xs tracking-[0.16em] text-accent">0{i + 1}</span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{s.title}</h3>
            <p className="mt-3 min-h-24 text-sm leading-7 text-muted">{s.desc}</p>
            <p className="mt-4 border-t border-line pt-4 text-xs leading-6 text-dim"><span className="text-muted">{t("evidenceLabel")}:</span> {s.evidence}</p>
            <div className="service-action mt-6 mb-6"><ContactIntentLink service={(["web", "ai", "it"] as const)[i]} label={t("contactCta")} /></div>
            <details className="group/stack mt-auto border-t border-line pt-5">
              <summary className="flex min-h-10 items-center justify-between gap-2 text-xs font-medium text-accent">
                {t("technicalLabel")}
                <span aria-hidden="true" className="text-lg transition-transform group-open/stack:rotate-45">+</span>
              </summary>
              <ul className="flex flex-wrap gap-1.5 pt-3">
                {s.tags.map((tag) => <li key={tag} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">{tag}</li>)}
              </ul>
            </details>
          </article>
        ))}
      </div>
    </Section>
  );
}
