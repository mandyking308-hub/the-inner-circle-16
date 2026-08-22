import { Container } from "@/components/layout/Container";

const pillars = [
  {
    title: "Build",
    body: "Company builders and family enterprises, in candid company.",
  },
  {
    title: "Protect",
    body: "Structures, stewardship and counsel that hold under pressure.",
  },
  {
    title: "Govern",
    body: "Decisions made well, and handed on with intent.",
  },
];

export function Pillars() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="eyebrow">The room</p>
        <div className="mt-10 grid gap-10 border-t border-border/70 pt-10 md:grid-cols-3 md:gap-14">
          {pillars.map((pillar) => (
            <div key={pillar.title}>
              <h2 className="font-display text-2xl text-foreground">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
