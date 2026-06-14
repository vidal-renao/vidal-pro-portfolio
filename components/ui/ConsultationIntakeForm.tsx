"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

type Locale = "en" | "de" | "es";

const SECTORS: Record<
  Locale,
  { id: string; label: string; icon: string; options: string[] }[]
> = {
  en: [
    {
      id: "construction",
      label: "Construction & Facility",
      icon: "🏗️",
      options: [
        "Process Automation",
        "Custom Software",
        "Cloud Migration",
        "Budgeting Tools",
        "Client Portal",
      ],
    },
    {
      id: "logistics",
      label: "Logistics & Supply Chain",
      icon: "📦",
      options: [
        "Real-time Tracking",
        "Warehouse Automation",
        "Documentation Portal",
        "AI Forecasting",
        "Multi-channel Notifications",
      ],
    },
    {
      id: "ecommerce",
      label: "E-Commerce & Retail",
      icon: "🛒",
      options: [
        "Inventory Management",
        "Custom Platform",
        "Payment Integration",
        "Analytics Dashboard",
        "Multi-channel Sales",
      ],
    },
    {
      id: "professional",
      label: "Professional Services",
      icon: "💼",
      options: [
        "Client Portal",
        "Project Management",
        "Time Tracking",
        "Custom CRM",
        "Billing Automation",
      ],
    },
    {
      id: "manufacturing",
      label: "Manufacturing",
      icon: "⚙️",
      options: [
        "Process Control",
        "Quality Management",
        "Integration APIs",
        "Real-time Dashboards",
        "Audit Pipelines",
      ],
    },
  ],
  de: [
    {
      id: "construction",
      label: "Bau & Facility",
      icon: "🏗️",
      options: [
        "Prozessautomation",
        "Custom Software",
        "Cloud Migration",
        "Offerte-Tools",
        "Kundenportal",
      ],
    },
    {
      id: "logistics",
      label: "Logistik & Supply Chain",
      icon: "📦",
      options: [
        "Echtzeitverfolgung",
        "Lagerautomation",
        "Dokumentationsportal",
        "KI-Vorhersage",
        "Multichannel-Benachrichtigungen",
      ],
    },
    {
      id: "ecommerce",
      label: "E-Commerce & Handel",
      icon: "🛒",
      options: [
        "Bestandsverwaltung",
        "Custom Plattform",
        "Zahlungsintegration",
        "Analytics",
        "Multichannel-Verkauf",
      ],
    },
    {
      id: "professional",
      label: "Dienstleistungen",
      icon: "💼",
      options: [
        "Kundenportal",
        "Projektmanagement",
        "Zeiterfassung",
        "Custom CRM",
        "Abrechnungsautomation",
      ],
    },
    {
      id: "manufacturing",
      label: "Produktion",
      icon: "⚙️",
      options: [
        "Prozesssteuerung",
        "Qualitätsmgmt",
        "API Integration",
        "Live-Dashboards",
        "Audit-Pipelines",
      ],
    },
  ],
  es: [
    {
      id: "construction",
      label: "Construcción & Facility",
      icon: "🏗️",
      options: [
        "Automatización de Procesos",
        "Software a Medida",
        "Cloud Migration",
        "Herramientas de Presupuesto",
        "Portal de Clientes",
      ],
    },
    {
      id: "logistics",
      label: "Logística & Supply Chain",
      icon: "📦",
      options: [
        "Seguimiento en Tiempo Real",
        "Automatización de Almacén",
        "Portal de Documentación",
        "Pronóstico AI",
        "Notificaciones Multicanal",
      ],
    },
    {
      id: "ecommerce",
      label: "E-Commerce & Retail",
      icon: "🛒",
      options: [
        "Gestión de Inventario",
        "Plataforma a Medida",
        "Integración de Pagos",
        "Dashboard de Analytics",
        "Ventas Multicanal",
      ],
    },
    {
      id: "professional",
      label: "Servicios Profesionales",
      icon: "💼",
      options: [
        "Portal de Clientes",
        "Gestión de Proyectos",
        "Registro de Tiempo",
        "CRM Personalizado",
        "Automatización de Facturación",
      ],
    },
    {
      id: "manufacturing",
      label: "Manufactura",
      icon: "⚙️",
      options: [
        "Control de Procesos",
        "Gestión de Calidad",
        "Integración de APIs",
        "Dashboards en Vivo",
        "Pipelines de Auditoría",
      ],
    },
  ],
};

