import Image from "next/image";
import { ArrowUpRight, Check, GitHub, Lock } from "@/components/ui/icons";
import type { ExplorerLabels, LocalizedProject } from "./types";

const STATUS_STYLE = {
  production: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  demo: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  staging: "border-amber-400/30 bg-amber-400/10 text-amber-300",
} as const;

interface Props {
  project: LocalizedProject;
  labels: ExplorerLabels;
  onStack: (tech: string) => void;
  priority?: boolean;
}

/** One project: screenshot, status, what it is, three verifiable facts, stack (click to filter) and links. */
export function ProjectCard({ project: p, labels, onStack, priority = false }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-raised transition-colors hover:border-line-strong">
      {p.image && (
        <a href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden className="relative block aspect-[16/9] overflow-hidden border-b border-line bg-black">
          <Image src={p.image} alt="" fill priority={priority} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
        </a>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[p.status]}`}>{labels.status[p.status]}</span>
          {p.featured && <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">{labels.featured}</span>}
          <span className="text-xs text-dim">{p.categories.map((c) => labels.category[c]).join(" · ")}</span>
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-ink">{p.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{p.summary}</p>
        <ul className="mt-4 flex flex-col gap-2">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm leading-6 text-muted">
              <Check size={16} className="mt-1 flex-none text-accent" />{h}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((tech) => (
            <button key={tech} type="button" onClick={() => onStack(tech)}
              className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent/40 hover:text-accent">
              {tech}
            </button>
          ))}
        </div>
        <div className="mt-auto pt-6"><div className="flex items-center gap-4 border-t border-line pt-4">
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-strong">
            {labels.open}<ArrowUpRight size={16} /><span className="sr-only">{p.title}</span>
          </a>
          {p.repo ? (
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
              <GitHub size={16} />{labels.code}<span className="sr-only">{p.title}</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm text-dim"><Lock size={15} />{labels.private}</span>
          )}
        </div></div>
      </div>
    </article>
  );
}
