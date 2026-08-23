import { useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  Clock3,
  FileText,
  HandHeart,
  LockKeyhole,
  Network,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  TableProperties,
  Users,
} from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  applicationStages,
  gatherings,
  impactProjects,
  knowledge,
  members,
  tableMembers,
} from "@/data/community";

const applications = [
  {
    name: "DEMO Applicant B",
    role: "Founder · Consumer health",
    city: "London",
    stage: "Screening",
    referral: "Member referral",
    fit: "Strong contribution",
  },
  {
    name: "Arun Mehta",
    role: "Family enterprise principal",
    city: "London",
    stage: "Interview",
    referral: "Direct application",
    fit: "Review peer mix",
  },
  {
    name: "Clara Moretti",
    role: "Impact investor",
    city: "Milan",
    stage: "References",
    referral: "Member referral",
    fit: "Strong international perspective",
  },
  {
    name: "Thomas Beck",
    role: "Partner · Advisory",
    city: "London",
    stage: "Applied",
    referral: "Direct application",
    fit: "Check solicitation risk",
  },
  {
    name: "Amina Bello",
    role: "Founder · Logistics",
    city: "London",
    stage: "Approved",
    referral: "Member referral",
    fit: "Founding cohort candidate",
  },
];

const introQueue = [
  {
    from: "DEMO Member",
    to: "DEMO Member F",
    reason: "Founder-to-chair transition",
    status: "Consent received",
  },
  {
    from: "DEMO Member B",
    to: "DEMO Member I",
    reason: "Family philanthropy structure",
    status: "Ask recipient",
  },
  {
    from: "DEMO Member G",
    to: "DEMO Member L",
    reason: "Child-safe technology review",
    status: "Reviewing",
  },
  {
    from: "DEMO Member E",
    to: "External operator",
    reason: "Gulf healthcare launch",
    status: "Source candidate",
  },
];

function StatusPill({ children }: { children: string }) {
  return (
    <span className="border border-border bg-background px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </span>
  );
}

