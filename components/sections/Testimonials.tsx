import { getTranslations } from "next-intl/server";

interface Item { quote: string; author: string; role: string; initials: string; url: string; urlLabel: string }

/** Client quotes, each linked to the live project it refers to. */
export async function Testimonials({ locale }: { locale: string }) {
  const [t, ui] = await Promise.all([
    getTranslations({ locale, namespace: "testimonials" }),
    getTranslations({ locale, namespace: "ui.testimonials" }),
  ]);
  const items = t.raw("items") as Item[];
  return (
    <section aria-labelledby="testimonials-title" className="border-t border-line px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">{ui("label")}</p>
        <h2 id="testimonials-title" className="mb-10 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{t("title")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <figure key={item.author} className="reveal flex flex-col rounded-2xl border border-line bg-raised p-6">
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
      </div>
    </section>
  );
}
