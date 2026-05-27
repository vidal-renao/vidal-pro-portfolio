import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface TempoTutorIntegrationStatus {
  supabase: boolean;
  stripe: boolean;
  webhook: boolean;
}

export function getIntegrationStatus(): TempoTutorIntegrationStatus {
  return {
    supabase: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
        process.env.SUPABASE_SERVICE_ROLE_KEY,
    ),
    stripe: Boolean(process.env.STRIPE_SECRET_KEY),
    webhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
  };
}

function requireVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function createUserSupabaseClient(accessToken: string): SupabaseClient {
  return createClient(
    requireVariable("NEXT_PUBLIC_SUPABASE_URL"),
    requireVariable("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

export function createServiceSupabaseClient(): SupabaseClient {
  return createClient(
    requireVariable("NEXT_PUBLIC_SUPABASE_URL"),
    requireVariable("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
