import { createFileRoute } from "@tanstack/react-router";

import { LuxuryStoryPage } from "@/components/marketing/LuxuryStoryPage";
import { site } from "@/config/site";
import { luxuryImages } from "@/data/luxuryImages";

export const Route = createFileRoute("/family-learning")({
  head: () => ({ meta: [{ title: `Families — ${site.name}` }, { name: "description", content: "A private family learning experience combining strong education with confidence, culture, practical capability, mentors and real-world opportunity." }] }),
  component: FamilyLearningPage,
});

function FamilyLearningPage() {
  return <LuxuryStoryPage
    eyebrow="Families & the next generation"
    title="Give them a wider world."
    introduction="School is one part of education. Confidence, judgement, curiosity, culture and the ability to make something happen are part of it too."
    heroImage={luxuryImages.family}
    heroAlt="A family exploring a city together"
    statement="The best education should make the world feel larger, not simply more competitive."
    statementBody="Young people need room to discover what they care about, meet interesting adults, build things, travel, learn how money and organisations work, recover from mistakes and gradually become capable in the world beyond school."
    feature={{ eyebrow: "Real life, up close", title: "Capability grows when experience becomes real.", body: "A small venture. A cultural trip. A presentation to adults. A technology project. A giving initiative. Founder shadowing. A mentor who expects a thoughtful answer. The aim is evidence of capability, not another timetable full of activities.", image: luxuryImages.culture, imageAlt: "Culture, learning and real-world experience", linkTo: "/alumni", linkLabel: "The rising-generation pathway" }}
    detailsEyebrow="A fuller education"
    detailsTitle="Keep the strong foundations. Add what life will ask of them later."
    details={[
      ["Judgement", "Learn to weigh options, ask better questions and make decisions without waiting for somebody to provide the answer sheet."],
      ["Confidence", "Meet adults, enter unfamiliar rooms, travel, present ideas and learn that capability can be practised."],
      ["Commercial fluency", "Understand money, enterprise, technology, ownership and how value is actually created in the world around them."],
      ["Stewardship", "Explore family stories, giving, responsibility and what it means to inherit opportunity without being defined by it."],
    ]}
    secondary={{ eyebrow: "Growing into the network", title: "The world should open gradually as they are ready for it.", body: "Mentors, project briefs, internships, alumni relationships and trusted introductions can deepen over time, with protected boundaries between young people and adult confidential spaces.", image: luxuryImages.world, imageAlt: "A wider international world", linkTo: "/alumni", linkLabel: "The Continuum" }}
    closingTitle="Raise young people who feel at home in the world — and know how to contribute to it."
    closingBody="Family membership is designed to grow alongside the people who will eventually carry the relationships, judgement and stewardship forward."
  />;
}
