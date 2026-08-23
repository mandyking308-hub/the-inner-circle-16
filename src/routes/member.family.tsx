import { createFileRoute, Link } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";

export const Route = createFileRoute("/member/family")({ component: FamilyHubPage });

function FamilyHubPage() {
  const rooms = [
    ["Family Architecture", "See ownership, protection, purpose, advisers and the family roles around them in one picture.", "/member/family-architecture"],
    ["Global Life", "Coordinate residence, advisers, schools, property, banking and the dependencies created by a cross-border move.", "/member/global-life"],
    ["Learning Studio", "Build a personalised curriculum around mastery, execution, practical independence and evidence.", "/member/learning"],
    ["Next Generation", "A protected programme for stewardship, enterprise, technology, financial literacy and philanthropy.", "/member/next-gen"],
    ["The Continuum", "Move older learners into mentors, projects, apprenticeships, work and eventually giving back.", "/member/alumni"],
  ] as const;

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Family" title="The system around the person" description="Ownership, global life, education and the next generation should not live as unrelated projects. This room keeps the family side of membership together." />
      <div className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
        {rooms.map(([title, body, to]) => <Link key={title} to={to} className="group bg-card p-6 transition-colors hover:bg-accent"><h2 className="mt-7 font-display text-3xl">{title}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p><span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">Open </span></Link>)}
      </div>
      <section className="border border-border bg-foreground p-6 text-background md:p-8"><p className="eyebrow text-background/50">One principle</p><h2 className="mt-4 max-w-4xl font-display text-4xl leading-tight md:text-5xl">The family should not have to explain itself from zero every time the question changes.</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-background/65">Context can be reused carefully across authorised rooms so a move, succession question, school decision or adviser brief starts with the family architecture already understood — without exposing information more widely than necessary.</p></section>
    </div>
  );
}
