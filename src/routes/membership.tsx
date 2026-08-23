import { createFileRoute } from "@tanstack/react-router";

import { LuxuryStoryPage } from "@/components/marketing/LuxuryStoryPage";
import { site } from "@/config/site";
import { pageImages } from "@/data/pageImages";

export const Route = createFileRoute("/membership")({
  head: () => ({ meta: [{ title: `Membership — ${site.name}` }, { name: "description", content: "Private membership for founders, family enterprises and globally minded families — bringing together belonging, global life, family, trusted people and private service." }] }),
  component: MembershipPage,
});

function MembershipPage() {
  return <LuxuryStoryPage
    eyebrow="Membership"
    title="A private world that grows with the life around it."
    introduction="The right people. Beautiful gatherings. A world that travels with you. More for the family. Trusted help when you need it. And, behind all of that, a serious private office."
    heroImage={pageImages.membershipHero}
    heroAlt="A traveller overlooking the Mediterranean"
    statement="Come for the world around it. Stay because the relationships become part of your life."
    statementBody="Some members will first value the Table. Others will arrive through travel, family, trusted introductions or private service. The strongest membership relationship is the one that becomes more useful as the member's life changes."
    feature={{ eyebrow: "Around the member", title: "One relationship. Different parts of life.", body: "Belonging, gatherings, global life, family learning, warm introductions and private service do not need to feel like separate subscriptions. They sit around the same member, with the deeper private-office tools available when the question needs more structure.", image: pageImages.membershipFeature, imageAlt: "A private members gathering", linkTo: "/the-table", linkLabel: "Discover The Table" }}
    detailsEyebrow="Who it is for"
    detailsTitle="Curated quietly, around the person rather than the scoreboard."
    details={[
      ["Founders & owners", "People carrying meaningful responsibility who value peers, perspective and a life beyond the next transaction."],
      ["Family principals", "Families thinking across generations, places, ownership, education, relationships and what stewardship should look like next."],
      ["Investors & operators", "Experienced people whose judgement, curiosity and lived experience make the room more useful to others."],
      ["Trusted specialists", "A small, separate partner layer for exceptional advisers who contribute expertise and earn trust without buying access to member relationships."],
    ]}
    secondary={{ eyebrow: "Selective by design", title: "Membership begins with fit, not checkout.", body: "We get to know the person, the family context and the kind of relationship that would make membership genuinely valuable. There is no automated shortcut around curation and no public wealth league table.", image: pageImages.membershipSecondary, imageAlt: "A beautiful international home and landscape", linkTo: "/principles", linkLabel: "Membership principles" }}
    closingEyebrow="Founding membership"
    closingTitle="A small private world, built carefully enough that people want to remain part of it."
    closingBody="If it feels like your kind of room, request membership and begin with a private conversation."
  />;
}
