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
  /** Replaces the default button look; `children` then replaces the default content. */
  className?: string;
  children?: React.ReactNode;
}

/** The event carries only fixed identifiers (purpose, service), never personal information. */
export function ContactIntentLink({ intent, label, testId = "service-contact-cta", className, children }: Props) {
  return (
    <a data-testid={testId} href="#contact"
      onClick={() => window.dispatchEvent(new CustomEvent<ContactIntent>(CONTACT_INTENT_EVENT, { detail: intent }))}
      className={className ?? `inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${intent.service === "it" || intent.purpose === "career" ? "cta-sys text-sys-ink" : "cta-sw text-white"}`}>
      {children ?? <>{label}<span aria-hidden="true">→</span></>}
    </a>
  );
}
