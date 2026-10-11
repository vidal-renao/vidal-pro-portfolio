import { NextRequest, NextResponse } from "next/server";
import { buildCareerProfile } from "@/lib/career-profile/build";

// Static content: computed once per deployment, so a portfolio deploy is a new version.
const profile = buildCareerProfile();
const etag = `"${profile.contentHash}"`;

/** Public, read-only career profile (schema v1) for JobPilot AI's automatic profile sync. */
export function GET(request: NextRequest) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    ETag: etag,
    "Cache-Control": "public, max-age=0, s-maxage=300, must-revalidate",
    "X-Content-Type-Options": "nosniff",
  };
  if (request.headers.get("if-none-match") === etag) {
    return new NextResponse(null, { status: 304, headers });
  }
  return new NextResponse(JSON.stringify(profile), { status: 200, headers });
}
