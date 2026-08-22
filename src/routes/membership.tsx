import { createFileRoute } from "@tanstack/react-router";
import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/membership")({
  head: () => ({ meta: [{ title: `Membership — ${site.name}` }, { name: "description", content: "Who Project Table is for and how membership is curated." }] }),
  component: MembershipPage,
});

function MembershipPage() {
  return <EditorialDetailPage eyebrow="Membership" title="Quality of contribution over proof of wealth." introduction="The founding community is deliberately broad enough to include people creating, governing, investing, advising and giving — but narrow enough that everybody should have a credible reason to be in the room." blocks={[
    { title: "Founders & business owners", body: "People building or leading consequential companies who want peers for decisions beyond ordinary management advice." },
    { title: "Family-enterprise principals", body: "Owners and family members navigating governance, succession, operating roles, investment structures and multigenerational responsibility." },
    { title: "Investors & family offices", body: "Principals and senior operators who can contribute perspective on capital, risk, private markets and the machinery around family assets." },
    { title: "Trusted advisers", body: "A limited number of lawyers, accountants, tax specialists, governance experts and other professionals with demonstrated experience — admitted for judgement, not lead generation." },
    { title: "Philanthropy & impact leaders", body: "People who understand how resources become outcomes and can connect private capability with serious public-purpose work." },
  ]} closingTitle="The founding cohort is curated one person at a time." closingBody="Pricing is intentionally not published during the MVP. First we prove the room, the service and the member experience; then membership plans can be activated without compromising the culture." />;
}
