# Project Table — Production Cutover

This document is the release sequence for moving the current high-fidelity prototype onto real member data. The order is deliberate. Do not skip ahead because the interface looks finished.

## 1. Close the source-control boundary

- Make the GitHub repository private.
- Remove access that is no longer required.
- Enable branch protection on `main` and require the production build check.
- Confirm no service-role keys, private member data or restricted documents exist in current or historical commits.
- Keep Lovable as a deployment/view layer only; do not give it secrets that belong exclusively to server infrastructure.

## 2. Create a dedicated Project Table Supabase project

Do not reuse an unrelated database. Use a dedicated EU/UK-appropriate region selected with the final privacy/data-transfer model.

Apply migrations in order from `supabase/migrations/` to a non-production environment first. Generate database types after migrations succeed.

Review Supabase Security Advisors and Performance Advisors after every DDL/RLS change. Resolve high-risk notices before production.

## 3. Prove the role boundary

Required roles:

- `member`
- `family_member`
- `concierge`
- `partner`
- `operator`
- `admin`

Automated tests must prove at minimum:

- Household A cannot read or mutate Household B private records.
- Partner users cannot access member directories, family architecture, Decision Rooms, Concierge cases or the family vault.
- Concierge users see only the private information required to execute their role.
- Operator/admin access is explicit and auditable.
- Under-18 learner data is guardian-controlled and never exposed through normal adult networking features.
- Revoked/former accounts lose access immediately.

## 4. Configure the private family vault

The `family-vault` bucket is private. Store objects under:

`<household_uuid>/<classification>/<filename>`

Classifications should include at least `internal`, `confidential` and `restricted`.

Before restricted documents are enabled:

- Test household object isolation.
- Use signed URLs or authenticated retrieval only.
- Define maximum retention and deletion behaviour.
- Log privileged file access.
- Decide which document types should never be stored even in the vault.
- Complete a backup/restore rehearsal.

## 5. Production identity and MFA

Wire a real identity provider before exposing `/member` or `/admin` as authenticated spaces.

- Individual accounts only; no shared household passwords.
- MFA required for operators/admins and strongly required for members.
- Short session lifetimes for privileged roles.
- Explicit account revocation.
- Role assignment must happen through privileged server/admin workflows, never browser-controlled profile fields.

## 6. Public application intake

Deploy `supabase/functions/application-intake` with custom verification. It is intentionally configured with `verify_jwt = false` because applicants are not yet users; the function performs its own origin, payload and human-verification controls.

Required server secrets/environment:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PUBLIC_SITE_ORIGINS` — comma-separated exact allowed origins
- `TURNSTILE_SECRET_KEY`

Required client environment:

- `VITE_APPLICATION_INTAKE_URL`
- `VITE_TURNSTILE_SITE_KEY`

If `VITE_APPLICATION_INTAKE_URL` is absent, the current UI remains in local prototype mode. If the production endpoint is enabled but Turnstile/server configuration is incomplete, the intake fails closed.

The service-role key must never be present in browser JavaScript, Lovable-visible client variables or the Git repository.

## 7. Audit and monitoring

Before real data:

- Add append-only audit triggers/server writes for privileged changes.
- Monitor auth failures, privileged role changes, storage failures, Edge Function errors and unusual access patterns.
- Define alert owners.
- Write an incident response runbook including access revocation, evidence preservation, member communication and regulator/legal escalation where applicable.

## 8. Data rights and retention

Implement and test:

- Application retention and deletion.
- Former-member retention rules.
- Member data export.
- Correction workflow.
- Account closure/deletion workflow.
- Event and Concierge history retention.
- Restricted-document deletion.
- Consent history for introductions and optional visibility features.

The final privacy notice must describe what the production system actually does, not what the prototype intended to do.

## 9. Legal and safeguarding gates

Before paid/public launch obtain professional review of:

- Membership terms, renewal/cancellation and suspension.
- Privacy notice/data map and international transfers.
- Professional-advice boundary and partner disclosures.
- Referral fees, sponsorship and conflicts.
- Event terms/liability.
- Under-18 safeguarding, guardian permissions, mentor checks and messaging boundaries.
- Alternative/hybrid education positioning and any jurisdiction-specific regulatory issues.

## 10. Earn proof instead of inventing it

Do not seed the public website with fictional testimonials or imply formal partner/club relationships that do not exist.

The first proof should come from:

- Real founding members.
- A completed private Table.
- Screened real Trusted Partners.
- Real member feedback with permission.
- Anonymised service outcomes that demonstrate time saved, a decision improved or a complicated job successfully coordinated.
- Real editorial photography only with appropriate consent.

## 11. Final go/no-go

Use `/admin/launch-readiness` as the operating control room. A production launch is **NO-GO** while any hard gate remains open.

The final production smoke test should cover:

1. new member account + MFA;
2. household role isolation;
3. Decision Room CRUD;
4. Concierge case + consent-led introduction;
5. family graph;
6. private document upload/read/delete;
7. partner account isolation;
8. event response;
9. learning guardian permissions;
10. data export/deletion;
11. audit trail;
12. account revocation.

Only after those pass should real sensitive family information enter the platform.
