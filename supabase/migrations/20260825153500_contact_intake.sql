-- Production contact intake only. No member/auth schema changes.
create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  category text not null check (category in (
    'Membership',
    'Privacy / data request',
    'Legal / formal notice',
    'Cancellation',
    'Supplier / partner',
    'Accessibility',
    'Other'
  )),
  name text not null check (char_length(name) between 1 and 140),
  contact text not null check (char_length(contact) between 3 and 320),
  country text not null check (char_length(country) between 1 and 120),
  message text not null check (char_length(message) between 1 and 8000),
  acknowledged_privacy boolean not null check (acknowledged_privacy = true),
  source_hash text,
  user_agent text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'closed'))
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
create index if not exists contact_messages_source_hash_idx
  on public.contact_messages (source_hash, created_at desc);

alter table public.contact_messages enable row level security;

-- Intentionally no anon/authenticated policies. Public clients cannot read, insert,
-- update or delete these records. The Edge Function writes with service-role only.
revoke all on table public.contact_messages from anon, authenticated;
