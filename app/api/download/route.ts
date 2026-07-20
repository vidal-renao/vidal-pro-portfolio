import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { buildCvDocx } from "@/lib/cv/buildCvDocx";
import { resolveEmailVariant } from "@/lib/cv/emailVariants";

function isSupportedLocale(value: string): value is (typeof routing.locales)[number] {
  return (routing.locales as readonly string[]).includes(value);
}

export async function GET(request: NextRequest) {
  const format = request.nextUrl.searchParams.get("format") ?? "word";
  const localeParam = request.nextUrl.searchParams.get("locale") ?? routing.defaultLocale;
  const emailVariant = resolveEmailVariant(request.nextUrl.searchParams.get("email"));

  if (format !== "word") {
    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  }

  if (!isSupportedLocale(localeParam)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const buffer = await buildCvDocx(localeParam, emailVariant);

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="Vidal_Renao_CV_${localeParam.toUpperCase()}.docx"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
}
