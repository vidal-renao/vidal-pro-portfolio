import type { ProjectCategory, ProjectStatus } from "@/content/projects";

/** A project with its copy resolved for the current locale (serialisable for the client explorer). */
export interface LocalizedProject {
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  categories: ProjectCategory[];
  status: ProjectStatus;
  stack: string[];
  url: string;
  repo: string | null;
  image: string | null;
  featured: boolean;
}

export interface ExplorerLabels {
  search: string;
  all: string;
  countOne: string;
  countOther: string;
  empty: string;
  clear: string;
  open: string;
  code: string;
  private: string;
  featured: string;
  status: Record<ProjectStatus, string>;
  category: Record<ProjectCategory, string>;
}
