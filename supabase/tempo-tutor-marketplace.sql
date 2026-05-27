-- TempoTutor product lab: music lesson marketplace foundation.
-- Apply in Supabase SQL Editor before enabling the live checkout flow.

create extension if not exists pgcrypto;

create table if not exists public.tempo_teachers (
  id uuid primary key,
  user_id uuid unique references auth.users(id) on delete set null,
  display_name text not null,
  instrument text not null check (instrument in ('piano', 'voice', 'guitar')),
  city text not null,
  biography text not null,
  stripe_account_id text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.tempo_slots (
  id uuid primary key,
  teacher_id uuid not null references public.tempo_teachers(id) on delete cascade,
  starts_at timestamptz not null,
  duration_minutes integer not null check (duration_minutes between 30 and 120),
  price_chf integer not null check (price_chf > 0),
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  available boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.tempo_bookings (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete restrict,
  teacher_id uuid not null references public.tempo_teachers(id) on delete restrict,
  slot_id uuid not null references public.tempo_slots(id) on delete restrict,
  status text not null check (status in ('pending_payment', 'paid', 'cancelled', 'completed')),
  amount_chf integer not null check (amount_chf > 0),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text unique,
  created_at timestamptz not null default now(),
  unique (student_id, slot_id)
);

create table if not exists public.tempo_stripe_events (
  event_id text primary key,
  event_type text not null,
  payload_hash text not null,
  received_at timestamptz not null default now()
);

create unique index if not exists tempo_one_active_booking_per_slot
  on public.tempo_bookings (slot_id)
  where status in ('pending_payment', 'paid', 'completed');

alter table public.tempo_teachers enable row level security;
alter table public.tempo_slots enable row level security;
alter table public.tempo_bookings enable row level security;
alter table public.tempo_stripe_events enable row level security;

create policy "tempo_teacher_public_profiles_read"
  on public.tempo_teachers for select using (true);
create policy "tempo_teacher_updates_own_profile"
  on public.tempo_teachers for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "tempo_available_slots_public_read"
  on public.tempo_slots for select using (available = true);
create policy "tempo_teacher_manages_own_slots"
  on public.tempo_slots for all to authenticated
  using (teacher_id in (select id from public.tempo_teachers where user_id = auth.uid()))
  with check (teacher_id in (select id from public.tempo_teachers where user_id = auth.uid()));

create policy "tempo_students_create_own_bookings"
  on public.tempo_bookings for insert to authenticated
  with check (student_id = auth.uid() and status = 'pending_payment');
create policy "tempo_students_read_own_bookings"
  on public.tempo_bookings for select to authenticated
  using (student_id = auth.uid());
create policy "tempo_students_update_pending_booking"
  on public.tempo_bookings for update to authenticated
  using (student_id = auth.uid() and status = 'pending_payment')
  with check (student_id = auth.uid() and status in ('pending_payment', 'cancelled'));
create policy "tempo_teachers_read_assigned_bookings"
  on public.tempo_bookings for select to authenticated
  using (teacher_id in (select id from public.tempo_teachers where user_id = auth.uid()));

-- Service-role-only atomic function: immutable event insert and booking update
-- occur in the same transaction, making retries safe.
create or replace function public.tempo_process_checkout_event(
  p_event_id text,
  p_event_type text,
  p_payload_hash text,
  p_session_id text,
  p_payment_intent text,
  p_booking_status text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_rows integer;
begin
  if p_booking_status not in ('paid', 'cancelled') then
    raise exception 'Unexpected booking status';
  end if;

  insert into public.tempo_stripe_events (event_id, event_type, payload_hash)
  values (p_event_id, p_event_type, p_payload_hash)
  on conflict (event_id) do nothing;

  get diagnostics inserted_rows = row_count;
  if inserted_rows = 0 then
    return false;
  end if;

  update public.tempo_bookings
  set status = p_booking_status,
      stripe_payment_intent_id = case when p_booking_status = 'paid' then p_payment_intent else stripe_payment_intent_id end
  where stripe_checkout_session_id = p_session_id
    and status = 'pending_payment';

  update public.tempo_slots
  set available = (p_booking_status <> 'paid')
  where id = (
    select slot_id from public.tempo_bookings where stripe_checkout_session_id = p_session_id
  );

  return true;
end;
$$;

revoke all on function public.tempo_process_checkout_event(text, text, text, text, text, text) from public;
grant execute on function public.tempo_process_checkout_event(text, text, text, text, text, text) to service_role;

insert into public.tempo_teachers (id, display_name, instrument, city, biography) values
  ('bee82778-aa81-41b0-b9a8-d06ecf8bd101', 'Livia Meier', 'piano', 'Zurich', 'Classical piano teacher helping adult beginners build consistent practice.'),
  ('48095191-ad82-45ed-a754-58ab5d881202', 'Jonas Keller', 'guitar', 'Basel', 'Contemporary guitar lessons focused on rhythm, songwriting and confidence.'),
  ('ab56ee0b-069d-42b1-a0ce-ef929519d303', 'Sofia Rossi', 'voice', 'Lucerne', 'Voice coaching for performers preparing auditions and live sessions.')
on conflict (id) do nothing;

insert into public.tempo_slots (id, teacher_id, starts_at, duration_minutes, price_chf, level) values
  ('89aca45f-9ac6-4d07-b86c-58ed77a1c111', 'bee82778-aa81-41b0-b9a8-d06ecf8bd101', '2026-06-03T16:30:00+02:00', 60, 72, 'beginner'),
  ('96915663-dc31-47ed-96d5-a836d28c1222', '48095191-ad82-45ed-a754-58ab5d881202', '2026-06-04T18:00:00+02:00', 45, 58, 'intermediate'),
  ('bd64bcb6-8bb4-4f45-9964-a079945f1333', 'ab56ee0b-069d-42b1-a0ce-ef929519d303', '2026-06-06T10:00:00+02:00', 60, 84, 'advanced')
on conflict (id) do nothing;
