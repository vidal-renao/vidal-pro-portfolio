"use client";

import { useState } from "react";
import { ChevronDown } from "@/components/ui/icons";

export interface ExperienceRole {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  badge?: string;
}

interface Props {
  roles: ExperienceRole[];
  labels: { it: string; full: string; show: string; hide: string };
}

/** Presentation-only filter: source chronology and all CV/API data remain unchanged. */
export function ExperienceTimeline({ roles, labels }: Props) {
  const [focus, setFocus] = useState<"it" | "full">("it");
  const shown = focus === "it"
    ? roles.filter((r) => r.id !== "servo-carejob-2023")
    : roles;
  return (
    <>
      <div role="group" aria-label={labels.full} className="mb-7 flex flex-wrap gap-2">
        {(["it", "full"] as const).map((option) => (
          <button key={option} type="button" aria-pressed={focus === option} onClick={() => setFocus(option)}
            className={"min-h-11 rounded-full border px-4 py-2 text-sm transition-colors " + (focus === option ? "border-accent/50 bg-accent/15 text-accent" : "border-line text-muted hover:text-ink")}>
            {labels[option]}
          </button>
        ))}
      </div>
      <ol className="relative border-l border-line pl-6 sm:pl-8">
        {shown.map((role, i) => (
          <li key={role.id} className="reveal relative pb-8 last:pb-0">
            <span aria-hidden className={"absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 sm:-left-[39px] " + (i === 0 ? "border-accent bg-accent" : "border-line-strong bg-bg")} />
            <details open={i < 2} className="group rounded-2xl border border-transparent transition-colors open:border-line open:bg-raised/80">
              <summary className="flex items-start justify-between gap-4 rounded-2xl p-4 hover:bg-white/[0.02] sm:p-5">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-dim">{role.period}</p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink">{role.title}</h3>
                  <p className="mt-0.5 text-sm text-muted">{[role.company, role.location].filter(Boolean).join(" · ")}</p>
                  {role.badge && <p className="mt-2 inline-block rounded-full border border-line px-2.5 py-0.5 text-xs text-dim">{role.badge}</p>}
                </div>
                <span className="mt-1 flex flex-none items-center gap-1 text-xs text-dim">
                  <span className="hidden sm:inline group-open:hidden">{labels.show}</span>
                  <span className="hidden sm:group-open:inline">{labels.hide}</span>
                  <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                </span>
              </summary>
              <ul className="flex flex-col gap-2 px-4 pb-5 sm:px-5">
                {role.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-sm leading-6 text-muted">
                    <span aria-hidden="true" className="mt-2.5 h-1 w-1 flex-none rounded-full bg-accent" />{h}
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ol>
    </>
  );
}
