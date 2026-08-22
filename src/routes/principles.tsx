import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";
export const Route = createFileRoute("/principles")({ head: () => ({ meta: [{ title: `Membership Principles — ${site.name}` }] }), component: PrinciplesPage });
function PrinciplesPage() { return <LegalTemplate title="Membership Principles" intro="These principles are the cultural constitution of the product. Final membership terms should reference them, but the language below remains a draft until legal and operational review is complete." sections={[
  { heading: "Character", body: "Treat other members, staff, guests and programme participants with integrity and respect. A high-status person who makes the room unsafe is not a good member." },
  { heading: "Contribution", body: "Participate in good faith. Share relevant experience, judgement and help where appropriate. Do not join solely to harvest relationships, data or commercial opportunity." },
  { heading: "Commitment", body: "Prepare for Tables, attend agreed sessions where reasonably possible, respect other people's time and follow through on commitments or introductions you voluntarily make." },
  { heading: "Confidentiality", body: "Do not attribute, record, publish, forward or commercially exploit another member's private discussion, challenge, family information or contact data without clear permission." },
  { heading: "No solicitation", body: "No unsolicited pitching, poaching, bulk outreach, scraping, lead-list building or paying for access to another member. Relevant business may happen through normal trusted relationships; prospecting is not the product." },
]} />; }
