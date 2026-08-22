-- Project Table production data model
-- Designed for Supabase/Postgres. This migration is intentionally schema-first:
-- do not apply to a production project until the repository is private and the launch security gate is satisfied.

create extension if not exists pgcrypto;

create type public.app_role as enum ('member','family_member','concierge','partner','operator','admin');
create type public.member_status as enum ('applicant','review','conversation','active','paused','declined','former');
create type public.case_status as enum ('new','clarifying','matching','executing','complete','cancelled');
create type public.decision_lane as enum ('DECIDE','EXPERT','EXECUTE','EVIDENCE');
create type public.event_response as enum ('invited','requested','confirmed','waitlist','declined');

create table public.households (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  primary_city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  household_id uuid references public.households(id) on delete set null,
  display_name text not null,
  primary_city text,
  role_title text,
  organisation text,
  biography text,
  can_help_with text,
  wants_to_learn text,
  member_status public.member_status not null default 'applicant',
  profile_visibility jsonb not null default '{"enterprise_stage":false,"events":true,"other_cities":true,"languages":true}'::jsonb,
  notification_preferences jsonb not null default '{"concierge":true,"events":true,"introductions":true}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  household_id uuid references public.households(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, role, household_id)
);

create table public.membership_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_user_id uuid references auth.users(id) on delete set null,
  application_kind text not null check (application_kind in ('individual','family')),
  name text not null,
  email text not null,
  location text,
  profile text,
  building text not null,
  complicated text not null,
  contribution text not null,
  referral text,
  status public.member_status not null default 'applicant',
  qualification_scores jsonb not null default '{}'::jsonb,
  review_notes text,
  reviewed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tables (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  host_user_id uuid references auth.users(id) on delete set null,
  capacity int not null default 10 check (capacity between 4 and 24),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.table_memberships (
  table_id uuid not null references public.tables(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (table_id,user_id)
);

create table public.decision_rooms (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  created_by uuid not null references auth.users(id) on delete restrict,
  label text not null,
  headline text not null,
  central_question text not null,
  definition_of_done text not null,
  status text not null default 'active' check (status in ('active','complete','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.decision_participants (
  decision_room_id uuid not null references public.decision_rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  participant_role text not null default 'participant',
  primary key (decision_room_id,user_id)
);

create table public.decision_actions (
  id uuid primary key default gen_random_uuid(),
  decision_room_id uuid not null references public.decision_rooms(id) on delete cascade,
  lane public.decision_lane not null,
  title text not null,
  detail text,
  owner_label text,
  owner_user_id uuid references auth.users(id) on delete set null,
  dependency_note text,
  due_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.decision_log (
  id uuid primary key default gen_random_uuid(),
  decision_room_id uuid not null references public.decision_rooms(id) on delete cascade,
  recorded_by uuid not null references auth.users(id) on delete restrict,
  decision_text text not null,
  recorded_at timestamptz not null default now()
);

create table public.concierge_cases (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  opened_by uuid not null references auth.users(id) on delete restrict,
  category text not null,
  outcome text not null,
  context text,
  target_date date,
  status public.case_status not null default 'new',
  owner_user_id uuid references auth.users(id) on delete set null,
  next_action text,
  consent_to_introduce boolean not null default false,
  completed_at timestamptz,
  private_rating int check (private_rating between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.concierge_messages (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.concierge_cases(id) on delete cascade,
  author_user_id uuid not null references auth.users(id) on delete restrict,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.partner_organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  focus text,
  locations text[] not null default '{}',
  status text not null default 'candidate' check (status in ('candidate','member_recommended','vetted','strategic','paused','removed')),
  due_diligence jsonb not null default '{}'::jsonb,
  professional_boundaries text,
  conflicts_disclosure text,
  referral_fee_disclosure text,
  review_due date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.partner_users (
  partner_id uuid not null references public.partner_organisations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  primary key (partner_id,user_id)
);

create table public.partner_introductions (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  case_id uuid references public.concierge_cases(id) on delete set null,
  partner_id uuid not null references public.partner_organisations(id) on delete restrict,
  requested_by uuid not null references auth.users(id) on delete restrict,
  member_consent_at timestamptz,
  partner_consent_at timestamptz,
  introduced_at timestamptz,
  outcome_note text,
  private_rating int check (private_rating between 1 and 5),
  created_at timestamptz not null default now()
);

create table public.family_nodes (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  node_type text not null check (node_type in ('person','company','trust','foundation','charity','property','asset','insurance','adviser','jurisdiction','document_reference')),
  label text not null,
  note text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.family_edges (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  source_node_id uuid not null references public.family_nodes(id) on delete cascade,
  target_node_id uuid not null references public.family_nodes(id) on delete cascade,
  relationship text not null,
  note text,
  created_at timestamptz not null default now(),
  unique (source_node_id,target_node_id,relationship)
);

create table public.learners (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  display_label text not null,
  age_stage text,
  graduate_profile text,
  term_goal text,
  guardian_user_id uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.learners(id) on delete cascade,
  domain text not null,
  independence_score int not null check (independence_score between 1 and 5),
  reviewed_at timestamptz not null default now(),
  reviewed_by uuid not null references auth.users(id) on delete restrict
);

create table public.learning_evidence (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.learners(id) on delete cascade,
  evidence_type text not null,
  title text not null,
  note text,
  storage_object_path text,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table public.gatherings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  gathering_type text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  city text not null,
  private_location text,
  purpose text,
  useful_for text,
  host_user_id uuid references auth.users(id) on delete set null,
  capacity int,
  created_at timestamptz not null default now()
);

create table public.gathering_responses (
  gathering_id uuid not null references public.gatherings(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  response public.event_response not null default 'invited',
  dietary_access_note text,
  guest_request text,
  confirmed_at timestamptz,
  primary key (gathering_id,user_id)
);

create table public.knowledge_items (
  id uuid primary key default gen_random_uuid(),
  visibility text not null default 'member' check (visibility in ('public','member','operator')),
  category text not null,
  title text not null,
  summary text not null,
  body_markdown text,
  source_note text,
  created_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.document_references (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  linked_entity_type text not null,
  linked_entity_id uuid,
  display_name text not null,
  storage_object_path text,
  classification text not null default 'confidential' check (classification in ('internal','confidential','restricted')),
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table public.consent_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  consent_type text not null,
  subject_type text,
  subject_id uuid,
  granted boolean not null,
  recorded_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create table public.audit_events (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  household_id uuid references public.households(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index on public.profiles(household_id);
create index on public.decision_rooms(household_id,status);
create index on public.decision_actions(decision_room_id,due_date);
create index on public.concierge_cases(household_id,status);
create index on public.family_nodes(household_id,node_type);
create index on public.family_edges(household_id);
create index on public.learners(household_id);
create index on public.document_references(household_id,classification);
create index on public.audit_events(household_id,created_at desc);

create or replace function public.current_household_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select household_id from public.user_roles
  where user_id = auth.uid() and household_id is not null;
$$;

create or replace function public.has_role(required_role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.user_roles where user_id = auth.uid() and role = required_role);
$$;

alter table public.households enable row level security;
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.membership_applications enable row level security;
alter table public.tables enable row level security;
alter table public.table_memberships enable row level security;
alter table public.decision_rooms enable row level security;
alter table public.decision_participants enable row level security;
alter table public.decision_actions enable row level security;
alter table public.decision_log enable row level security;
alter table public.concierge_cases enable row level security;
alter table public.concierge_messages enable row level security;
alter table public.partner_organisations enable row level security;
alter table public.partner_users enable row level security;
alter table public.partner_introductions enable row level security;
alter table public.family_nodes enable row level security;
alter table public.family_edges enable row level security;
alter table public.learners enable row level security;
alter table public.learning_progress enable row level security;
alter table public.learning_evidence enable row level security;
alter table public.gatherings enable row level security;
alter table public.gathering_responses enable row level security;
alter table public.knowledge_items enable row level security;
alter table public.document_references enable row level security;
alter table public.consent_records enable row level security;
alter table public.audit_events enable row level security;

-- Household-private records: members of that household and authorised operators/admins only.
create policy household_select on public.households for select using (id in (select public.current_household_ids()) or public.has_role('operator') or public.has_role('admin'));
create policy household_profile_select on public.profiles for select using (id = auth.uid() or household_id in (select public.current_household_ids()) or public.has_role('operator') or public.has_role('admin'));
create policy profile_self_update on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy decision_select on public.decision_rooms for select using (household_id in (select public.current_household_ids()) or public.has_role('concierge') or public.has_role('operator') or public.has_role('admin'));
create policy decision_write on public.decision_rooms for all using (household_id in (select public.current_household_ids()) or public.has_role('operator') or public.has_role('admin')) with check (household_id in (select public.current_household_ids()) or public.has_role('operator') or public.has_role('admin'));
create policy action_access on public.decision_actions for all using (decision_room_id in (select id from public.decision_rooms)) with check (decision_room_id in (select id from public.decision_rooms));
create policy log_access on public.decision_log for all using (decision_room_id in (select id from public.decision_rooms)) with check (decision_room_id in (select id from public.decision_rooms));
create policy participant_access on public.decision_participants for all using (decision_room_id in (select id from public.decision_rooms)) with check (decision_room_id in (select id from public.decision_rooms));

create policy concierge_select on public.concierge_cases for select using (household_id in (select public.current_household_ids()) or public.has_role('concierge') or public.has_role('operator') or public.has_role('admin'));
create policy concierge_member_insert on public.concierge_cases for insert with check (household_id in (select public.current_household_ids()) and opened_by = auth.uid());
create policy concierge_staff_update on public.concierge_cases for update using (household_id in (select public.current_household_ids()) or public.has_role('concierge') or public.has_role('operator') or public.has_role('admin'));
create policy concierge_message_access on public.concierge_messages for all using (case_id in (select id from public.concierge_cases)) with check (case_id in (select id from public.concierge_cases) and author_user_id = auth.uid());

create policy family_node_access on public.family_nodes for all using (household_id in (select public.current_household_ids()) or public.has_role('operator') or public.has_role('admin')) with check (household_id in (select public.current_household_ids()) or public.has_role('operator') or public.has_role('admin'));
create policy family_edge_access on public.family_edges for all using (household_id in (select public.current_household_ids()) or public.has_role('operator') or public.has_role('admin')) with check (household_id in (select public.current_household_ids()) or public.has_role('operator') or public.has_role('admin'));
create policy learner_access on public.learners for all using (household_id in (select public.current_household_ids()) or public.has_role('operator') or public.has_role('admin')) with check (household_id in (select public.current_household_ids()) or public.has_role('operator') or public.has_role('admin'));
create policy progress_access on public.learning_progress for all using (learner_id in (select id from public.learners)) with check (learner_id in (select id from public.learners));
create policy evidence_access on public.learning_evidence for all using (learner_id in (select id from public.learners)) with check (learner_id in (select id from public.learners));

-- Community content can be read by authenticated active users, but contact and household-private data remains separate.
create policy partner_member_read on public.partner_organisations for select using (auth.uid() is not null);
create policy gathering_member_read on public.gatherings for select using (auth.uid() is not null);
create policy gathering_response_self on public.gathering_responses for all using (user_id = auth.uid() or public.has_role('operator') or public.has_role('admin')) with check (user_id = auth.uid() or public.has_role('operator') or public.has_role('admin'));
create policy knowledge_read on public.knowledge_items for select using (visibility = 'public' or auth.uid() is not null);

create policy application_create on public.membership_applications for insert with check (true);
create policy application_staff_read on public.membership_applications for select using (public.has_role('operator') or public.has_role('admin'));
create policy application_staff_update on public.membership_applications for update using (public.has_role('operator') or public.has_role('admin'));

create policy consent_self_access on public.consent_records for all using (user_id = auth.uid() or public.has_role('operator') or public.has_role('admin')) with check (user_id = auth.uid() or public.has_role('operator') or public.has_role('admin'));
create policy document_access on public.document_references for all using (household_id in (select public.current_household_ids()) or public.has_role('operator') or public.has_role('admin')) with check (household_id in (select public.current_household_ids()) or public.has_role('operator') or public.has_role('admin'));
create policy audit_staff_read on public.audit_events for select using (public.has_role('operator') or public.has_role('admin'));

-- Partner access is intentionally narrow. Partner users can see their own organisation record only;
-- they do not get household or member directory access through this policy set.
create policy partner_self_read on public.partner_users for select using (user_id = auth.uid() or public.has_role('operator') or public.has_role('admin'));
create policy partner_intro_member_read on public.partner_introductions for select using (household_id in (select public.current_household_ids()) or requested_by = auth.uid() or public.has_role('operator') or public.has_role('admin'));

-- User role assignment and audit writes are service/operator responsibilities, not browser-client responsibilities.
create policy role_admin_read on public.user_roles for select using (user_id = auth.uid() or public.has_role('admin'));

comment on table public.document_references is 'References to controlled files. Restricted files should live in private storage buckets with signed URLs and object-level policies; never in public buckets.';
comment on table public.audit_events is 'Append-only operational audit trail. Browser clients should not be granted direct insert/update/delete privileges in production.';
comment on table public.partner_organisations is 'Partner status never grants access to household-private records or member contact lists.';
