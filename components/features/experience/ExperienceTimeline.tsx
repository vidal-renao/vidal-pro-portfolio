"use client";

import { useState } from "react";
import { CheckCircle, ChevronDown, Pin } from "@/components/ui/icons";
import { PILLAR, type Pillar } from "@/components/ui/pillar";
import { splitLead } from "@/content/experience";

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
  /** Technology badges per role id. */
  stacks: Record<string, readonly string[]>;
  /** Bold lead-in word counts per role id, in highlight order. */
  leads: Record<string, readonly number[]>;
  labels: { it: string; full: string; more: string; less: string; stack: string; current: string };
}

/** Highlights always visible per role; the rest open on demand. */
const VISIBLE = 3;
/** Roles that belong to the Software & AI pillar; every other role is IT Systems & Cloud. */
const SOFTWARE_ROLES = new Set(["web-freelance-2016"]);

/** Presentation-only filter and timeline: source chronology and all CV/API data remain unchanged. */
export function ExperienceTimeline({ roles, stacks, leads, labels }: Props) {
  const [focus, setFocus] = useState<"it" | "full">("it");
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());
  const shown = focus === "it" ? roles.filter((r) => r.id !== "servo-carejob-2023") : roles;

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <>
      <div role="group" aria-label={labels.full} className="mb-10 flex flex-wrap gap-2">
        {(["it", "full"] as const).map((option) => (
          <button key={option} type="button" aria-pressed={focus === option} onClick={() => setFocus(option)}
            className={"min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition-colors " + (focus === option ? "border-sys/50 bg-sys/15 text-sys-soft" : "border-line-strong text-muted hover:border-white/30 hover:text-ink")}>
            {labels[option]}
          </button>
        ))}
      </div>
      <div className="relative">
      <span aria-hidden="true" className="absolute bottom-6 left-[11px] top-3 w-px bg-gradient-to-b from-sys via-sw/60 to-line sm:left-[19px]" />
      <ol className="relative pl-9 sm:pl-14">
        {shown.map((role, i) => {
          const kind: Pillar = SOFTWARE_ROLES.has(role.id) ? "software" : "systems";
          const pillar = PILLAR[kind];
          const isCurrent = i === 0;
          const isOpen = expanded.has(role.id);
          const hidden = role.highlights.length - VISIBLE;
          const roleLeads = leads[role.id] ?? [];
          const stack = stacks[role.id] ?? [];
          const extraId = `role-${role.id}-more`;
          const renderHighlight = (h: string, index: number) => {
            const { lead, rest } = splitLead(h, roleLeads[index]);
            return (
              <li key={`${role.id}-${index}`} className="flex gap-3 text-base leading-relaxed text-muted">
                <CheckCircle size={20} className={`mt-0.5 flex-none ${pillar.bullet}`} />
                <span>{lead && <strong className="font-semibold text-ink">{lead}</strong>}{rest}</span>
              </li>
            );
          };
          return (
            <li key={role.id} data-role={role.id} className="reveal relative pb-8 last:pb-0 sm:pb-10">
              <span aria-hidden="true" className="absolute -left-9 top-6 flex h-6 w-6 items-center justify-center sm:-left-14 sm:h-10 sm:w-10">
                {isCurrent && <span className="timeline-node-pulse absolute inset-0 rounded-full bg-sys/40" />}
                <span className={"relative flex h-6 w-6 items-center justify-center rounded-full border-2 bg-bg sm:h-10 sm:w-10 " + (isCurrent ? "timeline-node-current border-sys" : "border-line-strong")}>
                  <span className={"h-2 w-2 rounded-full sm:h-3 sm:w-3 " + (isCurrent ? "bg-sys" : kind === "software" ? "bg-sw" : "bg-sys/60")} />
                </span>
              </span>
              <article className={`card-elevated ${pillar.card} rounded-3xl border ${isCurrent ? "border-sys/40" : "border-line-strong"} bg-raised p-5 sm:p-7`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-sm font-semibold tabular-nums ${pillar.chip}`}>{role.period}</span>
                  {role.location && <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-sm text-muted"><Pin size={14} />{role.location}</span>}
                  {isCurrent && <span className="inline-flex items-center gap-1.5 rounded-full border border-sys-2/40 bg-sys-2/10 px-3 py-1 text-sm font-semibold text-sys-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sys-2" />{labels.current}</span>}
                </div>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-ink sm:text-2xl">{role.title}</h3>
                {role.company && <p className={`mt-1 text-base font-semibold ${pillar.text}`}>{role.company}</p>}
                {role.badge && <p className="mt-3 inline-block rounded-full border border-line px-3 py-1 text-sm text-muted">{role.badge}</p>}
                <ul className="mt-5 space-y-3">{role.highlights.slice(0, VISIBLE).map(renderHighlight)}</ul>
                {hidden > 0 && (
                  <>
                    <ul id={extraId} hidden={!isOpen} className="mt-3 space-y-3">
                      {role.highlights.slice(VISIBLE).map((h, k) => renderHighlight(h, k + VISIBLE))}
                    </ul>
                    <button type="button" data-expand-role aria-expanded={isOpen} aria-controls={extraId} onClick={() => toggle(role.id)}
                      className={`mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors active:scale-[0.97] ${pillar.chip} hover:bg-white/[0.08]`}>
                      {isOpen ? labels.less : labels.more.replace("{count}", String(hidden))}
                      <ChevronDown size={16} className={`transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </>
                )}
                {stack.length > 0 && (
                  <ul aria-label={labels.stack} className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                    {stack.map((tech) => (
                      <li key={tech} className="rounded-lg border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-xs font-medium text-muted">{tech}</li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          );
        })}
      </ol>
      </div>
    </>
  );
}
