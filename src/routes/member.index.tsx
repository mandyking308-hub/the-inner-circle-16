import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Inbox, LayoutDashboard, Sparkles } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { knowledge } from "@/data/community";
import { readPrivateOfficeSummary, type PrivateOfficeSummary } from "@/data/privateOfficeSummary";
import { openMemberRequests, readMemberRequests, type MemberSourcingRequest } from "@/data/memberSourcing";
import { bookingStatusLabel, needsReplyCount, readBookings, readThreads, type Booking, type Thread } from "@/data/memberWorld";

export const Route = createFileRoute("/member/")({ component: MemberHome });

const fallback: PrivateOfficeSummary = {
  memberName: "Amelia Hart",
  memberCity: "London",
  activeDecisionLabel: "Move country",
  decisionProgress: 17,
  nextDecisionAction: "Reduce to two realistic jurisdictions",
  overdueDecisionActions: 0,
  openConciergeCases: 1,
  conciergeNextAction: "Review the checked options and decide whether you would like an introduction arranged.",
  learningGoal: "Complete one independent project for a real audience.",
  learningProgress: "0/4 quests complete",
  nextGatheringTitle: "The founder after the founder",
  nextGatheringDate: "17 Sep 2026",
  nextGatheringResponse: "Response needed",
  attention: [],
};

type NeedsYou = { label: string; detail: string; to: string };

