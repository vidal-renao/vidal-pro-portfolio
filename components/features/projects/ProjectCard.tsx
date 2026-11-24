import Image from "next/image";
import { ArrowUpRight, Check, GitHub, Lock } from "@/components/ui/icons";
import type { ExplorerLabels, LocalizedProject } from "./types";

const STATUS_STYLE = {
  production: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  demo: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  staging: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  lab: "border-teal-300/30 bg-teal-300/10 text-teal-200",
} as const;

function Highlight({ text }: { text: string }) {
  return (
    <li className="flex gap-2.5 text-sm leading-6 text-muted">
      <Check size={16} className="mt-1 flex-none text-accent" />{text}
    </li>
  );
}

interface Props {
  project: LocalizedProject;
  labels: ExplorerLabels;
  onStack: (tech: string) => void;
  priority?: boolean;
  /** Extra classes on the card, e.g. to hide it on phones until the list is expanded. */
  className?: string;
}

/** One project: screenshot, status, what it is, three verifiable facts, stack (click to filter) and links. */
export function ProjectCard({ project: p, labels, onStack, priority = false, className = "" }: Props) {
  return (
    <article className={`premium-panel group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-raised ${className}`}>
      {p.image && (
        <a href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden className="relative block aspect-[16/9] overflow-hidden border-b border-line bg-black">
          <Image src={p.image} alt="" fill priority={priority} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
        </a>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[p.status]}`}>{labels.status[p.status]}</span>
          {p.featured && <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">{labels.featured}</span>}
          {p.bridge && <span data-project-bridge className="rounded-full border border-teal-300/30 bg-teal-300/[0.06] px-2.5 py-0.5 text-xs font-medium text-teal-200">{labels.bridge}</span>}
          <span className="text-xs text-dim">{p.categories.map((c) => labels.category[c]).join(" · ")}</span>
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-ink">{p.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{p.summary}</p>
        {/* Desktop: all facts visible. Phones: first fact + the rest on demand, so the section stays short. */}
        <ul className="mt-5 hidden flex-col gap-3 sm:flex">
          {p.highlights.map((h) => <Highlight key={h} text={h} />)}
        </ul>
        <div className="mt-5 sm:hidden">
          <ul className="flex flex-col gap-3">{p.highlights.slice(0, 1).map((h) => <Highlight key={h} text={h} />)}</ul>
          {p.highlights.length > 1 && (
            <details className="group/facts mt-3 rounded-xl border border-line bg-white/[0.025] px-3 py-2">
              <summary className="flex min-h-10 cursor-pointer items-center justify-between text-xs font-medium text-accent">
                {labels.moreFacts.replace("{count}", String(p.highlights.length - 1))}
                <span aria-hidden="true" className="text-lg transition-transform group-open/facts:rotate-45">+</span>
              </summary>
              <ul className="flex flex-col gap-3 pb-2 pt-3">{p.highlights.slice(1).map((h) => <Highlight key={h} text={h} />)}</ul>
            </details>
          )}
        </div>
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
