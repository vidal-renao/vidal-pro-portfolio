import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 };
export const SOCIAL_IMAGE_ALT = "Vidal Reñao — IT Systems & Cloud · Software & AI";

interface Track { subtitle: string }

/** 1200×630 share card per locale, built from the same messages as the page (no separate copy). */
export async function renderSocialImage(params: Promise<{ locale: string }>) {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const [hero, ui, specializations] = await Promise.all([
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "ui.hero" }),
    getTranslations({ locale, namespace: "specializations" }),
  ]);
  // Systems pillar first on the card: the Swiss recruiter audience reads it first.
  const pillars = (specializations.raw("tracks") as Track[]).map((t) => t.subtitle).reverse();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "linear-gradient(135deg, #060606 0%, #0b1626 60%, #10243a 100%)", color: "#f5f7fa", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#9cc9ff", letterSpacing: 4 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#5b8db8" }} />
          VIDAL ECOSYSTEM · BASEL, SWITZERLAND
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>Vidal Reñao</div>
          <div style={{ marginTop: 18, fontSize: 36, color: "#c9d6e3", lineHeight: 1.25 }}>{ui("role")}</div>
          <div style={{ marginTop: 14, fontSize: 28, color: "#8fa3b8" }}>{hero("title2")}</div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {pillars.map((pillar, i) => (
            <div key={pillar} style={{ display: "flex", padding: "14px 26px", borderRadius: 999, fontSize: 28, fontWeight: 600, border: `2px solid ${i === 0 ? "rgba(156,216,208,0.6)" : "rgba(156,201,255,0.6)"}`, color: i === 0 ? "#9cd8d0" : "#9cc9ff", background: "rgba(255,255,255,0.04)" }}>
              {pillar}
            </div>
          ))}
        </div>
      </div>
    ),
    SOCIAL_IMAGE_SIZE,
  );
}
