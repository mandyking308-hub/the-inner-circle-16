import { createFileRoute } from "@tanstack/react-router";
import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/legacy")({
  head: () => ({ meta: [{ title: `Legacy & family enterprise — ${site.name}` }, { name: "description", content: "Governance, succession, family dynamics, risk and philanthropy for entrepreneurial families." }] }),
  component: LegacyPage,
});

function LegacyPage() {
  return <EditorialDetailPage eyebrow="Family enterprise & legacy" title="Create the structure before the crisis creates it for you." introduction="As an enterprise grows, the questions move beyond business performance. Ownership, family roles, advisers, protection, succession and purpose need an architecture of their own." blocks={[
    { title: "Governance", body: "Move important decisions out of one person's head. Clarify what belongs to the board, the family, the owners and the operating company before those roles collide." },
    { title: "Succession", body: "Separate the founder's identity from the jobs of chief executive, owner and chair. A durable enterprise should gradually become capable of operating without one indispensable person." },
    { title: "Family dynamics", body: "Money rarely simplifies relationships. Families need ways to discuss expectations, fairness, participation, conflict and responsibility before inheritance makes every question emotionally expensive." },
    { title: "Risk & protection", body: "Key-person dependency, incapacity, cyber exposure, reputation, adviser concentration and undocumented ownership arrangements deserve the same seriousness as investment risk." },
    { title: "Purpose & philanthropy", body: "Philanthropy can become shared family work: a place to teach judgement, collaborate across generations and turn resources into something larger than private consumption." },
  ]} closingBody="The community is not a substitute for legal, tax or investment advice. It is a place to become a better-informed principal before instructing the right professionals." />;
}
