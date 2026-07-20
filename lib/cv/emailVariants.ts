export type EmailVariant = "outlook" | "gmx";

export const EMAIL_ADDRESSES: Record<EmailVariant, string> = {
  outlook: "vidalrenao.lab@outlook.com",
  gmx: "vidal-31@gmx.ch",
};

export const DEFAULT_EMAIL_VARIANT: EmailVariant = "outlook";

export function resolveEmailVariant(value: string | undefined | null): EmailVariant {
  return value === "gmx" ? "gmx" : DEFAULT_EMAIL_VARIANT;
}
