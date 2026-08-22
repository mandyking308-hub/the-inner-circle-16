import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Circle,
  Compass,
  Globe2,
  GraduationCap,
  Landmark,
  MessageSquareText,
  ShieldCheck,
  TableProperties,
} from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";

type WorkItem = {
  id: string;
  title: string;
  detail: string;
  lane: "DECIDE" | "EXPERT" | "EXECUTE" | "EVIDENCE";
  owner: string;
  dependency?: string;
};

type LifeTemplate = {
  id: string;
  label: string;
  icon: typeof Globe2;
  headline: string;
  question: string;
  outcome: string;
  expertCategories: string[];
  decisionQuestions: string[];
  items: WorkItem[];
};

const templates: LifeTemplate[] = [
  {
    id: "move-country",
    label: "Move country",
    icon: Globe2,
    headline: "Relocate a family without breaking the rest of the system",
    question: "Which country works for the whole family — legally, financially, educationally and practically?",
    outcome: "A reconciled move plan with jurisdiction choice, professional advice, school/housing sequence, document readiness and key-date ownership.",
    expertCategories: ["Residence & Citizenship", "Legal & Tax", "Education", "Property", "Banking & FX", "Insurance"],
    decisionQuestions: [
      "What are we optimising for: tax, lifestyle, education, optionality, business access or all of them?",
      "Which constraints are genuinely non-negotiable for each family member?",
      "Which decisions must happen before others become safe to make?",
      "What would make us reverse the move after six months?",
    ],
    items: [
      { id: "mc-1", title: "Define the family brief", detail: "Rank tax, schooling, travel, work, healthcare, language, family support and lifestyle priorities before comparing jurisdictions.", lane: "DECIDE", owner: "Family" },
      { id: "mc-2", title: "Shortlist jurisdictions", detail: "Reduce the universe to two or three realistic countries using the family brief rather than a single tax headline.", lane: "DECIDE", owner: "Member + Table", dependency: "Family brief" },
      { id: "mc-3", title: "Reconcile immigration and tax advice", detail: "Ask both specialists the same timeline and entity questions, then resolve contradictions before implementation.", lane: "EXPERT", owner: "Qualified advisers", dependency: "Jurisdiction shortlist" },
      { id: "mc-4", title: "Map companies, trusts and ownership", detail: "Identify which existing structures could be affected by residence, control or management changes.", lane: "EXPERT", owner: "Legal / tax / fiduciary", dependency: "Jurisdiction shortlist" },
      { id: "mc-5", title: "Secure education pathway", detail: "Check school entry, year group, curriculum continuity, travel time and admissions deadlines against the move window.", lane: "EXECUTE", owner: "Education + Concierge", dependency: "Likely location" },
      { id: "mc-6", title: "Sequence housing, banking and insurance", detail: "Avoid creating circular dependencies by deciding what needs an address, residence permit, local bank account or policy first.", lane: "EXECUTE", owner: "Concierge" },
      { id: "mc-7", title: "Create day-count and renewal calendar", detail: "Record arrival, departure, renewal and compliance dates with named ownership rather than memory.", lane: "EVIDENCE", owner: "Family Office" },
      { id: "mc-8", title: "30/90/180-day review", detail: "Check whether the move is delivering what the family expected and capture what needs adjusting.", lane: "EVIDENCE", owner: "Family + Table" },
    ],
  },
  {
    id: "family-office",
    label: "Build family office",
    icon: Landmark,
    headline: "Turn a collection of assets and advisers into an operating system",
    question: "What needs to be governed centrally, what can stay outsourced, and who owns each decision?",
    outcome: "A family-office-lite architecture with roles, adviser map, reporting rhythm, key documents, risk register and clear escalation routes.",
    expertCategories: ["Legal & Tax", "Trust & Fiduciary", "Banking & FX", "Insurance", "Technology & Cyber", "Recruitment & Household"],
    decisionQuestions: [
      "What complexity are we actually trying to remove?",
      "Which decisions belong to family, board, adviser or operator?",
      "What information should be visible every month without asking five people?",
      "What must continue if the founder is unavailable for 90 days?",
    ],
    items: [
      { id: "fo-1", title: "Inventory the system", detail: "List family roles, companies, property, investments, charities, insurance, advisers, recurring obligations and major documents.", lane: "DECIDE", owner: "Family" },
      { id: "fo-2", title: "Define decision rights", detail: "Clarify who can decide, approve, sign, advise and simply be informed across the main family and business domains.", lane: "DECIDE", owner: "Family + governance adviser" },
      { id: "fo-3", title: "Test legal and tax architecture", detail: "Have qualified advisers confirm where company, trust, estate and residence structures need alignment.", lane: "EXPERT", owner: "Legal / tax / fiduciary" },
      { id: "fo-4", title: "Close protection gaps", detail: "Review wills, powers, insurance, cyber, key-person dependencies, backups and emergency contacts.", lane: "EXPERT", owner: "Relevant specialists" },
      { id: "fo-5", title: "Build the monthly dashboard", detail: "Create one view of cash, obligations, companies, property, insurance, advisers, open decisions and deadlines.", lane: "EXECUTE", owner: "Family Office" },
      { id: "fo-6", title: "Create adviser operating rhythm", detail: "Set review cadence, document ownership, escalation rules and a shared question register across professionals.", lane: "EXECUTE", owner: "Family Office" },
      { id: "fo-7", title: "Write the continuity playbook", detail: "Document what happens if the principal is unreachable, incapacitated or simply wants three months away.", lane: "EVIDENCE", owner: "Family + advisers" },
      { id: "fo-8", title: "Quarterly governance review", detail: "Review outstanding decisions, risk, performance of advisers and whether the architecture still reflects the family’s life.", lane: "EVIDENCE", owner: "Family council" },
    ],
  },
  {
    id: "education-reset",
    label: "Rethink education",
    icon: GraduationCap,
    headline: "Design education around the child and the life they are growing into",
    question: "What should this young person be able to know, do, deliver and navigate by the time they leave education?",
    outcome: "A personalised learning architecture combining core mastery, execution, real-world projects, mentors, cultural exposure and an evidence portfolio.",
    expertCategories: ["Education", "Health & Wellbeing", "Technology & Cyber"],
    decisionQuestions: [
      "What is school doing well that we should preserve?",
      "Where is the child gaining knowledge but not independence or execution?",
      "Which environments make this child curious, confident and productive?",
      "What evidence of capability would matter at 16, 18 and 21 beyond exam results?",
    ],
    items: [
      { id: "ed-1", title: "Define the graduate profile", detail: "Write what the child should be able to know, do, communicate, manage and contribute by 18.", lane: "DECIDE", owner: "Family + learner" },
      { id: "ed-2", title: "Audit current education", detail: "Identify strengths, gaps, duplicated effort, pressure points and opportunities outside school.", lane: "DECIDE", owner: "Family" },
      { id: "ed-3", title: "Check lawful education options", detail: "Understand school, hybrid, home-education, qualification and safeguarding obligations in the relevant jurisdiction.", lane: "EXPERT", owner: "Education specialist" },
      { id: "ed-4", title: "Build the capability curriculum", detail: "Combine academics with communication, money, enterprise, AI, practical independence, culture, service and execution.", lane: "EXECUTE", owner: "Learning Studio" },
      { id: "ed-5", title: "Add real quests", detail: "Give the learner briefs with budgets, deadlines, audiences and consequences beyond a worksheet.", lane: "EXECUTE", owner: "Family + mentors" },
      { id: "ed-6", title: "Create mentor / apprenticeship access", detail: "Use trusted adults and organisations for shadowing, project briefs and age-appropriate work exposure.", lane: "EXECUTE", owner: "Alumni / partners" },
      { id: "ed-7", title: "Build evidence portfolio", detail: "Store projects, presentations, feedback, references, service, ventures and reflections as proof of capability.", lane: "EVIDENCE", owner: "Learner" },
      { id: "ed-8", title: "Termly learner review", detail: "Ask what the learner can now do independently that they could not do three months ago.", lane: "EVIDENCE", owner: "Family + learner" },
    ],
  },
  {
    id: "succession",
    label: "Plan succession",
    icon: ShieldCheck,
    headline: "Prepare the people, not only the paperwork",
    question: "If responsibility transferred sooner than expected, would the next generation know what exists, why it exists and how to make a decision?",
    outcome: "A continuity and succession plan covering ownership, governance, capability, communication, protection and staged responsibility.",
    expertCategories: ["Legal & Tax", "Trust & Fiduciary", "Insurance", "Education", "Philanthropy & Impact"],
    decisionQuestions: [
      "What are we trying to preserve: assets, control, values, optionality, purpose or all of them?",
      "Who needs information now, and who does not yet need responsibility?",
      "Which capabilities must be learned before authority can transfer?",
      "What family conflicts or assumptions are currently being avoided?",
    ],
    items: [
      { id: "su-1", title: "Map ownership and control", detail: "Make legal ownership, voting rights, trustees, directors and practical influence visible in one architecture.", lane: "DECIDE", owner: "Family + advisers" },
      { id: "su-2", title: "Define staged responsibility", detail: "Separate exposure, learning, participation, recommendation, approval and full authority by age and readiness.", lane: "DECIDE", owner: "Family council" },
      { id: "su-3", title: "Align estate and trust documents", detail: "Qualified advisers confirm that wills, trusts, insurance and company arrangements support the intended plan.", lane: "EXPERT", owner: "Legal / fiduciary" },
      { id: "su-4", title: "Create incapacity scenario", detail: "Test what happens if a key family member cannot make decisions tomorrow morning.", lane: "EXPERT", owner: "Legal + family office" },
      { id: "su-5", title: "Build next-gen learning pathway", detail: "Turn expected future responsibilities into projects, mentors, financial literacy and governance exposure now.", lane: "EXECUTE", owner: "Learning Studio" },
      { id: "su-6", title: "Introduce family meeting rhythm", detail: "Create age-appropriate recurring conversations about purpose, stewardship, decisions and what the family is building.", lane: "EXECUTE", owner: "Family" },
      { id: "su-7", title: "Capture family principles", detail: "Write a short decision framework that future members can actually use rather than a ceremonial values document.", lane: "EVIDENCE", owner: "Family" },
      { id: "su-8", title: "Annual succession rehearsal", detail: "Run one realistic scenario and test whether information, authority and people are ready.", lane: "EVIDENCE", owner: "Family council" },
    ],
  },
];

