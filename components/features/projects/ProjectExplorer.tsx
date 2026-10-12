"use client";
import { useMemo, useState } from "react";
import type { ProjectCategory } from "@/content/projects";
import { Close, Search } from "@/components/ui/icons";
import { ProjectCard } from "./ProjectCard";
import { filterProjects } from "./filter";
import type { ExplorerLabels, LocalizedProject } from "./types";

interface Props {
  projects: LocalizedProject[];
  categories: ProjectCategory[];
  labels: ExplorerLabels;
}

/** Search box + category chips over the project grid. Featured projects lead when nothing is filtered. */
export function ProjectExplorer({ projects, categories, labels }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory | null>(null);
  const results = useMemo(() => filterProjects(projects, query, category), [projects, query, category]);
  const filtered = Boolean(query.trim() || category);
  const count = (results.length === 1 ? labels.countOne : labels.countOther).replace("{count}", String(results.length));
  const clear = () => { setQuery(""); setCategory(null); };
  const chip = (active: boolean) => `rounded-full border px-3.5 py-1.5 text-sm transition-colors ${active ? "border-accent/50 bg-accent/15 text-accent" : "border-line text-muted hover:border-line-strong hover:text-ink"}`;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label={labels.all} className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={!category} onClick={() => setCategory(null)} className={chip(!category)}>
            {labels.all} <span className="text-dim">{projects.length}</span>
          </button>
          {categories.map((c) => (
            <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(category === c ? null : c)} className={chip(category === c)}>
              {labels.category[c]} <span className="text-dim">{projects.filter((p) => p.categories.includes(c)).length}</span>
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:w-80">
          <span className="sr-only">{labels.search}</span>
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={labels.search}
            className="h-11 w-full rounded-full border border-line bg-raised pl-10 pr-10 text-sm text-ink placeholder:text-dim focus:border-accent/50 focus:outline-none" />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label={labels.clear} className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-dim hover:text-ink">
              <Close size={15} />
            </button>
          )}
        </label>
      </div>

      <p aria-live="polite" className="mb-5 flex items-center gap-3 text-sm text-dim">
        {count}
        {filtered && <button type="button" onClick={clear} className="text-accent hover:underline">{labels.clear}</button>}
      </p>

      {results.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {results.map((p) => (
            <ProjectCard key={p.slug} project={p} labels={labels} onStack={(tech) => { setCategory(null); setQuery(tech); }} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line px-6 py-14 text-center">
          <p className="text-muted">{labels.empty}</p>
          <button type="button" onClick={clear} className="mt-4 rounded-full border border-line px-4 py-2 text-sm text-ink hover:bg-white/[0.05]">{labels.clear}</button>
        </div>
      )}
    </div>
  );
}
