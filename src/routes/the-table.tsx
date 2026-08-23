import { createFileRoute } from "@tanstack/react-router";

import { LuxuryStoryPage } from "@/components/marketing/LuxuryStoryPage";
import { site } from "@/config/site";
import { pageImages } from "@/data/pageImages";

export const Route = createFileRoute("/the-table")({
  head: () => ({ meta: [{ title: `The Table — ${site.name}` }, { name: "description", content: "A permanent private circle for people who value trust, thoughtful conversation and relationships that deepen over time." }],
    links: [{ rel: "canonical", href: `${site.url}/the-table` }], }),
  component: TheTablePage,
});

function TheTablePage() {
  return <LuxuryStoryPage
    eyebrow="Belong"
    title="The room that becomes part of your life."
    introduction="A permanent private circle: familiar enough for honesty, varied enough to surprise you, and small enough for relationships to become real."
    heroImage={pageImages.tableHero}
    heroAlt="Friends gathering around a private dinner table"
    statement="The first dinner can be interesting. The tenth can be important."
    statementBody="People remember what you were thinking about last year, the move you were considering, the child choosing a school, the business decision that kept changing shape and what happened next. That continuity is the difference between meeting people and actually knowing them."
    feature={{ eyebrow: "A permanent circle", title: "The people are the point.", body: "Founders, owners, investors, family principals and a small number of people whose judgement, experience and curiosity make the room better. No public wealth scoreboard. No cold pitching. No audience to perform for.", image: pageImages.tableFeature, imageAlt: "People sharing culture and conversation", linkTo: "/gatherings", linkLabel: "Explore Gatherings" }}
    detailsEyebrow="What makes the room work"
    detailsTitle="Trust grows through repetition, not networking theatre."
    details={[
      ["Familiar faces", "The same circle returns, so conversations can begin where the last one ended instead of starting again from biographies."],
      ["Good difference", "Age, discipline, background and perspective should make the room more useful, not less comfortable."],
      ["Privacy", "The room exists for the people in it. What is shared privately stays private and member access is never a sponsorship product."],
      ["Life beyond dinner", "Friendships, introductions, ideas and practical help can continue naturally once trust has had time to form."],
    ]}
    secondary={{ eyebrow: "Beyond the Table", title: "One good room should open into a much bigger world.", body: "Gatherings, warm introductions, global life, family experiences and private service sit around the Table so the relationships can become useful in ordinary life as well as memorable in the room.", image: pageImages.tableSecondary, imageAlt: "A beautiful international destination", linkTo: "/global-life", linkLabel: "The World" }}
    closingTitle="The right circle should feel more like a place you belong than a network you joined."
    closingBody="Membership begins with fit, chemistry and the belief that the existing room becomes better with you in it."
  />;
}
