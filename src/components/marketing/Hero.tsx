import { Link } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, Map, Plane, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { luxuryImages } from "@/data/luxuryImages";

export function Hero() {
  return (
    <section className="relative min-h-[780px] overflow-hidden border-b border-background/10 bg-foreground text-background md:min-h-[860px]">
      <img src={luxuryImages.jet} alt="A family arriving by private aircraft with a London skyline beyond" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[55%_center]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,18,16,0.94)_0%,rgba(20,18,16,0.76)_40%,rgba(20,18,16,0.22)_72%,rgba(20,18,16,0.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-foreground/90 to-transparent" />

      <Container className="relative flex min-h-[780px] flex-col justify-between py-12 md:min-h-[860px] md:py-16">
        <div className="max-w-3xl pt-10 md:pt-20">
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-bronze"><span className="h-px w-9 bg-bronze" />Private membership · London · by invitation</div>
          <h1 className="mt-8 max-w-[10.5ch] text-balance font-display text-[4rem] leading-[0.9] text-background sm:text-[5rem] md:text-[6.2rem] xl:text-[7.2rem]">Your life got complicated<span className="block text-bronze">because it worked.</span></h1>
          <p className="mt-8 max-w-2xl text-pretty text-base leading-8 text-background/78 md:text-lg">You built the business. Then came the second country, the school search, the advisers, the trusts, the property, the travel and the family questions. We put the whole picture in one room.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-none bg-oxblood px-8 text-oxblood-foreground hover:bg-background hover:text-foreground"><Link to="/apply">{site.ctaLabel}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button asChild size="lg" variant="outline" className="rounded-none border-background/40 bg-foreground/10 px-8 text-background backdrop-blur hover:bg-background hover:text-foreground"><Link to="/decision-room"><Map className="mr-2 h-4 w-4" />See how it works</Link></Button></div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-background/55"><span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-bronze" />No cold pitching</span><span className="flex items-center gap-2"><LockKeyhole className="h-3.5 w-3.5 text-bronze" />Private by design</span><span className="flex items-center gap-2"><Plane className="h-3.5 w-3.5 text-bronze" />Built for lives across borders</span></div>
        </div>

        <div className="grid gap-px border border-background/18 bg-background/18 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">{[["The Table", "People who have lived some version of what you are trying to do."],["Decision Room", "One place to decide, brief experts, execute and close the loop."],["Private Office", "Trusted partners and concierge when you need the right person, quickly."],["The Next Generation", "Capability, opportunity and stewardship before responsibility arrives."]].map(([title, body]) => <div key={title} className="bg-foreground/76 p-5 backdrop-blur-xl md:p-6"><p className="font-display text-2xl text-background">{title}</p><p className="mt-2 text-xs leading-6 text-background/55">{body}</p></div>)}</div>
      </Container>

      <div className="absolute right-6 top-28 hidden w-72 border border-background/20 bg-foreground/70 p-5 backdrop-blur-xl xl:block"><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-bronze">The life behind the membership</p><p className="mt-3 font-display text-3xl leading-tight">One family. Five advisers. Three countries. One picture.</p></div>
    </section>
  );
}
