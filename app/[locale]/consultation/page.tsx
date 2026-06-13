import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

type Locale = "en" | "de" | "es";

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Free IT Analysis for Swiss KMU · Vidal Reñao",
    description:
      "Book a free IT analysis. Cloud transformation, process automation and custom software for Swiss SMEs. Based in Basel, available across Switzerland and Liechtenstein.",
  },
  de: {
    title: "Kostenlose IT-Analyse für Schweizer KMU · Vidal Reñao",
    description:
      "Kostenlose IT-Analyse buchen. Cloud-Transformation, Prozessautomatisierung und individuelle Software für Schweizer KMU. Standort Basel, verfügbar in der gesamten Schweiz und Liechtenstein.",
  },
  es: {
    title: "Análisis IT Gratuito para KMU Suizas · Vidal Reñao",
    description:
      "Reserve un análisis IT gratuito. Transformación cloud, automatización de procesos y software a medida para KMU suizas. Con base en Basilea, disponible en toda Suiza y Liechtenstein.",
  },
};

const WA_MESSAGES: Record<Locale, string> = {
  en: "Hello%2C%20I%27d%20like%20to%20book%20a%20free%20IT%20analysis%20for%20my%20business.",
  de: "Hallo%2C%20ich%20m%C3%B6chte%20eine%20kostenlose%20IT-Analyse%20f%C3%BCr%20mein%20Unternehmen%20buchen.",
  es: "Hola%2C%20me%20gustar%C3%ADa%20reservar%20un%20an%C3%A1lisis%20IT%20gratuito%20para%20mi%20empresa.",
};

const content: Record<
  Locale,
  {
    badge: string;
    h1_line1: string;
    h1_line2: string;
    sub: string;
    cta_primary: string;
    cta_back: string;
    clients_label: string;
    clients_title: string;
    clients: { icon: string; name: string; desc: string }[];
    case_label: string;
    case_title: string;
    case_sub: string;
    case_highlights: string[];
    case_quote: string;
    case_author: string;
    services_label: string;
    services_title: string;
    services: { name: string; timeline: string; price: string; desc: string; tags: string[] }[];
    pricing_note: string;
    cta_label: string;
    cta_title: string;
    cta_desc: string;
    cta_wa: string;
    cta_email: string;
  }