export function AdminOverview() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Concierge overview"
        title="Protect the quality of the room."
        description="The operational dashboard is deliberately about curation, consent and useful participation — not maximising engagement for its own sake."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active members" value="28" note="Two London Tables · founding cohort" />
        <StatCard label="Applications" value="34" note="14 new · 20 in review" />
        <StatCard label="Intro queue" value="7" note="3 waiting for recipient consent" />
        <StatCard label="Upcoming rooms" value="4" note="42 approved RSVPs" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="border border-border bg-card">
          <div className="border-b border-border p-5 md:p-6">
            <p className="eyebrow text-bronze">Application pipeline</p>
            <h2 className="mt-2 font-display text-3xl">From interest to a trusted seat.</h2>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {applicationStages.map((item) => (
              <div key={item.stage} className="bg-card p-5">
                <p className="text-xs text-muted-foreground">{item.stage}</p>
                <p className="mt-2 font-display text-4xl">{item.count}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-border bg-foreground p-6 text-background">
          <ShieldCheck className="h-5 w-5 text-bronze" />
          <p className="mt-8 eyebrow text-background/60">Culture watch</p>
          <h2 className="mt-3 font-display text-3xl">One issue needs a human decision.</h2>
          <p className="mt-4 text-sm leading-7 text-background/70">
            An adviser has requested five introductions in ten days, all commercial. Review context
            before allowing further requests. No automatic enforcement or hidden score.
          </p>
          <button className="mt-5 inline-flex items-center gap-2 text-sm">
            Review conduct note <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </section>
      </div>
    </div>
  );
}

export function ApplicationsView() {
  const [query, setQuery] = useState("");
  const filtered = applications.filter((app) =>
    [app.name, app.role, app.city, app.stage, app.fit]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Membership"
        title="Applications"
        description="Structured evidence helps staff review consistently, but final admission is always a human judgement about character, contribution, commitment and community fit."
      />
      <label className="relative block max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="rounded-none pl-9"
          placeholder="Search applications"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="border border-border bg-card">
        {filtered.map((app) => (
          <div
            key={app.name}
            className="grid gap-4 border-b border-border p-5 last:border-b-0 md:grid-cols-[1.2fr_1fr_160px_auto] md:items-center"
          >
            <div>
              <p className="font-display text-2xl">{app.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {app.role} · {app.city}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Review note
              </p>
              <p className="mt-1 text-sm">{app.fit}</p>
            </div>
            <div>
              <StatusPill>{app.stage}</StatusPill>
              <p className="mt-2 text-[11px] text-muted-foreground">{app.referral}</p>
            </div>
            <Button variant="outline" className="rounded-none">
              Open review
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MembersAdminView() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Community"
        title="Members"
        description="Manage status, city, membership category, Table assignment and privacy. The operating view should help people serve members, not turn member activity into surveillance."
        action={
          <Button className="rounded-none">
            <Plus className="mr-2 h-4 w-4" /> Invite approved member
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members.map((member, index) => (
          <article key={member.id} className="border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-xs">
                {member.initials}
              </div>
              <StatusPill>{index < 10 ? "Table 01" : "Community"}</StatusPill>
            </div>
            <h2 className="mt-4 font-display text-2xl">{member.name}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {member.role} · {member.organisation}
            </p>
            <div className="mt-4 flex justify-between border-t border-border pt-4 text-xs text-muted-foreground">
              <span>{member.city}</span>
              <span>{member.sector}</span>
              <span>Active</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function TablesAdminView() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Peer circles"
        title="Tables"
        description="Build for trust and useful tension: enough shared context to understand one another, enough difference that the room can see what the member cannot."
        action={
          <Button className="rounded-none">
            <Plus className="mr-2 h-4 w-4" /> Create Table
          </Button>
        }
      />
      <section className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="border border-border bg-card">
          <div className="border-b border-border p-5">
            <div className="flex items-center gap-3">
              <TableProperties className="h-4 w-4 text-bronze" />
              <h2 className="font-display text-3xl">London Table 01</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              10 members · monthly · hosted by Sarah Holden
            </p>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {tableMembers.map((member) => (
              <div key={member.id} className="bg-card p-4">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{member.sector}</p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-bronze">
                  {member.tableRole}
                </p>
              </div>
            ))}
          </div>
        </div>
        <aside className="space-y-4">
          <div className="border border-border bg-card p-5">
            <p className="eyebrow">Matching notes</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <p>Peer: 4</p>
              <p>Pathfinder: 3</p>
              <p>Perspective: 3</p>
              <p className="border-t border-border pt-3">
                Avoid direct commercial competitors where it would reduce openness.
              </p>
            </div>
          </div>
          <div className="border border-border bg-accent/25 p-5">
            <p className="text-sm font-medium">One vacancy</p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              Potential gap: operating CFO / family-enterprise finance leader. Do not fill just to
              reach a number.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

export function EventsAdminView() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Gatherings"
        title="Events & approvals"
        description="Curate room size, guest mix, waitlists and venue privacy. Exact locations stay hidden from unapproved accounts."
        action={
          <Button className="rounded-none">
            <Plus className="mr-2 h-4 w-4" /> New gathering
          </Button>
        }
      />
      <div className="space-y-4">
        {gatherings.map((event) => (
          <article
            key={event.id}
            className="grid gap-4 border border-border bg-card p-5 md:grid-cols-[1fr_180px_180px_auto] md:items-center"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-bronze">{event.type}</p>
              <h2 className="mt-2 font-display text-2xl">{event.title}</h2>
              <p className="mt-2 text-xs text-muted-foreground">
                {event.date} · {event.time}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Approved / capacity</p>
              <p className="mt-1 text-sm">8 / {event.seats.split(" ")[0]}</p>
            </div>
            <StatusPill>{event.status}</StatusPill>
            <Button variant="outline" className="rounded-none">
              Manage
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}

export function IntroductionsAdminView() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Relationship desk"
        title="Introductions"
        description="Every introduction should answer three questions: why these people, why now, and does the recipient want it? This is the trust layer that prevents the community becoming a prospect database."
      />
      <div className="border border-border bg-card">
        {introQueue.map((intro) => (
          <div
            key={`${intro.from}-${intro.to}`}
            className="grid gap-4 border-b border-border p-5 last:border-b-0 md:grid-cols-[1fr_1fr_180px_auto] md:items-center"
          >
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="mt-1 text-sm font-medium">{intro.from}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">To / reason</p>
              <p className="mt-1 text-sm font-medium">{intro.to}</p>
              <p className="mt-1 text-xs text-muted-foreground">{intro.reason}</p>
            </div>
            <StatusPill>{intro.status}</StatusPill>
            <Button variant="outline" className="rounded-none">
              Open
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContentAdminView() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Editorial"
        title="Knowledge & councils"
        description="Commission material from real member questions, not a content calendar. Expert councils can help shape briefings without gaining unrestricted access to the community."
        action={
          <Button className="rounded-none">
            <Plus className="mr-2 h-4 w-4" /> New resource
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {knowledge.map((item) => (
          <article key={item.id} className="border border-border bg-card p-5">
            <FileText className="h-4 w-4 text-bronze" />
            <p className="mt-5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {item.category}
            </p>
            <h2 className="mt-2 font-display text-2xl">{item.title}</h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              {item.format} · {item.readTime}
            </p>
            <div className="mt-4 border-t border-border pt-4">
              <StatusPill>Draft sample</StatusPill>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ImpactAdminView() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Impact"
        title="Projects & member contribution"
        description="Track what a project actually needs, which members have offered help and whether the work meets the community's governance standard."
        action={
          <Button className="rounded-none">
            <Plus className="mr-2 h-4 w-4" /> Add project
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {impactProjects.map((project, index) => (
          <article key={project.title} className="border border-border bg-card p-5">
            <HandHeart className="h-4 w-4 text-bronze" />
            <h2 className="mt-5 font-display text-3xl">{project.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.need}</p>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
              <span>{index + 2} member offers</span>
              <StatusPill>Review</StatusPill>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function NextGenAdminView() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Protected programme"
        title="Next Gen administration"
        description="Guardian consent, age-appropriate access, programme-managed mentoring and strict separation from adult confidential rooms."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Young members" value="9" note="Across 6 families" />
        <StatCard label="Guardian approvals" value="2" note="Awaiting verification" />
        <StatCard label="Mentor matches" value="4" note="All programme-managed" />
        <StatCard label="Upcoming sessions" value="2" note="Build Something · Stewardship" />
      </div>
      <section className="border border-border bg-foreground p-6 text-background md:p-8">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-bronze" />
          <p className="eyebrow text-background/60">Safeguarding baseline</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <p className="flex gap-3 text-sm leading-7 text-background/75">
            <LockKeyhole className="mt-1 h-4 w-4 shrink-0 text-bronze" />
            No adult private-room access for next-gen accounts.
          </p>
          <p className="flex gap-3 text-sm leading-7 text-background/75">
            <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-bronze" />
            No unmanaged stranger-to-child messaging.
          </p>
          <p className="flex gap-3 text-sm leading-7 text-background/75">
            <Users className="mt-1 h-4 w-4 shrink-0 text-bronze" />
            Guardian/admin approval for under-18 participation.
          </p>
          <p className="flex gap-3 text-sm leading-7 text-background/75">
            <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-bronze" />
            Escalation route for safeguarding or conduct concerns.
          </p>
        </div>
      </section>
    </div>
  );
}

export function SettingsAdminView() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Configuration"
        title="Membership principles & settings"
        description="Keep the operating rules explicit. Pricing can change later; trust rules should be much harder to change."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="border border-border bg-card p-5 md:p-6">
          <p className="eyebrow text-bronze">Membership plans — private</p>
          <div className="mt-5 space-y-4">
            {[
              "Founding Membership",
              "Individual Membership",
              "Family Membership",
              "Approved Adviser / Partner",
            ].map((plan) => (
              <div
                key={plan}
                className="flex items-center justify-between border-t border-border pt-4 first:border-0 first:pt-0"
              >
                <div>
                  <p className="text-sm font-medium">{plan}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Pricing not published in MVP</p>
                </div>
                <StatusPill>Inactive</StatusPill>
              </div>
            ))}
          </div>
        </section>
        <section className="border border-border bg-card p-5 md:p-6">
          <p className="eyebrow text-bronze">Non-negotiables</p>
          <div className="mt-5 space-y-4 text-sm leading-6">
            {[
              "Confidentiality",
              "No solicitation",
              "No sale of member data",
              "Consent before introductions",
              "Human admission decisions",
              "Next-gen separation & safeguarding",
            ].map((rule) => (
              <div
                key={rule}
                className="flex items-center gap-3 border-t border-border pt-4 first:border-0 first:pt-0"
              >
                <CheckCircle2 className="h-4 w-4 text-bronze" />
                {rule}
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="flex items-start gap-3 border border-border bg-accent/25 p-4 text-xs leading-6 text-muted-foreground">
        <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
        Legal templates remain drafts until reviewed. Do not activate payments or collect sensitive
        verification documents in this prototype.
      </div>
    </div>
  );
}
