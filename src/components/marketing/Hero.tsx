import { Link } from "@tanstack/react-router";
import { ArrowRight, Map, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-foreground/15">
      <Container className="relative py-14 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-oxblood">
              <span className="h-px w-8 bg-oxblood" />
              Private family enterprise · London
            </div>

            <h1 className="mt-8 max-w-[12ch] text-balance font-display text-[3.7rem] leading-[0.91] text-foreground sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem] xl:text-[6.7rem]">
              Success creates complexity.
              <span className="block text-oxblood">Nobody hands you the map.</span>
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-base leading-8 text-muted-foreground md:text-lg">
              One private operating layer for the decisions that appear when family, business, countries, advisers and the next generation start touching one another.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none bg-oxblood px-7 text-oxblood-foreground hover:bg-foreground">
                <Link to="/apply">{site.ctaLabel}<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none border-foreground/35 bg-transparent px-7 hover:bg-foreground hover:text-background">
                <Link to="/decision-room"><Map className="mr-2 h-4 w-4" />See the Decision Room</Link>
              </Button>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-px border-y border-foreground/15 bg-foreground/15 sm:grid-cols-4">
              {[
                ["01", "Peer judgement"],
                ["02", "Expert advice"],
                ["03", "Concierge execution"],
                ["04", "Family capability"],
              ].map(([number, label]) => (
                <div key={label} className="bg-background px-3 py-4 sm:px-4">
                  <p className="font-display text-xl text-oxblood">{number}</p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[510px] sm:min-h-[600px] lg:min-h-[690px]">
            <div className="absolute right-0 top-0 w-[88%] overflow-hidden border border-foreground/20 bg-card image-frame">
              <img src="/art/table-room.svg" alt="A private working table in a London room" className="aspect-[4/3] w-full object-cover" />
            </div>

            <div className="absolute bottom-5 left-0 w-[74%] overflow-hidden border border-foreground/25 bg-foreground image-frame sm:bottom-0 sm:w-[70%]">
              <img src="/art/decision-room.svg" alt="The Project Table Life Decision Room" className="aspect-[4/3] w-full object-cover" />
              <div className="flex items-center justify-between border-t border-background/15 bg-foreground px-4 py-3 text-background">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-background/60">Inside membership</span>
                <span className="font-display text-xl">Life Decision Room</span>
              </div>
            </div>

            <div className="absolute right-3 top-[54%] hidden w-52 border border-foreground/20 bg-linen p-4 shadow-2xl sm:block">
              <ShieldCheck className="h-4 w-4 text-oxblood" />
              <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.17em] text-muted-foreground">The rule</p>
              <p className="mt-2 font-display text-2xl leading-tight">Trust first. Transaction second.</p>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-foreground/15 bg-foreground py-3 text-background">
        <div className="overflow-hidden whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.24em] text-background/55">
          <span className="inline-block px-7">The Table</span> ·
          <span className="inline-block px-7">Decision Rooms</span> ·
          <span className="inline-block px-7">Global Life</span> ·
          <span className="inline-block px-7">Family Architecture</span> ·
          <span className="inline-block px-7">Learning Studio</span> ·
          <span className="inline-block px-7">Trusted Partners</span> ·
          <span className="inline-block px-7">Concierge</span> ·
          <span className="inline-block px-7">The Continuum</span>
        </div>
      </div>
    </section>
  );
}
