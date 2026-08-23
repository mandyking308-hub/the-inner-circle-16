import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  Compass,
  Globe2,
  HeartHandshake,
  KeyRound,
  LayoutDashboard,
  Sparkles,
  TableProperties,
  UsersRound,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";

const lifestyleMoments = [
  ["A table worth crossing London for", "Small dinners, private breakfasts and thoughtful rooms where the guest list matters as much as the place."],
  ["A city that feels familiar quickly", "Trusted introductions, local intelligence and practical help when the family spends more time somewhere new."],
  ["A family weekend with a purpose", "Culture, learning, travel and time together without every detail becoming another project to manage."],
  ["A conversation the next generation remembers", "Mentors, founders, artists, advisers and experiences that widen the world before adult responsibility arrives."],
] as const;

export function HomeStory() {
  return (
    <>
      <section className="border-b border-foreground/15 bg-background py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.66fr_1.34fr] lg:gap-20">
            <div>
              <p className="eyebrow text-oxblood">The life behind the membership</p>
              <p className="mt-7 font-display text-4xl leading-[1.06] md:text-5xl">Success should open the world, not make the world feel smaller.</p>
            </div>
            <div className="border-l border-foreground/20 pl-6 md:pl-10">
              <p className="max-w-4xl font-display text-4xl leading-[1.07] md:text-6xl">More places to live. More people to care for. More choices. <span className="text-oxblood">A richer life needs a richer circle around it.</span></p>
              <div className="mt-8 grid gap-6 text-sm leading-7 text-muted-foreground md:grid-cols-2">
                <p>Project Table is for people whose lives have grown beyond one city, one business or one generation. It brings together the relationships, experiences and private support that make that life feel more connected.</p>
                <p>The serious infrastructure is there when you need it. But membership should first feel like belonging somewhere: a room, a city, a trusted introduction, a family experience, a life made easier and more interesting.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-background/15 bg-foreground text-background">
        <div className="absolute inset-0"><img src={luxuryImages.table} alt="Members gathering in a private London room" className="h-full w-full object-cover brightness-[1.08]" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/82 via-foreground/58 to-foreground/16" />
        <Container className="relative py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3"><TableProperties className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">Belong</p></div>
            <h2 className="mt-6 font-display text-5xl leading-[0.98] md:text-7xl">Some rooms feel different from the moment you arrive.</h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/78">A table of people who understand ambition without needing the polished version. A dinner where the conversation travels well beyond business. A circle that becomes familiar enough for honesty, laughter and the questions you do not ask in public.</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-background/64">The Table is the anchor. Gatherings, introductions and friendships grow around it.</p>
            <div className="mt-8 flex flex-wrap gap-5"><Link to="/the-table" className="inline-flex items-center gap-2 text-sm font-semibold">The Table <ArrowRight className="h-4 w-4 text-bronze" /></Link><Link to="/gatherings" className="inline-flex items-center gap-2 text-sm font-semibold">Gatherings <ArrowRight className="h-4 w-4 text-bronze" /></Link></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <div className="overflow-hidden border border-foreground/15 shadow-2xl"><img src={luxuryImages.jet} alt="A family moving through the world together" className="aspect-[16/11] w-full object-cover brightness-[1.08]" /></div>
            <div className="lg:pl-8">
              <div className="flex items-center gap-3"><Globe2 className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">Move</p></div>
              <h2 className="mt-5 font-display text-5xl leading-[1.01] md:text-6xl">One life. More than one home.</h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">London can be home and so can somewhere else. Children may study in one country while business grows in another. The family should be able to move without rebuilding its entire support system every time the postcode changes.</p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">We help join the practical world around the move: local knowledge, trusted people, schools, homes, travel, advisers and the details that make a place begin to feel like yours.</p>
              <Link to="/global-life" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Explore the world around membership <ArrowRight className="h-4 w-4 text-oxblood" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3"><Compass className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">Live</p></div>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">The best service is the part you barely notice.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-background/72">A table tonight. A school visit next week. A house in another city. A specialist you would rather meet through somebody trusted. A family trip that needs to work for everybody.</p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-background/58">Concierge exists to make the practical side of a good life feel beautifully handled — discreetly, personally and with enough context that you do not start from the beginning every time.</p>
              <Link to="/concierge" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Private service <ArrowRight className="h-4 w-4 text-bronze" /></Link>
            </div>
            <div className="overflow-hidden border border-background/15 shadow-2xl"><img src={luxuryImages.command} alt="Discreet private service and trusted introductions" className="aspect-[16/11] w-full object-cover brightness-[1.1]" /></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-forest text-forest-foreground">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden border border-forest-foreground/20 shadow-2xl"><img src={luxuryImages.learning} alt="A family learning together in an elegant private study" className="aspect-[4/3] w-full object-cover brightness-[1.08]" /></div>
            <div>
              <div className="flex items-center gap-3"><BookOpenCheck className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">Raise</p></div>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Give the next generation a wider world — and the confidence to step into it.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-forest-foreground/76">Great schools matter. So do curiosity, judgement, independence, culture, commercial understanding and the ability to make something happen when nobody has written the instructions.</p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-forest-foreground/64">Family Learning adds projects, mentors, enterprise, technology, service and real-world exposure around the education a child already has.</p>
              <Link to="/family-learning" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Families & the next generation <ArrowRight className="h-4 w-4 text-bronze" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <div className="flex items-center gap-3"><KeyRound className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">Connect</p></div>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">The right person changes what becomes possible.</h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-oxblood-foreground/74">A brilliant lawyer. A school somebody genuinely loved. A family who has already moved where you are thinking of moving. A doctor, trustee, operator, mentor or property adviser who comes with context rather than a search result.</p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-oxblood-foreground/74">The network is designed around warm introductions and earned trust. Nobody buys their way into your address book.</p>
              <Link to="/partners" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Trusted people <ArrowRight className="h-4 w-4 text-bronze" /></Link>
            </div>
            <div className="divide-y divide-oxblood-foreground/18 border-y border-oxblood-foreground/18">
              {[
                ["People who know you", "Your permanent Table and the relationships that deepen over time."],
                ["People who know the place", "Members, advisers and trusted local knowledge when life moves to another city."],
                ["People who know the problem", "Experienced peers and specialists who have seen a version of the question before."],
                ["People worth knowing next", "Carefully brokered introductions with consent and a reason for both sides to say yes."],
              ].map(([title, copy], index) => <div key={title} className="grid gap-4 py-5 md:grid-cols-[55px_180px_1fr]"><span className="font-display text-2xl text-bronze">0{index + 1}</span><h3 className="font-display text-2xl">{title}</h3><p className="text-sm leading-7 text-oxblood-foreground/66">{copy}</p></div>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-background py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
            <div><UsersRound className="h-5 w-5 text-oxblood" /><p className="mt-6 eyebrow text-oxblood">Gather</p><h2 className="mt-5 font-display text-5xl leading-[1.02]">A life is built in moments as much as decisions.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">Private dinners, cultural evenings, family weekends, salons, breakfasts, travel and experiences should create memory as well as usefulness.</p></div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-2">
              {lifestyleMoments.map(([title, body]) => <article key={title} className="bg-linen p-7"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
            </div>
          </div>
          <Link to="/gatherings" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Explore Gatherings <ArrowRight className="h-4 w-4 text-oxblood" /></Link>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-forest py-20 text-forest-foreground md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <article className="border border-forest-foreground/18 p-7 md:p-9"><HeartHandshake className="h-5 w-5 text-bronze" /><p className="mt-7 eyebrow text-bronze">Give</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">Use what you know, who you know and what you have to move something forward.</h2><p className="mt-6 text-sm leading-7 text-forest-foreground/68">Impact can mean money, but it can also mean judgement, introductions, time, expertise and opening a door for somebody else. The strongest communities give outward as well as inward.</p><Link to="/impact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Impact <ArrowRight className="h-4 w-4 text-bronze" /></Link></article>
            <article className="border border-forest-foreground/18 p-7 md:p-9"><Sparkles className="h-5 w-5 text-bronze" /><p className="mt-7 eyebrow text-bronze">Pass it on</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">The most valuable inheritance is not only what they receive.</h2><p className="mt-6 text-sm leading-7 text-forest-foreground/68">It is judgement, relationships, family stories, confidence, stewardship and a sense of what all of this is for. Legacy begins long before succession paperwork.</p><Link to="/legacy" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Legacy <ArrowRight className="h-4 w-4 text-bronze" /></Link></article>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative overflow-hidden border border-foreground/20 bg-foreground shadow-2xl"><img src={luxuryImages.command} alt="A private family office room" className="aspect-[16/11] w-full object-cover brightness-[1.08]" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground via-foreground/74 to-transparent p-6 pt-24 text-background"><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-bronze">Behind the life</p><p className="mt-2 font-display text-3xl">A private office that remembers the whole picture.</p></div></div>
            <div className="lg:pl-8">
              <div className="flex items-center gap-3"><LayoutDashboard className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">The private office</p></div>
              <h2 className="mt-5 font-display text-5xl leading-[1.01] md:text-6xl">Beautiful on the outside. Serious underneath.</h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">When life becomes genuinely complex, the membership has depth behind it: Decision Rooms, Family Architecture, Global Life coordination, specialists we find and coordinate for you, Concierge cases and a private member environment.</p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">You do not have to join because you love software. You discover the system when you need the life around you to stay joined up.</p>
              <div className="mt-8 grid gap-px bg-foreground/15 sm:grid-cols-2">{[["Decision Room", "One place for the issue that touches everything else."],["Family Architecture", "A living picture of people, ownership, protection and advisers."],["Global Life", "One view across countries, dates, schools, homes and specialists."],["Concierge", "A named owner for the practical work that needs to be finished."]].map(([title, body]) => <div key={title} className="bg-background p-5"><p className="font-display text-2xl">{title}</p><p className="mt-2 text-xs leading-6 text-muted-foreground">{body}</p></div>)}</div>
              <Link to="/decision-room" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">See what sits behind membership <ArrowRight className="h-4 w-4 text-oxblood" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private members room" className="absolute inset-0 h-full w-full object-cover opacity-38 brightness-[1.08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/82 to-foreground/48" />
        <Container className="relative py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><p className="eyebrow text-bronze">Membership</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-7xl">Come for the world around it. Stay because the circle becomes part of your life.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-background/68">Founding membership is intentionally small and personal. We establish fit first, then discuss the right relationship privately.</p></div>
            <Button asChild size="lg" className="rounded-none bg-oxblood px-8 text-oxblood-foreground hover:bg-background hover:text-foreground"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
