import { getTranslations } from "next-intl/server";
import { PROJECTS } from "@/content/projects";
import { selectProjectSlugs, type CvVariant } from "./profileContent";

export interface CvProject {
  slug: string;
  title: string;
  summary: string;
  status: string;
  stack: string[];
  /** Host of the public URL, shown instead of the full link. */
  host: string;
}

/** Portfolio projects for the CV's Projects section, localized; same copy as the website cards. */
export async function loadCvProjects(locale: string, variant: CvVariant): Promise<CvProject[]> {
  const slugs = selectProjectSlugs(variant);
  if (slugs.length === 0) return [];
  const [t, ui] = await Promise.all([
    getTranslations({ locale, namespace: "projects.items" }),
    getTranslations({ locale, namespace: "ui.projects.status" }),
  ]);
  return slugs.flatMap((slug) => {
    const p = PROJECTS.find((project) => project.slug === slug);
    if (!p) return [];
    return [{
      slug,
      title: t(`${slug}.title`),
      summary: t(`${slug}.summary`),
      status: ui(p.status),
      stack: p.stack,
      host: new URL(p.url).host,
    }];
  });
}
