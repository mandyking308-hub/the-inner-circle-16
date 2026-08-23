import { createFileRoute } from "@tanstack/react-router";
import { BookOpenCheck, BriefcaseBusiness, HandHeart, Sparkles } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";

export const Route = createFileRoute("/member/next-gen")({
  component: NextGenPage,
});

const programmes = [
  {
    icon: BookOpenCheck,
    title: "Stewardship foundations",
    age: "Family-led · staged by age",
    description: "Ownership, responsibility, decision-making and the difference between having access to assets and being ready to govern them.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Build something",
    age: "Project based",
    description: "Entrepreneurship through real small projects: idea, customer, cost, execution, reflection and what happens when the plan fails.",
  },
  {
    icon: Sparkles,
    title: "Technology & AI",
    age: "Practical literacy",
    description: "How modern tools work, how to use them responsibly and how to think about privacy, automation, creativity and judgement.",
  },
  {
    icon: HandHeart,
    title: "Philanthropy in practice",
    age: "Family + community",
    description: "Young people learn to examine a problem, ask what is genuinely useful and understand that giving money is not the same as creating impact.",
  },
];

function NextGenPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Next generation"
        title="Prepare them before responsibility arrives."
        description="A separate, protected programme for families who want young people to understand enterprise, money, stewardship, technology and philanthropy gradually — without exposing adult confidential discussions or turning childhood into wealth training."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {programmes.map((programme) => {
          const Icon = programme.icon;
          return (
            <article key={programme.title} className="border border-border bg-card p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <Icon className="h-5 w-5 text-bronze" />
                <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{programme.age}</span>
              </div>
              <h2 className="mt-5 font-display text-3xl">{programme.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{programme.description}</p>
            </article>
          );
        })}
      </div>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="border border-border bg-foreground p-6 text-background md:p-8">
          <p className="eyebrow text-background/60">Protected by design</p>
          <h2 className="mt-3 font-display text-4xl">Not a junior version of the adult club.</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-background/75">
            <p className="flex gap-3">Guardian/admin approval for under-18 accounts and activities.</p>
            <p className="flex gap-3">No access to adult Table challenges, private member discussions or unrestricted member contact details.</p>
            <p className="flex gap-3">No stranger-to-child direct messaging. Introductions and mentoring are programme-managed.</p>
            <p className="flex gap-3">No public display of family wealth, inheritance expectations or sensitive family structure.</p>
          </div>
        </div>

        <div className="border border-border bg-card p-6 md:p-8">
          <p className="eyebrow text-bronze">Family pathway</p>
          <h2 className="mt-3 font-display text-4xl">Exposure grows with maturity.</h2>
          <div className="mt-6 space-y-5">
            {[
              ["12–14", "Understand work, value, giving, basic business and responsible technology."],
              ["15–17", "Projects, financial literacy, enterprise exposure and structured mentoring."],
              ["18–21", "Ownership concepts, governance observation, philanthropy and external experience."],
              ["21+", "Optional next-gen peer circles, deeper governance and meaningful roles where earned."],
            ].map(([age, detail]) => (
              <div key={age} className="grid grid-cols-[70px_1fr] gap-3 border-t border-border pt-4 first:border-0 first:pt-0">
                <span className="font-display text-2xl text-bronze">{age}</span>
                <p className="text-sm leading-6 text-muted-foreground">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
