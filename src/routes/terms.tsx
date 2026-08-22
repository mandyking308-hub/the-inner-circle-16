import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: `Terms — ${site.name}` }, { name: "description", content: "Core terms governing access to Project Table membership, community spaces and services." }] }),
  component: TermsPage,
});

function TermsPage() {
  return <LegalTemplate title="Terms of membership & use" intro="Project Table is a private membership community. Access is personal, confidential and subject to the standards that protect the quality of the room. Specific commercial terms, service levels and fees are confirmed separately when a membership relationship is agreed." sections={[
    { heading: "Membership is personal", body: "A membership seat is granted to the approved person or family under the agreed membership relationship. Credentials, private materials, member information and confidential spaces must not be shared with unauthorised third parties." },
    { heading: "Community services", body: "Membership may include peer Tables, gatherings, introductions, knowledge, Decision Rooms, Global Life coordination, Concierge, family learning, Trusted Partner access and other services made available to the relevant membership relationship. Availability can vary by programme, location and capacity." },
    { heading: "No guaranteed commercial outcome", body: "Membership is designed to improve judgement, relationships, coordination and access to useful expertise. It does not guarantee clients, funding, investment returns, transactions, school places, immigration outcomes, professional results or any other commercial or personal result." },
    { heading: "Professional advice", body: "Community discussions, tools and educational materials are not substitutes for legal, tax, investment, medical, immigration, fiduciary or other regulated professional advice. Members remain responsible for instructing appropriate professionals for their own circumstances." },
    { heading: "Introductions and Trusted Partners", body: "An introduction is not an endorsement or guarantee. Members choose whether to instruct a professional or transact with another person and remain responsible for their own due diligence. Any material referral or commercial arrangement affecting a recommendation should be disclosed." },
    { heading: "Conduct", body: "Confidentiality, respect for consent, no solicitation, lawful behaviour, appropriate safeguarding and respect for other members, staff and guests form part of the membership standard. Serious or repeated breaches may lead to restricted access, suspension or termination." },
    { heading: "Events and access", body: "Some gatherings have limited capacity, approval requirements or private locations. An invitation, RSVP or waitlist request does not guarantee attendance until confirmed. Members must respect venue, guest, photography and confidentiality rules communicated for the event." },
    { heading: "Fees, renewals and changes", body: "Membership fees, renewal terms, cancellation rights and any service-specific charges are set out in the commercial terms agreed with the member. Material changes to those terms should be communicated directly rather than hidden inside product updates." },
    { heading: "Suspension and termination", body: "Access may be restricted or ended where membership terms are not met, fees remain unpaid, safety or confidentiality is at risk, or continued membership would materially damage the community. Where appropriate, context should be reviewed by a human before a final decision." },
    { heading: "Governing framework", body: "The final membership agreement identifies the contracting entity, applicable law, dispute process and any additional legal terms that apply to the member's relationship with Project Table." },
  ]} />;
}
