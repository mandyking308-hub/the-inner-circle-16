-- Append-only audit trail for sensitive operational changes.
-- Deliberately stores event metadata, not full sensitive row contents.

create or replace function public.capture_sensitive_audit_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  record_json jsonb;
  entity_uuid uuid;
  household_uuid uuid;
  safe_meta jsonb;
begin
  record_json := case when tg_op = 'DELETE' then to_jsonb(old) else to_jsonb(new) end;

  begin
    entity_uuid := nullif(record_json ->> 'id', '')::uuid;
  exception when others then
    entity_uuid := null;
  end;

  begin
    household_uuid := nullif(record_json ->> 'household_id', '')::uuid;
  exception when others then
    household_uuid := null;
  end;

  safe_meta := jsonb_strip_nulls(jsonb_build_object(
    'table', tg_table_name,
    'operation', tg_op,
    'status', record_json ->> 'status',
    'classification', record_json ->> 'classification',
    'category', record_json ->> 'category'
  ));

  insert into public.audit_events(actor_user_id, household_id, action, entity_type, entity_id, metadata)
  values (auth.uid(), household_uuid, lower(tg_op), tg_table_name, entity_uuid, safe_meta);

  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

revoke all on function public.capture_sensitive_audit_event() from public;

create trigger audit_decision_rooms
after insert or update or delete on public.decision_rooms
for each row execute function public.capture_sensitive_audit_event();

create trigger audit_decision_actions
after insert or update or delete on public.decision_actions
for each row execute function public.capture_sensitive_audit_event();

create trigger audit_concierge_cases
after insert or update or delete on public.concierge_cases
for each row execute function public.capture_sensitive_audit_event();

create trigger audit_partner_introductions
after insert or update or delete on public.partner_introductions
for each row execute function public.capture_sensitive_audit_event();

create trigger audit_family_nodes
after insert or update or delete on public.family_nodes
for each row execute function public.capture_sensitive_audit_event();

create trigger audit_document_references
after insert or update or delete on public.document_references
for each row execute function public.capture_sensitive_audit_event();

create trigger audit_consent_records
after insert or update or delete on public.consent_records
for each row execute function public.capture_sensitive_audit_event();

create trigger audit_role_changes
after insert or update or delete on public.user_roles
for each row execute function public.capture_sensitive_audit_event();

comment on function public.capture_sensitive_audit_event() is 'Writes minimal append-only audit metadata for sensitive changes. It intentionally avoids copying private free-text or document contents into the audit log.';
