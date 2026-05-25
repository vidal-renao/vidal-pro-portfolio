"use client";
import { QRCodeSVG } from "qrcode.react";

// 85×55mm European business card @ 300 DPI → 1004×650px physical (2× deviceScaleFactor)
const W = 502;
const H = 325;

const C = {
  bg:      "#0B132B",
  text:    "#FFFFFF",
  muted:   "rgba(255,255,255,0.48)",
  subtle:  "rgba(255,255,255,0.09)",
  gold:    "#c9a84c",
  goldDim: "rgba(201,168,76,0.13)",
};

const CONFIG = {
  name:      "Vidal Reñao Lopelo",
  titleA:    "IT-Infrastruktur & Systeme",
  subtitleA: "AI-Powered SaaS · Cloud Integration",
  location:  "Basel · Switzerland · DACH",
  contact: {
    phone:     "+41 77 972 62 99",
    email:     "vidalrenao.lab@outlook.com",
    web:       "vidal-pro-portfolio.vercel.app",
    urlTarget: "https://vidal-pro-portfolio.vercel.app/en",
  },
  services: [
    {
      label: "IT-Handwerk",
      items: ["Windows Server", "Active Directory", "Hyper-V · VMware"],
    },
    {
      label: "Netzwerke",
      items: ["CCNA Routing · Switching", "VPN · Firewall", "VLAN · LAN/WAN"],
    },
    {
      label: "KI-SaaS",
      items: ["Claude AI Integration", "n8n Automation", "Supabase · Vercel"],
    },
  ],
};

function ServiceCol({ label, items }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        color: C.gold,
        fontSize: 7.5,
        fontWeight: 700,
        letterSpacing: "0.7px",
        textTransform: "uppercase",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
        paddingBottom: 4,
        marginBottom: 6,
      }}>
        {label}
      </div>
      {items.map((item, i) => (
        <div key={i} style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: 8,
          lineHeight: 1.75,
          display: "flex",
          gap: 4,
          alignItems: "baseline",
        }}>
          <span style={{ color: C.gold, fontSize: 7, flexShrink: 0 }}>▸</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function ContactRow({ prefix, value, highlight }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{
        width: 15, height: 15, borderRadius: 3, flexShrink: 0,
        background: C.goldDim,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ color: C.gold, fontSize: 7, fontWeight: 800 }}>{prefix}</span>
      </div>
      <span style={{
        fontSize: 9,
        color: highlight ? C.gold : "rgba(255,255,255,0.78)",
        fontWeight: highlight ? 600 : 400,
        letterSpacing: "0.1px",
      }}>
        {value}
      </span>
    </div>
  );
}

export function FaceA() {
  return (
    <div style={{
      width: W, height: H,
      background: C.bg,
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      overflow: "hidden", position: "relative", boxSizing: "border-box",
    }}>
      <div style={{
        position: "absolute", top: -50, right: -50,
        width: 180, height: 180, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{
        padding: "22px 26px 18px",
        height: "100%", boxSizing: "border-box",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header: monogram + name + titles */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 13, marginBottom: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 9, flexShrink: 0,
            background: "linear-gradient(135deg, #c9a84c 0%, #e8c96a 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(201,168,76,0.32)",
          }}>
            <span style={{ color: "#0B132B", fontSize: 14, fontWeight: 900, letterSpacing: "-0.5px" }}>VR</span>
          </div>
          <div style={{ paddingTop: 1 }}>
            <div style={{
              color: C.text, fontSize: 17, fontWeight: 700,
              letterSpacing: "-0.4px", lineHeight: 1.15, marginBottom: 4,
            }}>
              {CONFIG.name}
            </div>
            <div style={{ color: C.gold, fontSize: 9.5, fontWeight: 600, letterSpacing: "0.2px", lineHeight: 1.35 }}>
              {CONFIG.titleA}
            </div>
            <div style={{ color: C.muted, fontSize: 8.5, fontWeight: 400, letterSpacing: "0.1px" }}>
              {CONFIG.subtitleA}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: C.subtle, marginBottom: 11 }} />

        {/* Services: 3-column grid */}
        <div style={{ display: "flex", gap: 14, marginBottom: 11 }}>
          {CONFIG.services.map((s) => <ServiceCol key={s.label} {...s} />)}
        </div>

        <div style={{ height: 1, background: C.subtle, marginBottom: 10 }} />

        {/* Contact rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <ContactRow prefix="T" value={CONFIG.contact.phone} />
          <ContactRow prefix="E" value={CONFIG.contact.email} />
          <ContactRow prefix="W" value={CONFIG.contact.web} highlight />
        </div>

        <div style={{
          marginTop: "auto",
          paddingTop: 10,
          alignSelf: "flex-end",
          color: C.muted, fontSize: 7.5,
          letterSpacing: "1.2px", textTransform: "uppercase", fontWeight: 500,
        }}>
          {CONFIG.location}
        </div>
      </div>
    </div>
  );
}

export function FaceB() {
  return (
    <div style={{
      width: W, height: H,
      background: C.bg,
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 14, position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{
        color: C.muted, fontSize: 9, letterSpacing: "1.8px",
        textTransform: "uppercase", fontWeight: 500, textAlign: "center",
        position: "relative", zIndex: 1,
      }}>
        Scannen für Live-Projekte
      </div>

      <div style={{
        background: "#FFFFFF", padding: 10, borderRadius: 10,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        position: "relative", zIndex: 1,
      }}>
        <QRCodeSVG
          value={CONFIG.contact.urlTarget}
          size={112}
          bgColor="#FFFFFF"
          fgColor="#0B132B"
          level="H"
        />
      </div>

      <div style={{
        color: C.gold, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.3px",
        textAlign: "center", position: "relative", zIndex: 1,
      }}>
        vidal-pro-portfolio.vercel.app/en
      </div>
    </div>
  );
}

export default function BusinessCard({ face }) {
  if (face === "A") return <FaceA />;
  if (face === "B") return <FaceB />;
  return null;
}
