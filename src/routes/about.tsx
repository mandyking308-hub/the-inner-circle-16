import { createFileRoute } from "@tanstack/react-router";
import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: `About — ${site.name}` }, { name: "description", content: "Why Project Table exists and the principles that protect the room." }] }),
  component: AboutPage,
});

function AboutPage() {
  return <EditorialDetailPage eyebrow="About" title="Not another networking club." introduction="Project Table is being built as a trust system for people carrying unusual responsibility: a permanent peer room, a wider community, discreet gatherings and a human introduction layer." blocks={[
    { title: "Character before status", body: "A famous name, impressive balance sheet or senior title does not automatically improve a room. Admission asks whether somebody can be trusted with other people's candour and whether they contribute without dominating." },
    { title: "Contribution before consumption", body: "Members should be willing to share judgement, experience, introductions and time. The community becomes weaker when people join only to extract deal flow, clients or access." },
    { title: "Confidentiality by default", body: "Private challenges stay private. Member data is not sold. Contact details are not exposed by default. Introductions are consent-based. Tables are not recorded or turned into content." },
    { title: "No solicitation", body: "Business can naturally emerge between people who trust one another. What is not allowed is treating the community as a prospecting database, pitching at Tables, poaching or buying proximity to members." },
    { title: "Small before scalable", body: "The founding community should become excellent before it becomes large. The first proof is that members would notice if the room disappeared — not that the database contains thousands of names." },
  ]} />;
}
