import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";
export const Route = createFileRoute("/terms")({ head: () => ({ meta: [{ title: `Terms — ${site.name}` }] }), component: TermsPage });
function TermsPage() { return <LegalTemplate title="Terms of membership & use" intro="This is a product placeholder, not final contractual language. Final terms must reflect the legal entity, membership model, pricing, cancellations, event terms, liability position and governing law selected before launch." sections={[
  { heading: "Membership is personal", body: "A membership seat is granted to the approved person or family under the relevant plan. Access credentials, private materials and member data must not be shared with unauthorised third parties." },
  { heading: "No guaranteed commercial outcome", body: "Membership provides community, peer discussion, events, curated knowledge and introduction services. It does not guarantee investment returns, clients, funding, transactions or professional advice." },
  { heading: "Professional advice", body: "Community discussions and educational materials are not substitutes for legal, tax, investment, medical or other regulated professional advice. Members remain responsible for obtaining appropriate advice for their own circumstances." },
  { heading: "Conduct", body: "Confidentiality, no solicitation, respect for consent, lawful behaviour and safeguarding requirements form part of the membership standard. Serious or repeated breaches may lead to suspension or termination." },
  { heading: "Changes and cancellation", body: "Production terms must set out renewal, cancellation, refund, suspension and material-change rules clearly before paid memberships are activated." },
]} />; }
