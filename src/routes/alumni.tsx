import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, HeartHandshake, Network, Presentation } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { EditorialDetailPage } from "@/components/marketing/EditorialDetailPage";
import { site } from "@/config/site";

export const Route = createFileRoute("/alumni")({
  head: () => ({ meta: [{ title: `The Continuum — ${site.name}` }, { name: "description", content: "A protected rising-generation and alumni community connecting young people with peers, mentors, projects, work experience and a network that can grow with them." }],
    links: [{ rel: "canonical", href: `${site.url}/alumni` }], }),
  component: AlumniPage,
});

function AlumniPage() {
  return (
    <>
      <EditorialDetailPage
        eyebrow="The Continuum"
        title="Let the network grow up with them."
        introduction="A young person should not lose a trusted world of mentors, peers and opportunity the moment school ends. The Continuum is the bridge from family learning into adult life — gradually, safely and with room to discover who they want to become."
        image="/art/alumni-path.svg"
        imageAlt="Editorial illustration of a rising generation pathway from learning to building, apprenticeship, leadership and mentoring"
        imageCaption="Learn → explore → contribute → lead → give back."
        blocks={[
          { kicker: "Belong", title: "A room of their own.", body: "Older teenagers and young adults need peers who understand the unusual opportunities and expectations that can come with an entrepreneurial or internationally mobile family — without being dropped into adult confidential rooms too early." },
          { kicker: "Explore", title: "See more ways a life can be built.", body: "Founder shadowing, creative work, philanthropy, project briefs, professional visits and cultural experiences can widen a young person’s sense of what is possible before they choose a path." },
          { kicker: "Mentors", title: "Know adults worth asking.", body: "Mentors can offer judgement, perspective and encouragement around questions that do not fit neatly into school: confidence, work, responsibility, mistakes, choices and how to enter unfamiliar rooms well." },
          { kicker: "Opportunity", title: "Turn relationships into real experience.", body: "Members and trusted partners can create age-appropriate projects, placements, apprenticeships and early-career opportunities with enough context to make the experience meaningful on both sides." },
          { kicker: "Alumni", title: "One day, become the person who opens the next door.", body: "As alumni build careers, companies and families of their own, they remain part of the community — and eventually return as mentors, hosts, employers, donors and full adult members." },
        ]}
        closingTitle="The best network is one they eventually learn to strengthen for somebody else."
        closingBody="The Continuum is designed so belonging, opportunity and responsibility can deepen over time rather than ending at a school gate."
      />

      <section className="border-t border-border bg-card py-16 md:py-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [Briefcase, "Experience", "Shadowing, projects, internships and apprenticeships that make the adult world less abstract."],
              [Presentation, "Confidence", "A growing portfolio of work, presentations, references and moments that show what they can do."],
              [Network, "People", "Age-appropriate circles, alumni gatherings, mentors and introductions across cities and interests."],
              [HeartHandshake, "Give back", "Over time, alumni create opportunities, introductions and encouragement for the people coming behind them."],
            ].map(([Icon, title, body]) => { const Component = Icon as typeof Briefcase; return <article key={String(title)} className="border border-border bg-background p-6"><Component className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">{String(title)}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{String(body)}</p></article>; })}
          </div>
        </Container>
      </section>
    </>
  );
}
