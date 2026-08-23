import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Compass,
  GraduationCap,
  LayoutDashboard,
  Network,
  Sparkles,
  TableProperties,
} from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { asksOffers, knowledge } from "@/data/community";
import { luxuryImages } from "@/data/luxuryImages";
import { readPrivateOfficeSummary, type PrivateOfficeSummary } from "@/data/privateOfficeSummary";
import {
  bookingStatusLabel,
  needsReplyCount,
  readBookings,
  readThreads,
  type Booking,
  type Thread,
} from "@/data/memberWorld";

export const Route = createFileRoute("/member/")({ component: MemberHome });

const fallback: PrivateOfficeSummary = {
  memberName: "Amelia Hart",
  memberCity: "London",
  activeDecisionLabel: "Move country",
  decisionProgress: 17,
  nextDecisionAction: "Reduce to two realistic jurisdictions",
  overdueDecisionActions: 0,
  openConciergeCases: 1,
  conciergeNextAction: "Review the two shortlisted education advisers and approve an introduction.",
  learningGoal: "Complete one independent project for a real audience.",
  learningProgress: "0/4 quests complete",
  nextGatheringTitle: "The founder after the founder",
  nextGatheringDate: "17 Sep 2026",
  nextGatheringResponse: "Response needed",
  attention: [
    { label: "Concierge has a live next action", detail: "Review the two shortlisted education advisers and approve an introduction.", to: "/member/concierge", urgency: "Soon" },
    { label: "Private invitation awaiting response", detail: "The founder after the founder · 17 Sep 2026", to: "/member/events", urgency: "Soon" },
  ],
};

