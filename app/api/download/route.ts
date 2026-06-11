import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const ASSETS: Record<string, { file: string; contentType: string; filename: string }> = {
  pdf: {
    file: "assets/Vidal_Renao_CV_EN.pdf",
    contentType: "application/pdf",
    filename: "Vidal_Renao_CV.pdf",
  },
  word: {
    file: "assets/Vidal_Renao_CV_EN.docx",
    contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    filename: "Vidal_Renao_CV.docx",
  },
};

export async function GET(request: NextRequest) {
  const format = request.nextUrl.searchParams.get("format") ?? "pdf";

  const asset = ASSETS[format];
  if (!asset) {
    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", asset.file);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": asset.contentType,
      "Content-Disposition": `attachment; filename="${asset.filename}"`,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
}
