import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/confidentiality")({
  head: () => ({ meta: [{ title: `Confidentiality & No Solicitation — ${site.name}` }, { name: "description", content: "The confidentiality, consent and no-solicitation standard that protects Montvelle member spaces." }] }),
  component: ConfidentialityPage,
});

function ConfidentialityPage() {
  return <LegalTemplate title="Confidentiality & No Solicitation" intro="People will only bring the real problem into the room if they believe the room will protect it. Confidentiality is therefore a membership behaviour, a product design principle and an operating responsibility across Montvelle." sections={[
    { heading: "What is private", body: "Table challenges, private discussion, member-only posts, contact information, family circumstances, ownership information, adviser context, Decision Rooms, concierge cases, private venue details and any material clearly shared in confidence should be treated as confidential whether it is spoken, written, visual or digital." },
    { heading: "Use the learning, not the identity", body: "Members may use ideas and learning from the community in their own decision-making, provided they do not reveal another person's identity, confidential facts, commercially sensitive information, family circumstances or information from which the person could reasonably be identified without permission." },
    { heading: "No recording, forwarding or model training by default", body: "Private sessions and materials must not be recorded, transcribed, photographed, screenshotted, forwarded, uploaded to public or third-party AI systems, used to train models, or published unless the people involved and Montvelle have clearly authorised that use. Montvelle-controlled AI features should follow the privacy and permission boundaries stated for the relevant service." },
    { heading: "No solicitation or harvesting", body: "Unrequested sales approaches, bulk outreach, lead harvesting, recruitment poaching, scraping, list-building, data enrichment of the member directory and repeated commercially motivated introduction requests are not acceptable uses of membership or partner access." },
    { heading: "Consent-based introductions", body: "Concierge should establish a credible reason to connect, share only the context required to assess relevance and obtain the recipient's agreement before releasing private contact details or making an introduction. A refusal or non-response must not be treated as permission." },
    { heading: "Trusted Partner firewall", body: "A partner relationship does not purchase member identities, confidential Table access or the right to prospect. Partners receive member context only where a member has requested or consented to a relevant service conversation and only to the extent reasonably required for that purpose." },
    { heading: "Staff, suppliers and advisers", body: "People working for or on behalf of Montvelle should receive confidential member information only on a need-to-know basis and be subject to appropriate confidentiality, security and data-protection obligations. Independent professional advisers remain subject to their own professional duties once instructed." },
    { heading: "Legal and safety exceptions", body: "Confidentiality does not prevent disclosure where law, court order, regulatory duty, safeguarding obligations or an urgent and credible threat to safety requires it. Any such disclosure should be limited to what is reasonably required and handled by an appropriately authorised person." },
    { heading: "Concerns and enforcement", body: "Members need a confidential route to report suspected breaches. Montvelle may investigate, preserve relevant evidence and take proportionate action, including restricted access, suspension or termination. Serious breaches may also create contractual, legal or professional consequences outside the membership relationship." },
  ]} />;
}
