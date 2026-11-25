import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Narrow sections (timeline) read better at a shorter line length. */
  narrow?: boolean;
  titleClassName?: string;
}

/** Shared section frame: anchor, eyebrow label, heading and optional intro. */
export function Section({ id, label, title, subtitle, children, narrow = false, titleClassName = "" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-shell relative px-4 py-20 sm:px-6 lg:py-28">
      <div className={`mx-auto ${narrow ? "max-w-4xl" : "max-w-6xl"}`}>
        <header className="reveal mb-10 max-w-3xl sm:mb-14">
          <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-sw/30 bg-sw/10 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-sw-soft shadow-[0_0_24px_-8px_rgba(129,140,248,0.6)]"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sw to-sys" />{label}</p>
          <h2 id={`${id}-title`} className={`text-[2rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] ${titleClassName}`}>{title}</h2>
          {subtitle && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
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
