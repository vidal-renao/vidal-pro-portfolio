"use client";
import { QRCodeSVG } from "qrcode.react";

// 85×55mm European business card @ 300 DPI → 1004×650px physical (2× deviceScaleFactor)
const W = 502;
const H = 325;

const C = {
  bg:      "#0B132B",
  text:    "#FFFFFF",
  muted:   "rgba(255,255,255,0.5)",
  subtle:  "rgba(255,255,255,0.09)",
  cyan:    "#38BDF8",
  emerald: "#34D399",
};

const CONFIG = {
  name:     "Vidal Reñao Lopelo",
  role:     "Cloud Infrastructure & IT Systems Specialist",
  subtitle: "AI-Powered SaaS Infrastructure & Cloud Integration",
  location: "Basel · Switzerland · DACH",
  contact: {
    phone:     "+41 77 972 62 99",
    email:     "vidalrenao.lab@outlook.com",
    web:       "vidal-pro-portfolio.vercel.app",
    urlTarget: "https://vidal-pro-portfolio.vercel.app/en",
  },
  qrLabel: "Scannen für Live-Projekte & Referenzen",
};

function ContactRow({ prefix, value, highlight }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{
        width: 15, height: 15, borderRadius: 3, flexShrink: 0,
        background: "rgba(56,189,248,0.14)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ color: C.cyan, fontSize: 7, fontWeight: 800 }}>{prefix}</span>
      </div>
      <span style={{
        fontSize: 9.5,
        color: highlight ? C.cyan : "rgba(255,255,255,0.78)",
        fontWeight: highlight ? 600 : 400,
        letterSpacing: "0.1px",
      }}>
        {value}
      </span>
    </div>
  );
}

function FaceA() {
  return (
    <div style={{
      width: W, height: H,
      background: C.bg,
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      overflow: "hidden", position: "relative", boxSizing: "border-box",
    }}>
      <div style={{
        position: "absolute", top: -70, right: -70,
        width: 220, height: 220, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -50, left: -50,
        width: 180, height: 180, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{
        padding: "26px 30px",
        height: "100%", boxSizing: "border-box",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 15, flex: 1 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 10, flexShrink: 0,
            background: "linear-gradient(135deg, #38BDF8 0%, #34D399 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(56,189,248,0.28)",
          }}>
            <span style={{ color: "#0B132B", fontSize: 15, fontWeight: 900, letterSpacing: "-0.5px" }}>VR</span>
          </div>

          <div>
            <div style={{
              color: C.text, fontSize: 18, fontWeight: 700,
              letterSpacing: "-0.5px", lineHeight: 1.15, marginBottom: 7,
            }}>
              {CONFIG.name}
            </div>
            <div style={{
              color: C.cyan, fontSize: 10, fontWeight: 600,
              letterSpacing: "0.2px", lineHeight: 1.5, marginBottom: 3,
            }}>
              {CONFIG.role}
            </div>
            <div style={{
              color: C.emerald, fontSize: 9, fontWeight: 500,
              letterSpacing: "0.1px", opacity: 0.88,
            }}>
              {CONFIG.subtitle}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: C.subtle, margin: "12px 0" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <ContactRow prefix="T" value={CONFIG.contact.phone} />
          <ContactRow prefix="E" value={CONFIG.contact.email} />
          <ContactRow prefix="W" value={CONFIG.contact.web} highlight />
        </div>

        <div style={{
          marginTop: 13, alignSelf: "flex-end",
          color: C.muted, fontSize: 7.5,
          letterSpacing: "1.2px", textTransform: "uppercase", fontWeight: 500,
        }}>
          {CONFIG.location}
        </div>
      </div>
    </div>
  );
}

function FaceB() {
  return (
    <div style={{
      width: W, height: H,
      background: C.bg,
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 16, position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{
        color: C.muted, fontSize: 9.5, letterSpacing: "0.4px",
        textAlign: "center", fontWeight: 400,
      }}>
        {CONFIG.qrLabel}
      </div>

      <div style={{
        background: "#FFFFFF", padding: 10, borderRadius: 10,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}>
        <QRCodeSVG
          value={CONFIG.contact.urlTarget}
          size={100}
          bgColor="#FFFFFF"
          fgColor="#0B132B"
          level="H"
        />
      </div>

      <div style={{
        color: C.cyan, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.3px",
      }}>
        {CONFIG.contact.web}
      </div>
    </div>
  );
}

export default function BusinessCard({ face = "A" }) {
  return face === "A" ? <FaceA /> : <FaceB />;
}
