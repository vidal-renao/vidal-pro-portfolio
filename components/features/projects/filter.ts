import type { ProjectCategory } from "@/content/projects";
import type { LocalizedProject } from "./types";

const normalise = (text: string) => text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/** Category filter plus free-text search over title, summary, highlights and stack (accent-insensitive). */
export function filterProjects(projects: LocalizedProject[], query: string, category: ProjectCategory | null) {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  return projects.filter((p) => {
    if (category && !p.categories.includes(category)) return false;
    if (!terms.length) return true;
    const haystack = normalise([p.title, p.summary, ...p.highlights, ...p.stack].join(" "));
    return terms.every((term) => haystack.includes(term));
  });
}
