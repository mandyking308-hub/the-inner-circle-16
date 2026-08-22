import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/principles")({
  head: () => ({ meta: [{ title: `Membership Principles — ${site.name}` }, { name: "description", content: "The cultural constitution of Project Table membership: character, contribution, commitment, confidentiality and no solicitation." }] }),
  component: PrinciplesPage,
});

function PrinciplesPage() {
  return <LegalTemplate title="Membership Principles" intro="The quality of a private community is not created by the room, the app or the membership fee. It is created by what members can expect from one another. These principles are the cultural constitution of Project Table." sections={[
    { heading: "Character", body: "Treat members, staff, guests and programme participants with integrity and respect. Status does not excuse behaviour that makes a room less safe, less useful or less honest." },
    { heading: "Contribution", body: "Participate in good faith. Share relevant experience, judgement and help where appropriate. Do not join solely to harvest relationships, data, prestige or commercial opportunity." },
    { heading: "Commitment", body: "Prepare for Tables, attend agreed sessions where reasonably possible, respect other people's time and follow through on commitments or introductions you voluntarily make." },
    { heading: "Confidentiality", body: "Do not attribute, record, publish, forward or commercially exploit another member's private discussion, challenge, family information, Decision Room or contact data without clear permission." },
    { heading: "No solicitation", body: "No unsolicited pitching, poaching, bulk outreach, scraping, lead-list building or paying for access to another member. Relevant business may emerge from trusted relationships; prospecting is not the purpose of membership." },
    { heading: "Consent", body: "An introduction, photograph, family detail, contact method or opportunity should travel only as far as the person involved has agreed. Private by default is the safer starting point." },
    { heading: "Stewardship", body: "Members should leave the community stronger than they found it — by sharing useful experience, creating opportunities, supporting the next generation, contributing where they can and protecting the quality of the room for those who follow." },
  ]} />;
}
