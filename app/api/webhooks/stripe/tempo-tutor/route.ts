import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  createServiceSupabaseClient,
  getIntegrationStatus,
} from "@/lib/tempo-tutor/integrations";

export async function POST(request: Request) {
  const integrationStatus = getIntegrationStatus();
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!integrationStatus.supabase || !stripeKey || !webhookSecret) {
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const payload = await request.text();
  const stripe = new Stripe(stripeKey);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.expired") {
    return NextResponse.json({ received: true, handled: false });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const supabase = createServiceSupabaseClient();
  const payloadHash = createHash("sha256").update(payload).digest("hex");
  const { data: processed, error } = await supabase.rpc("tempo_process_checkout_event", {
    p_event_id: event.id,
    p_event_type: event.type,
    p_payload_hash: payloadHash,
    p_session_id: session.id,
    p_payment_intent: typeof session.payment_intent === "string" ? session.payment_intent : null,
    p_booking_status: event.type === "checkout.session.completed" ? "paid" : "cancelled",
  });

  if (error) {
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true, processed: Boolean(processed) });
}
