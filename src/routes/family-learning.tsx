import { createFileRoute } from "@tanstack/react-router";

import { LuxuryStoryPage } from "@/components/marketing/LuxuryStoryPage";
import { site } from "@/config/site";
import { luxuryImages } from "@/data/luxuryImages";
import familyGallery from "@/assets/family-gallery-curiosity.jpg";

export const Route = createFileRoute("/family-learning")({
  head: () => ({
    meta: [
      { title: `Families — ${site.name}` },
      { name: "description", content: "A wider world for the next generation: curiosity, confidence, culture, travel and the space to discover what they care about." },
      { property: "og:title", content: `Families — ${site.name}` },
      { property: "og:description", content: "Give them a wider world — curiosity, confidence, culture and the chance to find their place in it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FamilyLearningPage,
});

function FamilyLearningPage() {
  return <LuxuryStoryPage
    eyebrow="Families & the next generation"
    title="Give them a wider world."
    introduction="School is only one part of growing up. Confidence, curiosity, culture, friendships, travel and the chance to discover what they are capable of matter too."
    heroImage={luxuryImages.family}
    heroAlt="A family exploring a city together"
    statement="The best education leaves them curious about the world — and confident enough to find their place in it."
    statementBody="Some of the most valuable experiences happen beyond the classroom: meeting interesting people, trying something for the first time, seeing another culture up close, building an idea, asking better questions and gradually learning to trust their own judgement."
    feature={{ eyebrow: "The world, up close", title: "Let experience become part of how they grow.", body: "A conversation with someone inspiring. A creative project. A journey with a purpose. A first idea brought to life. The right experiences can widen a young person’s sense of what is possible without turning childhood into another timetable.", image: familyGallery, imageAlt: "A young person exploring a sunlit gallery", linkTo: "/alumni", linkLabel: "The rising generation" }}
    detailsEyebrow="A wider education"
    detailsTitle="Keep the strong foundations. Add the things life teaches differently."
    details={[
      ["Curiosity", "Give them room to explore ideas, places and interests that may never appear on a syllabus."],
      ["Confidence", "Help unfamiliar rooms, new people and new experiences begin to feel like places they can belong."],
      ["Independence", "Let them try, decide, make mistakes and discover the quiet confidence that comes from doing things for themselves."],
      ["Stewardship", "As they grow, introduce family stories, responsibility, giving and the idea that opportunity can be something they shape and share."],
    ]}
    secondary={{ eyebrow: "Growing into the world", title: "Their world can open gradually, as they are ready for it.", body: "Mentors, thoughtful introductions, projects, travel and real-world experiences can become part of the years ahead — always at the right pace, with space for them to remain themselves.", image: luxuryImages.world, imageAlt: "A wider international world", linkTo: "/alumni", linkLabel: "The next generation" }}
    closingTitle="Raise young people who feel at home in the world — and free to make something of their own within it."
    closingBody="Montvelle family membership is designed to grow alongside them, opening doors gently as their confidence, interests and independence grow."
  />;
}
