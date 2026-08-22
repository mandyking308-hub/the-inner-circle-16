import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { conciergeCategories } from "@/data/infrastructure";
import { site } from "@/config/site";

export const Route = createFileRoute("/concierge")({
  head: () => ({
    meta: [
      { title: `Concierge — ${site.name}` },
      { name: "description", content: "A member execution desk for global moves, education, property, travel, access and the complicated jobs between advisers." },
    ],
  }),
  component: ConciergePage,
});

function ConciergePage() {
  return (
    <>
      <EditorialDetailPage
        eyebrow="Concierge & Execution"
        title="Advice is useful. Finished is better."
        introduction="A sophisticated family can have brilliant advisers and still lose days joining the gaps between them. The execution desk exists for the jobs that do not belong neatly to one lawyer, one accountant, one school adviser or one assistant."
        image="/art/concierge-desk.svg"
        imageAlt="Editorial illustration of a concierge execution desk with a request-to-completion workflow"
        imageCaption="One request, one owner, the right specialists — and a visible next action until the job is actually complete."
        blocks={[
          {
            kicker: "Single point of contact",
            title: "Tell one person what you are trying to achieve.",
            body: "The member should not need to know which provider category a problem belongs to. Concierge clarifies the request, identifies dependencies and owns the coordination until a sensible hand-off or completion point.",
          },
          {
            kicker: "Execution",
            title: "Every request has a next action and an owner.",
            body: "The desk tracks requests from intake through clarification, matching, consent, execution and confirmation. Members can see what is waiting on them, what is waiting on a partner and what has actually been done.",
          },
          {
            kicker: "Global reach",
            title: "Local knowledge matters when life crosses borders.",
            body: "A trusted partner network can give members reliable local help in the cities where they live, work and travel — without pretending the platform itself is the regulated specialist in every jurisdiction.",
          },
          {
            kicker: "Benefits",
            title: "Collective relationships should create practical advantages.",
            body: "Where appropriate, partner relationships can create priority response, preferred terms, member clinics, upgrades, access or other tangible benefits. Benefits exist to make membership more useful, not to turn the community into an advertising channel.",
          },
        ]}
        closingTitle="The value is time returned and complexity removed."
        closingBody="The best concierge is not theatrical. It remembers context, finds the right person, coordinates the work and closes the loop."
      />

      <section className="border-t border-border py-16 md:py-24">
        <Container>
          <p className="eyebrow text-bronze">What the desk can coordinate</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {conciergeCategories.map(([title, body]) => (
              <article key={title} className="border border-border bg-card p-6">
                <CheckCircle2 className="h-5 w-5 text-bronze" />
                <h2 className="mt-5 font-display text-3xl">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
