import { createFileRoute } from "@tanstack/react-router";
import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/the-table")({
  head: () => ({ meta: [{ title: `The Table — ${site.name}` }, { name: "description", content: "How Project Table's permanent 8–12 person peer circles work." }] }),
  component: TablePublicPage,
});

function TablePublicPage() {
  return <EditorialDetailPage eyebrow="The Table" title="A personal board that learns your context." introduction="Each Table is a recurring peer circle of roughly eight to twelve members. The same people return, so conversations become more useful as context accumulates." blocks={[
    { kicker: "Curated", title: "Eight to twelve members", body: "Small enough for every person to work, large enough to hold different experience. Tables are matched for trust, relevance and perspective rather than by a single net-worth or job-title threshold." },
    { kicker: "Prepared", title: "Bring a real decision", body: "Members submit genuine challenges before a session. The moderator helps sharpen the question so the room works on the decision rather than listening to a presentation." },
    { kicker: "Balanced", title: "Peer · Pathfinder · Perspective", body: "Some members understand the present problem because they are close to it. Some have already lived through what comes next. Others are deliberately different enough to challenge shared assumptions." },
    { kicker: "Continuous", title: "Commitments survive the dinner", body: "The next session starts with what changed. Members remember what was said, which introduction was promised and whether the decision moved. That continuity is the product." },
    { kicker: "Protected", title: "No pitch, no recording, no theatre", body: "Tables are not showcases for sponsors, advisers or speakers. Commercial expertise can enter when the member asks for it; it does not control the room." },
  ]} closingTitle="A good Table should become difficult to replace." />;
}