const COPY = {
  en: {
    sectionLabel: "START YOUR PROJECT",
    sectionTitle: "Tell me about your business",
    sectionSub: "3 steps. 2 minutes. I'll get back to you within 24 hours.",
    step1: "1. What's your industry?",
    step2: "2. What do you need?",
    step2sub: "Select all that apply",
    step3: "3. How should I reach you?",
    namePh: "Your name",
    companyPh: "Company name",
    emailPh: "Work email",
    phonePh: "Phone (optional)",
    submit: "Send Analysis Request",
    successTitle: "Request sent!",
    successSub: "I'll reach out within 24 hours with a tailored proposal.",
    backHome: "Back to Home",
    waOpened: "WhatsApp opened — I'll reply shortly.",
  },
  de: {
    sectionLabel: "PROJEKT STARTEN",
    sectionTitle: "Erzählen Sie mir von Ihrem Unternehmen",
    sectionSub: "3 Schritte. 2 Minuten. Ich melde mich innerhalb von 24 Stunden.",
    step1: "1. Was ist Ihre Branche?",
    step2: "2. Was benötigen Sie?",
    step2sub: "Alles Zutreffende auswählen",
    step3: "3. Wie kann ich Sie erreichen?",
    namePh: "Ihr Name",
    companyPh: "Unternehmensname",
    emailPh: "Geschäftliche E-Mail",
    phonePh: "Telefon (optional)",
    submit: "Analyseanfrage Senden",
    successTitle: "Anfrage gesendet!",
    successSub: "Ich melde mich innerhalb von 24 Stunden mit einem maßgeschneiderten Angebot.",
    backHome: "Zurück zur Startseite",
    waOpened: "WhatsApp geöffnet — ich antworte in Kürze.",
  },
  es: {
    sectionLabel: "INICIAR PROYECTO",
    sectionTitle: "Cuéntame sobre tu empresa",
    sectionSub: "3 pasos. 2 minutos. Te respondo en menos de 24 horas.",
    step1: "1. ¿Cuál es tu industria?",
    step2: "2. ¿Qué necesitas?",
    step2sub: "Selecciona todo lo que aplique",
    step3: "3. ¿Cómo puedo contactarte?",
    namePh: "Tu nombre",
    companyPh: "Nombre de la empresa",
    emailPh: "Email de trabajo",
    phonePh: "Teléfono (opcional)",
    submit: "Enviar Solicitud de Análisis",
    successTitle: "¡Solicitud enviada!",
    successSub: "Te contactaré en menos de 24 horas con una propuesta personalizada.",
    backHome: "Volver al Inicio",
    waOpened: "WhatsApp abierto — te respondo en breve.",
  },
};

interface Props {
  locale: Locale;
  backHref: string;
}

export function ConsultationIntakeForm({ locale, backHref }: Props) {
  const c = COPY[locale];
  const sectors = SECTORS[locale];

  const [sectorId, setSectorId] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const selectedSector = sectors.find((s) => s.id === sectorId);

  const toggleOption = (opt: string) =>
    setSelectedOptions((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectorId || !form.name || !form.email) return;

    const sectorLabel = selectedSector?.label ?? sectorId;
    const optionsList = selectedOptions.length > 0 ? selectedOptions.join(", ") : "—";

    const waText =
      locale === "de"
        ? `Hallo Vidal, ich bin ${form.name}${form.company ? ` von ${form.company}` : ""}. Branche: ${sectorLabel}. Bedarf: ${optionsList}. Kontakt: ${form.email}${form.phone ? ` / ${form.phone}` : ""}.`
        : locale === "es"
        ? `Hola Vidal, soy ${form.name}${form.company ? ` de ${form.company}` : ""}. Sector: ${sectorLabel}. Necesito: ${optionsList}. Contacto: ${form.email}${form.phone ? ` / ${form.phone}` : ""}.`
        : `Hello Vidal, I'm ${form.name}${form.company ? ` from ${form.company}` : ""}. Industry: ${sectorLabel}. I need: ${optionsList}. Contact: ${form.email}${form.phone ? ` / ${form.phone}` : ""}.`;

    window.open(`https://wa.me/41779726299?text=${encodeURIComponent(waText)}`, "_blank");
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:bg-white/6 transition-all duration-150 text-base";

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-5 py-12 text-center">
        <CheckCircle2 size={48} className="text-emerald-400" />
        <h3 className="text-2xl font-bold text-white">{c.successTitle}</h3>
        <p className="text-white/50 max-w-md">{c.successSub}</p>
        <p className="text-xs text-blue-400/80">{c.waOpened}</p>
        <a
          href={backHref}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-400 transition-colors duration-150"
        >
          {c.backHome}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-16 lg:py-20">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">
        {c.sectionLabel}
      </p>
      <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-white">{c.sectionTitle}</h2>
      <p className="mb-10 text-sm text-white/50">{c.sectionSub}</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* STEP 1 — Sector */}
        <div className="rounded-2xl border border-white/6 bg-white/2 p-6">
          <p className="mb-5 text-sm font-semibold text-white">{c.step1}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSectorId(s.id);
                  setSelectedOptions([]);
                }}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-150 ${
                  sectorId === s.id
                    ? "border-blue-500/50 bg-blue-500/10 text-white"
                    : "border-white/8 bg-white/2 text-white/55 hover:border-white/20 hover:text-white/80"
                }`}
              >
                <span className="text-lg leading-none">{s.icon}</span>
                <span>{s.label}</span>
                {sectorId === s.id && (
                  <ChevronRight size={14} className="ml-auto text-blue-400 flex-none" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 2 — Options (shown after sector selected) */}
        {selectedSector && (
          <div className="rounded-2xl border border-white/6 bg-white/2 p-6">
            <p className="mb-1 text-sm font-semibold text-white">{c.step2}</p>
            <p className="mb-5 text-xs text-white/50">{c.step2sub}</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {selectedSector.options.map((opt) => {
                const checked = selectedOptions.includes(opt);
                return (
                  <label
                    key={opt}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-150 ${
                      checked
                        ? "border-blue-500/40 bg-blue-500/8 text-white"
                        : "border-white/6 bg-white/2 text-white/55 hover:border-white/15 hover:text-white/75"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 flex-none items-center justify-center rounded border transition-colors duration-150 ${
                        checked
                          ? "border-blue-500 bg-blue-500"
                          : "border-white/25 bg-transparent"
                      }`}
                    >
                      {checked && (
                        <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleOption(opt)}
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3 — Contact info */}
        <div className="rounded-2xl border border-white/6 bg-white/2 p-6">
          <p className="mb-5 text-sm font-semibold text-white">{c.step3}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder={c.namePh}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              required
            />
            <input
              type="text"
              placeholder={c.companyPh}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className={inputClass}
            />
            <input
              type="email"
              placeholder={c.emailPh}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
              required
            />
            <input
              type="tel"
              placeholder={c.phonePh}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!sectorId || !form.name || !form.email}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {c.submit}
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
