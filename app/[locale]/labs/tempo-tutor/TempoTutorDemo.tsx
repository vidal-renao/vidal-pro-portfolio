"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { lessonSlots, type LessonSlot } from "@/lib/tempo-tutor/catalog";
import type { TempoTutorIntegrationStatus } from "@/lib/tempo-tutor/integrations";

interface TempoTutorDemoProps {
  locale: "en" | "de" | "es";
  integrationStatus: TempoTutorIntegrationStatus;
  checkoutResult?: string;
  connectResult?: string;
}

interface CheckoutResponse {
  url?: string;
  error?: string;
}

type UiMessage = { tone: "success" | "info" | "error"; text: string } | null;

function createBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return null;
  }
  return createClient(url, anonKey);
}

export default function TempoTutorDemo({
  locale,
  integrationStatus,
  checkoutResult,
  connectResult,
}: TempoTutorDemoProps) {
  const t = useTranslations("tempoTutorLab");
  const [selectedSlot, setSelectedSlot] = useState<LessonSlot>(lessonSlots[0]);
  const [supabase] = useState<SupabaseClient | null>(() => createBrowserClient());
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<UiMessage>(null);
  const dateLocale = locale === "de" ? "de-CH" : locale === "es" ? "es-ES" : "en-GB";

  useEffect(() => {
    if (!supabase) {
      return;
    }
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  const outcomeMessage = useMemo<UiMessage>(() => {
    if (checkoutResult === "success") {
      return { tone: "success", text: t("checkoutSuccess") };
    }
    if (checkoutResult === "cancelled") {
      return { tone: "info", text: t("checkoutCancelled") };
    }
    if (connectResult === "complete") {
      return { tone: "success", text: t("connectComplete") };
    }
    return null;
  }, [checkoutResult, connectResult, t]);

  const visibleMessage = message ?? outcomeMessage;

  function formatLessonDate(startsAt: string): string {
    return new Intl.DateTimeFormat(dateLocale, {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(startsAt));
  }

  async function signIn() {
    if (!supabase) {
      setMessage({ tone: "info", text: t("setupAuth") });
      return;
    }
    if (!email.includes("@")) {
      setMessage({ tone: "error", text: t("emailRequired") });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href },
    });
    setBusy(false);
    setMessage({
      tone: error ? "error" : "success",
      text: error ? error.message : t("magicLinkSent"),
    });
  }

  async function signOut() {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setMessage({ tone: "info", text: t("signedOut") });
  }

  async function reserveLesson() {
    if (!integrationStatus.supabase || !integrationStatus.stripe || !session) {
      setMessage({ tone: "info", text: t("previewReady") });
      return;
    }
    setBusy(true);
    const response = await fetch("/api/tempo-tutor/checkout", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ slotId: selectedSlot.id, locale }),
    });
    const result = (await response.json()) as CheckoutResponse;
    setBusy(false);
    if (!response.ok || !result.url) {
      setMessage({ tone: "error", text: result.error ?? t("checkoutError") });
      return;
    }
    window.location.assign(result.url);
  }

  async function startTeacherPayouts() {
    if (!session || !integrationStatus.supabase || !integrationStatus.stripe) {
      setMessage({ tone: "info", text: t("teacherSetupInfo") });
      return;
    }
    setBusy(true);
    const response = await fetch("/api/tempo-tutor/connect", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ locale }),
    });
    const result = (await response.json()) as CheckoutResponse;
    setBusy(false);
    if (!response.ok || !result.url) {
      setMessage({ tone: "error", text: result.error ?? t("connectError") });
      return;
    }
    window.location.assign(result.url);
  }

  return (
    <main className="min-h-screen bg-[#060606] pb-20 pt-28 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <a href={`/${locale}#projects`} className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
          <span aria-hidden="true">&larr;</span> {t("back")}
        </a>

        <section className="relative mb-10 overflow-hidden rounded-[32px] border border-fuchsia-400/20 bg-[linear-gradient(125deg,rgba(31,14,46,0.96),rgba(16,27,46,0.94))] p-7 md:p-11">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <span className="mb-5 inline-flex rounded-full border border-fuchsia-300/25 bg-fuchsia-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                {t("badge")}
              </span>
              <h1 className="mb-5 text-5xl font-bold tracking-tight md:text-7xl">
                Tempo<span className="text-fuchsia-300">Tutor</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/66 md:text-lg">{t("subtitle")}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Next.js 16", "TypeScript", "Supabase RLS", "Stripe Checkout", "Stripe Connect", "Playwright"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/68">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/48">{t("integrationTitle")}</p>
              <Status label={t("supabaseAuth")} active={integrationStatus.supabase} activeLabel={t("configured")} inactiveLabel={t("demoMode")} />
              <Status label={t("stripeCheckout")} active={integrationStatus.stripe} activeLabel={t("configured")} inactiveLabel={t("demoMode")} />
              <Status label={t("webhookIdempotency")} active={integrationStatus.webhook} activeLabel={t("configured")} inactiveLabel={t("setupRequired")} />
              <p className="mt-5 rounded-xl border border-amber-300/15 bg-amber-300/[0.07] p-3 text-xs leading-6 text-amber-100/72">
                {t("demoNotice")}
              </p>
            </div>
          </div>
        </section>

        {visibleMessage && (
          <div
            role="status"
            data-testid="flow-message"
            className={`mb-8 rounded-2xl border px-5 py-4 text-sm ${
              visibleMessage.tone === "success"
                ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                : visibleMessage.tone === "error"
                  ? "border-rose-400/25 bg-rose-400/10 text-rose-100"
                  : "border-blue-400/25 bg-blue-400/10 text-blue-100"
            }`}
          >
            {visibleMessage.text}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
            <div className="mb-6 flex items-end justify-between gap-3">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-300">{t("marketplaceLabel")}</p>
                <h2 className="text-2xl font-semibold">{t("chooseTeacher")}</h2>
              </div>
              <span className="text-xs text-white/40">{t("seededProfiles")}</span>
            </div>
            <div className="space-y-4">
              {lessonSlots.map((slot) => {
                const isSelected = selectedSlot.id === slot.id;
                return (
                  <button
                    type="button"
                    key={slot.id}
                    data-testid={`slot-${slot.instrument}`}
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full rounded-2xl border p-5 text-left transition-all ${
                      isSelected
                        ? "border-fuchsia-300/50 bg-fuchsia-300/[0.10]"
                        : "border-white/[0.08] bg-white/[0.025] hover:border-white/20"
                    }`}
                  >
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold">{slot.teacherName}</p>
                        <p className="text-sm text-white/52">
                          {t(`instruments.${slot.instrument}`)} - {slot.city}
                        </p>
                      </div>
                      <span className="rounded-full bg-white/[0.06] px-3 py-1 text-sm font-semibold">
                        CHF {slot.priceChf}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-white/62">
                      <span className="rounded-full border border-white/10 px-3 py-1">{formatLessonDate(slot.startsAt)}</span>
                      <span className="rounded-full border border-white/10 px-3 py-1">{slot.durationMinutes} min</span>
                      <span className="rounded-full border border-white/10 px-3 py-1">{t(`levels.${slot.level}`)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-300">{t("bookingLabel")}</p>
              <h2 className="mb-5 text-xl font-semibold">{t("bookingSummary")}</h2>
              <div data-testid="booking-summary" className="mb-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="font-semibold">{selectedSlot.teacherName}</p>
                <p className="mt-1 text-sm text-white/55">{t(`instruments.${selectedSlot.instrument}`)} - {formatLessonDate(selectedSlot.startsAt)}</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm text-white/55">{t("total")}</span>
                  <span className="text-lg font-semibold">CHF {selectedSlot.priceChf}</span>
                </div>
              </div>
              <button
                type="button"
                data-testid="reserve-button"
                onClick={() => void reserveLesson()}
                disabled={busy}
                className="w-full rounded-xl bg-fuchsia-400 px-4 py-3.5 text-sm font-bold text-[#170d21] transition-colors hover:bg-fuchsia-300 disabled:opacity-50"
              >
                {busy ? t("processing") : session && integrationStatus.stripe ? t("payWithStripe") : t("previewReservation")}
              </button>
              <p className="mt-4 text-xs leading-6 text-white/45">{t("paymentDisclosure")}</p>
            </section>

            <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">{t("accountLabel")}</p>
              <h2 className="mb-4 text-lg font-semibold">{t("authTitle")}</h2>
              {session ? (
                <>
                  <p className="mb-4 text-sm text-white/62">{t("signedInAs")} <strong className="text-white">{session.user.email}</strong></p>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => void signOut()} className="rounded-xl border border-white/12 px-4 py-2.5 text-xs font-semibold text-white/70 hover:text-white">
                      {t("signOut")}
                    </button>
                    <button type="button" onClick={() => void startTeacherPayouts()} className="rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-2.5 text-xs font-semibold text-cyan-100">
                      {t("teacherPayouts")}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="mb-3 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-cyan-300/50"
                  />
                  <button type="button" onClick={() => void signIn()} disabled={busy} className="w-full rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 disabled:opacity-50">
                    {t("sendMagicLink")}
                  </button>
                </>
              )}
            </section>
          </aside>
        </div>

        <section className="mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">{t("architectureLabel")}</p>
          <h2 className="mb-7 text-2xl font-semibold">{t("architectureTitle")}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {(["auth", "payments", "webhooks", "testing"] as const).map((item) => (
              <div key={item} className="rounded-2xl border border-white/[0.08] bg-black/20 p-5">
                <p className="mb-2 font-semibold">{t(`architecture.${item}.title`)}</p>
                <p className="text-sm leading-6 text-white/50">{t(`architecture.${item}.text`)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Status({
  label,
  active,
  activeLabel,
  inactiveLabel,
}: {
  label: string;
  active: boolean;
  activeLabel: string;
  inactiveLabel: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] px-3 py-3 text-sm">
      <span className="text-white/66">{label}</span>
      <span className={active ? "text-emerald-300" : "text-amber-200/80"}>
        {active ? activeLabel : inactiveLabel}
      </span>
    </div>
  );
}
