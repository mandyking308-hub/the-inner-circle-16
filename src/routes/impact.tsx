import { createFileRoute } from "@tanstack/react-router";
import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/impact")({
  head: () => ({ meta: [{ title: `Impact — ${site.name}` }, { name: "description", content: "A practical impact and philanthropy strand for members who want to contribute expertise, relationships and capital." }] }),
  component: ImpactPublicPage,
});

function ImpactPublicPage() {
  return <EditorialDetailPage eyebrow="Impact" title="Make contribution part of the institution." introduction="A family or founder community becomes more meaningful when its collective capability can occasionally be pointed at useful problems. Impact is designed as practical work, not virtue signalling." blocks={[
    { title: "Selected projects", body: "The community works with a small number of credible projects where governance, operational need and a realistic route to impact are clear." },
    { title: "Expertise before cheques", body: "A founder may be more useful fixing a delivery problem, opening a door or helping recruit a leader than simply adding another restricted grant." },
    { title: "Family participation", body: "Impact can become shared work across generations — a place to teach judgement, listen to practitioners and discover what responsible stewardship looks like in practice." },
    { title: "No performative access", body: "Beneficiaries are not content, and charitable projects are not a backdrop for member marketing. Privacy and dignity are part of the operating standard." },
    { title: "Measure usefulness", body: "The question is not how many members attended an impact event. It is what changed for the organisation, project or people the community tried to help." },
  ]} />;
}
