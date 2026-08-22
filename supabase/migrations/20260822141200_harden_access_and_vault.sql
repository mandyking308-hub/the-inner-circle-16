-- Hardening layer: separate member, partner and public access; add a private family vault.

create or replace function public.is_member_actor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid()
      and role in ('member','family_member','concierge','operator','admin')
  );
$$;

-- Public applicants should enter through a server-side intake/Edge Function with abuse controls.
-- Do not grant anonymous browser clients direct insert access to the application table.
drop policy if exists application_create on public.membership_applications;

-- Authenticated does not mean member. A partner account must not inherit member-room access.
drop policy if exists partner_member_read on public.partner_organisations;
create policy partner_directory_member_read on public.partner_organisations
for select using (
  public.is_member_actor()
  or exists (select 1 from public.partner_users pu where pu.partner_id = id and pu.user_id = auth.uid())
);

drop policy if exists gathering_member_read on public.gatherings;
create policy gathering_member_read on public.gatherings
for select using (public.is_member_actor());

drop policy if exists knowledge_read on public.knowledge_items;
create policy knowledge_read on public.knowledge_items
for select using (
  visibility = 'public'
  or (visibility = 'member' and public.is_member_actor())
  or (visibility = 'operator' and (public.has_role('operator') or public.has_role('admin')))
);

-- Table membership is a member-space concept, not a generic authenticated-user concept.
create policy table_member_read on public.tables
for select using (
  public.is_member_actor()
  and (
    public.has_role('operator')
    or public.has_role('admin')
    or exists (select 1 from public.table_memberships tm where tm.table_id = id and tm.user_id = auth.uid())
  )
);

create policy table_membership_self_read on public.table_memberships
for select using (user_id = auth.uid() or public.has_role('operator') or public.has_role('admin'));

-- Partner introductions are visible to the member household, operators/admins, and the partner only after partner consent.
drop policy if exists partner_intro_member_read on public.partner_introductions;
create policy partner_intro_authorised_read on public.partner_introductions
for select using (
  household_id in (select public.current_household_ids())
  or requested_by = auth.uid()
  or public.has_role('operator')
  or public.has_role('admin')
  or (
    partner_consent_at is not null
    and exists (
      select 1 from public.partner_users pu
      where pu.partner_id = partner_introductions.partner_id and pu.user_id = auth.uid()
    )
  )
);

-- Create a private storage bucket. Objects must be stored under: <household_uuid>/<classification>/<filename>
insert into storage.buckets (id, name, public, file_size_limit)
values ('family-vault', 'family-vault', false, 52428800)
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit;

create policy family_vault_read on storage.objects
for select using (
  bucket_id = 'family-vault'
  and (
    public.has_role('operator')
    or public.has_role('admin')
    or (
      (storage.foldername(name))[1] ~* '^[0-9a-f-]{36}$'
      and ((storage.foldername(name))[1])::uuid in (select public.current_household_ids())
    )
  )
);

create policy family_vault_insert on storage.objects
for insert with check (
  bucket_id = 'family-vault'
  and (
    public.has_role('operator')
    or public.has_role('admin')
    or (
      (storage.foldername(name))[1] ~* '^[0-9a-f-]{36}$'
      and ((storage.foldername(name))[1])::uuid in (select public.current_household_ids())
    )
  )
);

create policy family_vault_update on storage.objects
for update using (
  bucket_id = 'family-vault'
  and (
    public.has_role('operator')
    or public.has_role('admin')
    or (
      (storage.foldername(name))[1] ~* '^[0-9a-f-]{36}$'
      and ((storage.foldername(name))[1])::uuid in (select public.current_household_ids())
    )
  )
) with check (
  bucket_id = 'family-vault'
  and (
    public.has_role('operator')
    or public.has_role('admin')
    or (
      (storage.foldername(name))[1] ~* '^[0-9a-f-]{36}$'
      and ((storage.foldername(name))[1])::uuid in (select public.current_household_ids())
    )
  )
);

create policy family_vault_delete on storage.objects
for delete using (
  bucket_id = 'family-vault'
  and (
    public.has_role('operator')
    or public.has_role('admin')
    or (
      (storage.foldername(name))[1] ~* '^[0-9a-f-]{36}$'
      and ((storage.foldername(name))[1])::uuid in (select public.current_household_ids())
    )
  )
);

-- Keep audit rows append-only from privileged server processes. RLS already exposes them only to operators/admins.
revoke insert, update, delete on public.audit_events from anon, authenticated;

comment on function public.is_member_actor() is 'Returns true only for member-side or operator-side roles. Partner authentication alone never unlocks member-space data.';
