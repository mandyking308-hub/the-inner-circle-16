import { createFileRoute } from "@tanstack/react-router";

import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/global-life")({
  head: () => ({
    meta: [
      { title: `Global Life — ${site.name}` },
      { name: "description", content: "A coordinated operating layer for residence, tax, education, property, banking and family life across borders." },
    ],
  }),
  component: GlobalLifePage,
});

function GlobalLifePage() {
  return (
    <EditorialDetailPage
      eyebrow="Global Life"
      title="A move is never just a visa."
      introduction="Internationally mobile families quickly discover that residence, tax, companies, trusts, schools, property, banking, insurance and ordinary family logistics collide. The value is not another adviser in isolation. It is a place where the whole decision can be seen at once."
      image="/art/global-life.svg"
      imageAlt="Editorial illustration of a global life planning map with a globe, passport, home and move room"
      imageCaption="The member owns the decision. Qualified specialists own the regulated advice. The platform owns the coordination."
      blocks={[
        {
          kicker: "Optionality",
          title: "Compare jurisdictions as lives, not tax tables.",
          body: "A country can look attractive on one spreadsheet and fail when school calendars, travel days, healthcare, work, family support, property and long-term residence rights are considered together. Global Life keeps the decision multidimensional.",
        },
        {
          kicker: "Coordination",
          title: "One question list across multiple advisers.",
          body: "Tax counsel, immigration specialists, accountants, trustees and education advisers often answer different pieces of the same move. Members can keep a single decision room showing unresolved questions, dependencies, advice received and what still needs reconciling.",
        },
        {
          kicker: "Structure",
          title: "See what a move changes before it changes you.",
          body: "Companies, trusts, property, insurance, banking and philanthropy may all be affected by residence. The platform maps those moving parts before the member formally instructs specialists to implement changes.",
        },
        {
          kicker: "Family",
          title: "Education is part of the mobility strategy.",
          body: "School quality, year-group entry, language, travel time, curriculum continuity and a child’s social life can determine whether a theoretically perfect jurisdiction works in practice. Family decisions belong in the same room as legal ones.",
        },
        {
          kicker: "Execution",
          title: "Turn advice into an ordered plan.",
          body: "A relationship manager or concierge can help convert a complicated move into an execution sequence: decide, instruct, collect documents, apply, open accounts, secure housing, settle schooling, update insurance and monitor the key dates afterwards.",
        },
      ]}
      closingTitle="Global mobility should create optionality, not administrative chaos."
      closingBody="Members use the Global Life Desk to organise the problem, then work with appropriate qualified professionals for legal, tax, immigration, fiduciary and regulated advice."
    />
  );
}
