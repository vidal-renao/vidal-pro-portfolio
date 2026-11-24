import { routing } from "@/i18n/routing";
import { renderSocialImage, SOCIAL_IMAGE_ALT, SOCIAL_IMAGE_SIZE } from "@/lib/og/socialImage";

export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

/** Prerendered once per locale at build time. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  return renderSocialImage(params);
}
