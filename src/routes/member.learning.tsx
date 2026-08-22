import { type FormEvent, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ClipboardList, FileCheck2, GraduationCap, Hammer, Plus, Sparkles, UserRoundCheck } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { curriculumDomains, executionFramework, sampleQuests } from "@/data/infrastructure";

export const Route = createFileRoute("/member/learning")({ component: LearningStudioPage });

const STORAGE_KEY = "project-table:learning-studio:v2";

type Evidence = { id: string; title: string; type: string; note: string; date: string };
type LearningState = {
  learnerName: string;
  ageStage: string;
  graduateProfile: string;
  termGoal: string;
  domainScores: Record<string, number>;
  questStatus: Record<string, "Not started" | "In progress" | "Complete">;
  evidence: Evidence[];
  review: string;
  mentorRequest: string;
};

const starterState: LearningState = {
  learnerName: "Learner 01",
  ageStage: "11–13",
  graduateProfile: "Confident communicator, strong academic foundations, practical independence, digital judgement and the ability to take a real brief from idea to delivery.",
  termGoal: "Complete one independent project for a real audience and take responsibility for one recurring family task.",
  domainScores: Object.fromEntries(curriculumDomains.map((domain, index) => [domain.title, index < 2 ? 3 : 2])),
  questStatus: Object.fromEntries(sampleQuests.map((quest, index) => [quest.title, index === 0 ? "In progress" : "Not started"])),
  evidence: [{ id: "evidence-1", title: "First project presentation", type: "Presentation", note: "Presented the brief, budget and lessons learned to family mentors.", date: "2026-08-15" }],
  review: "What can the learner now do independently that they could not do three months ago?",
  mentorRequest: "",
};