function MemberHome() {
  const [summary, setSummary] = useState<PrivateOfficeSummary>(fallback);
  const [dateLabel, setDateLabel] = useState("Today");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [requests, setRequests] = useState<MemberSourcingRequest[]>([]);

  useEffect(() => {
    const refresh = () => {
      setSummary(readPrivateOfficeSummary());
      setBookings(readBookings());
      setThreads(readThreads());
      setRequests(readMemberRequests());
    };
    refresh();
    setDateLabel(new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(new Date()));
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const firstName = summary.memberName.split(" ")[0] || "there";
  const open = openMemberRequests(requests);
  const replies = needsReplyCount(threads);
  const readyForYou = open.filter((request) => request.status === "Ready for you");
  const upcoming = bookings
    .filter((booking) => booking.status === "upcoming" || booking.status === "awaiting" || booking.status === "in_progress")
    .slice(0, 4);
  const worthKnowing = knowledge[1];

  const needsYou: NeedsYou[] = [];
  if (summary.nextGatheringResponse === "Response needed") {
    needsYou.push({ label: "An invitation is waiting for you", detail: `${summary.nextGatheringTitle} · ${summary.nextGatheringDate}`, to: "/member/events" });
  }
  readyForYou.slice(0, 2).forEach((request) => {
    needsYou.push({ label: "Checked options are ready", detail: request.title, to: "/member/services" });
  });
  if (replies > 0) {
    needsYou.push({ label: `${replies} message${replies === 1 ? "" : "s"} need a reply`, detail: "Someone at Montvelle is waiting on a word from you.", to: "/member/messages" });
  }
  if (summary.overdueDecisionActions > 0) {
    needsYou.push({ label: "A decision is waiting on you", detail: summary.nextDecisionAction, to: "/member/control-room" });
  }

  const headline =
    needsYou.length === 0
      ? "Nothing urgent today."
      : needsYou.length === 1
        ? "One thing needs you."
        : `${needsYou.length} things need you.`;

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow={`${dateLabel} · ${summary.memberCity}`}
        title={`Good day, ${firstName}.`}
        description={
          open.length === 0
            ? "Nothing is currently with us. When something needs arranging, tell us and we will take it from there."
            : `Montvelle is handling ${open.length} thing${open.length === 1 ? "" : "s"} for you.`
        }
      />

      <section className="border border-border bg-card">
        <div className="border-b border-border p-5 md:p-6">
          <p className="eyebrow text-oxblood">Needs you</p>
          <h2 className="mt-2 font-display text-4xl leading-tight">{headline}</h2>
        </div>
        {needsYou.length === 0 ? (
          <p className="p-5 text-sm leading-7 text-muted-foreground md:p-6">
            Nothing is waiting on your judgement. Anything in motion is with us, and you will hear from us before it needs you.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {needsYou.map((item, index) => (
              <Link
                key={`${item.label}-${index}`}
                to={item.to}
                className="group grid gap-3 p-5 transition-colors hover:bg-accent md:grid-cols-[48px_1fr_auto] md:items-center md:p-6"
              >
                <span className="font-display text-2xl text-oxblood">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-2xl leading-tight">{item.label}</h3>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">{item.detail}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-oxblood transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="border border-border bg-card p-6 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-oxblood" />
              <p className="eyebrow text-oxblood">Montvelle is handling</p>
            </div>
            <h2 className="mt-5 font-display text-3xl leading-tight">
              {open.length === 0 ? "Nothing open at the moment." : "Tell us what you need. We'll take it from here."}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Anything you ask for is acknowledged straight away, and we come back to you within 24 hours with an answer, a progress update or
              checked options.
            </p>
          </div>
          <Link to="/member/services" className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent">
            Make a request <ArrowRight className="h-4 w-4 text-oxblood" />
          </Link>
        </div>
        {open.length > 0 ? (
          <ul className="mt-6 divide-y divide-border border-y border-border text-sm">
            {open.slice(0, 4).map((request) => (
              <li key={request.id} className="flex flex-wrap items-start justify-between gap-4 py-3">
                <span className="max-w-2xl">
                  <span className="block">{request.title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{request.nextUpdate}</span>
                </span>
                <span className="shrink-0 text-[9px] uppercase tracking-[0.14em] text-oxblood">{request.status}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <div className="grid gap-px bg-border lg:grid-cols-2">
        <section className="bg-card p-6 md:p-7">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-oxblood" />
            <p className="eyebrow text-oxblood">Coming up</p>
          </div>
          <h2 className="mt-5 font-display text-3xl leading-tight">
            {upcoming.length === 0 ? "Nothing in the diary yet." : "What is in the diary."}
          </h2>
          <ul className="mt-5 divide-y divide-border border-y border-border text-sm">
            {upcoming.length === 0 ? (
              <li className="py-3 text-muted-foreground">Confirmed arrangements and accepted invitations will appear here.</li>
            ) : (
              upcoming.map((booking) => (
                <li key={booking.id} className="flex items-start justify-between gap-4 py-3">
                  <span>
                    <span className="block">{booking.serviceTitle}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{booking.when} · {booking.city}</span>
                  </span>
                  <span className="shrink-0 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{bookingStatusLabel[booking.status]}</span>
                </li>
              ))
            )}
          </ul>
          <Link to="/member/events" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
            See your invitations <ArrowRight className="h-4 w-4 text-oxblood" />
          </Link>
        </section>

        <section className="bg-foreground p-6 text-background md:p-7">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-5 w-5 text-bronze" />
            <p className="eyebrow text-background/50">Decision Room</p>
          </div>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-bronze">
            {summary.activeDecisionLabel} · {summary.decisionProgress}% through
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight">{summary.nextDecisionAction}</h2>
          <p className="mt-4 text-sm leading-7 text-background/65">
            One decision at a time, with the thinking, the expertise and the evidence kept in one private place.
          </p>
          <Link to="/member/control-room" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
            Open the Decision Room <ArrowRight className="h-4 w-4 text-bronze" />
          </Link>
        </section>
      </div>

      {worthKnowing ? (
        <section className="border border-border bg-card p-6 md:p-7">
          <div className="flex items-center gap-3">
            <Inbox className="h-5 w-5 text-oxblood" />
            <p className="eyebrow text-oxblood">Worth knowing</p>
          </div>
          <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight">{worthKnowing.title}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{worthKnowing.summary}</p>
          <Link to="/member/knowledge" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
            Read this <ArrowRight className="h-4 w-4 text-oxblood" />
          </Link>
        </section>
      ) : null}
    </div>
  );
}
