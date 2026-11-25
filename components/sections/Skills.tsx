import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Code, Languages, Server } from "@/components/ui/icons";
import { PILLAR } from "@/components/ui/pillar";

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
    { id: "systems", pillar: PILLAR.systems, Icon: Server, title: ui("groups.systems"), areas: cvSystems.raw("knowledge") as Area[] },
    { id: "software", pillar: PILLAR.software, Icon: Code, title: ui("groups.software"), areas: (cv.raw("knowledge") as FullstackArea[]).filter((a) => a.pillar === "software") },
  ];
  const languages = cv.raw("languages") as Language[];
  return (
    <Section id="skills" label={ui("label")} title={ui("title")} subtitle={ui("subtitle")}>
      {groups.map((group) => (
      <div key={group.id} data-skill-group={group.id} className="mb-12">
      <div className="mb-5 flex items-center gap-3">
        <span aria-hidden="true" className={`flex h-10 w-10 items-center justify-center rounded-xl border ${group.pillar.iconBox}`}><group.Icon size={20} /></span>
        <h3 className={`font-mono text-sm font-semibold uppercase tracking-[0.16em] ${group.pillar.text}`}>{group.title}</h3>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {group.areas.map((a) => (
          <details key={a.area} className={`card-elevated ${group.pillar.card} reveal group relative overflow-hidden rounded-3xl border border-line-strong bg-raised p-5 sm:p-6`}>
            <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${group.pillar.dot}`} />
            <summary className="flex min-h-12 items-center justify-between gap-4">
              <span className="text-base font-semibold text-ink">{a.area}</span>
              <span className={`flex shrink-0 items-center gap-2 text-sm font-medium ${group.pillar.text}`}>
                <span className="sr-only sm:not-sr-only">{ui("show")}</span>
                <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <ul className="mt-4 flex flex-wrap gap-2 border-t border-line pt-5">
              {a.detail.split(" · ").map((item) => (
                <li key={item} className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-sm text-muted">{item}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      </div>
      ))}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <details className="card-elevated reveal group rounded-3xl border border-line-strong bg-raised p-6">
          <summary className="flex min-h-12 items-center justify-between gap-4">
            <span className="flex items-center gap-3 text-base font-semibold text-ink"><Languages size={20} className="text-sw-soft" />{cv("languagesTitle")}</span>
            <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-sw-soft">
              {ui("show")}
              <span aria-hidden="true" className="text-lg transition-transform group-open:rotate-45">+</span>
            </span>
          </summary>
          <ul className="mt-4 flex flex-col gap-3 border-t border-line pt-5">
            {languages.map((l) => (
              <li key={l.id} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-ink">{l.lang}</span><span className="text-right text-sm text-muted">{l.level}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </Section>
  );
}
