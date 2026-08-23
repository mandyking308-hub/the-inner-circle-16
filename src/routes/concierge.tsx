import { createFileRoute } from "@tanstack/react-router";

import { LuxuryStoryPage } from "@/components/marketing/LuxuryStoryPage";
import { site } from "@/config/site";
import { pageImages } from "@/data/pageImages";

export const Route = createFileRoute("/concierge")({
  head: () => ({ meta: [{ title: `Private Office — ${site.name}` }, { name: "description", content: "Discreet personal support for travel, access, family, education, property, relocation, trusted introductions and the practical details around a well-lived life." }],
    links: [{ rel: "canonical", href: `${site.url}/concierge` }], }),
  component: ConciergePage,
});

function ConciergePage() {
  return <LuxuryStoryPage
    eyebrow="Private Office"
    title="Life should feel beautifully handled."
    introduction="The reservation. The school visit. The family trip. The house in another city. The introduction you would rather receive through somebody trusted. The detail you simply do not want to spend another afternoon chasing."
    heroImage={pageImages.conciergeHero}
    heroAlt="Discreet hospitality and personal service"
    statement="The best concierge relationship stops feeling like concierge at all."
    statementBody="The value is not a longer list of services. It is context, judgement and continuity: one place that understands enough of the member's world to make each next request easier than the last."
    feature={{ eyebrow: "One point of context", title: "Tell us what you are trying to make happen.", body: "Travel, access, homes, education, restaurants, healthcare, family plans, cultural moments, trusted specialists and the unusual requests in between can all begin in the same place. We carry the context and stay with the request until there is a useful answer.", image: pageImages.conciergeFeature, imageAlt: "A traveller enjoying a beautiful destination", linkTo: "/global-life", linkLabel: "The World" }}
    detailsEyebrow="The service standard"
    detailsTitle="Quiet execution matters more than a long menu."
    details={[
      ["Personal", "The service remembers enough about the member and family for help to feel considered, not transactional."],
      ["Proactive", "The best support notices what comes next and brings useful ideas before every need becomes another task."],
      ["Connected", "A trusted specialist, a member introduction, a travel plan and a family priority can sit in the same context rather than separate inboxes."],
      ["Discreet", "Sensitive information is handled carefully and introductions happen with consent. Access is never an excuse to turn members into leads."],
    ]}
    secondary={{ eyebrow: "Behind the service", title: "A private office that remembers the whole picture.", body: "When a request becomes a decision involving advisers, countries or family consequences, the deeper operating layer can organise the questions, surface what is missing and keep next actions visible without turning the experience into software theatre.", image: pageImages.conciergeSecondary, imageAlt: "A quiet private office and study", linkTo: "/ecosystem", linkLabel: "Inside the private office" }}
    closingTitle="More time for the life you wanted. Less time managing the life around it."
    closingBody="That is the standard Montvelle is designed around: personal enough to know the context, serious enough to deliver when it matters."
  />;
}
