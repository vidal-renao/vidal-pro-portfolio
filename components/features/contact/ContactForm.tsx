"use client";
import { useState, type FormEvent } from "react";
import { Check } from "@/components/ui/icons";

export interface ContactFormLabels {
  title: string; name: string; namePh: string; email: string; emailPh: string; subject: string; subjectPh: string;
  message: string; messagePh: string; submit: string; submitting: string; successTitle: string; successMsg: string; another: string; error: string;
}

/** Posts to /api/contact (validated and rate-limited server-side); `_honey` is the bot trap. */
export function ContactForm({ labels, fallbackEmail }: { labels: ContactFormLabels; fallbackEmail: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const field = "h-11 w-full rounded-xl border border-line bg-bg px-3.5 text-sm text-ink placeholder:text-dim focus:border-accent/50 focus:outline-none";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, _honey: data._honey ?? "" }) });
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
        <p className="text-sm text-muted">{labels.successMsg}</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-2 text-sm font-semibold text-accent hover:underline">{labels.another}</button>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-5 sm:p-6">
      <p className="text-sm font-semibold text-ink">{labels.title}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs text-muted">{labels.name}<input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder={labels.namePh} className={field} /></label>
        <label className="flex flex-col gap-1.5 text-xs text-muted">{labels.email}<input name="email" type="email" required autoComplete="email" placeholder={labels.emailPh} className={field} /></label>
      </div>
      <label className="flex flex-col gap-1.5 text-xs text-muted">{labels.subject}<input name="subject" maxLength={150} placeholder={labels.subjectPh} className={field} /></label>
      <label className="flex flex-col gap-1.5 text-xs text-muted">{labels.message}<textarea name="message" required minLength={10} maxLength={2000} rows={5} placeholder={labels.messagePh} className={`${field} h-auto py-3`} /></label>
      <input name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" defaultValue="" />
      {status === "error" && <p role="alert" className="text-sm text-rose-300">{labels.error} <a className="underline" href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a></p>}
      <button type="submit" disabled={status === "submitting"} className="h-11 rounded-full bg-accent text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong disabled:opacity-60">
        {status === "submitting" ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
