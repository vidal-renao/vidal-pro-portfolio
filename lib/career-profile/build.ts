import { createHash } from "node:crypto";
import de from "@/messages/de.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

/**
 * Machine-readable career profile (schema v1) consumed by JobPilot AI.
 * Built only from the published, author-written messages — nothing is generated.
 * Contact details (phone, e-mail) are deliberately excluded.
 */
export const CAREER_LOCALES = ["es", "de", "en"] as const;
export type CareerLocale = (typeof CAREER_LOCALES)[number];

type Messages = typeof en;
const SOURCES: Record<CareerLocale, Messages> = { es, de, en };

interface Knowledge {
  area: string;
  detail: string;
}
export interface CareerVariant {
  role: string;
  specialties: string;
  profile: string;
  competencies: string[];
  knowledge: Knowledge[];
}
export interface CareerLocaleData {
  availability: string;
  residency: string | null;
  license: string | null;
  variants: { fullstack: CareerVariant; systems: CareerVariant };
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    highlights: string[];
  }[];
  education: { id: string; title: string; detail: string }[];
  certifications: { id: string; title: string; detail: string }[];
  languages: { id: string; name: string; level: string }[];
}
export interface CareerProfile {
  schemaVersion: 1;
  name: string;
  photoPath: string;
  locales: Record<CareerLocale, CareerLocaleData>;
  contentHash: string;
}

function localeData(m: Messages): CareerLocaleData {
  return {
    availability: m.cv.available,
    residency: m.cvSystems.residency ?? null,
    license: m.cvSystems.license ?? null,
    variants: {
      fullstack: {
        role: m.cv.role,
        specialties: m.cv.specialties,
        profile: m.cv.profile,
        competencies: m.cv.competencies,
        knowledge: m.cv.knowledge,
      },
      systems: {
        role: m.cvSystems.role,
        specialties: m.cvSystems.specialties,
        profile: m.cvSystems.profile,
        competencies: m.cvSystems.competencies,
        knowledge: m.cvSystems.knowledge,
      },
    },
    experience: m.experience.roles.map((r) => ({
      id: r.id,
      title: r.title,
      company: r.company,
      location: r.location,
      period: r.period,
      highlights: r.highlights,
    })),
    education: m.cvSystems.education.map((e) => ({ id: e.id, title: e.title, detail: e.detail })),
    certifications: m.cv.certs.map((c) => ({ id: c.id, title: c.title, detail: c.detail })),
    languages: m.cv.languages.map((l) => ({ id: l.id, name: l.lang, level: l.level })),
  };
}

const ids = (items: { id: string }[]) => items.map((item) => item.id).join("|");

/** Every locale must list the same items in the same order, keyed by the same stable ids. */
export function assertAligned(locales: Record<CareerLocale, CareerLocaleData>) {
  const base = locales.es;
  for (const locale of CAREER_LOCALES) {
    const data = locales[locale];
    for (const key of ["experience", "education", "certifications", "languages"] as const) {
      if (ids(data[key]) !== ids(base[key])) {
        throw new Error(`career-profile: ${key} ids differ between es and ${locale}`);
      }
      if (new Set(data[key].map((item) => item.id)).size !== data[key].length) {
        throw new Error(`career-profile: duplicate ${key} id in ${locale}`);
      }
    }
  }
}

export function buildCareerProfile(): CareerProfile {
  const locales = {
    es: localeData(SOURCES.es),
    de: localeData(SOURCES.de),
    en: localeData(SOURCES.en),
  };
  assertAligned(locales);
  const contentHash = createHash("sha256").update(JSON.stringify(locales)).digest("hex");
  return { schemaVersion: 1, name: "Vidal Reñao Lopelo", photoPath: "/Photo.jpg", locales, contentHash };
}
