"use client";
import { useEffect, useState, type FormEvent } from "react";
import { CONTACT_INTENT_EVENT, type ContactIntent, type ServiceId } from "@/components/features/contact/ContactIntentLink";
import { Check } from "@/components/ui/icons";

/** Public Formspree submission endpoint. No API key or private token is exposed. */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xbggnyab";

export interface ContactFormLabels {
  title: string; name: string; namePh: string; email: string; emailPh: string; subject: string; subjectPh: string;
  purposeLabel: string; purposeBusiness: string; purposeCareer: string; purposeGeneral: string; serviceLabel: string; serviceNone: string; serviceWeb: string; serviceAi: string; serviceIt: string;
  message: string; messagePh: string; submit: string; submitting: string; successTitle: string; successMsg: string; successEmail: string; successClosing: string; another: string; error: string; privacyNotice: string;
}

/** Submits to Formspree via its documented AJAX endpoint; `_gotcha` is its native spam trap. */
export function ContactForm({ labels, fallbackEmail }: { labels: ContactFormLabels; fallbackEmail: string }) {
  const [purpose, setPurpose] = useState<"business" | "career" | "general">("general");
  const [service, setService] = useState<"" | ServiceId>("");
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<Partial<ContactIntent>>).detail;
      if (detail?.purpose === "career") {
        setPurpose("career");
        setService("");
      } else if (detail?.purpose === "business") {
        setPurpose("business");
        const value = detail.service;
        setService(value === "web" || value === "ai" || value === "it" ? value : "");
      }
    };
    window.addEventListener(CONTACT_INTENT_EVENT, handler);
    return () => window.removeEventListener(CONTACT_INTENT_EVENT, handler);
  }, []);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const field = "h-11 w-full rounded-xl border border-line bg-bg px-3.5 text-sm text-ink placeholder:text-dim focus:border-accent/50 focus:outline-none";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    // Formspree uses the subject field for the notification email heading.
    const visitorSubject = String(data.get("subject") ?? "").trim();
    data.set("subject", `VIDAL ECOSYSTEM | ${visitorSubject || "Portfolio contact"}`);
    data.set("source", "Portfolio Premium 2.0");
    data.set("contact_purpose", purpose);
    if (purpose === "business" && service) data.set("contact_service", service);
    else data.delete("contact_service");
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-raised p-6" role="status">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent"><Check /></span>
        <p className="text-lg font-semibold text-ink">{labels.successTitle}</p>
        <p className="text-sm leading-relaxed text-muted">{labels.successMsg}</p>

        <p className="mt-1 text-sm leading-relaxed text-muted">{labels.successClosing}<br />VIDAL ECOSYSTEM</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-2 text-sm font-semibold text-accent hover:underline">{labels.another}</button>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} action={FORMSPREE_ENDPOINT} method="POST" className="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-5 sm:p-6">
      <p className="text-sm font-semibold text-ink">{labels.title}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs text-muted">{labels.name}<input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder={labels.namePh} className={field} /></label>
        <label className="flex flex-col gap-1.5 text-xs text-muted">{labels.email}<input name="email" type="email" required autoComplete="email" placeholder={labels.emailPh} className={field} /></label>
      </div>
      <label className="flex flex-col gap-1.5 text-xs text-muted">{labels.purposeLabel}
        <select data-testid="contact-purpose" name="contact_purpose" value={purpose} onChange={(e) => { const value = e.target.value; if (value === "business" || value === "career" || value === "general") { setPurpose(value); if (value !== "business") setService(""); } }} className={field}>
          <option value="general">{labels.purposeGeneral}</option>
          <option value="business">{labels.purposeBusiness}</option>
          <option value="career">{labels.purposeCareer}</option>
        </select>
      </label>
      {purpose === "business" && <label className="flex flex-col gap-1.5 text-xs text-muted">{labels.serviceLabel}
        <select data-testid="contact-service" name="contact_service" value={service} onChange={(e) => { const value = e.target.value; if (value === "" || value === "web" || value === "ai" || value === "it") setService(value); }} className={field}>
          <option value="">{labels.serviceNone}</option>
          <option value="web">{labels.serviceWeb}</option>
          <option value="ai">{labels.serviceAi}</option>
          <option value="it">{labels.serviceIt}</option>
        </select>
      </label>}
      <label className="flex flex-col gap-1.5 text-xs text-muted">{labels.subject}<input name="subject" maxLength={150} placeholder={labels.subjectPh} className={field} /></label>
      <label className="flex flex-col gap-1.5 text-xs text-muted">{labels.message}<textarea name="message" required minLength={10} maxLength={2000} rows={5} placeholder={labels.messagePh} className={`${field} h-auto py-3`} /></label>
      <input name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" defaultValue="" />
      <p className="text-xs leading-relaxed text-muted">{labels.privacyNotice}</p>
      {status === "error" && <p role="alert" className="text-sm text-rose-300">{labels.error} <a className="underline" href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a></p>}
      <button type="submit" disabled={status === "submitting"} className="h-11 rounded-full bg-accent text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong disabled:opacity-60">
        {status === "submitting" ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
