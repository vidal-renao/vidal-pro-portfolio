import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";

interface Item { quote: string; author: string; role: string; initials: string; url: string; urlLabel: string }

/** Client quotes, each linked to the live project it refers to. */
export async function Testimonials({ locale }: { locale: string }) {
  const [t, ui] = await Promise.all([
    getTranslations({ locale, namespace: "testimonials" }),
    getTranslations({ locale, namespace: "ui.testimonials" }),
  ]);
  const items = t.raw("items") as Item[];
  return (
    <Section id="testimonials" label={ui("label")} title={t("title")}>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <figure key={item.author} className="premium-panel reveal flex flex-col rounded-3xl border border-line bg-raised p-7">
              <blockquote className="text-base leading-7 text-ink/90">“{item.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span aria-hidden className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">{item.initials}</span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">{item.author}</span>
                  <span className="block text-xs text-dim">{item.role} · <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-muted underline-offset-2 hover:underline">{item.urlLabel}</a></span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
    </Section>
  );
}
