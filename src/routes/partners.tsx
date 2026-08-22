import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { partnerValue } from "@/data/infrastructure";
import { site } from "@/config/site";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: `Trusted Partners — ${site.name}` },
      { name: "description", content: "A curated provider network where credibility is earned, introductions are consent-led and member data is never sold." },
    ],
  }),
  component: PartnersPage,
});

function PartnersPage() {
  return (
    <>
      <EditorialDetailPage
        eyebrow="Trusted Partners"
        title="Useful professionals without turning the room into a marketplace."
        introduction="Members need excellent lawyers, tax advisers, trustees, education specialists, security firms, recruiters, property people and concierge partners. The answer is not to let suppliers buy a ticket into the room. It is to build a trusted provider layer with clear standards, consent and accountability."
        image="/art/partner-network.svg"
        imageAlt="Editorial illustration of a member connected through consent-led routes to specialist trusted partners"
        imageCaption="The firewall is deliberate: partners can earn trust, solve briefs and teach useful material, but they do not buy member identities or cold access."
        blocks={[
          {
            kicker: "Trust status",
            title: "Recommendation should mean something.",
            body: "Member Recommended means a member has actually used and recommended the firm. Vetted Partner adds references and due diligence. Strategic Partner means a deeper service or benefit relationship. None of those labels is purchased simply by paying a listing fee.",
          },
          {
            kicker: "Consent",
            title: "Context before contact.",
            body: "A member can request a provider, describe the problem and ask concierge to broker an introduction. The partner sees the brief only to the level required, and the member chooses whether contact details are released.",
          },
          {
            kicker: "Commercial value",
            title: "Partners get qualified demand, not a database.",
            body: "High-quality firms benefit from serious briefs, credibility, expert programming, research participation, partner-to-partner referrals and the ability to create meaningful member benefits. The commercial value comes from relevance and trust rather than volume.",
          },
          {
            kicker: "Standards",
            title: "Service quality feeds the directory.",
            body: "After a completed request, members can privately rate responsiveness, expertise, clarity and outcome. Patterns help concierge decide which firms remain visible, require review or should be removed.",
          },
          {
            kicker: "Expertise",
            title: "Teach before you sell.",
            body: "Partners can contribute practical guides, office hours, clinics and expert sessions where the subject matter genuinely helps families make better decisions. Promotional content is secondary to usefulness.",
          },
        ]}
        closingTitle="The best partners should want to earn a place here."
        closingBody="The partner programme is designed to reward firms that understand complex families, collaborate well with other advisers and consistently execute."
      />

      <section className="border-t border-border bg-card py-16 md:py-24">
        <Container>
          <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-bronze" /><p className="eyebrow">Why partners participate</p></div>
          <div className="mt-8 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {partnerValue.map((item) => (
              <article key={item.title} className="bg-background p-6 md:p-7">
                <h2 className="font-display text-3xl leading-tight">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
