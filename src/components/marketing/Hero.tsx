import { Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, HeartHandshake, LockKeyhole, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { luxuryImages } from "@/data/luxuryImages";

export function Hero() {
  return (
    <section className="relative min-h-[790px] overflow-hidden border-b border-background/10 bg-foreground text-background md:min-h-[880px]">
      <img
        src={luxuryImages.jet}
        alt="An international family arriving in London"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] brightness-[1.08] saturate-[1.03]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,18,16,0.78)_0%,rgba(20,18,16,0.56)_38%,rgba(20,18,16,0.14)_72%,rgba(20,18,16,0.03)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-foreground/88 via-foreground/42 to-transparent" />

      <Container className="relative flex min-h-[790px] flex-col justify-between py-12 md:min-h-[880px] md:py-16">
        <div className="max-w-4xl pt-8 md:pt-16">
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-bronze">
            <span className="h-px w-9 bg-bronze" /> Private membership · London & beyond · by invitation
          </div>
          <h1 className="mt-8 max-w-[11ch] text-balance font-display text-[4rem] leading-[0.92] text-background sm:text-[5rem] md:text-[6.3rem] xl:text-[7.35rem]">
            A private world around <span className="text-bronze">the life you've built.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-base leading-8 text-background/82 md:text-lg">
            Belong in the right rooms. Move through the world with ease. Raise capable children. Find people you trust. Make more of the life success has made possible.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-none bg-oxblood px-8 text-oxblood-foreground hover:bg-background hover:text-foreground">
              <Link to="/apply">{site.ctaLabel}<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-none border-background/50 bg-background/10 px-8 text-background backdrop-blur hover:bg-background hover:text-foreground">
              <Link to="/gatherings">Discover the world <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-background/68">
            <span className="flex items-center gap-2"><LockKeyhole className="h-3.5 w-3.5 text-bronze" />Private by design</span>
            <span className="flex items-center gap-2"><Globe2 className="h-3.5 w-3.5 text-bronze" />Global by nature</span>
            <span className="flex items-center gap-2"><HeartHandshake className="h-3.5 w-3.5 text-bronze" />Built across generations</span>
          </div>
        </div>

        <div className="grid gap-px border border-background/22 bg-background/22 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Belong", "Private tables, thoughtful introductions and a circle that grows more valuable with time."],
            ["Move", "A life between cities, homes and countries with support that travels with you."],
            ["Live", "Travel, access, health, homes and the details that should simply feel handled."],
            ["Raise", "Learning, mentors, culture and opportunity for the next generation."],
          ].map(([title, body]) => (
            <div key={title} className="bg-foreground/70 p-5 backdrop-blur-xl md:p-6">
              <p className="font-display text-2xl text-background">{title}</p>
              <p className="mt-2 text-xs leading-6 text-background/66">{body}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="absolute right-6 top-28 hidden w-72 border border-background/24 bg-foreground/58 p-5 backdrop-blur-xl xl:block">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-bronze">A life lived well</p>
        <p className="mt-3 font-display text-3xl leading-tight">London today. Somewhere else tomorrow. One circle around it all.</p>
        <Sparkles className="mt-5 h-4 w-4 text-bronze" />
      </div>
    </section>
  );
}
