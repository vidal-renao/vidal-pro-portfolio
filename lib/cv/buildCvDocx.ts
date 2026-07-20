import {
  AlignmentType,
  BorderStyle,
  Document,
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

type Role = {
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
};

export type CvVariant = "fullstack" | "systems";

const NAVY = "1e3a5f";
const NAVY_DARK = "16304f";
const ACCENT = "2563eb";
const TEXT = "374151";
const MUTED = "64748b";

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
        font: "Arial",
      }),
    ],
  });
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 40 },
    children: [new TextRun({ text, size: 18, color: TEXT, font: "Arial" })],
  });
}

export async function buildCvDocx(
  locale: string,
  emailVariant: EmailVariant,
  cvVariant: CvVariant = "fullstack"
): Promise<Buffer> {
  const email = EMAIL_ADDRESSES[emailVariant];
  const isSystemsVariant = cvVariant === "systems";
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

  const contactParts = [
    "Basel, Switzerland",
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
          // Header band
          new Paragraph({
            shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY_DARK },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: "Vidal Reñao Lopelo",
                bold: true,
                size: 40,
                color: "FFFFFF",
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY_DARK },
            spacing: { after: 40 },
            children: [
              new TextRun({ text: role, bold: true, size: 22, color: "8fc0ff", font: "Arial" }),
            ],
          }),
          new Paragraph({
            shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY_DARK },
            spacing: { after: 40 },
            children: [
              new TextRun({ text: specialties, size: 17, color: "c7d6ea", font: "Arial" }),
            ],
          }),
          new Paragraph({
            shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY_DARK },
            spacing: { after: 120 },
            children: [new TextRun({ text: contactLine, size: 15, color: "dbe6f4", font: "Arial" })],
          }),
          new Paragraph({
            shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY_DARK },
            spacing: { after: 200 },
            children: [
              new TextRun({ text: t("available"), bold: true, size: 15, color: "7fe0b0", font: "Arial" }),
            ],
          }),

          // Profile
          sectionBar(t("profileTitle")),
          new Paragraph({
            spacing: { after: 160 },
            children: [new TextRun({ text: profile, size: 18, color: TEXT, font: "Arial" })],
          }),

          // Competencies
          sectionBar(t("competenciesTitle")),
          ...competencies.map(bullet),
          new Paragraph({ spacing: { after: 120 }, children: [] }),

          // Experience
          sectionBar(t("experienceTitle")),
          ...roles.flatMap((r) => [
            new Paragraph({
              spacing: { before: 100, after: 20 },
              children: [
                new TextRun({ text: r.title, bold: true, size: 20, color: "0f172a", font: "Arial" }),
                new TextRun({ text: `    ${r.period}`, size: 16, color: MUTED, font: "Arial" }),
              ],
            }),
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: `${r.company} · ${r.location}`,
                  bold: true,
                  size: 17,
                  color: ACCENT,
                  font: "Arial",
                }),
              ],
            }),
            ...r.highlights.map(bullet),
          ]),

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
                      shading: { type: ShadingType.CLEAR, color: "auto", fill: "eef4fb" },
                      margins: { top: 60, bottom: 60, left: 100, right: 100 },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: k.area, bold: true, size: 16, color: NAVY, font: "Arial" }),
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
                            new TextRun({ text: k.detail, size: 17, color: TEXT, font: "Arial" }),
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
                  new TextRun({ text: `${c.title}  —  `, bold: true, size: 18, color: "0f172a", font: "Arial" }),
                  new TextRun({ text: c.detail, size: 16, color: MUTED, font: "Arial" }),
                ],
              })
          ),

          // Education (systems variant only)
          ...(isSystemsVariant
            ? [
                sectionBar(ts("educationTitle")),
                ...education.map(
                  (e) =>
                    new Paragraph({
                      spacing: { after: 60 },
                      children: [
                        new TextRun({ text: `${e.title}  —  `, bold: true, size: 18, color: "0f172a", font: "Arial" }),
                        new TextRun({ text: e.detail, size: 16, color: MUTED, font: "Arial" }),
                      ],
                    })
                ),
              ]
            : []),

          // Languages
          sectionBar(t("languagesTitle")),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: languages.map(
                  (l) =>
                    new TableCell({
                      borders: cellBorders,
                      width: { size: 100 / languages.length, type: WidthType.PERCENTAGE },
                      margins: { top: 0, bottom: 0, left: 60, right: 60 },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
                          spacing: { after: 0 },
                          children: [
                            new TextRun({ text: l.lang, bold: true, size: 17, color: "FFFFFF", font: "Arial" }),
                          ],
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "d6e4f5" } },
                          spacing: { after: 0 },
                          children: [
                            new TextRun({ text: l.level, size: 16, color: TEXT, font: "Arial" }),
                          ],
                        }),
                      ],
                    })
                ),
              }),
            ],
          }),

          // Footer
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 260 },
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: "e2e8f0" } },
            children: [
              new TextRun({
                text: `${email} · +41 77 972 62 99 · linkedin.com/in/vidalrenao`,
                size: 15,
                color: MUTED,
                font: "Arial",
              }),
            ],
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
                      font: "Arial",
                    }),
                  ],
                }),
              ]
            : []),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 40 },
            children: [
              new TextRun({ text: t("footerNote"), italics: true, size: 15, color: MUTED, font: "Arial" }),
            ],
          }),
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
}