function LearningStudioPage() {
  const [state, setState] = useState<LearningState>(starterState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...starterState, ...(JSON.parse(raw) as Partial<LearningState>) });
    } catch {
      // Keep starter learning plan if local persistence is unavailable.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const completedQuests = useMemo(() => Object.values(state.questStatus).filter((status) => status === "Complete").length, [state.questStatus]);
  const averageCapability = useMemo(() => {
    const values = Object.values(state.domainScores);
    return values.length ? (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1) : "0.0";
  }, [state.domainScores]);

  const addEvidence = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    if (!title) return;
    const evidence: Evidence = { id: `evidence-${Date.now()}`, title, type: String(form.get("type") ?? "Project"), note: String(form.get("note") ?? "").trim(), date: new Date().toISOString().slice(0, 10) };
    setState((current) => ({ ...current, evidence: [evidence, ...current.evidence] }));
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Family Learning Studio" title="What can this learner now do independently?" description="Build a personal curriculum around capability: academic foundations, communication, enterprise, technology, practical independence, judgement, service and the habit of finishing real work." />

      <section className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
        <article className="border border-border bg-foreground p-6 text-background md:p-7"><GraduationCap className="h-5 w-5 text-bronze" /><p className="mt-7 text-[9px] uppercase tracking-[0.2em] text-background/50">Learner profile</p><div className="mt-4 grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="learner-name" className="text-background/70">Name / label</Label><Input id="learner-name" value={state.learnerName} onChange={(event) => setState((current) => ({ ...current, learnerName: event.target.value }))} className="rounded-none border-background/25 bg-background/8 text-background" /></div><div className="space-y-2"><Label htmlFor="learner-stage" className="text-background/70">Age / stage</Label><Input id="learner-stage" value={state.ageStage} onChange={(event) => setState((current) => ({ ...current, ageStage: event.target.value }))} className="rounded-none border-background/25 bg-background/8 text-background" /></div></div><div className="mt-5 space-y-2"><Label htmlFor="graduate-profile" className="text-background/70">Graduate profile</Label><Textarea id="graduate-profile" value={state.graduateProfile} onChange={(event) => setState((current) => ({ ...current, graduateProfile: event.target.value }))} rows={5} className="rounded-none border-background/25 bg-background/8 text-background" /></div></article>
        <div className="grid gap-px bg-border sm:grid-cols-2">{executionFramework.map((item) => <article key={item.step} className="bg-card p-5"><p className="text-[9px] uppercase tracking-[0.18em] text-oxblood">{item.step}</p><h3 className="mt-2 font-display text-2xl">{item.title}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{item.body}</p></article>)}</div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3"><div className="border-t-2 border-oxblood bg-card p-5"><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Capability average</p><p className="mt-3 font-display text-4xl">{averageCapability}<span className="text-xl text-muted-foreground">/5</span></p></div><div className="border-t-2 border-oxblood bg-card p-5"><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Quests completed</p><p className="mt-3 font-display text-4xl">{completedQuests}</p></div><div className="border-t-2 border-oxblood bg-card p-5"><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Evidence items</p><p className="mt-3 font-display text-4xl">{state.evidence.length}</p></div></section>

      <section>
        <div className="flex items-end justify-between gap-5"><div><p className="eyebrow text-oxblood">Capability map</p><h2 className="mt-2 font-display text-3xl">Progress is not a school grade.</h2><p className="mt-3 max-w-2xl text-xs leading-6 text-muted-foreground">Score current independence from 1 = needs close support to 5 = can plan, deliver and review independently in age-appropriate contexts.</p></div><ClipboardList className="h-5 w-5 text-bronze" /></div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{curriculumDomains.map((domain) => <article key={domain.title} className="border border-border bg-card p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-display text-2xl">{domain.title}</h3><span className="font-display text-3xl text-oxblood">{state.domainScores[domain.title] ?? 1}</span></div><p className="mt-3 text-xs leading-6 text-muted-foreground">{domain.description}</p><div className="mt-5 flex gap-1">{[1,2,3,4,5].map((score) => <button key={score} type="button" onClick={() => setState((current) => ({ ...current, domainScores: { ...current.domainScores, [domain.title]: score } }))} className={`h-7 flex-1 border text-[10px] ${score <= (state.domainScores[domain.title] ?? 1) ? "border-oxblood bg-oxblood text-oxblood-foreground" : "border-border bg-background text-muted-foreground"}`}>{score}</button>)}</div></article>)}</div>
      </section>

      <section className="border border-border bg-card p-6"><div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]"><div><Hammer className="h-5 w-5 text-oxblood" /><p className="mt-7 eyebrow text-oxblood">Term focus</p><h2 className="mt-3 font-display text-3xl">One meaningful capability at a time.</h2><Textarea value={state.termGoal} onChange={(event) => setState((current) => ({ ...current, termGoal: event.target.value }))} rows={4} className="mt-5 rounded-none" /></div><div className="grid gap-4 lg:grid-cols-2">{sampleQuests.map((quest) => <article key={quest.title} className="border border-border bg-background p-5"><div className="flex items-start justify-between gap-4"><h3 className="font-display text-2xl">{quest.title}</h3><select value={state.questStatus[quest.title] ?? "Not started"} onChange={(event) => setState((current) => ({ ...current, questStatus: { ...current.questStatus, [quest.title]: event.target.value as LearningState["questStatus"][string] } }))} className="h-8 rounded-none border border-input bg-background px-2 text-[10px]"><option>Not started</option><option>In progress</option><option>Complete</option></select></div><p className="mt-3 text-xs leading-6 text-muted-foreground">{quest.outcome}</p><div className="mt-4 flex flex-wrap gap-2">{quest.domains.map((domain) => <span key={domain} className="border border-border px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{domain}</span>)}</div></article>)}</div></div></section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="border border-border bg-card p-6"><div className="flex items-center gap-3"><FileCheck2 className="h-5 w-5 text-oxblood" /><h2 className="font-display text-3xl">Evidence portfolio</h2></div><form onSubmit={addEvidence} className="mt-5 grid gap-3 sm:grid-cols-2"><Input name="title" required className="rounded-none" placeholder="Project, presentation or contribution" /><select name="type" className="h-10 rounded-none border border-input bg-background px-3 text-sm"><option>Project</option><option>Presentation</option><option>Reference / feedback</option><option>Enterprise</option><option>Service</option><option>Apprenticeship</option></select><Textarea name="note" rows={3} className="rounded-none sm:col-span-2" placeholder="What was delivered? What did the learner own independently?" /><div className="sm:col-span-2"><Button type="submit" variant="outline" className="rounded-none"><Plus className="mr-2 h-4 w-4" />Add evidence</Button></div></form><div className="mt-6 divide-y divide-border border-y border-border">{state.evidence.map((item) => <div key={item.id} className="grid gap-3 py-4 sm:grid-cols-[110px_1fr_auto]"><span className="text-[9px] uppercase tracking-[0.14em] text-oxblood">{item.type}</span><div><p className="text-sm font-semibold">{item.title}</p><p className="mt-1 text-xs leading-6 text-muted-foreground">{item.note}</p></div><span className="text-[9px] text-muted-foreground">{item.date}</span></div>)}</div></article>

        <div className="space-y-5"><article className="border border-border bg-foreground p-6 text-background"><UserRoundCheck className="h-5 w-5 text-bronze" /><p className="mt-7 eyebrow text-background/50">Termly review</p><h2 className="mt-3 font-display text-3xl">What can they now do independently?</h2><Textarea value={state.review} onChange={(event) => setState((current) => ({ ...current, review: event.target.value }))} rows={6} className="mt-5 rounded-none border-background/20 bg-background/8 text-background" /></article><article className="border border-border bg-card p-6"><Sparkles className="h-5 w-5 text-oxblood" /><h2 className="mt-5 font-display text-3xl">Mentor / exposure request</h2><Textarea value={state.mentorRequest} onChange={(event) => setState((current) => ({ ...current, mentorRequest: event.target.value }))} rows={4} className="mt-4 rounded-none" placeholder="What kind of person, workplace or real-world exposure would help next?" /><Button asChild variant="outline" className="mt-4 rounded-none"><Link to="/member/alumni">Explore opportunities <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></article></div>
      </section>

      <section className="border border-border bg-card p-6"><div className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-oxblood" /><div><p className="text-sm font-semibold">Safeguarding and education boundaries remain part of the design.</p><p className="mt-2 text-xs leading-6 text-muted-foreground">A family plan may supplement school or support a lawful alternative route, but local education law, qualifications, attendance duties, special educational needs and safeguarding requirements must be checked separately. Under-18 opportunities require guardian permission and appropriate adult controls.</p></div></div></section>
    </div>
  );
}
