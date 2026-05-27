import { NextResponse } from "next/server";
import Stripe from "stripe";
import { findLessonSlot } from "@/lib/tempo-tutor/catalog";
import {
  createUserSupabaseClient,
  getIntegrationStatus,
} from "@/lib/tempo-tutor/integrations";
import { checkoutRequestSchema, getBearerToken } from "@/lib/tempo-tutor/requests";

export async function POST(request: Request) {
  const integrationStatus = getIntegrationStatus();
  if (!integrationStatus.supabase || !integrationStatus.stripe) {
    return NextResponse.json(
      { error: "Stripe Test Checkout requires configured Supabase and Stripe environment variables." },
      { status: 503 },
    );
  }

  const token = getBearerToken(request);
  if (!token) {
    return NextResponse.json({ error: "Authentication is required before booking." }, { status: 401 });
  }

  const parsed = checkoutRequestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lesson selection." }, { status: 400 });
  }

  const slot = findLessonSlot(parsed.data.slotId);
  if (!slot) {
    return NextResponse.json({ error: "Lesson slot was not found." }, { status: 404 });
  }

  const supabase = createUserSupabaseClient(token);
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return NextResponse.json({ error: "Your login session is no longer valid." }, { status: 401 });
  }

  const { data: booking, error: bookingError } = await supabase
    .from("tempo_bookings")
    .insert({
      student_id: user.id,
      teacher_id: slot.teacherId,
      slot_id: slot.id,
      amount_chf: slot.priceChf,
      status: "pending_payment",
    })
    .select("id")
    .single();

  if (bookingError || !booking) {
    return NextResponse.json(
      { error: "The booking could not be created. Confirm that the Supabase migration is applied." },
      { status: 500 },
    );
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }

  const stripe = new Stripe(stripeKey);
  const origin = new URL(request.url).origin;
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email ?? undefined,
      expires_at: Math.floor(Date.now() / 1000) + 31 * 60,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "chf",
            unit_amount: slot.priceChf * 100,
            product_data: {
              name: `${slot.instrument} lesson with ${slot.teacherName}`,
              description: `${slot.durationMinutes} min - ${slot.city}`,
            },
          },
        },
      ],
      metadata: {
        booking_id: booking.id,
        slot_id: slot.id,
        teacher_id: slot.teacherId,
        student_id: user.id,
      },
      success_url: `${origin}/${parsed.data.locale}/labs/tempo-tutor?checkout=success`,
      cancel_url: `${origin}/${parsed.data.locale}/labs/tempo-tutor?checkout=cancelled`,
    });
  } catch {
    await supabase
      .from("tempo_bookings")
      .update({ status: "cancelled" })
      .eq("id", booking.id)
      .eq("status", "pending_payment");
    return NextResponse.json({ error: "Stripe Checkout could not be initialized." }, { status: 502 });
  }

  const { error: sessionError } = await supabase
    .from("tempo_bookings")
    .update({ stripe_checkout_session_id: session.id })
    .eq("id", booking.id);

  if (sessionError || !session.url) {
    return NextResponse.json({ error: "Checkout initialization failed." }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
