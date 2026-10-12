/** Contact details and section anchors: the single source for header, hero, contact and JSON-LD. */
export const SITE = {
  url: "https://vidal-pro-portfolio.vercel.app",
  name: "Vidal Reñao Lopelo",
  shortName: "Vidal Reñao",
  email: "vidalrenao.lab@outlook.com",
  phone: "+41 77 972 62 99",
  phoneHref: "tel:+41779726299",
  whatsapp: "https://wa.me/41779726299",
  linkedin: "https://linkedin.com/in/vidalrenao",
  github: "https://github.com/vidal-renao",
  photo: "/Photo.jpg",
  languages: ["DE", "EN", "ES"],
} as const;

/** In-page sections, in display order; `key` is the label in `ui.nav`. */
export const SECTIONS = [
  { id: "projects", key: "projects" },
  { id: "experience", key: "experience" },
  { id: "skills", key: "skills" },
  { id: "credentials", key: "credentials" },
  { id: "services", key: "services" },
  { id: "contact", key: "contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
