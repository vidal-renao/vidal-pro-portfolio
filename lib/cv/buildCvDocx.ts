import {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { getTranslations } from "next-intl/server";
import { EMAIL_ADDRESSES, type EmailVariant } from "./emailVariants";
import { loadCvProjects } from "./cvProjects";
import { cvLocation, otherRoleLine, selectCerts, selectCompetencies, selectKnowledge, selectRoles, type CvCert, type CvKnowledge, type CvRole, type CvVariant } from "./profileContent";

export type { CvVariant };

// Swiss corporate palette shared with the print view (petroleum blue); all text colours pass WCAG AA on white
const NAVY = "134E66";
const NAVY_DARK = "134E66";
const ACCENT = "1A5F7A";
const PALE = "E4F0F6";
const TEXT = "1F2937";
const MUTED = "4B5563";
const FONT = "Arial";

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } as const;
const cellBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function sectionBar(label: string): Paragraph {
  return new Paragraph({
    shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
    spacing: { before: 220, after: 120 },
    children: [
      new TextRun({
        text: label.toUpperCase(),
        bold: true,
        color: "FFFFFF",
        size: 18,
        font: FONT,
      }),
    ],
  });
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 40 },
    children: [new TextRun({ text, size: 18, color: TEXT, font: FONT })],
  });
}

