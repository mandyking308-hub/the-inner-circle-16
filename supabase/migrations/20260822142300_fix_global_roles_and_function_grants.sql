-- Fix global role assignment and tighten security-definer helper grants.
-- The original composite primary key made household_id implicitly NOT NULL,
-- which prevented global operator/admin roles. Replace it with a surrogate key
-- plus partial unique indexes for household-scoped and global assignments.

alter table public.user_roles drop constraint if exists user_roles_pkey;
alter table public.user_roles alter column household_id drop not null;
alter table public.user_roles add column if not exists id uuid default gen_random_uuid();
alter table public.user_roles add constraint user_roles_pkey primary key (id);

create unique index if not exists user_roles_household_unique
  on public.user_roles(user_id, role, household_id)
  where household_id is not null;

create unique index if not exists user_roles_global_unique
  on public.user_roles(user_id, role)
  where household_id is null;

-- Security-definer functions are intentionally callable by authenticated users
-- only; anon clients do not need role or household resolution.
revoke all on function public.current_household_ids() from public;
revoke all on function public.has_role(public.app_role) from public;
revoke all on function public.is_member_actor() from public;
grant execute on function public.current_household_ids() to authenticated;
grant execute on function public.has_role(public.app_role) to authenticated;
grant execute on function public.is_member_actor() to authenticated;

-- Role mutation remains privileged/server-side.
revoke insert, update, delete on public.user_roles from anon, authenticated;

comment on table public.user_roles is 'Role assignments. household_id is NULL for global operator/admin roles and set for household-scoped member/family roles.';
