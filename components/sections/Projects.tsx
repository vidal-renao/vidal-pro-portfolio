import { getTranslations } from "next-intl/server";
import { PROJECTS, PROJECT_CATEGORIES } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { ProjectExplorer } from "@/components/features/projects/ProjectExplorer";
import type { ExplorerLabels, LocalizedProject } from "@/components/features/projects/types";

/** Resolves project copy on the server; only the explorer (search and filters) runs on the client. */
export async function Projects({ locale }: { locale: string }) {
  const [t, ui] = await Promise.all([
    getTranslations({ locale, namespace: "projects.items" }),
    getTranslations({ locale, namespace: "ui.projects" }),
  ]);
  const projects: LocalizedProject[] = PROJECTS.map((p) => ({
    ...p,
    featured: Boolean(p.featured),
    title: t(`${p.slug}.title`),
    summary: t(`${p.slug}.summary`),
    highlights: t.raw(`${p.slug}.highlights`) as string[],
  }));
  const labels: ExplorerLabels = {
    search: ui("search"), all: ui("all"), countOne: ui.raw("count_one") as string, countOther: ui.raw("count_other") as string,
    empty: ui("empty"), clear: ui("clear"), open: ui("open"), code: ui("code"), private: ui("private"), featured: ui("featured"),
    status: { production: ui("status.production"), demo: ui("status.demo"), staging: ui("status.staging") },
    category: { ai: ui("category.ai"), saas: ui("category.saas"), client: ui("category.client") },
  };
  return (
    <Section id="projects" label={ui("label")} title={ui("title")} subtitle={ui("subtitle")}>
      <ProjectExplorer projects={projects} categories={PROJECT_CATEGORIES} labels={labels} />
    </Section>
  );
}
