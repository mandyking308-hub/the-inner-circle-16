import { createFileRoute } from "@tanstack/react-router";
import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/next-gen")({
  head: () => ({ meta: [{ title: `Next Generation — ${site.name}` }, { name: "description", content: "A protected next-generation programme for stewardship, enterprise, technology and philanthropy." }] }),
  component: NextGenPublicPage,
});

function NextGenPublicPage() {
  return <EditorialDetailPage eyebrow="Next generation" title="Education by exposure, not inheritance by surprise." introduction="Young people can learn how enterprise, ownership, money, technology and philanthropy work gradually. The programme is separated from adult confidential spaces and designed around maturity rather than wealth display." blocks={[
    { title: "Stewardship", body: "Understand that ownership creates responsibility: decisions, trade-offs, governance and obligations to people beyond the family." },
    { title: "Entrepreneurship", body: "Build real small projects. Learn customer, cost, execution, failure, iteration and the satisfaction of creating value rather than simply receiving it." },
    { title: "Financial & business literacy", body: "Introduce the language of companies, cash flow, investing, risk and ownership in stages appropriate to age and readiness." },
    { title: "Technology & AI", body: "Teach practical use alongside judgement: privacy, automation, creativity, misinformation, security and when human responsibility cannot be delegated." },
    { title: "Philanthropy", body: "Move beyond writing cheques. Young people learn to understand a problem, test assumptions, listen to practitioners and ask what help is actually useful." },
  ]} closingTitle="Prepare capability before transferring responsibility." closingBody="Under-18 participation requires guardian and programme approval. There is no unmanaged adult-to-child messaging and no access to adult confidential Tables." />;
}
