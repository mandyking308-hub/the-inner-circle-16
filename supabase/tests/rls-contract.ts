import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";

const url = Deno.env.get("SUPABASE_URL");
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
if (!url || !serviceKey || !anonKey) throw new Error("SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and SUPABASE_ANON_KEY are required");

const service = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
const stamp = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
const password = `PT-test-${crypto.randomUUID()}!aA1`;

type TestUser = { id: string; email: string; client: SupabaseClient };

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`RLS CONTRACT FAILED: ${message}`);
}

async function makeUser(label: string): Promise<TestUser> {
  const email = `pt-rls-${label}-${stamp}@example.invalid`;
  const created = await service.auth.admin.createUser({ email, password, email_confirm: true });
  if (created.error || !created.data.user) throw created.error ?? new Error(`Could not create ${label}`);
  const client = createClient(url!, anonKey!, { auth: { persistSession: false, autoRefreshToken: false } });
  const signedIn = await client.auth.signInWithPassword({ email, password });
  if (signedIn.error) throw signedIn.error;
  return { id: created.data.user.id, email, client };
}

async function expectNoRows(client: SupabaseClient, table: string, filters: Record<string, string>, message: string) {
  let query = client.from(table).select("*");
  for (const [column, value] of Object.entries(filters)) query = query.eq(column, value);
  const result = await query;
  assert(!result.error, `${message}: query itself errored: ${result.error?.message}`);
  assert((result.data ?? []).length === 0, message);
}

async function run() {
  let memberA: TestUser | undefined;
  let memberB: TestUser | undefined;
  let partner: TestUser | undefined;
  let householdA = "";
  let householdB = "";
  let decisionA = "";
  let familyNodeA = "";
  let partnerOrg = "";
  const vaultPath = { value: "" };

  try {
    memberA = await makeUser("member-a");
    memberB = await makeUser("member-b");
    partner = await makeUser("partner");

    const households = await service.from("households").insert([
      { display_name: `RLS Household A ${stamp}`, primary_city: "London" },
      { display_name: `RLS Household B ${stamp}`, primary_city: "Geneva" },
    ]).select("id");
    if (households.error || !households.data || households.data.length !== 2) throw households.error ?? new Error("Could not create households");
    [householdA, householdB] = households.data.map((row) => row.id as string);

    const profileResult = await service.from("profiles").insert([
      { id: memberA.id, household_id: householdA, display_name: "RLS Member A", member_status: "active" },
      { id: memberB.id, household_id: householdB, display_name: "RLS Member B", member_status: "active" },
      { id: partner.id, household_id: null, display_name: "RLS Partner", member_status: "active" },
    ]);
    if (profileResult.error) throw profileResult.error;

    const roleResult = await service.from("user_roles").insert([
      { user_id: memberA.id, role: "member", household_id: householdA },
      { user_id: memberB.id, role: "member", household_id: householdB },
      { user_id: partner.id, role: "partner", household_id: null },
    ]);
    if (roleResult.error) throw roleResult.error;

    const decisionResult = await service.from("decision_rooms").insert({
      household_id: householdA,
      created_by: memberA.id,
      label: "RLS private decision",
      headline: "Household A only",
      central_question: "Can another household see this?",
      definition_of_done: "Only household A and authorised operators can read it.",
    }).select("id").single();
    if (decisionResult.error || !decisionResult.data) throw decisionResult.error ?? new Error("Decision creation failed");
    decisionA = decisionResult.data.id as string;

    const nodeResult = await service.from("family_nodes").insert({
      household_id: householdA,
      node_type: "company",
      label: "RLS Household A Company",
    }).select("id").single();
    if (nodeResult.error || !nodeResult.data) throw nodeResult.error ?? new Error("Family node creation failed");
    familyNodeA = nodeResult.data.id as string;

    const partnerResult = await service.from("partner_organisations").insert({
      name: `RLS Partner Firm ${stamp}`,
      category: "Legal & Tax",
      status: "vetted",
    }).select("id").single();
    if (partnerResult.error || !partnerResult.data) throw partnerResult.error ?? new Error("Partner organisation creation failed");
    partnerOrg = partnerResult.data.id as string;
    const partnerUserResult = await service.from("partner_users").insert({ partner_id: partnerOrg, user_id: partner.id });
    if (partnerUserResult.error) throw partnerUserResult.error;

    // Household isolation.
    const aDecision = await memberA.client.from("decision_rooms").select("id").eq("id", decisionA);
    assert(!aDecision.error && aDecision.data?.length === 1, "Member A must see their own household Decision Room");
    await expectNoRows(memberB.client, "decision_rooms", { id: decisionA }, "Member B must not see Household A Decision Room");
    await expectNoRows(partner.client, "decision_rooms", { id: decisionA }, "Partner authentication must not unlock member Decision Rooms");

    const aNode = await memberA.client.from("family_nodes").select("id").eq("id", familyNodeA);
    assert(!aNode.error && aNode.data?.length === 1, "Member A must see their own family graph node");
    await expectNoRows(memberB.client, "family_nodes", { id: familyNodeA }, "Member B must not see Household A family graph");
    await expectNoRows(partner.client, "family_nodes", { id: familyNodeA }, "Partner must not see family graph data");

    // Partner boundary: own firm record is visible to partner, but private household data is not.
    const ownFirm = await partner.client.from("partner_organisations").select("id").eq("id", partnerOrg);
    assert(!ownFirm.error && ownFirm.data?.length === 1, "Partner must be able to read their own approved organisation record");
    const memberPartnerView = await memberA.client.from("partner_organisations").select("id").eq("id", partnerOrg);
    assert(!memberPartnerView.error && memberPartnerView.data?.length === 1, "Members must be able to read the Trusted Partner directory");

    // Public application table is service-ingested, not anonymously writable from a browser.
    const publicClient = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const anonymousInsert = await publicClient.from("membership_applications").insert({
      application_kind: "individual",
      name: "Should be blocked",
      email: "blocked@example.invalid",
      building: "Test",
      complicated: "Test",
      contribution: "Test",
    });
    assert(Boolean(anonymousInsert.error), "Anonymous clients must not insert membership applications directly");

    // Private vault isolation.
    vaultPath.value = `${householdA}/restricted/rls-${stamp}.txt`;
    const payload = new TextEncoder().encode("synthetic RLS test file — no real member data");
    const upload = await memberA.client.storage.from("family-vault").upload(vaultPath.value, payload, { contentType: "text/plain", upsert: false });
    assert(!upload.error, `Household A should be able to upload its own vault object: ${upload.error?.message}`);
    const ownDownload = await memberA.client.storage.from("family-vault").download(vaultPath.value);
    assert(!ownDownload.error, "Household A should be able to retrieve its own vault object");
    const otherDownload = await memberB.client.storage.from("family-vault").download(vaultPath.value);
    assert(Boolean(otherDownload.error), "Household B must not retrieve Household A vault objects");
    const partnerDownload = await partner.client.storage.from("family-vault").download(vaultPath.value);
    assert(Boolean(partnerDownload.error), "Partner must not retrieve household vault objects");

    console.log("✅ Project Table RLS contract passed");
  } finally {
    if (vaultPath.value) await service.storage.from("family-vault").remove([vaultPath.value]);
    if (householdA || householdB) await service.from("households").delete().in("id", [householdA, householdB].filter(Boolean));
    for (const user of [memberA, memberB, partner]) if (user) await service.auth.admin.deleteUser(user.id);
  }
}

await run();
