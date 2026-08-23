import { createFileRoute } from "@tanstack/react-router";

import { LuxuryStoryPage } from "@/components/marketing/LuxuryStoryPage";
import { site } from "@/config/site";
import { pageImages } from "@/data/pageImages";

export const Route = createFileRoute("/gatherings")({
  head: () => ({ meta: [{ title: `Gatherings — ${site.name}` }, { name: "description", content: "Private dinners, cultural evenings, family weekends, salons, breakfasts and retreats designed to create belonging, memory and useful relationships." }],
    links: [{ rel: "canonical", href: `${site.url}/gatherings` }], }),
  component: GatheringsPage,
});

function GatheringsPage() {
  return <LuxuryStoryPage
    eyebrow="Gather"
    title="The rooms you remember."
    introduction="A dinner in Mayfair. A private conversation in Geneva. A family weekend. A cultural evening. A breakfast that introduces you to somebody who becomes part of the next chapter."
    heroImage={pageImages.gatheringsHero}
    heroAlt="An intimate private dinner"
    statement="The point is not to fill a calendar. It is to be glad you came."
    statementBody="The strongest gatherings feel considered rather than programmed. The guest list has a reason. The room is beautiful without becoming the subject. Conversation has enough time to become natural."
    feature={{ eyebrow: "Private programme", title: "Different rooms for different moments in life.", body: "Private dinners, breakfasts, salons, family programmes, retreats, cultural moments and impact visits each create a different kind of connection. Fewer events, better reasons to attend.", image: pageImages.gatheringsFeature, imageAlt: "A cultural experience in an international city", linkTo: "/the-table", linkLabel: "The permanent Table" }}
    detailsEyebrow="What makes the room special"
    detailsTitle="The atmosphere starts with the people."
    details={[
      ["A reason", "Everybody should understand why this particular group of people has been brought together."],
      ["Enough difference", "The best rooms are not twelve versions of the same person. Perspective makes conversation more interesting."],
      ["Ease", "No forced networking, name-badge theatre or pressure to perform. People should be allowed to enjoy themselves."],
      ["Something that lasts", "A friendship, an introduction, a new idea, a place discovered or simply a night members genuinely want to repeat."],
    ]}
    secondary={{ eyebrow: "Private by design", title: "Not every beautiful moment needs to become content.", body: "Member names, private conversations and intimate family moments are not marketing material. Where photography is appropriate, consent matters. Where it is not, the memory belongs to the people who were there.", image: pageImages.gatheringsSecondary, imageAlt: "Discreet hospitality and service" }}
    closingTitle="A great private world is built one memorable room at a time."
    closingBody="Membership opens access to the permanent Table and a wider programme designed around people, place, culture and life beyond work."
  />;
}
