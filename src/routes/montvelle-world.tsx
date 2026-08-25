import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import heroDesk from "@/assets/mw-hero-quiet-desk.jpg";
import conversationRoom from "@/assets/mw-conversation-room.jpg";
import hallwayDusk from "@/assets/mw-hallway-dusk.jpg";

const fragmentation = [
  {
    title: "The same story, told again and again.",
    body: "Every new adviser, agent or office starts from zero. You explain the family, the structure, the timing and the constraints once more, and hope nothing important is left out.",
  },
  {
    title: "Cold searching for people who must be excellent.",
    body: "A counsel in a country you do not live in, a school head, a surveyor, a specialist. The stakes are high and the search begins with a browser and a few borrowed names.",
  },
  {
    title: "Advice that does not agree with itself.",
    body: "Each specialist is right about their own part. Nobody reconciles the tax view with the residence view with the school calendar with the sale timetable.",
  },
  {
    title: "Chasing, remembering, holding.",
    body: "Who replied, who did not, what was agreed in March, which document went where. It lives in an inbox and in one person's head — usually the principal's or their spouse's.",
  },
  {
    title: "Relationships rebuilt from scratch.",
    body: "A move to a new country resets not just the logistics but the circle: the peers, the operators, the people worth knowing. That takes years unless someone helps.",
  },
] as const;

const beyond = [
  { title: "Invitations", body: "Where the wider membership meets — gatherings held for your household, with the context attached." },
  { title: "Community", body: "Members whose experience is genuinely relevant, introduced only where both sides agree." },
  { title: "Family", body: "A wider education for the next generation, at their own pace, with age-appropriate access." },
  { title: "Knowledge", body: "Briefings and playbooks written around the decisions families actually face — useful preparation before a council is needed." },
  { title: "Global Life", body: "More than one home, without losing continuity between them." },
] as const;


