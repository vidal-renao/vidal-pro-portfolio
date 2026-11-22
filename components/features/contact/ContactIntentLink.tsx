"use client";

export type ServiceId = "web" | "ai" | "it";
export const CONTACT_INTENT_EVENT = "vidal:contact-intent";

/** The event carries only a fixed service identifier, never personal information. */
export function ContactIntentLink({ service, label }: { service: ServiceId; label: string }) {
  return (
    <a data-testid="service-contact-cta" href="#contact"
      onClick={() => window.dispatchEvent(new CustomEvent(CONTACT_INTENT_EVENT, { detail: { service } }))}
      className="inline-flex min-h-11 items-center rounded-full border border-accent/50 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
      {label}
    </a>
  );
}
