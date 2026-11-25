import { getTranslations } from "next-intl/server";
import PrintTrigger from "@/components/ui/PrintTrigger";
import { EMAIL_ADDRESSES, resolveEmailVariant } from "@/lib/cv/emailVariants";
import { cvLocation, otherRoleLine, selectCerts, selectCompetencies, selectKnowledge, selectRoles, type CvCert, type CvKnowledge, type CvRole, type CvVariant } from "@/lib/cv/profileContent";

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
  const cvVariant: CvVariant = variant === "systems" ? "systems" : "fullstack";
  const isSystemsVariant = cvVariant === "systems";
  const t = await getTranslations({ locale, namespace: "cv" });
  const te = await getTranslations({ locale, namespace: "experience" });
  const ts = await getTranslations({ locale, namespace: "cvSystems" });

  const source = isSystemsVariant ? ts : t;
  const { full: roles, other: otherRoles } = selectRoles(te.raw("roles") as CvRole[], cvVariant);
  const certs = selectCerts(t.raw("certs") as CvCert[], cvVariant);
  const competencies = selectCompetencies(source.raw("competencies") as string[], cvVariant);
  const knowledge = selectKnowledge(source.raw("knowledge") as CvKnowledge[], cvVariant);
  const languages = t.raw("languages") as { lang: string; level: string }[];
  const education = ts.raw("education") as { title: string; detail: string }[];

  const contact = [
    cvLocation(locale),
    "+41 77 972 62 99",
    emailAddress,
    "linkedin.com/in/vidalrenao",
    "github.com/vidal-renao",
    ...(isSystemsVariant ? [ts("residency")] : []),
  ];

  return (
    <>
      <PrintTrigger auto={print === "1"} />
      <div className="cv" data-cv-variant={cvVariant}>
        {/* ── HEADER BAND ── */}
        <header className="cv-head">
          <div className="cv-head-main">
            <h1>Vidal Reñao Lopelo</h1>
            <p className="cv-role">{isSystemsVariant ? ts("role") : t("cvRole")}</p>
            <p className="cv-spec">{isSystemsVariant ? ts("specialties") : t("cvSpecialties")}</p>
            <ul className="cv-contact">
              {contact.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="cv-status">
              <span className="cv-avail">
                {t("available")} · {t("seeking")}
              </span>
              <span className="cv-commit">{t("commitment")}</span>
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Photo.jpg" alt="Vidal Reñao Lopelo" className="cv-photo" />
        </header>

        <section>
          <h2 className="cv-bar">{t("profileTitle")}</h2>
          <p className="cv-profile">{isSystemsVariant ? ts("profile") : t("cvProfile")}</p>
        </section>

        <section>
          <h2 className="cv-bar">{t("competenciesTitle")}</h2>
          <ul className="cv-comp">
            {competencies.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="cv-bar">{t("experienceTitle")}</h2>
          {roles.map((r) => (
            <div key={r.id} className="cv-entry">
              <div className="cv-entry-head">
                <strong>{r.title}</strong>
                <span className="cv-period">{r.period}</span>
              </div>
              <p className="cv-company">{[r.company, r.location].filter(Boolean).join(" · ")}</p>
              <ul>
                {r.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
          {otherRoles.length > 0 && (
            <div className="cv-entry cv-other">
              <strong className="cv-other-title">{t("otherExperienceTitle")}</strong>
              <ul>
                {otherRoles.map((r) => (
                  <li key={r.id}>{otherRoleLine(r)}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section>
          <h2 className="cv-bar">{t("knowledgeTitle")}</h2>
          <div className="cv-know">
            {knowledge.map((k) => (
              <div key={k.area} className="cv-know-row">
                <span className="cv-know-label">{k.area}</span>
                <span className="cv-know-detail">{k.detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-keep">
          <div className="cv-split">
            <div>
              <h2 className="cv-bar">{ts("educationTitle")}</h2>
              {education.map((e) => (
                <div key={e.title} className="cv-cert">
                  <strong>{e.title}</strong>
                  <span>{e.detail}</span>
                </div>
              ))}
            </div>
            {certs.length > 0 && (
              <div>
                <h2 className="cv-bar">{t("certsTitle")}</h2>
                {certs.map((c) => (
                  <div key={c.id} className="cv-cert">
                    <strong>{c.title}</strong>
                    <span>{c.detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="cv-keep">
          <h2 className="cv-bar">{t("languagesTitle")}</h2>
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
        body { font-family: "Segoe UI", Aptos, "Helvetica Neue", Arial, sans-serif; color: #1F2937; background: #EEF1F5; }
        .cv { max-width: 820px; margin: 24px auto; background: #fff; font-size: 10pt; line-height: 1.35; }

        /* Header band — petrol blue; every text colour on it is >= 7:1 */
        .cv-head {
          display: flex; justify-content: space-between; align-items: center; gap: 24px;
          background: #134E66; color: #fff; padding: 20px 30px 18px;
          border-bottom: 4px solid #2C7A93;
        }
        .cv-head-main { min-width: 0; }
        .cv-head h1 { font-size: 25pt; font-weight: 700; letter-spacing: -0.01em; line-height: 1.1; }
        .cv-role { font-size: 12pt; font-weight: 600; color: #FFFFFF; margin-top: 6px; }
        .cv-spec { font-size: 9.5pt; color: #DCEBF2; margin-top: 2px; }
        .cv-contact { list-style: none; display: grid; grid-template-columns: repeat(3, auto); justify-content: start; gap: 2px 18px; margin-top: 10px; font-size: 9pt; color: #F4F9FB; }
        .cv-contact li { white-space: nowrap; }
        .cv-status { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; margin-top: 8px; }
        .cv-avail {
          display: inline-block; font-size: 9pt; font-weight: 600; color: #fff;
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.35);
          border-radius: 999px; padding: 2px 10px;
        }
        .cv-commit { font-size: 8.5pt; color: #DCEBF2; }
        .cv-photo {
          width: 112px; height: 128px; flex: none; object-fit: cover; object-position: 50% 28%;
          border-radius: 8px; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }

        /* Body */
        section { padding: 0 30px; margin-top: 10px; }
        .cv-bar {
          background: #134E66; color: #fff; font-size: 9pt; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          padding: 3px 10px; border-radius: 3px; margin-bottom: 6px;
        }
        .cv-profile { color: #1F2937; }

        .cv-comp { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 2px 24px; }
        .cv-comp li { font-size: 9.5pt; color: #1F2937; line-height: 1.35; padding-left: 14px; position: relative; }
        .cv-comp li::before {
          content: ""; position: absolute; left: 0; top: 6px;
          width: 6px; height: 6px; border-radius: 50%; background: #2C7A93;
        }

        .cv-entry { margin-bottom: 8px; }
        .cv-entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
        .cv-entry-head strong { font-size: 10.5pt; color: #0E3B50; }
        .cv-period { font-size: 9pt; color: #374151; white-space: nowrap; }
        .cv-company { font-size: 9.5pt; color: #1A5F7A; font-weight: 600; margin: 1px 0 3px; }
        .cv-entry ul { padding-left: 16px; list-style: disc; }
        .cv-entry li::marker { color: #2C7A93; }
        .cv-entry li { font-size: 9.5pt; color: #374151; line-height: 1.35; }
        .cv-other-title { display: block; font-size: 10.5pt; color: #0E3B50; margin-bottom: 3px; }

        .cv-know { display: flex; flex-direction: column; gap: 3px; }
        .cv-know-row { display: grid; grid-template-columns: 190px 1fr; gap: 12px; align-items: center; break-inside: avoid; }
        .cv-know-label {
          font-size: 9pt; font-weight: 700; color: #0E3B50;
          background: #E4F0F6; border-left: 3px solid #2C7A93; border-radius: 2px; padding: 2px 8px;
        }
        .cv-know-detail { font-size: 9.5pt; color: #374151; }

        .cv-split { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
        .cv-split .cv-cert { margin-bottom: 6px; }
        .cv-cert { display: flex; flex-direction: column; break-inside: avoid; }
        .cv-cert strong { color: #0F172A; }
        .cv-cert span { font-size: 9pt; color: #4B5563; margin-top: 1px; }

        .cv-langs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px 24px; }
        .cv-lang { display: flex; justify-content: space-between; gap: 8px; border-bottom: 1px solid #D5E3EA; padding: 3px 0; }
        .cv-lang-name { font-weight: 700; color: #0E3B50; }
        .cv-lang-level { font-size: 9pt; color: #374151; text-align: right; }

        .cv-foot {
          margin-top: 14px; padding: 8px 32px 18px; border-top: 1px solid #D5DEE5;
          display: flex; flex-direction: column; align-items: center; gap: 2px;
          font-size: 8.5pt; color: #4B5563; text-align: center;
        }
        .cv-foot-note { font-style: italic; }

        @media print {
          html, body { background: #fff !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .cv { margin: 0; max-width: none; }
          .cv-bar { break-after: avoid; }
          .cv-entry-head, .cv-company { break-after: avoid; }
          .cv-entry li, .cv-other, .cv-keep { break-inside: avoid; }
          @page { margin: 9mm 0; size: A4; }
          @page :first { margin-top: 0; }
        }
      `}</style>
    </>
  );
}
