-- Partner intake and consent-led relationship intelligence.

create table public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  firm_name text not null,
  contact_name text not null,
  contact_email text not null,
  website text,
  category text not null,
  jurisdictions text[] not null default '{}',
  why_relevant text not null,
  member_value text not null,
  professional_regulation text,
  insurance_note text,
  conflicts_note text,
  referral_fee_note text,
  references_note text,
  status text not null default 'new' check (status in ('new','screening','references','approved','declined')),
  screening jsonb not null default '{}'::jsonb,
  private_notes text,
  reviewed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.member_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  other_user_id uuid not null references auth.users(id) on delete cascade,
  relationship_context text,
  first_met_context text,
  private_note text,
  strength smallint check (strength between 1 and 5),
  last_interaction_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (user_id <> other_user_id),
  unique (user_id, other_user_id)
);

create table public.introduction_requests (
  id uuid primary key default gen_random_uuid(),
  requested_by uuid not null references auth.users(id) on delete cascade,
  target_user_id uuid references auth.users(id) on delete set null,
  target_partner_id uuid references public.partner_organisations(id) on delete set null,
  reason text not null,
  context_to_share text,
  requester_consent_at timestamptz,
  recipient_consent_at timestamptz,
  status text not null default 'requested' check (status in ('requested','clarifying','awaiting_consent','introduced','declined','closed')),
  handled_by uuid references auth.users(id) on delete set null,
  introduced_at timestamptz,
  outcome_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (target_user_id is not null or target_partner_id is not null)
);

create table public.member_recommendations (
  id uuid primary key default gen_random_uuid(),
  recommender_user_id uuid not null references auth.users(id) on delete cascade,
  partner_id uuid not null references public.partner_organisations(id) on delete cascade,
  service_context text not null,
  private_note text,
  would_use_again boolean,
  rating smallint check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  unique (recommender_user_id, partner_id, service_context)
);

alter table public.partner_applications enable row level security;
alter table public.member_connections enable row level security;
alter table public.introduction_requests enable row level security;
alter table public.member_recommendations enable row level security;

-- Partner applications enter through a server-side intake function; browser clients get no direct insert policy.
create policy partner_application_staff_read on public.partner_applications
for select using (public.has_role('operator') or public.has_role('admin'));
create policy partner_application_staff_update on public.partner_applications
for update using (public.has_role('operator') or public.has_role('admin'));

-- A member owns their relationship notes. Operators may see only introduction workflow, not arbitrary private relationship notes.
create policy member_connection_owner on public.member_connections
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy introduction_request_read on public.introduction_requests
for select using (
  requested_by = auth.uid()
  or target_user_id = auth.uid()
  or public.has_role('concierge')
  or public.has_role('operator')
  or public.has_role('admin')
);

create policy introduction_request_member_insert on public.introduction_requests
for insert with check (requested_by = auth.uid() and public.is_member_actor());

create policy introduction_request_staff_update on public.introduction_requests
for update using (
  requested_by = auth.uid()
  or target_user_id = auth.uid()
  or public.has_role('concierge')
  or public.has_role('operator')
  or public.has_role('admin')
);

create policy recommendation_member_access on public.member_recommendations
for all using (
  recommender_user_id = auth.uid()
  or public.has_role('operator')
  or public.has_role('admin')
) with check (recommender_user_id = auth.uid() and public.is_member_actor());

create index on public.partner_applications(status, created_at desc);
create index on public.member_connections(user_id, last_interaction_at desc);
create index on public.introduction_requests(status, created_at desc);
create index on public.member_recommendations(partner_id, created_at desc);

comment on table public.member_connections is 'Private relationship memory owned by the member. Not a staff-accessible CRM notes table.';
comment on table public.introduction_requests is 'Consent-led introduction workflow. Contact details should be exchanged only after recipient consent.';
comment on table public.partner_applications is 'Server-ingested partner application and due-diligence workflow. Approval never grants member-room access.';
