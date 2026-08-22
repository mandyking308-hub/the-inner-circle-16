# Supabase security contract tests

`rls-contract.ts` is an integration test for the role boundaries that matter most to Project Table.

It creates synthetic test users/households through the service role, signs in as separate member and partner clients, proves cross-household reads are empty, proves partner authentication does not unlock private family records, proves direct anonymous application inserts are blocked, and tests private `family-vault` object isolation. It then removes the synthetic records.

Run only against a dedicated non-production Project Table Supabase environment after all migrations have been applied.

```bash
SUPABASE_URL="..." \
SUPABASE_ANON_KEY="..." \
SUPABASE_SERVICE_ROLE_KEY="..." \
deno run --allow-env --allow-net supabase/tests/rls-contract.ts
```

Never run this against an unrelated Supabase project. Never expose the service-role key in a browser, public CI log or client environment variable.

A successful run is required evidence for the `RLS policy tests pass` gate in `/admin/launch-readiness`. Extend this contract before launch to cover account revocation, concierge role scoping, guardian/learner access and audit-event visibility.
