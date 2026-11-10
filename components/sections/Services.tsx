import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";

interface Service { title: string; desc: string; evidence: string; tags: string[] }

/** Three services, each naming the projects or roles that back it. */
export async function Services({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "services" });
  const items = t.raw("items") as Service[];
  return (
    <Section id="services" label={t("label")} title={t("title")} subtitle={t("subtitle")}>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((s, i) => (
          <article key={s.title} className="premium-panel reveal flex flex-col rounded-3xl border border-line bg-raised p-7">
            <span className="font-mono text-xs text-accent">0{i + 1}</span>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{s.desc}</p>
            <p className="mt-4 text-xs text-dim"><span className="text-muted">{t("evidenceLabel")}:</span> {s.evidence}</p>
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
