/** Colour coding for the two professional pillars. Class names are literal so Tailwind can detect them. */
export type Pillar = "software" | "systems";

interface PillarStyle {
  /** Card wrapper: sets the hover glow colour used by `.card-elevated`. */
  card: string;
  text: string;
  dot: string;
  topLine: string;
  chip: string;
  iconBox: string;
  bullet: string;
}

export const PILLAR: Record<Pillar, PillarStyle> = {
  software: {
    card: "pillar-sw hover:border-sw/50",
    text: "text-sw-soft",
    dot: "bg-gradient-to-r from-sw to-sw-2",
    topLine: "bg-gradient-to-r from-sw via-sw-2/60 to-transparent",
    chip: "border-sw/30 bg-sw/10 text-sw-soft",
    iconBox: "border-sw/30 bg-gradient-to-br from-sw/20 to-sw-2/10 text-sw-soft",
    bullet: "text-sw",
  },
  systems: {
    card: "pillar-sys hover:border-sys/50",
    text: "text-sys-soft",
    dot: "bg-gradient-to-r from-sys to-sys-2",
    topLine: "bg-gradient-to-r from-sys via-sys-2/60 to-transparent",
    chip: "border-sys/30 bg-sys/10 text-sys-soft",
    iconBox: "border-sys/30 bg-gradient-to-br from-sys/20 to-sys-2/10 text-sys-soft",
    bullet: "text-sys",
  },
};
