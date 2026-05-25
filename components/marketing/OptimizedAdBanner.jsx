"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";

// Centralized Data Node — edit CONFIG to update any future publication
const CONFIG = {
  theme: {
    bg: "bg-[#0B132B]",
    cardBg: "bg-[#111C44]/40",
    border: "border-slate-800/60",
    textMuted: "text-[#94A3B8]",
  },
  content: {
    badge: "IT-INFRASTRUKTUR & KI-AUTOMATISIERUNG",
    title: "Ihre IT-Infrastruktur & digitale Zukunft – Alles aus einer Hand.",
    subtitle: "Flexibler IT-Spezialist für KMU in Liechtenstein und der Region.",
    lead: "Läuft Ihre IT unrund oder suchen Sie nach Wegen, Ihr Unternehmen durch moderne Technologie effizienter aufzustellen? Ich verbinde solides Handwerk mit digitaler Innovation:",
    services: [
      {
        icon: "🛠️",
        title: "Hardware & Vor-Ort-Support",
        desc: "Professioneller System- und PC-Aufbau, Server-Wartung, saubere Kabelführung und sichere Netzwerke (LAN/WLAN, VPN, Firewalls). Schnelle, unkomplizierte Hilfe direkt bei Ihnen im Betrieb.",
      },
      {
        icon: "🌐",
        title: "Software, Web & KI-SaaS",
        desc: "Moderne, blitzschnelle Webseiten (Projekt-Referenz: dnamar.ch) und massgeschneiderte Automatisierungen mit Künstlicher Intelligenz (LLM), die Ihnen tägliche Routinearbeit spürbar abnehmen.",
      },
    ],
    footerNotice:
      "Ohne teures Mikromanagement oder starre Agenturstrukturen – dafür mit absoluter Zuverlässigkeit, Präzision und pragmatischen Lösungen.",
    contact: {
      cta: "BEREIT FÜR DAS NÄCHSTE LEVEL?",
      phone: "📞 +41 77 972 62 99",
      email: "✉️ vidalrenao.lab@outlook.com",
      urlDisplay: "🌐 vidal-pro-portfolio.vercel.app",
      urlTarget: "https://vidal-pro-portfolio.vercel.app",
      qrLabel: 'Scannen für Live-Projekte',
    },
  },
};

export default function OptimizedAdBanner() {
  return (
    <div
      className={`w-[1200px] h-[900px] ${CONFIG.theme.bg} text-white p-16 flex flex-col justify-between font-sans antialiased box-border`}
    >
      {/* ── Title Hierarchy ── */}
      <div className="flex flex-col gap-5">
        <span className="text-[#38BDF8] text-sm font-bold tracking-[0.25em] uppercase">
          {CONFIG.content.badge}
        </span>
        <h1 className="text-5xl font-black tracking-tight leading-tight text-white max-w-[95%]">
          {CONFIG.content.title}
        </h1>
        <h2 className="text-2xl font-semibold text-[#34D399] tracking-wide">
          {CONFIG.content.subtitle}
        </h2>
        <p className="text-[#E2E8F0] text-lg leading-relaxed max-w-[90%] font-normal">
          {CONFIG.content.lead}
        </p>
      </div>

      {/* ── Services Grid ── */}
      <div className="grid grid-cols-2 gap-8 my-auto">
        {CONFIG.content.services.map((service, idx) => (
          <div
            key={idx}
            className={`${CONFIG.theme.cardBg} border ${CONFIG.theme.border} p-6 rounded-xl flex flex-col gap-3`}
          >
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{service.icon}</span> {service.title}
            </h3>
            <p className="text-[#E2E8F0] text-sm leading-relaxed font-normal">
              {service.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Trust Seal ── */}
      <div className="text-center w-full border-t border-slate-800/80 pt-6 mb-6">
        <p
          className={`${CONFIG.theme.textMuted} text-sm italic font-medium max-w-[85%] mx-auto leading-normal`}
        >
          {CONFIG.content.footerNotice}
        </p>
      </div>

      {/* ── Conversion Dock ── */}
      <div className="w-full bg-[#111C44] border border-slate-800/80 p-6 rounded-xl flex items-center justify-between gap-6 shadow-2xl">
        <div className="flex flex-col gap-2 text-left">
          <span className="text-[#34D399] text-xs font-black tracking-widest uppercase">
            {CONFIG.content.contact.cta}
          </span>
          <div className="text-white text-xl font-bold tracking-tight">
            {CONFIG.content.contact.phone}
          </div>
          <div className="text-[#E2E8F0] text-sm font-medium">
            {CONFIG.content.contact.email}
          </div>
          <div className="text-[#38BDF8] text-sm font-bold tracking-wide">
            {CONFIG.content.contact.urlDisplay}
          </div>
        </div>

        {/* ── QR Module (qrcode.react — no external CDN dependency) ── */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <span className="text-white text-xs font-bold tracking-tight">
            {CONFIG.content.contact.qrLabel}
          </span>
          <div className="bg-white p-2 rounded shadow-md flex items-center justify-center">
            <QRCodeSVG
              value={CONFIG.content.contact.urlTarget}
              size={80}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
