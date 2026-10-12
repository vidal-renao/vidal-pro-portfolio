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
          <div key={a.area} className="reveal rounded-2xl border border-line bg-raised p-5">
            <h3 className="text-sm font-semibold text-ink">{a.area}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {a.detail.split(" · ").map((item) => (
                <li key={item} className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-muted">{item}</li>
              ))}
            </ul>
          </div>
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
