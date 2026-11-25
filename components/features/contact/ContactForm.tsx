"use client";
import { useEffect, useState, type FormEvent } from "react";
import { CONTACT_INTENT_EVENT, type ContactIntent, type ServiceId } from "@/components/features/contact/ContactIntentLink";
import { ArrowUpRight, Check, Mail } from "@/components/ui/icons";

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
  const field = "form-field h-12 w-full rounded-xl border border-line-strong bg-bg/70 px-4 text-base font-normal text-ink placeholder:text-dim focus:outline-none";
  const label = "flex flex-col gap-2 text-sm font-semibold text-ink";

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
        <p className="text-base leading-relaxed text-muted">{labels.successMsg}</p>

        <p className="mt-1 text-base leading-relaxed text-muted">{labels.successClosing}<br />VIDAL ECOSYSTEM</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-2 text-sm font-semibold text-accent hover:underline">{labels.another}</button>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} action={FORMSPREE_ENDPOINT} method="POST" className="relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-line-strong bg-raised p-5 shadow-[0_24px_70px_-30px_rgba(79,70,229,0.55)] sm:p-8">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sw via-sw-2 to-sys" />
      <p className="flex items-center gap-3 text-xl font-bold text-ink"><span aria-hidden="true" className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-sw/30 bg-sw/10 text-sw-soft"><Mail size={20} /></span>{labels.title}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>{labels.name}<input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder={labels.namePh} className={field} /></label>
        <label className={label}>{labels.email}<input name="email" type="email" required autoComplete="email" placeholder={labels.emailPh} className={field} /></label>
      </div>
      <label className={label}>{labels.purposeLabel}
        <select data-testid="contact-purpose" name="contact_purpose" value={purpose} onChange={(e) => { const value = e.target.value; if (value === "business" || value === "career" || value === "general") { setPurpose(value); if (value !== "business") setService(""); } }} className={field}>
          <option value="general">{labels.purposeGeneral}</option>
          <option value="business">{labels.purposeBusiness}</option>
          <option value="career">{labels.purposeCareer}</option>
        </select>
      </label>
      {purpose === "business" && <label className={label}>{labels.serviceLabel}
        <select data-testid="contact-service" name="contact_service" value={service} onChange={(e) => { const value = e.target.value; if (value === "" || value === "web" || value === "ai" || value === "it") setService(value); }} className={field}>
          <option value="">{labels.serviceNone}</option>
          <option value="web">{labels.serviceWeb}</option>
          <option value="ai">{labels.serviceAi}</option>
          <option value="it">{labels.serviceIt}</option>
        </select>
      </label>}
      <label className={label}>{labels.subject}<input name="subject" maxLength={150} placeholder={labels.subjectPh} className={field} /></label>
      <label className={label}>{labels.message}<textarea name="message" required minLength={10} maxLength={2000} rows={5} placeholder={labels.messagePh} className={`${field} !h-auto py-3`} /></label>
      <input name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" defaultValue="" />
      <p className="text-sm leading-relaxed text-muted">{labels.privacyNotice}</p>
      {status === "error" && <p role="alert" className="text-base leading-relaxed text-rose-300">{labels.error} <a className="underline" href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a></p>}
      <button type="submit" disabled={status === "submitting"} className="cta-sw flex min-h-13 items-center justify-center gap-2 rounded-xl px-6 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
        {status === "submitting" ? labels.submitting : labels.submit}<ArrowUpRight size={18} />
      </button>
    </form>
  );
}
