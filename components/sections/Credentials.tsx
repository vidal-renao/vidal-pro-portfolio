import { getTranslations } from "next-intl/server";
import { CREDENTIALS, CREDENTIAL_GROUPS } from "@/content/credentials";
import { Section } from "@/components/ui/Section";
import { ArrowUpRight, FileText } from "@/components/ui/icons";

/** Certificates grouped by field; each links to its PDF, or says it is available on request. */
export async function Credentials({ locale }: { locale: string }) {
  const [t, ui] = await Promise.all([
    getTranslations({ locale, namespace: "certifications" }),
    getTranslations({ locale, namespace: "ui.credentials" }),
  ]);
  return (
    <Section id="credentials" label={ui("label")} title={t("title")} subtitle={t("subtitle")}>
      <div className="flex flex-col gap-10">
        {CREDENTIAL_GROUPS.map((group) => {
          const items = CREDENTIALS.filter((c) => c.group === group);
          return (
            <div key={group}>
              <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold text-ink">
                {ui(group)}<span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-xs text-dim">{items.length}</span>
              </h3>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                  <li key={c.key} className="reveal flex flex-col rounded-2xl border border-line bg-raised p-5">
                    <div className="flex items-start gap-3">
                      <span aria-hidden className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-accent/10 text-accent"><FileText size={17} /></span>
                      <div className="min-w-0">
                        <p className="font-semibold leading-snug text-ink">{t(`${c.key}_title`)}</p>
                        <p className="mt-1 text-xs text-dim">{t(`${c.key}_issuer`)} · {t(`${c.key}_year`)}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted">{t(`${c.key}_meaning`)}</p>
                    <div className="mt-auto pt-4">
                      {c.pdf ? (
                        <a href={c.pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-strong">
                          {t("open")}<ArrowUpRight size={15} /><span className="sr-only">{t(`${c.key}_title`)}</span>
                        </a>
                      ) : (
                        <span className="text-xs text-dim">{ui("noPdf")}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