const laneOrder = ["DECIDE", "EXPERT", "EXECUTE", "EVIDENCE"] as const;

export const Route = createFileRoute("/member/control-room")({
  component: ControlRoomPage,
});

function ControlRoomPage() {
  const [activeId, setActiveId] = useState(templates[0]!.id);
  const [complete, setComplete] = useState<Record<string, boolean>>({
    "mc-1": true,
    "mc-2": true,
    "mc-3": false,
  });

  const active = templates.find((template) => template.id === activeId) ?? templates[0]!;
  const completedCount = active.items.filter((item) => complete[item.id]).length;
  const progress = Math.round((completedCount / active.items.length) * 100);
  const nextItem = active.items.find((item) => !complete[item.id]);

  const grouped = useMemo(
    () => laneOrder.map((lane) => ({ lane, items: active.items.filter((item) => item.lane === lane) })),
    [active],
  );

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Life Decision Room"
        title="Turn a complicated life decision into an executable system"
        description="Start with the outcome, expose dependencies, separate peer judgement from professional advice, give execution a named owner and keep evidence that the work is actually complete."
      />

      <section className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {templates.map((template) => {
          const Icon = template.icon;
          const activeTemplate = template.id === active.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => setActiveId(template.id)}
              className={`border p-5 text-left transition-colors ${activeTemplate ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:bg-accent"}`}
            >
              <Icon className={`h-5 w-5 ${activeTemplate ? "text-bronze" : "text-muted-foreground"}`} />
              <p className="mt-5 text-[10px] uppercase tracking-[0.18em] opacity-60">Decision room</p>
              <h2 className="mt-2 font-display text-2xl">{template.label}</h2>
            </button>
          );
        })}
      </section>

      <section className="border border-border bg-card">
        <div className="grid gap-7 border-b border-border p-6 lg:grid-cols-[1fr_320px] lg:items-end md:p-8">
          <div>
            <p className="eyebrow text-bronze">Active room</p>
            <h2 className="mt-3 max-w-4xl font-display text-4xl leading-tight md:text-5xl">{active.headline}</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">{active.question}</p>
          </div>
          <div className="border border-border bg-background p-5">
            <div className="flex items-end justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Execution progress</p><p className="mt-2 font-display text-4xl">{progress}%</p></div><p className="text-xs text-muted-foreground">{completedCount}/{active.items.length} complete</p></div>
            <div className="mt-4 h-2 bg-accent"><div className="h-full bg-bronze transition-all" style={{ width: `${progress}%` }} /></div>
          </div>
        </div>

        <div className="grid gap-px bg-border lg:grid-cols-2">
          <div className="bg-background p-6 md:p-7">
            <p className="text-[10px] uppercase tracking-[0.18em] text-bronze">Definition of done</p>
            <p className="mt-3 text-sm leading-7 text-foreground">{active.outcome}</p>
          </div>
          <div className="bg-background p-6 md:p-7">
            <p className="text-[10px] uppercase tracking-[0.18em] text-bronze">Next executable action</p>
            <h3 className="mt-3 font-display text-2xl">{nextItem?.title ?? "Room complete"}</h3>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">{nextItem?.detail ?? "Review the evidence and decide what should become a recurring control."}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="eyebrow text-bronze">Execution board</p><h2 className="mt-2 font-display text-3xl">Four lanes. No hiding behind research.</h2></div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="rounded-none"><Link to="/member/table"><TableProperties className="mr-2 h-4 w-4" />Ask the Table</Link></Button>
            <Button asChild variant="outline" className="rounded-none"><Link to="/member/partners"><BadgeCheck className="mr-2 h-4 w-4" />Find specialist</Link></Button>
            <Button asChild className="rounded-none"><Link to="/member/concierge"><Compass className="mr-2 h-4 w-4" />Give concierge the brief</Link></Button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-4">
          {grouped.map((group, laneIndex) => (
            <div key={group.lane} className="border border-border bg-card">
              <div className="border-b border-border p-4"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.19em] text-bronze">{group.lane}</p><span className="font-display text-xl text-muted-foreground">0{laneIndex + 1}</span></div></div>
              <div className="divide-y divide-border">
                {group.items.map((item) => {
                  const done = Boolean(complete[item.id]);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setComplete((current) => ({ ...current, [item.id]: !current[item.id] }))}
                      className="block w-full p-4 text-left transition-colors hover:bg-accent/50"
                    >
                      <div className="flex items-start gap-3">
                        {done ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-bronze" /> : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}
                        <div>
                          <h3 className={`text-sm font-medium ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.title}</h3>
                          <p className="mt-2 text-xs leading-6 text-muted-foreground">{item.detail}</p>
                          <div className="mt-3 flex flex-wrap gap-2 text-[9px] uppercase tracking-[0.12em] text-muted-foreground"><span className="border border-border px-2 py-1">Owner: {item.owner}</span>{item.dependency ? <span className="border border-border px-2 py-1">After: {item.dependency}</span> : null}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-3"><MessageSquareText className="h-5 w-5 text-bronze" /><div><p className="eyebrow text-bronze">Questions for the room</p><h2 className="mt-2 font-display text-3xl">Peer judgement before expensive implementation</h2></div></div>
          <div className="mt-6 divide-y divide-border border-y border-border">{active.decisionQuestions.map((question, index) => <div key={question} className="grid gap-3 py-4 sm:grid-cols-[40px_1fr]"><span className="font-display text-xl text-bronze">0{index + 1}</span><p className="text-sm leading-7">{question}</p></div>)}</div>
        </section>

        <section className="border border-border bg-foreground p-6 text-background">
          <BadgeCheck className="h-5 w-5 text-bronze" />
          <p className="mt-7 text-[10px] uppercase tracking-[0.2em] text-background/60">Specialist bench</p>
          <h2 className="mt-3 font-display text-3xl">Bring experts in only where expertise is actually required.</h2>
          <div className="mt-5 flex flex-wrap gap-2">{active.expertCategories.map((category) => <span key={category} className="border border-background/25 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.13em] text-background/75">{category}</span>)}</div>
          <p className="mt-6 text-sm leading-7 text-background/70">The Decision Room separates four things that are often muddled together: what the family must decide, what a qualified professional must advise on, what somebody must execute and what evidence proves completion.</p>
          <Link to="/member/partners" className="mt-6 inline-flex items-center gap-2 text-sm">Open Trusted Partners <ArrowRight className="h-3.5 w-3.5" /></Link>
        </section>
      </div>
    </div>
  );
}
