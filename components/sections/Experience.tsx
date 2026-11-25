import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { ExperienceTimeline, type ExperienceRole } from "@/components/features/experience/ExperienceTimeline";
import { HIGHLIGHT_LEADS, ROLE_STACK } from "@/content/experience";

/** Original chronological source is preserved for the CV/API. View filter changes presentation only. */
export async function Experience({ locale }: { locale: string }) {
  const [t, ui] = await Promise.all([
    getTranslations({ locale, namespace: "experience" }),
    getTranslations({ locale, namespace: "ui.experience" }),
  ]);
  const roles = t.raw("roles") as ExperienceRole[];
  return (
    <Section id="experience" label={ui("label")} title={t("title")} subtitle={t("subtitle")} narrow>
      <ExperienceTimeline
        roles={roles}
        stacks={ROLE_STACK}
        leads={HIGHLIGHT_LEADS[locale] ?? {}}
        labels={{ it: ui("itFocus"), full: ui("fullHistory"), more: ui.raw("more") as string, less: ui("less"), stack: ui("stack"), current: ui("current") }}
      />
    </Section>
  );
}