> = {
  en: {
    badge: "Free Consultation · Switzerland & Liechtenstein",
    h1_line1: "Cloud Transformation",
    h1_line2: "for Swiss KMU.",
    sub: "Zero downtime. Zero hidden costs. 90 days to go-live.",
    cta_primary: "Book Free IT Analysis",
    cta_back: "Back to Portfolio",
    clients_label: "WHO I WORK WITH",
    clients_title: "Built for Swiss SMEs that can't afford to stop.",
    clients: [
      {
        icon: "🏗️",
        name: "Construction & Facility Services",
        desc: "Multi-site operations, compliance documentation, trilingual client platforms.",
      },
      {
        icon: "📦",
        name: "Logistics & Distribution",
        desc: "Package tracking, route automation, multi-channel client notifications.",
      },
      {
        icon: "⚙️",
        name: "Manufacturing & Production",
        desc: "Workflow digitization, inventory management, autonomous audit pipelines.",
      },
    ],
    case_label: "CASE STUDY",
    case_title: "D'Namar GmbH — Basel Facility Services",
    case_sub: "Live at dnamar.ch since April 2026.",
    case_highlights: [
      "Trilingual platform (DE / EN / ES) — one site, three languages, zero extra cost",
      "100/100 Lighthouse across all metrics — performance, SEO, accessibility, best practices",
      "Swiss DSG/nDSG compliant — independent SMTP, no third-party data exposure",
      "Local SEO Basel: JSON-LD structured data, Google Search Console verified",
      "Delivered in 90 days — from briefing to production",
    ],
    case_quote:
      "Extremely satisfied! The website was implemented exactly according to my vision — modern, high-quality, and with fast professional communication.",
    case_author: "Nadjib Rasuly, CEO · D'Namar GmbH · Basel",
    services_label: "SERVICES & TIMELINES",
    services_title: "Fixed timelines. Clear deliverables.",
    services: [
      {
        name: "Cloud Migration",
        timeline: "90 days",
        price: "CHF 15k – 40k",
        desc: "Microsoft 365 + Azure migration. Entra ID, Intune, Autopilot. Zero-downtime cutover with rollback plan.",
        tags: ["M365", "Azure", "Entra ID", "Intune", "Autopilot"],
      },
      {
        name: "Process Automation",
        timeline: "60 days",
        price: "CHF 8k – 25k",
        desc: "Replace manual workflows with AI-integrated systems. Faster operations, fewer errors, measurable ROI.",
        tags: ["AI Automation", "Next.js", "Supabase", "PWA"],
      },
      {
        name: "Custom Software",
        timeline: "120 days",
        price: "CHF 20k – 80k",
        desc: "Purpose-built web applications — from multilingual operations platforms to autonomous audit pipelines.",
        tags: ["Full-Stack", "Multilingual", "100/100", "DSG Compliant"],
      },
    ],
    pricing_note:
      "Pricing based on project complexity. Free consultation to assess your needs — no commitment required.",
    cta_label: "READY TO START?",
    cta_title: "Free IT Analysis. No Obligation.",
    cta_desc:
      "30-minute call. I review your current IT setup and give you a clear assessment of what can be improved, at what cost, and in how many days.",
    cta_wa: "Book via WhatsApp",
    cta_email: "Send an Email",
  },
  de: {
    badge: "Kostenlose Beratung · Schweiz & Liechtenstein",
    h1_line1: "Cloud Transformation",
    h1_line2: "für Schweizer KMU.",
    sub: "Kein Ausfall. Keine versteckten Kosten. 90 Tage bis Go-live.",
    cta_primary: "Kostenlose IT-Analyse buchen",
    cta_back: "Zurück zum Portfolio",
    clients_label: "FÜR WEN ICH ARBEITE",
    clients_title: "Entwickelt für Schweizer KMU, die sich keine Ausfallzeiten leisten können.",
    clients: [
      {
        icon: "🏗️",
        name: "Bau & Facility Services",
        desc: "Mehrstandort-Betrieb, Compliance-Dokumente, mehrsprachige Kundenplattformen.",
      },
      {
        icon: "📦",
        name: "Logistik & Distribution",
        desc: "Paketverfolgung, Routenautomatisierung, Multi-Kanal-Kundenbenachrichtigungen.",
      },
      {
        icon: "⚙️",
        name: "Fertigung & Produktion",
        desc: "Workflow-Digitalisierung, Bestandsverwaltung, autonome Audit-Pipelines.",
      },
    ],
    case_label: "REFERENZPROJEKT",
    case_title: "D'Namar GmbH — Facility Services Basel",
    case_sub: "Live auf dnamar.ch seit April 2026.",
    case_highlights: [
      "Dreisprachige Plattform (DE / EN / ES) — eine Website, drei Sprachen, keine Mehrkosten",
      "100/100 Lighthouse in allen Metriken — Performance, SEO, Accessibility, Best Practices",
      "Swiss DSG/nDSG konform — unabhängiges SMTP, keine Drittanbieter-Datenexposition",
      "Lokales SEO Basel: JSON-LD Structured Data, Google Search Console verifiziert",
      "Go-live in 90 Tagen vom Briefing bis zur Produktion",
    ],
    case_quote:
      "Äußerst zufrieden! Die Website wurde exakt nach meiner Vorstellung umgesetzt — modern, hochwertig und mit schneller, professioneller Kommunikation.",
    case_author: "Nadjib Rasuly, CEO · D'Namar GmbH · Basel",
    services_label: "LEISTUNGEN & ZEITRAHMEN",
    services_title: "Feste Zeitpläne. Klare Deliverables.",
    services: [
      {
        name: "Cloud Migration",
        timeline: "90 Tage",
        price: "CHF 15k – 40k",
        desc: "Microsoft 365 + Azure Migration. Entra ID, Intune, Autopilot. Migration ohne Ausfallzeiten mit Rollback-Plan.",
        tags: ["M365", "Azure", "Entra ID", "Intune", "Autopilot"],
      },
      {
        name: "Prozessautomatisierung",
        timeline: "60 Tage",
        price: "CHF 8k – 25k",
        desc: "Manuelle Workflows durch KI-integrierte Systeme ersetzen. Schnellere Abläufe, weniger Fehler, messbarer ROI.",
        tags: ["KI-Automatisierung", "Next.js", "Supabase", "PWA"],
      },
      {
        name: "Individualsoftware",
        timeline: "120 Tage",
        price: "CHF 20k – 80k",
        desc: "Maßgeschneiderte Webanwendungen — von mehrsprachigen Betriebsplattformen bis zu autonomen Audit-Pipelines.",
        tags: ["Full-Stack", "Mehrsprachig", "100/100", "DSG-konform"],
      },
    ],
    pricing_note:
      "Preise basieren auf der Projektkomplexität. Kostenlose Beratung zur Bedarfsanalyse — ohne Verpflichtung.",
    cta_label: "BEREIT ANZUFANGEN?",
    cta_title: "Kostenlose IT-Analyse. Unverbindlich.",
    cta_desc:
      "30-Minuten-Gespräch. Ich prüfe Ihre aktuelle IT-Infrastruktur und gebe Ihnen eine klare Einschätzung: was verbessert werden kann, zu welchem Preis und in wie vielen Tagen.",
    cta_wa: "Via WhatsApp buchen",
    cta_email: "E-Mail senden",
  },
  es: {
    badge: "Consulta Gratuita · Suiza y Liechtenstein",
    h1_line1: "Transformación Cloud",
    h1_line2: "para KMU Suizas.",
    sub: "Sin tiempo de inactividad. Sin costes ocultos. 90 días hasta el go-live.",
    cta_primary: "Reservar Análisis IT Gratuito",
    cta_back: "Volver al Portfolio",
    clients_label: "PARA QUIÉN TRABAJO",
    clients_title: "Diseñado para KMU suizas que no pueden permitirse paradas.",
    clients: [
      {
        icon: "🏗️",
        name: "Construcción y Facility Services",
        desc: "Operaciones multi-sede, documentación de compliance, plataformas de cliente multilingüe.",
      },
      {
        icon: "📦",
        name: "Logística y Distribución",
        desc: "Seguimiento de paquetes, automatización de rutas, notificaciones multicanal a clientes.",
      },
      {
        icon: "⚙️",
        name: "Fabricación y Producción",
        desc: "Digitalización de workflows, gestión de inventario, pipelines de auditoría autónomos.",
      },
    ],
    case_label: "CASO DE ÉXITO",
    case_title: "D'Namar GmbH — Facility Services Basilea",
    case_sub: "En producción en dnamar.ch desde abril de 2026.",
    case_highlights: [
      "Plataforma trilingüe (DE / EN / ES) — un sitio, tres idiomas, sin coste adicional",
      "100/100 Lighthouse en todas las métricas — rendimiento, SEO, accesibilidad, buenas prácticas",
      "Conforme con Swiss DSG/nDSG — SMTP independiente, sin exposición de datos a terceros",
      "SEO local Basilea: JSON-LD Structured Data, verificado en Google Search Console",
      "Go-live en 90 días desde el briefing hasta producción",
    ],
    case_quote:
      "Extremadamente satisfecho. La web fue implementada exactamente según mi visión — moderna, de alta calidad y con comunicación profesional rápida.",
    case_author: "Nadjib Rasuly, CEO · D'Namar GmbH · Basilea",
    services_label: "SERVICIOS Y PLAZOS",
    services_title: "Plazos fijos. Entregables claros.",
    services: [
      {
        name: "Migración Cloud",
        timeline: "90 días",
        price: "CHF 15k – 40k",
        desc: "Migración Microsoft 365 + Azure. Entra ID, Intune, Autopilot. Sin tiempo de inactividad, con plan de rollback.",
        tags: ["M365", "Azure", "Entra ID", "Intune", "Autopilot"],
      },
      {
        name: "Automatización de Procesos",
        timeline: "60 días",
        price: "CHF 8k – 25k",
        desc: "Reemplazar flujos de trabajo manuales con sistemas integrados con IA. Operaciones más rápidas, menos errores, ROI medible.",
        tags: ["Automatización IA", "Next.js", "Supabase", "PWA"],
      },
      {
        name: "Software a Medida",
        timeline: "120 días",
        price: "CHF 20k – 80k",
        desc: "Aplicaciones web a medida — desde plataformas de operaciones multilingüe hasta pipelines de auditoría autónomos.",
        tags: ["Full-Stack", "Multilingüe", "100/100", "DSG Conforme"],
      },
    ],
    pricing_note:
      "Precios basados en la complejidad del proyecto. Consulta gratuita para evaluar sus necesidades — sin compromiso.",
    cta_label: "¿LISTO PARA EMPEZAR?",
    cta_title: "Análisis IT Gratuito. Sin Compromiso.",
    cta_desc:
      "Llamada de 30 minutos. Revisaré su infraestructura IT actual y le daré una evaluación clara: qué se puede mejorar, a qué coste y en cuántos días.",
    cta_wa: "Reservar por WhatsApp",
    cta_email: "Enviar un Email",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (["en", "de", "es"].includes(locale) ? locale : "en") as Locale;
  return meta[safeLocale];
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }, { locale: "es" }];
}

