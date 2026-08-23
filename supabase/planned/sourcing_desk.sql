-- Sourcing Desk — prepared, NOT applied.
-- Preview currently runs on localStorage. Apply this only when the desk moves to live data.
--
-- Demand-led model: a member request is the sourcing job. There is no supplier
-- bench, no directory and no internal-first search. External research begins
-- from the request itself, and a provider only becomes a supplier after being
-- used successfully, invited, and cleared through the partner application
-- (two references) and assurance.

create type public.member_request_status as enum (
  'Received', 'In hand', 'Checking options', 'Ready for you', 'Arranged', 'Closed'
);

create type public.sourcing_stage as enum (
  'New request', 'Researching', 'Contacting', 'Responses received', 'Options prepared', 'Member decision', 'Arranged', 'Closed'
);

create type public.prospect_status as enum (
  'Found', 'Contacted', 'Responded', 'Shortlisted', 'Used', 'Invite considered', 'Invited', 'Assurance', 'Approved', 'Declined'
);

create table public.member_requests (
  id uuid primary key default gen_random_uuid(),
  member_id uuid,
  owner text not null default 'Unassigned',
  -- Neutral, member-safe title. Never a provider name.
  title text not null,
  need text not null,
  city text not null default '',
  timeframe text not null default '',
  logistics text not null default '',
  preferences text not null default '',
  budget text not null default '',
  full_handling boolean not null default true,
  status public.member_request_status not null default 'Received',
  internal_stage public.sourcing_stage not null default 'New request',
  -- 24-hour clock for the first meaningful member response starts here.
  received_at timestamptz not null default now(),
  responded_at timestamptz,
  next_update text not null default 'Within 24 hours of receipt',
  -- The only text an external provider may be given without explicit consent.
  neutral_brief text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.member_requests to authenticated;
grant all on public.member_requests to service_role;
alter table public.member_requests enable row level security;
create policy "Members read own requests" on public.member_requests
  for select to authenticated using (member_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "Members create own requests" on public.member_requests
  for insert to authenticated with check (member_id = auth.uid());
create policy "Staff manage requests" on public.member_requests
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Member-visible updates and options. Nothing else about the sourcing job is shared.
create table public.member_request_updates (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.member_requests(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

grant select, insert on public.member_request_updates to authenticated;
grant all on public.member_request_updates to service_role;
alter table public.member_request_updates enable row level security;
create policy "Members read own request updates" on public.member_request_updates
  for select to authenticated using (
    exists (select 1 from public.member_requests r where r.id = request_id and (r.member_id = auth.uid() or public.has_role(auth.uid(), 'admin')))
  );
create policy "Staff write request updates" on public.member_request_updates
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.member_request_options (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.member_requests(id) on delete cascade,
  -- Neutral label only: 'Option A', 'Option from Montvelle'.
  label text not null,
  note text not null default '',
  indicative_terms text not null default '',
  availability text not null default '',
  status text not null default 'Proposed' check (status in ('Proposed', 'Chosen', 'Set aside')),
  created_at timestamptz not null default now()
);

grant select, update on public.member_request_options to authenticated;
grant all on public.member_request_options to service_role;
alter table public.member_request_options enable row level security;
create policy "Members read own request options" on public.member_request_options
  for select to authenticated using (
    exists (select 1 from public.member_requests r where r.id = request_id and (r.member_id = auth.uid() or public.has_role(auth.uid(), 'admin')))
  );
create policy "Staff manage request options" on public.member_request_options
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Internal only. Never exposed to members.
create table public.external_prospects (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references public.member_requests(id) on delete set null,
  name text not null,
  contact_route text not null default '',
  website text not null default '',
  category text not null default '',
  location text not null default '',
  why_suitable text not null default '',
  contacted_at date,
  response text not null default '',
  availability text not null default '',
  indicative_terms text not null default '',
  shortlisted boolean not null default false,
  used boolean not null default false,
  outcome text not null default '',
  consider_for_network boolean not null default false,
  status public.prospect_status not null default 'Found',
  partner_application_ref text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.external_prospects to authenticated;
grant all on public.external_prospects to service_role;
alter table public.external_prospects enable row level security;
create policy "Staff only prospects" on public.external_prospects
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
