import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";

interface Area { area: string; detail: string }
interface FullstackArea extends Area { pillar: "software" | "systems" }
interface Language { id: string; lang: string; level: string }

/**
 * Skills grouped by pillar, straight from the CV data so the page and both CVs never disagree:
 * IT Systems & Cloud from the systems CV, Software & AI from the full-stack CV.
 */
export async function Skills({ locale }: { locale: string }) {
  const [cv, cvSystems, ui] = await Promise.all([
    getTranslations({ locale, namespace: "cv" }),
    getTranslations({ locale, namespace: "cvSystems" }),
    getTranslations({ locale, namespace: "ui.skills" }),
  ]);
  const groups = [
    { id: "systems", title: ui("groups.systems"), areas: cvSystems.raw("knowledge") as Area[] },
    { id: "software", title: ui("groups.software"), areas: (cv.raw("knowledge") as FullstackArea[]).filter((a) => a.pillar === "software") },
  ];
  const languages = cv.raw("languages") as Language[];
  return (
    <Section id="skills" label={ui("label")} title={ui("title")} subtitle={ui("subtitle")}>
      {groups.map((group) => (
      <div key={group.id} data-skill-group={group.id} className="mb-10">
      <div className="mb-4 flex items-center gap-3">
        <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${group.id === "systems" ? "bg-teal-300" : "bg-accent"}`} />
        <h3 className={`font-mono text-xs font-semibold uppercase tracking-[0.18em] ${group.id === "systems" ? "text-teal-200" : "text-accent-strong"}`}>{group.title}</h3>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.areas.map((a) => (
          <details key={a.area} className="premium-panel reveal group rounded-3xl border border-line bg-raised p-4 sm:p-6">
            <summary className="flex min-h-12 items-center justify-between gap-4">
              <span className="text-base font-semibold text-ink">{a.area}</span>
              <span className="flex shrink-0 items-center gap-2 text-xs text-accent">
                <span className="sr-only sm:not-sr-only">{ui("show")}</span>
                <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <ul className="mt-4 flex flex-wrap gap-2 border-t border-line pt-5">
              {a.detail.split(" · ").map((item) => (
                <li key={item} className="rounded-lg border border-line bg-white/[0.03] px-3 py-2 text-xs text-muted">{item}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      </div>
      ))}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <details className="premium-panel reveal group rounded-3xl border border-line bg-raised p-6">
          <summary className="flex min-h-12 items-center justify-between gap-4">
            <span className="text-base font-semibold text-ink">{cv("languagesTitle")}</span>
            <span className="flex shrink-0 items-center gap-2 text-xs text-accent">
              {ui("show")}
              <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-45">+</span>
            </span>
          </summary>
          <ul className="mt-4 flex flex-col gap-3 border-t border-line pt-5">
            {languages.map((l) => (
              <li key={l.id} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-ink">{l.lang}</span><span className="text-right text-xs text-dim">{l.level}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </Section>
  );
}
