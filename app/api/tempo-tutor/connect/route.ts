import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  createUserSupabaseClient,
  getIntegrationStatus,
} from "@/lib/tempo-tutor/integrations";
import { connectRequestSchema, getBearerToken } from "@/lib/tempo-tutor/requests";

export async function POST(request: Request) {
  const integrationStatus = getIntegrationStatus();
  if (!integrationStatus.supabase || !integrationStatus.stripe) {
    return NextResponse.json({ error: "Stripe Connect is not configured." }, { status: 503 });
  }

  const token = getBearerToken(request);
  if (!token) {
    return NextResponse.json({ error: "Authentication is required." }, { status: 401 });
  }

  const parsed = connectRequestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid locale." }, { status: 400 });
  }

  const supabase = createUserSupabaseClient(token);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Your login session is no longer valid." }, { status: 401 });
  }

  const { data: teacher } = await supabase
    .from("tempo_teachers")
    .select("id, stripe_account_id")
    .eq("user_id", user.id)
    .single();
  if (!teacher) {
    return NextResponse.json({ error: "Only registered teachers can start payouts onboarding." }, { status: 403 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }
  const stripe = new Stripe(stripeKey);
  const accountId =
    teacher.stripe_account_id ??
    (
      await stripe.accounts.create({
        type: "express",
        country: "CH",
        email: user.email ?? undefined,
        capabilities: { transfers: { requested: true } },
        metadata: { teacher_id: teacher.id },
      })
    ).id;

  if (!teacher.stripe_account_id) {
    await supabase
      .from("tempo_teachers")
      .update({ stripe_account_id: accountId })
      .eq("id", teacher.id);
  }

  const origin = new URL(request.url).origin;
  const link = await stripe.accountLinks.create({
    account: accountId,
    type: "account_onboarding",
    refresh_url: `${origin}/${parsed.data.locale}/labs/tempo-tutor?connect=refresh`,
    return_url: `${origin}/${parsed.data.locale}/labs/tempo-tutor?connect=complete`,
  });

  return NextResponse.json({ url: link.url });
}
