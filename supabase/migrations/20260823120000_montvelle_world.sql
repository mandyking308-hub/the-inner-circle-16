-- Montvelle World: private services, bookings, message threads and member preferences
-- Schema-first, in the same manner as the earlier migrations in this folder:
-- applied together with the core model once the launch security gate is satisfied.

create type public.booking_mode as enum ('book','request','introduction');
create type public.booking_status as enum ('awaiting','upcoming','in_progress','past','cancelled');
create type public.thread_kind as enum ('concierge','booking','partner','montvelle','gathering');
create type public.thread_state as enum ('needs_reply','waiting','active','closed');

create or replace function public.is_partner_user(target_partner uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.partner_users pu
    where pu.partner_id = target_partner and pu.user_id = auth.uid()
  )
$$;

grant execute on function public.is_partner_user(uuid) to authenticated;

create table public.service_offerings (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partner_organisations(id) on delete cascade,
  category text not null,
  title text not null,
  summary text,
  cities text[] not null default '{}',
  mode public.booking_mode not null default 'request',
  service_standard text,
  member_benefit text,
  indicative_price text,
  terms text,
  is_published boolean not null default false,
  lead_time text,
  capacity_note text,
  unavailable_dates text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.service_offerings to authenticated;
grant all on public.service_offerings to service_role;
alter table public.service_offerings enable row level security;

create policy "Members read published offerings"
  on public.service_offerings for select to authenticated
  using (is_published and public.is_member_actor());

create policy "Partners read own offerings"
  on public.service_offerings for select to authenticated
  using (public.is_partner_user(partner_id));

create policy "Partners manage own offerings"
  on public.service_offerings for all to authenticated
  using (public.is_partner_user(partner_id))
  with check (public.is_partner_user(partner_id));

create policy "Operators manage offerings"
  on public.service_offerings for all to authenticated
  using (public.has_role('operator') or public.has_role('admin'))
  with check (public.has_role('operator') or public.has_role('admin'));

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  requested_by uuid not null references auth.users(id) on delete restrict,
  offering_id uuid references public.service_offerings(id) on delete set null,
  partner_id uuid not null references public.partner_organisations(id) on delete restrict,
  case_id uuid references public.concierge_cases(id) on delete set null,
  mode public.booking_mode not null,
  status public.booking_status not null default 'awaiting',
  city text,
  scheduled_for text,
  party_note text,
  shared_context text[] not null default '{}',
  quote text,
  payment_record text not null default 'not_required',
  cancellation_terms text,
  arrival_note text,
  concierge_owner uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.bookings to authenticated;
grant all on public.bookings to service_role;
alter table public.bookings enable row level security;

create policy "Household reads own bookings"
  on public.bookings for select to authenticated
  using (household_id = any (public.current_household_ids()));

create policy "Household creates own bookings"
  on public.bookings for insert to authenticated
  with check (household_id = any (public.current_household_ids()) and requested_by = auth.uid());

create policy "Household updates own bookings"
  on public.bookings for update to authenticated
  using (household_id = any (public.current_household_ids()))
  with check (household_id = any (public.current_household_ids()));

create policy "Partners read assigned bookings"
  on public.bookings for select to authenticated
  using (public.is_partner_user(partner_id));

create policy "Partners update assigned bookings"
  on public.bookings for update to authenticated
  using (public.is_partner_user(partner_id))
  with check (public.is_partner_user(partner_id));

create policy "Concierge manages bookings"
  on public.bookings for all to authenticated
  using (public.has_role('concierge') or public.has_role('operator') or public.has_role('admin'))
  with check (public.has_role('concierge') or public.has_role('operator') or public.has_role('admin'));

create table public.message_threads (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  kind public.thread_kind not null,
  subject text not null,
  context text,
  state public.thread_state not null default 'active',
  booking_id uuid references public.bookings(id) on delete cascade,
  case_id uuid references public.concierge_cases(id) on delete cascade,
  partner_id uuid references public.partner_organisations(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.thread_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  author_role text not null check (author_role in ('member','concierge','supplier')),
  body text not null,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.message_threads to authenticated;
grant all on public.message_threads to service_role;
grant select, insert on public.thread_messages to authenticated;
grant all on public.thread_messages to service_role;
alter table public.message_threads enable row level security;
alter table public.thread_messages enable row level security;

create policy "Household reads own threads"
  on public.message_threads for select to authenticated
  using (household_id = any (public.current_household_ids()));

create policy "Household writes own threads"
  on public.message_threads for insert to authenticated
  with check (household_id = any (public.current_household_ids()));

create policy "Partners read threads for their work"
  on public.message_threads for select to authenticated
  using (partner_id is not null and public.is_partner_user(partner_id));

create policy "Concierge manages threads"
  on public.message_threads for all to authenticated
  using (public.has_role('concierge') or public.has_role('operator') or public.has_role('admin'))
  with check (public.has_role('concierge') or public.has_role('operator') or public.has_role('admin'));

create policy "Thread participants read messages"
  on public.thread_messages for select to authenticated
  using (exists (
    select 1 from public.message_threads t
    where t.id = thread_id
      and (
        t.household_id = any (public.current_household_ids())
        or (t.partner_id is not null and public.is_partner_user(t.partner_id))
        or public.has_role('concierge') or public.has_role('operator') or public.has_role('admin')
      )
  ));

create policy "Thread participants write messages"
  on public.thread_messages for insert to authenticated
  with check (author_id = auth.uid() and exists (
    select 1 from public.message_threads t
    where t.id = thread_id
      and (
        t.household_id = any (public.current_household_ids())
        or (t.partner_id is not null and public.is_partner_user(t.partner_id))
        or public.has_role('concierge') or public.has_role('operator') or public.has_role('admin')
      )
  ));

create table public.member_preferences (
  household_id uuid primary key references public.households(id) on delete cascade,
  travel text,
  dining text,
  household_notes text,
  family text,
  wellbeing text,
  communications text,
  favourites text,
  avoid text,
  default_booking_mode public.booking_mode not null default 'request',
  share_with_suppliers boolean not null default false,
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.member_preferences to authenticated;
grant all on public.member_preferences to service_role;
alter table public.member_preferences enable row level security;

create policy "Household manages own preferences"
  on public.member_preferences for all to authenticated
  using (household_id = any (public.current_household_ids()))
  with check (household_id = any (public.current_household_ids()));
