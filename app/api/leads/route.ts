import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

async function sendWhatsAppNotification(lead: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  sector: string;
  selectedOptions?: string[];
  locale: string;
}) {
  const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
  const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const NOTIFICATION_NUMBER = process.env.WHATSAPP_NOTIFICATION_NUMBER;

  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID || !NOTIFICATION_NUMBER) {
    console.warn('WhatsApp env vars missing, skipping notification');
    return { sent: false, reason: 'missing_env_vars' };
  }

  try {
    const message =
      `🚀 *Nuevo Lead - Portfolio*\n\n` +
      `*Nombre:* ${lead.name}\n` +
      `*Email:* ${lead.email}\n` +
      (lead.phone ? `*Teléfono:* ${lead.phone}\n` : '') +
      (lead.company ? `*Empresa:* ${lead.company}\n` : '') +
      `*Sector:* ${lead.sector}\n` +
      (lead.selectedOptions?.length ? `*Necesidades:* ${lead.selectedOptions.join(', ')}\n` : '') +
      `*Idioma:* ${lead.locale.toUpperCase()}`;

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: NOTIFICATION_NUMBER,
          type: 'text',
          text: { body: message },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('WhatsApp API error:', data);
      return { sent: false, reason: data.error?.message || 'unknown_error' };
    }

    return { sent: true, messageId: data.messages?.[0]?.id };
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return { sent: false, reason: 'exception' };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, sector, selectedOptions, locale, message } = body;

    if (!name || !email || !sector) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, sector' },
        { status: 400 }
      );
    }

    const { data: lead, error: dbError } = await supabase
      .from('portfolio_leads')
      .insert([{
        name,
        email,
        phone: phone || null,
        company: company || null,
        sector,
        selected_options: selectedOptions || [],
        locale: locale || 'en',
        message: message || null,
        status: 'new',
        source: 'consultation_form',
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
    }

    let emailSent = false;
    try {
      const optionsHtml = (selectedOptions as string[] | undefined)?.length
        ? `<div style="margin-top:16px;padding-top:16px;border-top:1px solid #e0e0e0;">
            <p style="margin:0 0 8px;color:#666;font-size:14px;">Selected Challenges:</p>
            <div>${(selectedOptions as string[]).map((opt) =>
              `<span style="display:inline-block;background:#e8f0fe;color:#2563eb;padding:4px 10px;border-radius:20px;font-size:12px;margin:2px;">${opt}</span>`
            ).join('')}</div>
           </div>`
        : '';

      const phoneRow = phone
        ? `<tr><td style="padding:8px 0;color:#666;font-size:14px;width:140px;">Phone</td>
             <td style="padding:8px 0;font-size:14px;"><a href="tel:${phone}" style="color:#2563eb;">${phone}</a></td></tr>`
        : '';

      const companyRow = company
        ? `<tr><td style="padding:8px 0;color:#666;font-size:14px;">Company</td>
             <td style="padding:8px 0;font-size:14px;">${company}</td></tr>`
        : '';

      const waButton = phone
        ? `<a href="https://wa.me/${String(phone).replace(/\D/g, '')}"
             style="background:#25d366;color:white;padding:8px 16px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:bold;display:inline-block;">
             Open WhatsApp</a>`
        : '';

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.NOTIFICATION_EMAIL!,
        subject: `🚀 New Lead: ${name} — ${sector} (${String(locale).toUpperCase()})`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
            <div style="background:#1a2744;color:white;padding:20px 24px;border-radius:12px 12px 0 0;">
              <h1 style="margin:0;font-size:20px;">🚀 New Portfolio Lead</h1>
              <p style="margin:4px 0 0;opacity:0.7;font-size:14px;">
                Received: ${new Date().toLocaleString('de-CH', { timeZone: 'Europe/Zurich' })} CET
              </p>
            </div>
            <div style="background:#f8f9fa;padding:24px;border:1px solid #e0e0e0;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:8px 0;color:#666;font-size:14px;width:140px;">Name</td>
                  <td style="padding:8px 0;font-weight:bold;font-size:14px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#666;font-size:14px;">Email</td>
                  <td style="padding:8px 0;font-size:14px;">
                    <a href="mailto:${email}" style="color:#2563eb;">${email}</a>
                  </td>
                </tr>
                ${phoneRow}
                ${companyRow}
                <tr>
                  <td style="padding:8px 0;color:#666;font-size:14px;">Sector</td>
                  <td style="padding:8px 0;font-size:14px;">
                    <span style="background:#2563eb;color:white;padding:2px 10px;border-radius:20px;font-size:12px;font-weight:bold;">
                      ${sector}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#666;font-size:14px;">Language</td>
                  <td style="padding:8px 0;font-size:14px;">${String(locale).toUpperCase()}</td>
                </tr>
              </table>
              ${optionsHtml}
              ${message ? `<div style="margin-top:16px;padding-top:16px;border-top:1px solid #e0e0e0;">
                <p style="margin:0 0 8px;color:#666;font-size:14px;">Message:</p>
                <p style="margin:0;font-size:14px;line-height:1.6;">${message}</p>
              </div>` : ''}
            </div>
            <div style="background:#1a2744;color:white;padding:16px 24px;border-radius:0 0 12px 12px;">
              <p style="margin:0 0 12px;font-size:13px;opacity:0.7;">
                Lead ID: ${lead.id} · Source: Portfolio Consultation Form
              </p>
              <a href="mailto:${email}"
                 style="background:#2563eb;color:white;padding:8px 16px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:bold;display:inline-block;margin-right:8px;">
                Reply by Email
              </a>
              ${waButton}
            </div>
          </div>
        `,
      });
      emailSent = true;

      await supabase
        .from('portfolio_leads')
        .update({ email_sent: true })
        .eq('id', lead.id);

    } catch (emailError) {
      console.error('Resend error:', emailError);
    }

    const whatsappResult = await sendWhatsAppNotification({
      name, email, phone, company, sector, selectedOptions, locale,
    });

    if (whatsappResult.sent) {
      await supabase
        .from('portfolio_leads')
        .update({ whatsapp_sent: true })
        .eq('id', lead.id);
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      emailSent,
      whatsappSent: whatsappResult.sent,
      whatsappReason: whatsappResult.sent ? undefined : whatsappResult.reason,
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
