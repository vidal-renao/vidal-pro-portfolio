import { getTranslations } from "next-intl/server";
import PrintTrigger from "@/components/ui/PrintTrigger";
import { EMAIL_ADDRESSES, resolveEmailVariant } from "@/lib/cv/emailVariants";

type Role = {
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
};

export default async function PrintPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ print?: string; email?: string; variant?: string }>;
}) {
  const { locale } = await params;
  const { print, email, variant } = await searchParams;
  const emailAddress = EMAIL_ADDRESSES[resolveEmailVariant(email)];
  const isSystemsVariant = variant === "systems";
  const t = await getTranslations({ locale, namespace: "cv" });
  const te = await getTranslations({ locale, namespace: "experience" });
  const ts = await getTranslations({ locale, namespace: "cvSystems" });

  const roles = te.raw("roles") as Role[];
  const competencies = t.raw("competencies") as string[];
  const knowledge = t.raw("knowledge") as { area: string; detail: string }[];
  const certs = t.raw("certs") as { title: string; detail: string }[];
  const languages = t.raw("languages") as { lang: string; level: string }[];
  const education = ts.raw("education") as { title: string; detail: string }[];

  const role = isSystemsVariant ? ts("role") : t("role");
  const specialties = isSystemsVariant ? ts("specialties") : t("specialties");
  const profile = isSystemsVariant ? ts("profile") : t("profile");

  return (
    <>
      <PrintTrigger auto={print === "1"} />
      <div className="cv">
        {/* ── HEADER BAND ── */}
        <header className="cv-head">
          <div className="cv-head-main">
            <h1>Vidal Reñao Lopelo</h1>
            <p className="cv-role">{role}</p>
            <p className="cv-spec">{specialties}</p>
          </div>
          <div className="cv-head-side">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Photo.jpg" alt="Vidal Reñao Lopelo" className="cv-photo" />
            <ul className="cv-contact">
              <li>Basel, Switzerland</li>
              <li>+41 77 972 62 99</li>
              <li>{emailAddress}</li>
              <li>linkedin.com/in/vidalrenao</li>
              <li>github.com/vidal-renao</li>
              {isSystemsVariant && <li>{ts("residency")}</li>}
              <li className="cv-avail">{t("available")}</li>
            </ul>
          </div>
        </header>

        {/* ── PROFILE ── */}
        <section>
          <div className="cv-bar">{t("profileTitle")}</div>
          <p className="cv-profile">{profile}</p>
        </section>

        {/* ── KEY COMPETENCIES ── */}
        <section>
          <div className="cv-bar">{t("competenciesTitle")}</div>
          <ul className="cv-comp">
            {competencies.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        {/* ── EXPERIENCE ── */}
        <section>
          <div className="cv-bar">{t("experienceTitle")}</div>
          {roles.map((r) => (
            <div key={`${r.company}-${r.period}`} className="cv-entry">
              <div className="cv-entry-head">
                <strong>{r.title}</strong>
                <span className="cv-period">{r.period}</span>
              </div>
              <p className="cv-company">
                {r.company} · {r.location}
              </p>
              <ul>
                {r.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ── TECHNICAL KNOWLEDGE ── */}
        <section>
          <div className="cv-bar">{t("knowledgeTitle")}</div>
          <div className="cv-know">
            {knowledge.map((k) => (
              <div key={k.area} className="cv-know-row">
                <span className="cv-know-label">{k.area}</span>
                <span className="cv-know-detail">{k.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section>
          <div className="cv-bar">{t("certsTitle")}</div>
          <div className="cv-certs">
            {certs.map((c) => (
              <div key={c.title} className="cv-cert">
                <strong>{c.title}</strong>
                <span>{c.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── EDUCATION (systems variant only) ── */}
        {isSystemsVariant && (
          <section>
            <div className="cv-bar">{ts("educationTitle")}</div>
            <div className="cv-certs">
              {education.map((e) => (
                <div key={e.detail} className="cv-cert">
                  <strong>{e.title}</strong>
                  <span>{e.detail}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── LANGUAGES ── */}
        <section>
          <div className="cv-bar">{t("languagesTitle")}</div>
          <div className="cv-langs">
            {languages.map((l) => (
              <div key={l.lang} className="cv-lang">
                <span className="cv-lang-name">{l.lang}</span>
                <span className="cv-lang-level">{l.level}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="cv-foot">
          <span>{emailAddress} · +41 77 972 62 99 · linkedin.com/in/vidalrenao</span>
          {isSystemsVariant && (
            <span>
              {ts("nationality")} · {ts("license")}
            </span>
          )}
          <span className="cv-foot-note">{t("footerNote")}</span>
        </footer>
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, Helvetica, sans-serif; color: #1f2937; background: #eef1f5; }
        .cv { max-width: 820px; margin: 24px auto; background: #fff; }

        /* Header band */
        .cv-head {
          display: flex; justify-content: space-between; gap: 24px;
          background: linear-gradient(135deg, #16304f 0%, #1e3a5f 60%, #24476f 100%);
          color: #fff; padding: 26px 32px;
        }
        .cv-head-main { display: flex; flex-direction: column; justify-content: center; }
        .cv-head h1 { font-size: 27pt; font-weight: 800; letter-spacing: -0.01em; line-height: 1.05; }
        .cv-role { font-size: 12.5pt; font-weight: 700; color: #8fc0ff; margin-top: 8px; }
        .cv-spec { font-size: 9.5pt; color: #c7d6ea; margin-top: 3px; letter-spacing: 0.02em; }
        .cv-head-side { display: flex; align-items: center; gap: 16px; }
        .cv-photo { width: 78px; height: 78px; border-radius: 10px; object-fit: cover; object-position: top; border: 2px solid rgba(255,255,255,0.35); flex: none; }
        .cv-contact { list-style: none; font-size: 8.5pt; line-height: 1.7; color: #dbe6f4; }
        .cv-contact .cv-avail { color: #7fe0b0; font-weight: 700; margin-top: 3px; }

        /* Body */
        section { padding: 0 32px; margin-top: 16px; }
        .cv-bar {
          background: #1e3a5f; color: #fff; font-size: 9.5pt; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          padding: 5px 12px; border-radius: 3px; margin-bottom: 10px;
        }
        .cv-profile { font-size: 9.5pt; line-height: 1.6; color: #374151; }

        /* Competencies */
        .cv-comp {
          list-style: none; display: grid; grid-template-columns: 1fr 1fr;
          gap: 5px 24px;
        }
        .cv-comp li {
          font-size: 9pt; color: #374151; line-height: 1.4; padding-left: 16px; position: relative;
        }
        .cv-comp li::before {
          content: ""; position: absolute; left: 0; top: 5px;
          width: 7px; height: 7px; border-radius: 2px; background: #2563eb;
        }

        /* Experience */
        .cv-entry { margin-bottom: 12px; }
        .cv-entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
        .cv-entry-head strong { font-size: 10.5pt; color: #0f172a; }
        .cv-period { font-size: 8.5pt; color: #64748b; white-space: nowrap; }
        .cv-company { font-size: 9pt; color: #2563eb; font-weight: 600; margin: 1px 0 4px; }
        .cv-entry ul { padding-left: 16px; }
        .cv-entry li { font-size: 9pt; color: #475569; line-height: 1.5; }

        /* Knowledge */
        .cv-know { display: flex; flex-direction: column; gap: 6px; }
        .cv-know-row { display: grid; grid-template-columns: 150px 1fr; gap: 12px; align-items: center; }
        .cv-know-label {
          font-size: 8.5pt; font-weight: 700; color: #1e3a5f;
          background: #eef4fb; border: 1px solid #d6e4f5; border-radius: 4px;
          padding: 4px 10px; text-align: left;
        }
        .cv-know-detail { font-size: 9pt; color: #475569; }

        /* Certifications */
        .cv-certs { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; }
        .cv-cert { display: flex; flex-direction: column; }
        .cv-cert strong { font-size: 9.5pt; color: #0f172a; }
        .cv-cert span { font-size: 8.5pt; color: #64748b; margin-top: 1px; }

        /* Languages */
        .cv-langs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .cv-lang {
          border: 1px solid #d6e4f5; border-radius: 6px; overflow: hidden; text-align: center;
        }
        .cv-lang-name { display: block; background: #1e3a5f; color: #fff; font-size: 9pt; font-weight: 700; padding: 5px; }
        .cv-lang-level { display: block; font-size: 8.5pt; color: #475569; padding: 6px; }

        /* Footer */
        .cv-foot {
          margin: 22px 0 0; padding: 12px 32px 26px; border-top: 1px solid #e2e8f0;
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          font-size: 8pt; color: #94a3b8; text-align: center;
        }
        .cv-foot-note { font-style: italic; }

        @media print {
          body { background: #fff; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .cv { margin: 0; max-width: none; }
          section { break-inside: avoid; }
          .cv-entry { break-inside: avoid; }
          @page { margin: 12mm 0; size: A4; }
        }
      `}</style>
    </>
  );
}
