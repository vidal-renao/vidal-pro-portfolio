import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";

interface Area { area: string; detail: string }
interface Language { id: string; lang: string; level: string }

/** Skills and languages straight from the CV data, so the page and the CV never disagree. */
export async function Skills({ locale }: { locale: string }) {
  const [cv, ui] = await Promise.all([
    getTranslations({ locale, namespace: "cv" }),
    getTranslations({ locale, namespace: "ui.skills" }),
  ]);
  const areas = cv.raw("knowledge") as Area[];
  const languages = cv.raw("languages") as Language[];
  return (
    <Section id="skills" label={ui("label")} title={ui("title")} subtitle={ui("subtitle")}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a) => (
          <details key={a.area} className="premium-panel reveal group rounded-3xl border border-line bg-raised p-6">
            <summary className="flex min-h-12 items-center justify-between gap-4">
              <span className="text-base font-semibold text-ink">{a.area}</span>
              <span className="flex shrink-0 items-center gap-2 text-xs text-accent">
                {ui("show")}
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
        <div className="reveal rounded-2xl border border-line bg-raised p-5">
          <h3 className="text-sm font-semibold text-ink">{cv("languagesTitle")}</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {languages.map((l) => (
              <li key={l.id} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-ink">{l.lang}</span><span className="text-right text-xs text-dim">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
