import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export type StoryFeature = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  linkTo?: string;
  linkLabel?: string;
};

export function LuxuryStoryPage({
  eyebrow,
  title,
  introduction,
  heroImage,
  heroAlt,
  statement,
  statementBody,
  feature,
  detailsEyebrow,
  detailsTitle,
  details,
  secondary,
  closingEyebrow = "By invitation",
  closingTitle,
  closingBody,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  heroImage: string;
  heroAlt: string;
  statement: string;
  statementBody: string;
  feature: StoryFeature;
  detailsEyebrow: string;
  detailsTitle: string;
  details: readonly (readonly [string, string])[];
  secondary: StoryFeature;
  closingEyebrow?: string;
  closingTitle: string;
  closingBody: string;
}) {
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-[#171716] text-white">
        <img src={heroImage} alt={heroAlt} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,10,0.72)_0%,rgba(11,11,10,0.42)_43%,rgba(11,11,10,0.08)_78%)]" />
        <Container className="relative flex min-h-[78vh] items-end py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/62">{eyebrow}</p>
            <h1 className="mt-6 max-w-[11ch] text-balance font-display text-6xl leading-[0.93] md:text-8xl">{title}</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 md:text-lg">{introduction}</p>
            <Button asChild size="lg" className="mt-9 rounded-full bg-white px-7 text-foreground hover:bg-white/90"><Link to="/apply">Request membership</Link></Button>
          </div>
        </Container>
      </section>

      <section className="py-32 md:py-48">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-24">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-oxblood">The idea</p>
            <div><h2 className="max-w-5xl text-balance font-display text-5xl leading-[1.02] md:text-7xl">{statement}</h2><p className="mt-8 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">{statementBody}</p></div>
          </div>
        </Container>
      </section>

      <section className="bg-[#efe8dd] py-32 md:py-48">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-24">
            <figure className="overflow-hidden"><img src={feature.image} alt={feature.imageAlt} className="aspect-[16/11] w-full object-cover" loading="lazy" /></figure>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-oxblood">{feature.eyebrow}</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">{feature.title}</h2>
              <p className="mt-7 text-base leading-8 text-muted-foreground">{feature.body}</p>
              {feature.linkTo && feature.linkLabel ? <Link to={feature.linkTo} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">{feature.linkLabel} <ArrowRight className="h-4 w-4" /></Link> : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-32 md:py-48">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-oxblood">{detailsEyebrow}</p><h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.02] md:text-6xl">{detailsTitle}</h2></div>
            <div className="border-t border-foreground/18">
              {details.map(([detailTitle, detailBody], index) => (
                <div key={detailTitle} className="grid gap-4 border-b border-foreground/18 py-8 sm:grid-cols-[58px_210px_1fr] md:py-10">
                  <span className="font-display text-2xl text-oxblood/60">0{index + 1}</span>
                  <h3 className="font-display text-3xl leading-tight">{detailTitle}</h3>
                  <p className="max-w-xl text-sm leading-7 text-muted-foreground">{detailBody}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#171716] py-32 text-white md:py-48">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-24">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">{secondary.eyebrow}</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">{secondary.title}</h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-white/66">{secondary.body}</p>
              {secondary.linkTo && secondary.linkLabel ? <Link to={secondary.linkTo} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">{secondary.linkLabel} <ArrowRight className="h-4 w-4" /></Link> : null}
            </div>
            <figure className="overflow-hidden"><img src={secondary.image} alt={secondary.imageAlt} className="aspect-[4/3] w-full object-cover" loading="lazy" /></figure>
          </div>
        </Container>
      </section>

      <section className="py-32 md:py-48">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-oxblood">{closingEyebrow}</p>
            <h2 className="mt-6 text-balance font-display text-5xl leading-[1.02] md:text-7xl">{closingTitle}</h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground">{closingBody}</p>
            <Button asChild size="lg" className="mt-9 rounded-full px-8"><Link to="/apply">Request membership</Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
