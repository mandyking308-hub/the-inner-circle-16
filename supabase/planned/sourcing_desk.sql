-- Sourcing Desk — prepared, NOT applied.
-- Preview currently runs on localStorage. Apply this only when the desk moves to live data.

create type public.sourcing_stage as enum (
  'Open', 'Bench review', 'External research', 'Awaiting replies', 'Assurance', 'Added to network', 'Closed'
);

create type public.prospect_relationship as enum (
  'Prospect', 'In conversation', 'Invited to apply', 'Application received', 'Approved bench', 'Not suitable', 'Declined'
);

create table public.sourcing_cases (
  id uuid primary key default gen_random_uuid(),
  concierge_case_id text not null,
  member_id uuid,
  owner text not null,
  need text not null,
  category text not null,
  cities text[] not null default '{}',
  preferred_mode text not null default 'request',
  stage public.sourcing_stage not null default 'Open',
  research_state text not null default 'Research required',
  bench_reviewed boolean not null default false,
  consent text not null default 'neutral',
  member_context text not null default '',
  neutral_brief text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.sourcing_cases to authenticated;
grant all on public.sourcing_cases to service_role;
alter table public.sourcing_cases enable row level security;
create policy "Staff manage sourcing cases" on public.sourcing_cases
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.supplier_prospects (
  id uuid primary key default gen_random_uuid(),
  sourcing_case_id uuid references public.sourcing_cases(id) on delete set null,
  name text not null,
  category text not null,
  locations text[] not null default '{}',
  website text,
  contact_route text,
  source_notes text,
  why_relevant text,
  response text not null default 'Not contacted',
  last_contacted date,
  indicative_terms text,
  availability text,
  due_diligence text not null default 'Not started',
  references_status text not null default 'Not started',
  relationship public.prospect_relationship not null default 'Prospect',
  invited_to_apply boolean not null default false,
  partner_application_ref text,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.supplier_prospects to authenticated;
grant all on public.supplier_prospects to service_role;
alter table public.supplier_prospects enable row level security;
create policy "Staff manage prospects" on public.supplier_prospects
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.sourcing_search_runs (
  id uuid primary key default gen_random_uuid(),
  sourcing_case_id uuid not null references public.sourcing_cases(id) on delete cascade,
  ran_at date not null default current_date,
  ran_by text not null,
  method text not null,
  query text not null,
  outcome text
);

grant select, insert, update, delete on public.sourcing_search_runs to authenticated;
grant all on public.sourcing_search_runs to service_role;
alter table public.sourcing_search_runs enable row level security;
create policy "Staff manage search runs" on public.sourcing_search_runs
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Members read only the curated, explicitly shared shortlist.
create table public.sourcing_shortlist (
  id uuid primary key default gen_random_uuid(),
  sourcing_case_id uuid not null references public.sourcing_cases(id) on delete cascade,
  member_id uuid,
  kind text not null check (kind in ('bench', 'prospect')),
  ref_id text not null,
  title text not null,
  note text,
  shared_with_member boolean not null default false,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.sourcing_shortlist to authenticated;
grant all on public.sourcing_shortlist to service_role;
alter table public.sourcing_shortlist enable row level security;
create policy "Members read their shared shortlist" on public.sourcing_shortlist
  for select to authenticated using (shared_with_member and member_id = auth.uid());
create policy "Staff manage shortlist" on public.sourcing_shortlist
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
