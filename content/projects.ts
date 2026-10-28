/**
 * Portfolio projects. Only projects a visitor can open and verify are listed (audit 2026-10-13,
 * see docs/portfolio-audit-2026-10.md). Copy lives in `messages/*.json` under `projects.items.<slug>`.
 * To add a project: add an entry here, its texts in the three message files and, optionally,
 * a screenshot in /public/screenshots.
 */
export type ProjectCategory = "ai" | "saas" | "client";
export type ProjectStatus = "production" | "demo" | "staging";

export interface Project {
  slug: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  stack: string[];
  /** Public URL a visitor can open. */
  url: string;
  /** null when the repository is private, so no dead link is rendered. */
  repo: string | null;
  image: string | null;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "helpdesk-ai",
    categories: ["ai", "saas"],
    status: "production",
    stack: ["Next.js", "TypeScript", "Supabase", "MCP", "Claude", "Zod"],
    url: "https://ticket-system-sigma-pink.vercel.app",
    repo: "https://github.com/vidal-renao/ticket-system",
    image: "/screenshots/helpdesk-ai.png",
    featured: true,
  },
  {
    slug: "jobpilot-ai",
    categories: ["ai", "saas"],
    status: "production",
    stack: ["Next.js", "TypeScript", "Supabase", "PWA"],
    url: "https://jobpilot-ai-lake.vercel.app/install",
    repo: null,
    image: "/screenshots/jobpilot-ai-en.png",
    featured: true,
  },
  {
    slug: "invoice-auto",
    categories: ["ai", "saas"],
    status: "demo",
    stack: ["Next.js", "Supabase", "Claude", "ISO 20022"],
    url: "https://invoice-auto-xi.vercel.app/es/demo/payments",
    repo: "https://github.com/vidal-renao/invoice-auto",
    image: "/screenshots/invoicepilot-pagos.png",
  },
  {
    slug: "waai",
    categories: ["ai", "saas"],
    status: "staging",
    stack: ["Next.js", "Supabase", "Claude", "pgvector"],
    url: "https://waai-saas.vercel.app",
    repo: "https://github.com/vidal-renao/waai-saas",
    image: "/screenshots/waai-saas.png",
  },
  {
    slug: "aura-ai",
    categories: ["ai", "saas"],
    status: "demo",
    stack: ["Next.js", "TypeScript", "Supabase", "Claude"],
    url: "https://aura-ai-smoky.vercel.app",
    repo: "https://github.com/vidal-renao/aura-ai",
    image: "/screenshots/aura-ai.png",
  },
  {
    slug: "solarpilot",
    categories: ["saas"],
    status: "demo",
    stack: ["Next.js", "TypeScript", "Drizzle", "PVGIS"],
    url: "https://solarpilot-psi.vercel.app",
    repo: "https://github.com/vidal-renao/solarpilot",
    image: "/screenshots/solarpilot-preestudio.png",
  },
  {
    slug: "dnamar",
    categories: ["client"],
    status: "production",
    stack: ["Next.js", "TypeScript", "Nodemailer", "SEO"],
    url: "https://www.dnamar.ch",
    repo: "https://github.com/vidal-renao/limpiezas-najip-maritza",
    image: "/screenshots/dnamar.png",
  },
  {
    slug: "naturae",
    categories: ["client"],
    status: "production",
    stack: ["Next.js", "Supabase", "PWA"],
    url: "https://naturae-cosmetics.vercel.app",
    repo: null,
    image: "/screenshots/naturae-cosmetics-hero.png",
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = ["ai", "saas", "client"];
