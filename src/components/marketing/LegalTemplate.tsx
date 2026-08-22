import { Container } from "@/components/layout/Container";

export function LegalTemplate({ title, intro, sections }: { title: string; intro: string; sections: { heading: string; body: string }[] }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl">
          <span className="inline-flex border border-bronze/40 bg-accent/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-bronze">Draft template · legal review required before launch</span>
          <h1 className="mt-6 font-display text-5xl md:text-6xl">{title}</h1>
          <p className="mt-6 text-sm leading-8 text-muted-foreground">{intro}</p>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {sections.map((section) => (
              <div key={section.heading} className="py-7">
                <h2 className="font-display text-3xl">{section.heading}</h2>
                <p className="mt-3 text-sm leading-8 text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