export const Route = createFileRoute("/montvelle-world")({
  head: () => ({
    meta: [
      { title: `Montvelle World — ${site.name}` },
      {
        name: "description",
        content:
          "Montvelle World is what opens after membership: your world held in one place — decisions, private office, the people who matter and family life, quietly connected.",
      },
      { property: "og:title", content: `Montvelle World — ${site.name}` },
      {
        property: "og:description",
        content: "Your world. Held in one place. What opens after membership at Montvelle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MontvelleWorldPage,
});

function MontvelleWorldPage() {
  return (
    <>
      <section className="relative min-h-[600px] overflow-hidden bg-foreground text-background md:min-h-[740px]">
        <img
          src={heroDesk}
          alt="A quiet private study desk in warm morning light"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,11,0.88)_0%,rgba(12,12,11,0.52)_52%,rgba(12,12,11,0.08)_92%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,11,0.25)_0%,rgba(12,12,11,0.58)_45%,rgba(12,12,11,0.85)_100%)] md:hidden" />
        <Container className="relative flex min-h-[600px] items-end py-20 md:min-h-[740px] md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Montvelle World</p>
            <h1 className="mt-6 max-w-[16ch] font-display text-5xl leading-[0.97] md:text-8xl">
              Your world. Held in one place.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-background/72">
              Tell us what you are trying to achieve. We find the right people, assemble the right
              expertise, build the right circle around you, coordinate the moving parts — and keep
              the context, so you never have to start again.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Button asChild className="rounded-none bg-background px-7 py-6 text-foreground hover:bg-background/90">
                <Link to="/apply">
                  Request membership <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Link
                to="/demo"
                className="border-b border-bronze/60 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-bronze transition-colors hover:text-background"
              >
                Explore the demo
              </Link>
              <Link
                to="/auth"
                className="border-b border-background/30 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-background/70 transition-colors hover:text-background"
              >
                Member access
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="eyebrow text-oxblood">The pain</p>
              <h2 className="mt-6 max-w-[18ch] font-display text-4xl leading-[1.02] md:text-6xl">
                The problem nobody sees from the outside.
              </h2>
              <p className="mt-7 max-w-md text-sm leading-8 text-muted-foreground">
                Success creates complexity: countries, homes, schools, advisers, businesses, travel,
                family, private life. Excellent specialists solve their own part. Almost nobody holds
                the whole picture — so the family does, unpaid and permanently on duty.
              </p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {fragmentation.map((item, index) => (
                <article key={item.title} className="grid gap-4 py-8 md:grid-cols-[64px_1fr] md:gap-8">
                  <span className="font-display text-3xl text-bronze">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-3xl leading-tight md:text-4xl">{item.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-linen py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-oxblood">One picture</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] md:text-6xl">
              One place holds the whole picture.
            </h2>
            <p className="mt-7 text-base leading-8 text-muted-foreground">
              Not another system to maintain. A private environment where the context already lives, so
              the people helping you do not need to be briefed from the beginning each time.
            </p>
          </div>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            {[
              {
                name: "Today",
                body: "Three sections, in order: what needs you, what Montvelle is already handling, and what is coming up. Nothing else competing for your attention.",
              },
              {
                name: "Ask Montvelle",
                body: "One request for anything — a move, a school place, a difficult arrangement. Acknowledged immediately, with a meaningful answer, update or set of checked options within twenty-four hours.",
              },
              {
                name: "Decision Room",
                body: "For decisions that outlast a phone call: the central question, the options being weighed, the sequence, the dependencies, and who holds each next step.",
              },
            ].map((item) => (
              <article key={item.name} className="bg-linen p-6 md:p-7">
                <h3 className="font-display text-2xl leading-tight md:text-3xl">{item.name}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow text-oxblood">Expert Council</p>
              <h2 className="mt-6 max-w-[20ch] font-display text-4xl leading-[1.02] md:text-6xl">
                When expertise is needed, we build the team around the problem.
              </h2>
            </div>
            <div>
              <p className="text-base leading-8 text-muted-foreground">
                There is no standing committee and no directory to browse. You give us the outcome,
                the geography, the timing and anything that cannot change. We then search worldwide,
                approach the organisations and individuals who genuinely fit, check them properly,
                and return a small considered shortlist — or coordinate the introductions ourselves.
              </p>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                A move to Monaco may need residence and immigration counsel, cross-border tax advice,
                property, schooling, banking, insurance, household logistics and, where it matters,
                community and access. We hold the dependencies between them so you are not the one
                translating between eight offices.
              </p>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                Where a decision warrants it, and only with your consent, a chosen expert can be
                attached to that Decision Room with the minimum information necessary — never broad
                access to your household or to Montvelle.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow text-oxblood">Your circle</p>
              <h2 className="mt-6 max-w-[20ch] font-display text-4xl leading-[1.02] md:text-6xl">
                When life changes, your circle should change with it.
              </h2>
              <p className="mt-7 max-w-md text-sm leading-8 text-muted-foreground">
                Membership does not hand you a list of everybody and call it a network. The useful
                circle around a household is built deliberately, over time, around what the family is
                actually doing.
              </p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {[
                ["A new country", "Peers who made the same move, the operators who make a household work locally, schools, clubs, the people worth knowing in that city."],
                ["A business decision", "Operators and advisers who have been through the same transaction, sector or succession question."],
                ["A child or a stage of life", "Education, transitions, first responsibilities — and adults who can speak to a next-generation member without a family agenda."],
                ["Someone you already trust", "Ask us to bring a person you name into one matter or circle. They receive no general access and do not become a Montvelle member."],
              ].map(([title, body]) => (
                <div key={title} className="grid gap-3 py-7 md:grid-cols-[240px_1fr] md:gap-10">
                  <h3 className="font-display text-2xl md:text-3xl">{title}</h3>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-oxblood">Privacy</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] md:text-6xl">
              The household stays private by design.
            </h2>
            <p className="mt-7 text-base leading-8 text-muted-foreground">
              Approved adults hold their own login, their own requests and their own privacy. The
              Principal does not see another adult's private matters by default; anything shared is
              shared deliberately, area by area. Next-generation access is age-appropriate and never
              includes financial or private adult matters. An authorised household delegate is not a
              member and sees only the requests and messages they have been given.
            </p>
          </div>

        </Container>
      </section>


      <section className="bg-background py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <img
              src={conversationRoom}
              alt="Two adults in unhurried conversation across a table in a private drawing room"
              width={1600}
              height={1104}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="lg:pl-10">
              <p className="eyebrow text-oxblood">Private Office</p>
              <h2 className="mt-6 font-display text-4xl leading-[1.03] md:text-5xl">
                One place that already understands the whole picture.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-8 text-muted-foreground">
                Your private office lives inside Montvelle World. Ask for something once and it is carried — with the
                context, the people already involved and the standard you expect — until you agree it is finished.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-8 text-muted-foreground">
                Nothing is shared with anyone outside your household unless you ask for it, and only the small part of
                the picture a particular arrangement actually requires.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-accent/40 py-20 md:py-28">
        <Container>
          <p className="eyebrow text-oxblood">Beyond the screen</p>
          <h2 className="mt-6 max-w-[20ch] font-display text-4xl leading-[1.02] md:text-6xl">
            The world beyond the screen.
          </h2>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {beyond.map((item) => (
              <div key={item.title} className="grid gap-3 py-7 md:grid-cols-[260px_1fr] md:gap-10">
                <h3 className="font-display text-2xl md:text-3xl">{item.title}</h3>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background py-20 md:py-28">
        <Container>
          <div className="border border-border bg-card p-8 md:p-14">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="eyebrow text-oxblood">Look inside</p>
                <h2 className="mt-6 max-w-[18ch] font-display text-4xl leading-[1.02] md:text-5xl">
                  Step inside Montvelle World for a moment.
                </h2>
                <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">
                  An unhurried walkthrough of the member environment as a household actually uses it —
                  Today, a request in motion, a decision being worked through, an invitation waiting.
                </p>
                <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
                  Illustrative only. Everything shown is fictional DEMO data; no real member
                  information appears anywhere in it.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-5 lg:justify-end">
                <Button asChild className="rounded-none bg-foreground px-7 py-6 text-background hover:bg-oxblood">
                  <Link to="/demo">
                    Enter the demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Link
                  to="/auth"
                  className="border-b border-bronze pb-1 text-sm font-medium text-foreground"
                >
                  Member access
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>



      <section className="relative overflow-hidden bg-foreground text-background">
        <img
          src={hallwayDusk}
          alt="A residence hallway console with keys on a brass tray at dusk"
          width={1600}
          height={1104}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,11,0.92)_0%,rgba(12,12,11,0.70)_60%,rgba(12,12,11,0.40)_100%)]" />
        <Container className="relative py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">The point</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] md:text-6xl">
              The point is not to spend more time inside Montvelle World. It is to have more time outside it.
            </h2>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild className="rounded-none bg-background px-7 py-6 text-foreground hover:bg-background/90">
                <Link to="/apply">
                  Request membership <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none border-background/40 bg-transparent px-7 py-6 text-background hover:bg-background hover:text-foreground"
              >
                <Link to="/membership">Membership</Link>
              </Button>
            </div>
            <p className="mt-8 text-sm text-background/60">
              Already a member?{" "}
              <Link
                to="/auth"
                className="border-b border-bronze/60 pb-0.5 font-semibold text-bronze transition-colors hover:text-background"
              >
                Enter Montvelle World
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
