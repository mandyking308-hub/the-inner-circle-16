import { createFileRoute } from "@tanstack/react-router";

import { LuxuryStoryPage } from "@/components/marketing/LuxuryStoryPage";
import { site } from "@/config/site";
import { pageImages } from "@/data/pageImages";

export const Route = createFileRoute("/global-life")({
  head: () => ({ meta: [{ title: `The World — ${site.name}` }, { name: "description", content: "Private support for families whose lives span more than one city or country — from schools and homes to trusted people and the practical details around a move." }],
    links: [{ rel: "canonical", href: `${site.url}/global-life` }], }),
  component: GlobalLifePage,
});

function GlobalLifePage() {
  return <LuxuryStoryPage
    eyebrow="The World"
    title="One life. More than one home."
    introduction="London for part of the year. Somewhere warmer when it suits. Children in one place, work in another. The support around you should travel as naturally as you do."
    heroImage={pageImages.globalHero}
    heroAlt="A coastal home overlooking the sea"
    statement="The best move is the one that starts feeling like life, not logistics."
    statementBody="A new city becomes valuable when the family can belong there: the right school, a home that works, trusted people, places you actually enjoy returning to and a rhythm that makes sense beyond the first few weeks."
    feature={{ eyebrow: "Arrive well", title: "A place becomes easier when somebody already knows the terrain.", body: "Local knowledge, warm introductions, schools, homes, travel, healthcare, practical services and the details around daily life can be joined up before the family has to learn everything the hard way.", image: pageImages.globalFeature, imageAlt: "A traveller overlooking the Mediterranean", linkTo: "/concierge", linkLabel: "Private service" }}
    detailsEyebrow="What makes a place work"
    detailsTitle="The useful questions are wider than the postcode."
    details={[
      ["Belonging", "Can the family build a life there that feels natural, interesting and sustainable rather than merely efficient?"],
      ["Children", "Will the school, friendships, curriculum and day-to-day rhythm work for the people who have to live it?"],
      ["Trusted people", "Who do you call locally when the answer matters and a search result is not enough?"],
      ["Timing", "School years, seasons, property, travel and family commitments need to make sense together, not in separate calendars."],
    ]}
    secondary={{ eyebrow: "When it gets serious", title: "The calm feeling on the outside needs good coordination underneath.", body: "Residence, tax, property, banking, schools and family timing can still matter enormously. The private office organises the questions, brings in qualified specialists and keeps the wider family picture visible while those decisions are made.", image: pageImages.globalSecondary, imageAlt: "A quiet private office and study", linkTo: "/decision-room", linkLabel: "See the Decision Room" }}
    closingTitle="Wherever life goes next, you should not have to rebuild your entire world from scratch."
    closingBody="Montvelle is designed to make each new place feel connected to the people, relationships and context you already trust."
  />;
}
