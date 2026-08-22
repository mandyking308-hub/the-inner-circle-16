import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";
export const Route = createFileRoute("/privacy")({ head: () => ({ meta: [{ title: `Privacy — ${site.name}` }] }), component: PrivacyPage });
function PrivacyPage() { return <LegalTemplate title="Privacy" intro="This placeholder describes the intended privacy posture of the community. It is not a final privacy notice and must be replaced after the production data map, processors, retention rules and lawful bases are confirmed." sections={[
  { heading: "Data minimisation", body: "Collect only information needed to assess applications, operate membership, curate Tables, manage events and introductions, protect safety, and provide the requested service. Do not collect sensitive family or financial information merely because the community serves wealthy families." },
  { heading: "Member directory", body: "Profiles are private to authorised members and staff. Contact details are hidden by default. Directory data must not be sold, scraped, exported for prospecting or made available to sponsors." },
  { heading: "Introductions", body: "Requests should share enough context for concierge to assess relevance. A recipient's contact details should not be released until that person has consented to the introduction." },
  { heading: "Next generation", body: "Under-18 data requires a separate, safeguarded design with guardian/admin controls, strict role boundaries and no unmanaged adult-to-child messaging." },
  { heading: "Retention and rights", body: "Production policy must define retention periods for applicants, former members, event records, conduct notes and support requests, together with routes for access, correction, deletion and objection where applicable." },
]} />; }
