import { createFileRoute } from "@tanstack/react-router";
import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/gatherings")({
  head: () => ({ meta: [{ title: `Gatherings — ${site.name}` }, { name: "description", content: "Private dinners, breakfasts, salons, masterclasses, retreats and impact visits." }] }),
  component: GatheringsPage,
});

function GatheringsPage() {
  return <EditorialDetailPage eyebrow="Gatherings" title="Good rooms, deliberately small." introduction="The wider community meets beyond the permanent Table, but we do not measure success by event volume. Each gathering should have a reason to exist and a guest list that improves the conversation." blocks={[
    { title: "Private dinners", body: "Beautiful but discreet rooms, usually one serious question and enough time for a real conversation. No stage, sponsor roll-call or forced networking ritual." },
    { title: "Breakfast Tables", body: "Shorter working sessions for practical issues such as governance, hiring, family-office setup, international expansion or technology decisions." },
    { title: "Salons & masterclasses", body: "Experienced members or invited specialists help the community examine a difficult subject. Expertise serves the room; the room is not an audience to be sold to." },
    { title: "Family & next-gen programmes", body: "Selected sessions can involve spouses, adult children or protected next-generation groups where the subject is stewardship, enterprise, technology or philanthropy." },
    { title: "Impact visits & retreats", body: "Occasional deeper experiences give members time to understand a problem, work together and build relationships beyond a two-hour London event." },
  ]} />;
}
