"use client";

export type ServiceId = "web" | "ai" | "it";
export type ContactPurpose = "business" | "career";
export const CONTACT_INTENT_EVENT = "vidal:contact-intent";

export interface ContactIntent {
  purpose: ContactPurpose;
  /** Only for business inquiries. */
  service?: ServiceId;
}

interface Props {
  intent: ContactIntent;
  label: string;
  testId?: string;
}

/** The event carries only fixed identifiers (purpose, service), never personal information. */
export function ContactIntentLink({ intent, label, testId = "service-contact-cta" }: Props) {
  return (
    <a data-testid={testId} href="#contact"
      onClick={() => window.dispatchEvent(new CustomEvent<ContactIntent>(CONTACT_INTENT_EVENT, { detail: intent }))}
      className="inline-flex min-h-11 items-center rounded-full border border-accent/50 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
      {label}
    </a>
  );
}