export async function buildCvDocx(
  locale: string,
  emailVariant: EmailVariant,
  cvVariant: CvVariant = "fullstack",
  photo?: Buffer
): Promise<Buffer> {
  const email = EMAIL_ADDRESSES[emailVariant];
  const isSystemsVariant = cvVariant === "systems";
  const t = await getTranslations({ locale, namespace: "cv" });
  const te = await getTranslations({ locale, namespace: "experience" });
  const ts = await getTranslations({ locale, namespace: "cvSystems" });

  const { full: roles, other: otherRoles } = selectRoles(te.raw("roles") as CvRole[], cvVariant);
  const source = isSystemsVariant ? ts : t;
  const competencies = selectCompetencies(source.raw("competencies") as string[], cvVariant);
  const knowledge = selectKnowledge(source.raw("knowledge") as CvKnowledge[], cvVariant);
  const certs = selectCerts(t.raw("certs") as CvCert[], cvVariant);
  const languages = t.raw("languages") as { lang: string; level: string }[];
  const education = ts.raw("education") as { title: string; detail: string }[];
  const projects = await loadCvProjects(locale, cvVariant);

  const role = isSystemsVariant ? ts("role") : t("cvRole");
  const specialties = isSystemsVariant ? ts("specialties") : t("cvSpecialties");
  const profile = isSystemsVariant ? ts("profile") : t("cvProfile");

  const contactParts = [
    cvLocation(locale),
    "+41 77 972 62 99",
    email,
    "linkedin.com/in/vidalrenao",
    "github.com/vidal-renao",
  ];
  if (isSystemsVariant) contactParts.push(ts("residency"));
  const contactLine = contactParts.join("  ·  ");

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4
            margin: { top: 720, bottom: 720, left: 720, right: 720 },
          },
        },
        children: [
          // Header band: identity + contact left, photo right
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 80, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY_DARK },
                    margins: { top: 160, bottom: 160, left: 220, right: 120 },
                    children: [
                      new Paragraph({
                        spacing: { after: 40 },
                        children: [
                          new TextRun({ text: "Vidal Reñao Lopelo", bold: true, size: 40, color: "FFFFFF", font: FONT }),
                        ],
                      }),
                      new Paragraph({
                        spacing: { after: 40 },
                        children: [
                          new TextRun({ text: role, bold: true, size: 23, color: "FFFFFF", font: FONT }),
                        ],
                      }),
                      new Paragraph({
                        spacing: { after: 80 },
                        children: [new TextRun({ text: specialties, size: 18, color: "DCEBF2", font: FONT })],
                      }),
                      new Paragraph({
                        spacing: { after: 40 },
                        children: [new TextRun({ text: contactLine, size: 17, color: "F4F9FB", font: FONT })],
                      }),
                      new Paragraph({
                        spacing: { after: 20 },
                        children: [
                          new TextRun({ text: `${t("available")} · ${t("seeking")}`, bold: true, size: 17, color: "FFFFFF", font: FONT }),
                        ],
                      }),
                      new Paragraph({
                        children: [new TextRun({ text: t("commitment"), size: 16, color: "DCEBF2", font: FONT })],
                      }),
                    ],
                  }),
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 20, type: WidthType.PERCENTAGE },
                    shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY_DARK },
                    margins: { top: 120, bottom: 120, left: 60, right: 160 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: photo
                          ? [new ImageRun({ type: "jpg", data: photo, transformation: { width: 100, height: 114 } })]
                          : [],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ spacing: { after: 80 }, children: [] }),

          // Profile
          sectionBar(t("profileTitle")),
          new Paragraph({
            spacing: { after: 160 },
            children: [new TextRun({ text: profile, size: 18, color: TEXT, font: FONT })],
          }),

          // Competencies
          sectionBar(t("competenciesTitle")),
          ...competencies.map(bullet),
          new Paragraph({ spacing: { after: 120 }, children: [] }),

          // Projects (fullstack CV only)
          ...(projects.length > 0
            ? [
                sectionBar(t("projectsTitle")),
                ...projects.flatMap((p) => [
                  new Paragraph({
                    spacing: { before: 80, after: 20 },
                    children: [
                      new TextRun({ text: p.title, bold: true, size: 21, color: "0E3B50", font: FONT }),
                      new TextRun({ text: `    ${p.status} · ${p.host}`, size: 16, color: MUTED, font: FONT }),
                    ],
                  }),
                  new Paragraph({
                    spacing: { after: 20 },
                    children: [new TextRun({ text: p.summary, size: 18, color: TEXT, font: FONT })],
                  }),
                  new Paragraph({
                    spacing: { after: 60 },
                    children: [new TextRun({ text: p.stack.join(" · "), bold: true, size: 16, color: ACCENT, font: FONT })],
                  }),
                ]),
              ]
            : []),

          // Experience
          sectionBar(t("experienceTitle")),
          ...roles.flatMap((r) => [
            new Paragraph({
              spacing: { before: 100, after: 20 },
              children: [
                new TextRun({ text: r.title, bold: true, size: 21, color: "0E3B50", font: FONT }),
                new TextRun({ text: `    ${r.period}`, size: 16, color: MUTED, font: FONT }),
              ],
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: [r.company, r.location].filter(Boolean).join(" · "),
                  bold: true,
                  size: 17,
                  color: ACCENT,
                  font: FONT,
                }),
              ],
            }),
            ...r.highlights.map(bullet),
          ]),
          ...(otherRoles.length > 0
            ? [
                new Paragraph({
                  spacing: { before: 100, after: 40 },
                  children: [
                    new TextRun({ text: t("otherExperienceTitle"), bold: true, size: 21, color: "0E3B50", font: FONT }),
                  ],
                }),
                ...otherRoles.map((r) => bullet(otherRoleLine(r))),
              ]
            : []),

          // Technical Knowledge
          sectionBar(t("knowledgeTitle")),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: knowledge.map(
              (k) =>
                new TableRow({
                  children: [
                    new TableCell({
                      borders: cellBorders,
                      width: { size: 28, type: WidthType.PERCENTAGE },
                      shading: { type: ShadingType.CLEAR, color: "auto", fill: PALE },
                      margins: { top: 60, bottom: 60, left: 100, right: 100 },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: k.area, bold: true, size: 16, color: NAVY, font: FONT }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      borders: cellBorders,
                      width: { size: 72, type: WidthType.PERCENTAGE },
                      margins: { top: 60, bottom: 60, left: 120, right: 0 },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: k.detail, size: 17, color: TEXT, font: FONT }),
                          ],
                        }),
                      ],
                    }),
                  ],
                })
            ),
          }),
          new Paragraph({ spacing: { after: 120 }, children: [] }),

          // Certifications
          sectionBar(t("certsTitle")),
          ...certs.map(
            (c) =>
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: `${c.title}  —  `, bold: true, size: 18, color: "0f172a", font: FONT }),
                  new TextRun({ text: c.detail, size: 16, color: MUTED, font: FONT }),
                ],
              })
          ),

          // Education
          ...[
                sectionBar(ts("educationTitle")),
                ...education.map(
                  (e) =>
                    new Paragraph({
                      spacing: { after: 60 },
                      children: [
                        new TextRun({ text: `${e.title}  —  `, bold: true, size: 18, color: "0f172a", font: FONT }),
                        new TextRun({ text: e.detail, size: 16, color: MUTED, font: FONT }),
                      ],
                    })
                ),
              ],

          // Languages
          sectionBar(t("languagesTitle")),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            // Three tiles per row keep long levels readable.
            rows: Array.from({ length: Math.ceil(languages.length / 3) }, (_, row) => languages.slice(row * 3, row * 3 + 3)).map(
              (chunk) =>
              new TableRow({
                children: chunk.map(
                  (l) =>
                    new TableCell({
                      borders: cellBorders,
                      width: { size: 100 / 3, type: WidthType.PERCENTAGE },
                      margins: { top: 0, bottom: 0, left: 60, right: 60 },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
                          spacing: { after: 0 },
                          children: [
                            new TextRun({ text: l.lang, bold: true, size: 17, color: "FFFFFF", font: FONT }),
                          ],
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "d6e4f5" } },
                          spacing: { after: 0 },
                          children: [
                            new TextRun({ text: l.level, size: 16, color: TEXT, font: FONT }),
                          ],
                        }),
                      ],
                    })
                ),
              })
            ),
          }),

          // Footer (contact details already sit in the header band)
          new Paragraph({
            spacing: { before: 260 },
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: "D5DEE5" } },
            children: [],
          }),
          ...(isSystemsVariant
            ? [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 40 },
                  children: [
                    new TextRun({
                      text: `${ts("nationality")} · ${ts("license")}`,
                      size: 15,
                      color: MUTED,
                      font: FONT,
                    }),
                  ],
                }),
              ]
            : []),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 40 },
            children: [
              new TextRun({ text: t("footerNote"), italics: true, size: 15, color: MUTED, font: FONT }),
            ],
          }),
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
}
