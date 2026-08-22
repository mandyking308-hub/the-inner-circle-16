import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, HeartHandshake, Network, Presentation } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: `Rising Generation & Alumni — ${site.name}` },
      { name: "description", content: "A protected pathway from family learning into mentors, projects, apprenticeships, opportunity and adult peer community." },
    ],
  }),
  component: AlumniPage,
});

function AlumniPage() {
  return (
    <>
      <EditorialDetailPage
        eyebrow="The Continuum"
        title="The network should not end when school does."
        introduction="Young people need somewhere to go between education and full adult responsibility. The Continuum is a protected rising-generation and alumni network where capability turns into work, relationships, judgement and eventually leadership."
        image="/art/alumni-path.svg"
        imageAlt="Editorial illustration of a rising generation pathway from learning to building, apprenticeship, leadership and mentoring"
        imageCaption="Learn → build → apprentice → lead → mentor. The final stage of the programme is giving value back to the next cohort."
        blocks={[
          {
            kicker: "16+",
            title: "A separate room for emerging adults.",
            body: "Older teenagers and young adults need age-appropriate peer relationships and opportunities without being dropped straight into adult confidential family discussions. Access can expand as maturity, permissions and responsibilities change.",
          },
          {
            kicker: "Experience",
            title: "Projects before job titles.",
            body: "Members and trusted partners can offer tightly scoped project briefs, founder shadowing, apprenticeships, internships and problem-solving challenges that produce real evidence of capability.",
          },
          {
            kicker: "Mentorship",
            title: "Borrow judgement before you have decades of your own.",
            body: "Mentor office hours and small peer circles give rising-generation members access to people who can answer the questions school rarely covers: how to enter a room, handle responsibility, recover from mistakes, choose advisers and make decisions under uncertainty.",
          },
          {
            kicker: "Opportunity",
            title: "A trusted opportunity board beats random applications.",
            body: "Members can post internships, projects, research briefs, philanthropic work and early-career opportunities. The network adds context and references while preserving appropriate safeguarding and selection standards.",
          },
          {
            kicker: "Alumni",
            title: "Belonging should compound over time.",
            body: "As alumni build careers, companies and families of their own, they remain connected to peers and the wider community. In time, they return as mentors, hosts, employers, donors and possibly full adult members.",
          },
        ]}
        closingTitle="Education becomes more valuable when it connects to real rooms, real work and real responsibility."
        closingBody="The alumni layer is a long-term network effect: each cohort inherits relationships and eventually strengthens the network for the one behind it."
      />

      <section className="border-t border-border bg-card py-16 md:py-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [Briefcase, "Work", "Apprenticeships, founder shadowing, internships and serious project briefs."],
              [Presentation, "Evidence", "A portfolio of delivered work, presentations, references and verified contributions."],
              [Network, "Peers", "Age-appropriate circles, alumni events and introductions across cities and sectors."],
              [HeartHandshake, "Give back", "Alumni eventually mentor, host, hire and create opportunities for younger members."],
            ].map(([Icon, title, body]) => {
              const Component = Icon as typeof Briefcase;
              return <article key={String(title)} className="border border-border bg-background p-6"><Component className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">{String(title)}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{String(body)}</p></article>;
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