function MemberHome() {
  const [summary, setSummary] = useState<PrivateOfficeSummary>(fallback);
  const [dateLabel, setDateLabel] = useState("Private office");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const firstAsk = asksOffers[0]!;
  const recommendation = knowledge[1]!;
  const firstName = summary.memberName.split(" ")[0] || "there";
  const awaiting = bookings.filter((booking) => booking.status === "awaiting");
  const nextBookings = bookings
    .filter((booking) => booking.status === "upcoming" || booking.status === "awaiting" || booking.status === "in_progress")
    .slice(0, 3);
  const replies = needsReplyCount(threads);

  useEffect(() => {
    setSummary(readPrivateOfficeSummary());
    setBookings(readBookings());
    setThreads(readThreads());
    setDateLabel(new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(new Date()));

    const refresh = () => {
      setSummary(readPrivateOfficeSummary());
      setBookings(readBookings());
      setThreads(readThreads());
    };
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow={`${dateLabel} · ${summary.memberCity}`}
        title={`Good afternoon, ${firstName}.`}
        description="This is the front desk of your private office. It should tell you what needs judgement, what somebody else is executing and what can safely wait — without making you tour the whole platform first."
      />

      <section className="relative min-h-[410px] overflow-hidden border border-border bg-foreground text-background">
        <img src={luxuryImages.command} alt="A private family office command room" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/86 to-foreground/25" />
        <div className="relative grid min-h-[410px] gap-10 p-7 md:p-9 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <div className="flex items-center gap-3"><LayoutDashboard className="h-5 w-5 text-bronze" /><p className="eyebrow text-background/55">The decision in motion</p></div>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-bronze">{summary.activeDecisionLabel} · {summary.decisionProgress}% complete</p>
            <h2 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] md:text-6xl">{summary.nextDecisionAction}</h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-background/68">The dashboard is reading the work inside your Decision Room. Complete an action, change the sequence or add a new decision and this front page changes with it.</p>
            <Link to="/member/control-room" className="mt-7 inline-flex items-center gap-2 border border-background/28 px-5 py-3 text-sm font-semibold transition-colors hover:bg-background hover:text-foreground">Open the Decision Room <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="border border-background/20 bg-foreground/72 p-5 backdrop-blur-md">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-background/45">Definition of a good private office</p>
            <p className="mt-4 font-display text-3xl leading-tight">You know what needs you — and what does not.</p>
            <div className="mt-6 divide-y divide-background/15 border-y border-background/15 text-xs text-background/70">
              <div className="flex items-center justify-between gap-4 py-3"><span>Overdue decision actions</span><strong className="text-background">{summary.overdueDecisionActions}</strong></div>
              <div className="flex items-center justify-between gap-4 py-3"><span>Live concierge cases</span><strong className="text-background">{summary.openConciergeCases}</strong></div>
              <div className="flex items-center justify-between gap-4 py-3"><span>Next invitation</span><strong className="max-w-[150px] text-right text-background">{summary.nextGatheringResponse}</strong></div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Decision Room" value={`${summary.decisionProgress}%`} note={`${summary.activeDecisionLabel} · next: ${summary.nextDecisionAction}`} />
        <StatCard label="Concierge" value={String(summary.openConciergeCases)} note={summary.conciergeNextAction} />
        <StatCard label="Family learning" value={summary.learningProgress.split(" ")[0] ?? "—"} note={summary.learningGoal} />
        <StatCard label="Next gathering" value={summary.nextGatheringDate.split(" ").slice(0, 2).join(" ")} note={`${summary.nextGatheringTitle} · ${summary.nextGatheringResponse}`} />
      </div>

      <section className="grid gap-px bg-border lg:grid-cols-2">
        <div className="bg-card p-6 md:p-7">
          <div className="flex items-center gap-3"><CalendarDays className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">Bookings</p></div>
          <h2 className="mt-5 font-display text-3xl leading-tight">
            {awaiting.length > 0
              ? `${awaiting.length} request${awaiting.length === 1 ? "" : "s"} awaiting confirmation.`
              : "Everything arranged is confirmed."}
          </h2>
          <ul className="mt-5 divide-y divide-border border-y border-border text-sm">
            {nextBookings.length === 0 ? (
              <li className="py-3 text-muted-foreground">Nothing in the diary yet.</li>
            ) : (
              nextBookings.map((booking) => (
                <li key={booking.id} className="flex items-start justify-between gap-4 py-3">
                  <span>
                    <span className="block">{booking.serviceTitle}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{booking.city} · {booking.when}</span>
                  </span>
                  <span className="shrink-0 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    {bookingStatusLabel[booking.status]}
                  </span>
                </li>
              ))
            )}
          </ul>
          <Link to="/member/bookings" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Open bookings <ArrowRight className="h-4 w-4 text-oxblood" /></Link>
        </div>
        <div className="bg-card p-6 md:p-7">
          <div className="flex items-center gap-3"><Compass className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">Messages</p></div>
          <h2 className="mt-5 font-display text-3xl leading-tight">
            {replies > 0 ? `${replies} conversation${replies === 1 ? "" : "s"} waiting on you.` : "No one is waiting on a reply."}
          </h2>
          <ul className="mt-5 divide-y divide-border border-y border-border text-sm">
            {threads.slice(0, 3).map((thread) => (
              <li key={thread.id} className="py-3">
                <span className="block">{thread.subject}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{thread.context}</span>
              </li>
            ))}
          </ul>
          <Link to="/member/messages" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Open messages <ArrowRight className="h-4 w-4 text-oxblood" /></Link>
        </div>
      </section>

      <section className="border border-border bg-card">
        <div className="flex items-end justify-between gap-5 border-b border-border p-5 md:p-6"><div><p className="eyebrow text-oxblood">What needs your attention</p><h2 className="mt-2 font-display text-4xl">A short list, not another inbox.</h2></div><Compass className="h-5 w-5 text-oxblood" /></div>
        <div className="divide-y divide-border">
          {summary.attention.map((item, index) => (
            <Link key={`${item.label}-${index}`} to={item.to} className="group grid gap-4 p-5 transition-colors hover:bg-accent md:grid-cols-[58px_150px_1fr_auto] md:items-center md:p-6">
              <span className="font-display text-2xl text-oxblood">0{index + 1}</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{item.urgency}</span>
              <div><h3 className="font-display text-2xl">{item.label}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{item.detail}</p></div>
              <ArrowRight className="h-4 w-4 text-oxblood transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="border border-border bg-card p-6 md:p-7">
          <div className="flex items-center gap-3"><Compass className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">Concierge case in motion</p></div>
          <h2 className="mt-5 font-display text-4xl leading-tight">{summary.conciergeNextAction}</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">A good concierge service should not make you remember the request. The case owns the context, the options, the consent and the next action until the outcome is closed.</p>
          <Link to="/member/concierge" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Open Concierge <ArrowRight className="h-4 w-4 text-oxblood" /></Link>
        </section>

        <section className="border border-border bg-foreground p-6 text-background md:p-7">
          <GraduationCap className="h-5 w-5 text-bronze" />
          <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.18em] text-background/45">Family learning · current focus</p>
          <h2 className="mt-3 font-display text-3xl leading-tight">{summary.learningGoal}</h2>
          <p className="mt-4 text-xs leading-6 text-background/62">{summary.learningProgress}. The test is not how much content has been consumed; it is what the learner can now do independently.</p>
          <Link to="/member/learning" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Open Learning Studio <ArrowRight className="h-4 w-4 text-bronze" /></Link>
        </section>
      </div>

      <section className="border border-border bg-card">
        <div className="grid gap-px bg-border lg:grid-cols-[1.12fr_0.88fr]">
          <div className="bg-card p-6 md:p-7">
            <div className="flex items-center gap-3"><CalendarDays className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">Next room</p></div>
            <h2 className="mt-5 font-display text-4xl">{summary.nextGatheringTitle}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{summary.nextGatheringDate} · {summary.nextGatheringResponse}</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">The event page now holds the reason for the room, who it is useful for, your response, dietary/access notes, plus-one request and calendar hold.</p>
            <Link to="/member/events" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Open invitation <ArrowRight className="h-4 w-4 text-oxblood" /></Link>
          </div>
          <div className="bg-foreground p-6 text-background md:p-7">
            <Sparkles className="h-5 w-5 text-bronze" />
            <p className="mt-8 text-[9px] uppercase tracking-[0.18em] text-background/45">Curated for the question behind the question</p>
            <h2 className="mt-3 font-display text-3xl leading-tight">{recommendation.title}</h2>
            <p className="mt-4 text-sm leading-7 text-background/65">{recommendation.summary}</p>
            <Link to="/member/knowledge" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Ask the Archive <ArrowRight className="h-4 w-4 text-bronze" /></Link>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="border border-border bg-card p-5 md:p-6">
          <div className="flex items-center gap-3"><Network className="h-4 w-4 text-oxblood" /><p className="eyebrow text-oxblood">Relationship intelligence</p></div>
          <h3 className="mt-4 font-display text-3xl">Do not browse people. Start with the problem.</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Search the community for expertise, city or lived experience and see why somebody may be relevant before you ask for a consent-led introduction.</p>
          <Link to="/member/community" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Who could help? <ArrowRight className="h-3.5 w-3.5 text-oxblood" /></Link>
        </section>

        <section className="border border-border bg-card p-5 md:p-6">
          <div className="flex items-center gap-3"><TableProperties className="h-4 w-4 text-oxblood" /><p className="eyebrow text-oxblood">From the community</p></div>
          <h3 className="mt-4 font-display text-3xl">{firstAsk.title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{firstAsk.body}</p>
          <Link to="/member/ask-offer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">See asks & offers <ArrowRight className="h-3.5 w-3.5 text-oxblood" /></Link>
        </section>
      </div>

      <section className="grid gap-px bg-border md:grid-cols-3">
        {[
          [BadgeCheck, "Network", "Trusted specialists, people and introductions.", "/member/network"],
          [GraduationCap, "Programme", "Learning, mentoring, alumni and next-generation pathways.", "/member/programme"],
          [Compass, "Account", "Privacy, visibility and notification controls.", "/member/profile"],
        ].map(([Icon, title, body, to]) => { const Component = Icon as typeof BadgeCheck; return <Link key={String(title)} to={String(to)} className="group bg-card p-5 transition-colors hover:bg-accent"><Component className="h-5 w-5 text-oxblood" /><h3 className="mt-5 font-display text-2xl">{String(title)}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{String(body)}</p><span className="mt-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em]">Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span></Link>; })}
      </section>
    </div>
  );
}
