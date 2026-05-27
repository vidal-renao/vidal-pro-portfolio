import { z } from "zod";

export const localeSchema = z.enum(["en", "de", "es"]);

export const checkoutRequestSchema = z.object({
  slotId: z.string().uuid(),
  locale: localeSchema,
});

export const connectRequestSchema = z.object({
  locale: localeSchema,
});

export function getBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return null;
  }
  return header.slice(7).trim() || null;
}
