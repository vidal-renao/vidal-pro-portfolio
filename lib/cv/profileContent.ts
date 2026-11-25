/**
 * Profile-exclusive CV content, shared by the print view (PDF) and the DOCX builder.
 * Each CV variant shows its relevant roles in full and condenses the rest into one line.
 * Highlight indices refer to `experience.roles[].highlights`, which keep the same order in DE/EN/ES.
 */
export type CvVariant = "fullstack" | "systems";

export interface CvRole {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface CvCert {
  id: string;
  title: string;
  detail: string;
}

/** "all" = every highlight; number[] = only those indices; number = the first N highlights. */
type HighlightRule = "all" | number[] | number;

export interface CvKnowledge {
  area: string;
  detail: string;
  pillar?: "software" | "systems";
}

interface VariantPlan {
  full: Record<string, HighlightRule>;
  certIds: readonly string[] | "all";
  /** Indices into the variant's `competencies` list (same order in DE/EN/ES). */
  competencies: readonly number[] | "all";
  /** Portfolio project slugs (content/projects.ts) listed in the CV's Projects section, in order. */
  projects: readonly string[];
}

const PLANS: Record<CvVariant, VariantPlan> = {
  systems: {
    full: {
      // Own projects: only the Microsoft 365 / hybrid identity labs belong to the systems CV.
      "freelance-2025": [2, 5],
      // Most relevant bullets first; repeated SLA/ticket lines dropped to keep the CV at two pages.
      "lutelco-2021": [0, 3, 5, 6],
      "nn-bank-2019": [0, 1, 2],
      "nsc-2017": [0, 2, 9, 4],
    },
    certIds: ["ccna-training"],
    competencies: "all",
    projects: [],
  },
  fullstack: {
    full: {
      // Own projects: the software/SaaS bullets; the portfolio list (index 4) is replaced by the Projects section.
      "freelance-2025": [0, 1, 3],
      "web-freelance-2016": "all",
    },
    certIds: ["big-school-agent-programming", "big-school-zero-to-agents", "big-school-zero-to-production"],
    // Web, AI automation, backend, cloud delivery and trilingual client work; systems skills stay in the systems CV.
    competencies: [0, 1, 2, 6, 7],
    projects: ["helpdesk-ai", "jobpilot-ai", "flowpilot-ai", "invoice-auto", "matchpoint-ai", "aura-ai"],
  },
};

export function selectProjectSlugs(variant: CvVariant): readonly string[] {
  return PLANS[variant].projects;
}

export function selectCompetencies(competencies: string[], variant: CvVariant): string[] {
  const indices = PLANS[variant].competencies;
  return indices === "all" ? competencies : indices.map((i) => competencies[i]).filter((c): c is string => Boolean(c));
}

/** Fullstack CV keeps only software-pillar areas; the systems list has no pillar tags and is kept whole. */
export function selectKnowledge(knowledge: CvKnowledge[], variant: CvVariant): CvKnowledge[] {
  return variant === "fullstack" ? knowledge.filter((k) => k.pillar !== "systems") : knowledge;
}

function pick(highlights: string[], rule: HighlightRule): string[] {
  if (rule === "all") return highlights;
  if (typeof rule === "number") return highlights.slice(0, rule);
  return rule.map((i) => highlights[i]).filter((h): h is string => Boolean(h));
}

export function selectRoles(roles: CvRole[], variant: CvVariant): { full: CvRole[]; other: CvRole[] } {
  const plan = PLANS[variant].full;
  const full: CvRole[] = [];
  const other: CvRole[] = [];
  for (const role of roles) {
    const rule = plan[role.id];
    if (rule === undefined) other.push(role);
    else full.push({ ...role, highlights: pick(role.highlights, rule) });
  }
  return { full, other };
}

export function selectCerts(certs: CvCert[], variant: CvVariant): CvCert[] {
  const ids = PLANS[variant].certIds;
  return ids === "all" ? certs : certs.filter((c) => ids.includes(c.id));
}

/** One-line summary of a condensed role: "Title · Company (period)". */
export function otherRoleLine(role: CvRole): string {
  const head = [role.title, role.company].filter(Boolean).join(" · ");
  return `${head} (${role.period})`;
}

const CV_LOCATION: Record<string, string> = { de: "Basel, Schweiz", en: "Basel, Switzerland", es: "Basilea, Suiza" };

/** Home location in the CV's own language. */
export function cvLocation(locale: string): string {
  return CV_LOCATION[locale] ?? CV_LOCATION.en;
}
