import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/confidentiality")({
  head: () => ({ meta: [{ title: `Confidentiality & No Solicitation — ${site.name}` }, { name: "description", content: "The confidentiality, consent and no-solicitation standard that protects Montvelle member spaces." }] }),
  component: ConfidentialityPage,
});

function ConfidentialityPage() {
  return <LegalTemplate title="Confidentiality & No Solicitation" intro="People will only bring the real problem into the room if they believe the room will protect it. Confidentiality is therefore a membership behaviour, a product design principle and an operating responsibility." sections={[
    { heading: "What is private", body: "Table challenges, private discussion, member-only posts, contact information, family circumstances, ownership information, adviser context, Decision Rooms, private venue details and any material clearly shared in confidence should be treated as confidential." },
    { heading: "Use the learning, not the identity", body: "Members may use ideas and learning from the community in their own decision-making, provided they do not reveal another person's identity, confidential facts, commercially sensitive information or family circumstances without permission." },
    { heading: "No recording or forwarding by default", body: "Private sessions should not be recorded, transcribed, photographed, screenshotted, forwarded or published unless the people involved have clearly agreed to that use." },
    { heading: "No solicitation", body: "Unrequested sales approaches, bulk outreach, lead harvesting, recruitment poaching, scraping, list-building and repeated commercially motivated introduction requests are not acceptable uses of membership or partner access." },
    { heading: "Consent-based introductions", body: "Concierge should establish a credible reason to connect, share only the context required to assess relevance and obtain the recipient's agreement before releasing contact details or making the introduction." },
    { heading: "Supplier and specialist firewall", body: "A commercial relationship with Montvelle does not purchase member identities, visibility inside Montvelle, listing to members, confidential Table or Decision Room access, or any right to prospect. Suppliers and specialists receive member context only where a member has asked for that work or consented to that conversation, and only the minimum necessary for it. There is no member-facing provider directory and no provider-facing member directory." },
    { heading: "Concerns and enforcement", body: "Members need a confidential route to report suspected breaches. Staff should review context and make proportionate human decisions; serious or repeated violations may justify restricted access, suspension or termination." },
  ]} />;
}
