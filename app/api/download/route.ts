import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { buildCvDocx, type CvVariant } from "@/lib/cv/buildCvDocx";
import { resolveEmailVariant } from "@/lib/cv/emailVariants";

function resolveCvVariant(value: string | null): CvVariant {
  return value === "systems" ? "systems" : "fullstack";
}

function isSupportedLocale(value: string): value is (typeof routing.locales)[number] {
  return (routing.locales as readonly string[]).includes(value);
}

// public/ is not on the serverless filesystem, so read the photo from our own origin
async function loadPhoto(origin: string): Promise<Buffer | undefined> {
  try {
    const res = await fetch(`${origin}/Photo.jpg`, { cache: "force-cache" });
    return res.ok ? Buffer.from(await res.arrayBuffer()) : undefined;
  } catch {
    return undefined;
  }
}

export async function GET(request: NextRequest) {
  const format = request.nextUrl.searchParams.get("format") ?? "word";
  const localeParam = request.nextUrl.searchParams.get("locale") ?? routing.defaultLocale;
  const emailVariant = resolveEmailVariant(request.nextUrl.searchParams.get("email"));
  const cvVariant = resolveCvVariant(request.nextUrl.searchParams.get("variant"));

  if (format !== "word") {
    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  }

  if (!isSupportedLocale(localeParam)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const photo = await loadPhoto(request.nextUrl.origin);
  const buffer = await buildCvDocx(localeParam, emailVariant, cvVariant, photo);
  const variantSuffix = cvVariant === "systems" ? "_Systems" : "";

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="Vidal_Renao_CV_${localeParam.toUpperCase()}${variantSuffix}.docx"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
}