export default async function ConsultationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = (["en", "de", "es"].includes(locale) ? locale : "en") as Locale;
  const c = content[safeLocale];
  const waLink = `https://wa.me/41779726299?text=${WA_MESSAGES[safeLocale]}`;
  const emailLink = `mailto:vidalrenao.lab@outlook.com?subject=${encodeURIComponent(c.cta_primary)}`;
  const backLink = `/${safeLocale}`;

  return (
    <>
      <NavBar />
      <main className="relative overflow-hidden bg-[#060606] text-white">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_58%)]" />
          <div className="absolute right-0 top-[30rem] h-[28rem] w-[28rem] rounded-full bg-cyan-500/5 blur-[120px]" />
        </div>

        {/* HERO */}
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-28">
          <a
            href={backLink}
            className="mb-8 inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/70"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {c.cta_back}
          </a>

          <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs text-emerald-300/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {c.badge}
          </div>

          <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[56px]">
            <span className="gradient-text">{c.h1_line1}</span>
            <br />
            <span className="text-white">{c.h1_line2}</span>
          </h1>

          <p className="mb-8 max-w-xl text-base text-white/50 md:text-lg">{c.sub}</p>

          <div className="flex flex-wrap gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-400"
            >
              {c.cta_primary}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* WHO I WORK WITH */}
        <section className="relative z-10 border-t border-white/[0.04] py-20 px-6">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">
              {c.clients_label}
            </p>
            <h2 className="mb-10 text-2xl font-bold text-white md:text-3xl">{c.clients_title}</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {c.clients.map((client) => (
                <div
                  key={client.name}
                  className="glass-card rounded-2xl p-6 border border-white/[0.06] hover:border-blue-500/20 transition-colors duration-300"
                >
                  <span className="mb-3 block text-2xl">{client.icon}</span>
                  <h3 className="mb-2 font-semibold text-white">{client.name}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{client.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDY: D'Namar */}
        <section className="relative z-10 border-t border-white/[0.04] py-20 px-6">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              {c.case_label}
            </p>
            <h2 className="mb-1 text-2xl font-bold text-white md:text-3xl">{c.case_title}</h2>
            <p className="mb-8 text-sm text-white/40">{c.case_sub}</p>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-cyan-500/20 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(17,24,39,0.88))] p-7">
                <ul className="space-y-4">
                  {c.case_highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-6 text-white/78">
                      <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.65)]" />
                      <p>{highlight}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7">
                <blockquote>
                  <svg className="mb-4 h-7 w-7 text-emerald-500/25" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-sm italic leading-relaxed text-white/70 md:text-base">
                    {c.case_quote}
                  </p>
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                    <span className="text-xs font-bold text-cyan-400">NR</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{c.case_author}</p>
                </div>
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES & PRICING */}
        <section className="relative z-10 border-t border-white/[0.04] py-20 px-6">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">
              {c.services_label}
            </p>
            <h2 className="mb-10 text-2xl font-bold text-white md:text-3xl">{c.services_title}</h2>

            <div className="grid gap-5 md:grid-cols-3">
              {c.services.map((service, i) => (
                <div
                  key={service.name}
                  className="glass-card flex flex-col gap-4 rounded-2xl border border-white/[0.06] p-6 transition-colors duration-300 hover:border-blue-500/20"
                >
                  <div>
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-white">{service.name}</h3>
                      <span className="flex-none rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-300">
                        {service.timeline}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white/60">{service.price}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-white/50">{service.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-xs text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-white/35">{c.pricing_note}</p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative z-10 border-t border-white/[0.04] py-24 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              {c.cta_label}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">{c.cta_title}</h2>
            <p className="mb-8 text-sm leading-relaxed text-white/50 md:text-base">{c.cta_desc}</p>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-400 sm:w-auto"
              >
                {c.cta_wa}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href={emailLink}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white/70 transition-all duration-200 hover:border-white/20 hover:text-white sm:w-auto"
              >
                {c.cta_email}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
