import { createFileRoute } from "@tanstack/react-router";

import { LuxuryStoryPage } from "@/components/marketing/LuxuryStoryPage";
import { site } from "@/config/site";
import poHeroStudy from "@/assets/po-hero-study.jpg";
import poFamilyMorning from "@/assets/po-family-morning.jpg";
import poPrivateStudyDusk from "@/assets/po-private-study-dusk.jpg";

export const Route = createFileRoute("/concierge")({
  head: () => ({
    meta: [
      { title: `Private Office — ${site.name}` },
      { name: "description", content: "One place that holds the context around a complex life — homes, family, advisers, travel, schools and the decisions between them, kept quietly connected." },
      { property: "og:title", content: `Private Office — ${site.name}` },
      { property: "og:description", content: "When life becomes more complex, it should not feel more complicated." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Private Office — ${site.name}` },
      { name: "twitter:description", content: "When life becomes more complex, it should not feel more complicated." },
    ],
  }),
  component: ConciergePage,
});

function ConciergePage() {
  return <LuxuryStoryPage
    eyebrow="Private Office"
    title="When life becomes more complex, it should not feel more complicated."
    introduction="Homes, family, advisers, travel, schools, decisions and the things that sit between them — held together quietly, so you can see what matters without carrying every detail yourself."
    heroImage={poHeroStudy}
    heroPositionClassName="object-[72%_62%] md:object-[64%_center]"
    heroAlt="A family in quiet conversation with a trusted adviser in a private home library"
    statementEyebrow="The private office"
    statement="The value is not in having more people to call. It is having one place that understands the whole picture."
    statementBody="Montvelle keeps the context around your life connected — the people involved, the decisions already made, what is still moving and what needs attention next. So each request starts with understanding, not from the beginning."
    feature={{ eyebrow: "Day-to-day detail", title: "Tell us what you are trying to make happen.", body: "A school visit. A residence move. A family trip. A trusted introduction. A question that crosses two countries or three advisers. Start with the outcome. We keep the context around it and help the right people move together.", image: poFamilyMorning, imageAlt: "A quiet family morning at home", linkTo: "/world", linkLabel: "The world" }}
    detailsEyebrow="The service standard"
    detailsTitle="Quiet execution matters more than a long menu."
    details={[
      ["Personal", "The service remembers enough about your family and preferences that you do not have to keep explaining the same things."],
      ["Proactive", "Good support notices what is likely to matter next and brings the useful part forward without creating more noise."],
      ["Connected", "When several people are involved, Montvelle helps the right information and next steps stay joined up."],
      ["Discreet", "Private information is handled carefully, introductions happen with context, and access is never confused with entitlement."],
    ]}
    secondary={{ eyebrow: "Behind the service", title: "A private office that remembers the whole picture.", body: "When a request becomes a decision involving advisers, countries, schools, homes, family considerations or something you would rather not manage across five separate conversations, the Private Office keeps the moving parts visible and the context intact.", image: poPrivateStudyDusk, imageAlt: "A quiet private study at dusk inside a family residence", linkTo: "/ecosystem", linkLabel: "Inside the private office" }}
    closingTitle="More time for the life you wanted. Less time managing the life around it."
    closingBody="That is the standard Montvelle is designed around: personal enough to know the context, serious enough to deliver when it matters."
  />;
}
