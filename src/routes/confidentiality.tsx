import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";
export const Route = createFileRoute("/confidentiality")({ head: () => ({ meta: [{ title: `Confidentiality & No Solicitation — ${site.name}` }] }), component: ConfidentialityPage });
function ConfidentialityPage() { return <LegalTemplate title="Confidentiality & No Solicitation" intro="This draft translates the cultural rule into product behaviour. It requires final legal review before it becomes a binding membership term." sections={[
  { heading: "What is private", body: "Table challenges, private discussion, member-only posts, contact information, family circumstances, ownership information, event venue details and any material clearly shared in confidence should be treated as confidential." },
  { heading: "What members may do", body: "Members may use ideas and learning from the community in their own decision-making, provided they do not reveal another person's identity, confidential facts or commercially sensitive information without permission." },
  { heading: "Solicitation", body: "Unrequested sales approaches, bulk outreach, lead harvesting, recruitment poaching and repeated commercially motivated introduction requests are not acceptable uses of membership." },
  { heading: "Consent-based introductions", body: "Concierge should first establish a credible reason to connect and obtain the recipient's agreement before releasing contact details or making the introduction." },
  { heading: "Concerns and enforcement", body: "Members need a simple confidential route to report suspected breaches. Staff should review context and make human decisions; serious or repeated violations may justify restricted access, suspension or termination." },
]} />; }
