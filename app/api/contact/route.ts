import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { escapeHtml } from "@/lib/contact/escapeHtml";

// ── Rate limiting — in-memory per-IP (resets on cold start) ──────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

// ── Zod schema ────────────────────────────────────────────────────────────────

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2).max(150).optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  _honey: z.string().max(200).default(""),
});

type ContactPayload = z.infer<typeof ContactSchema>;

// ── Nodemailer transport ──────────────────────────────────────────────────────

function buildTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function buildMailOptions(data: ContactPayload) {
  const to = process.env.CONTACT_TO ?? process.env.NOTIFICATION_EMAIL ?? "vidalrenao.lab@outlook.com";
  const from = process.env.SMTP_USER ?? "noreply@vidalrenao.dev";

  const subject = (data.subject
    ? `[Portfolio] ${data.subject}`
    : `[Portfolio] New message from ${data.name}`).replace(/[\r\n]+/g, " ");

  const text = `
Name: ${data.name}
Email: ${data.email}
${data.subject ? `Subject: ${data.subject}\n` : ""}
Message:
${data.message}
  `.trim();

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeSubject = escapeHtml(data.subject ?? "");
  const safeMessage = escapeHtml(data.message);

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:32px;max-width:600px;margin:0 auto">
  <div style="border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#1e3a5f,#111827);padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06)">
      <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4)">Portfolio Contact</p>
      <h2 style="margin:6px 0 0;font-size:18px;color:#fff">New message from ${safeName}</h2>
    </div>
    <div style="padding:24px 28px;background:#141414">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4);width:72px">From</td><td style="color:#e5e5e5">${safeName}</td></tr>
        <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4)">Email</td><td><a href="mailto:${safeEmail}" style="color:#60a5fa;text-decoration:none">${safeEmail}</a></td></tr>
        ${data.subject ? `<tr><td style="padding:6px 0;color:rgba(255,255,255,0.4)">Subject</td><td style="color:#e5e5e5">${safeSubject}</td></tr>` : ""}
      </table>
      <div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px">
        <p style="margin:0;font-size:13px;line-height:1.7;color:rgba(255,255,255,0.7);white-space:pre-wrap">${safeMessage}</p>
      </div>
    </div>
    <div style="padding:16px 28px;background:#0f0f0f;border-top:1px solid rgba(255,255,255,0.06)">
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2)">vidal-pro-portfolio.vercel.app · Basel, Switzerland</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { from, to, replyTo: data.email, subject, text, html };
}

/**
 * Resend is the preferred transport when its API key and an explicitly
 * verified sender are configured. Never use onboarding@resend.dev as a
 * production fallback or claim delivery merely because credentials exist.
 */
async function sendWithResend(data: ContactPayload) {
  const key = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM;
  if (!key || !sender) throw new Error("Resend sender not configured");
  const mail = buildMailOptions(data);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [mail.to],
        reply_to: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      }),
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) {
      // Don't log submitted personal data or the provider's response body.
      console.error("[contact] Resend rejected message, status:", response.status);
      throw new Error("Resend rejected outgoing message");
    }
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string") {
      throw new Error("Resend did not confirm acceptance");
    }
  } finally {
    clearTimeout(timeout);
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // JSON only, same-origin browser requests. Do not allow external sites to
  // submit messages using a visitor's browser; the endpoint is still public.
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "Expected application/json" }, { status: 415 });
  }

  const declaredSize = Number(request.headers.get("content-length") ?? 0);
  if (declaredSize > 16384) {
    return NextResponse.json({ error: "Request body too large" }, { status: 413 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 16384) {
      return NextResponse.json({ error: "Request body too large" }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json({ error: firstError?.message ?? "Validation failed" }, { status: 422 });
  }

  const data = parsed.data;

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Honeypot — return 200 to fool bots but don't send
  if (data._honey.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const resendReady = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM);
  const smtpReady = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  if (!resendReady && !smtpReady) {
    console.error("[contact] No configured and verified mail transport — message not sent");
    return NextResponse.json({ error: "Contact service unavailable" }, { status: 503 });
  }

  try {
    if (resendReady) {
      await sendWithResend(data);
    } else {
      const transport = buildTransport();
      await transport.sendMail(buildMailOptions(data));
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Outgoing mail rejected:", err instanceof Error ? err.name : "unknown");
    return NextResponse.json(
      { error: "Failed to send message. Please email directly." },
      { status: 500 }
    );
  }
}
