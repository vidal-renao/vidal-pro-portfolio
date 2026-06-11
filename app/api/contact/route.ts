import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

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
  _honey: z.string().max(0, "Bot detected"),
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
  const to = process.env.CONTACT_TO ?? "vidalrenao.lab@outlook.com";
  const from = process.env.SMTP_USER ?? "noreply@vidalrenao.dev";

  const subject = data.subject
    ? `[Portfolio] ${data.subject}`
    : `[Portfolio] New message from ${data.name}`;

  const text = `
Name: ${data.name}
Email: ${data.email}
${data.subject ? `Subject: ${data.subject}\n` : ""}
Message:
${data.message}
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#0f0f0f;color:#e5e5e5;padding:32px;max-width:600px;margin:0 auto">
  <div style="border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#1e3a5f,#111827);padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06)">
      <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4)">Portfolio Contact</p>
      <h2 style="margin:6px 0 0;font-size:18px;color:#fff">New message from ${data.name}</h2>
    </div>
    <div style="padding:24px 28px;background:#141414">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4);width:72px">From</td><td style="color:#e5e5e5">${data.name}</td></tr>
        <tr><td style="padding:6px 0;color:rgba(255,255,255,0.4)">Email</td><td><a href="mailto:${data.email}" style="color:#60a5fa;text-decoration:none">${data.email}</a></td></tr>
        ${data.subject ? `<tr><td style="padding:6px 0;color:rgba(255,255,255,0.4)">Subject</td><td style="color:#e5e5e5">${data.subject}</td></tr>` : ""}
      </table>
      <div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px">
        <p style="margin:0;font-size:13px;line-height:1.7;color:rgba(255,255,255,0.7);white-space:pre-wrap">${data.message}</p>
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

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json({ error: firstError?.message ?? "Validation failed" }, { status: 422 });
  }

  const data = parsed.data;

  // Honeypot — return 200 to fool bots but don't send
  if (data._honey.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("[contact] SMTP env vars not configured — skipping send");
    return NextResponse.json({ ok: true });
  }

  try {
    const transport = buildTransport();
    await transport.sendMail(buildMailOptions(data));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Send error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please email directly." },
      { status: 500 }
    );
  }
}
