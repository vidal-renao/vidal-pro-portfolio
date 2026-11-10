import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Narrow sections (timeline) read better at a shorter line length. */
  narrow?: boolean;
}

/** Shared section frame: anchor, eyebrow label, heading and optional intro. */
export function Section({ id, label, title, subtitle, children, narrow = false }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-shell border-t border-line px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
      <div className={`mx-auto ${narrow ? "max-w-4xl" : "max-w-6xl"}`}>
        <header className="reveal mb-10 max-w-3xl sm:mb-12">
          <p className="mb-4 inline-flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent"><span aria-hidden="true" className="h-px w-7 bg-accent/60" />{label}</p>
          <h2 id={`${id}-title`} className="text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-[2.65rem]">{title}</h2>
          {subtitle && <p className="mt-5 max-w-2xl text-base leading-8 text-muted">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

/** Small rounded label used for stack, tags and filters. */
export function Chip({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tone === "accent" ? "border-accent/30 bg-accent/10 text-accent" : "border-line bg-white/[0.03] text-muted"}`}>
      {children}
    </span>
  );
}
