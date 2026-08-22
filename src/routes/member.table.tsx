import { FormEvent, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, LockKeyhole, Send } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { tableMembers } from "@/data/community";

export const Route = createFileRoute("/member/table")({
  component: TablePage,
});

function TablePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="London Table 01"
        title="Your private board."
        description="Ten people, one recurring room and no audience. Bring the decision you cannot sensibly workshop in public. The value is accumulated context, not a fresh room of strangers every month."
      />

      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="border border-border bg-card">
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {tableMembers.map((member) => (
              <article key={member.id} className="bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-xs font-medium">
                    {member.initials}
                  </div>
                  <span className="border border-border px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {member.tableRole}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl">{member.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {member.role} · {member.organisation}
                </p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{member.contribution}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="border border-border bg-foreground p-6 text-background">
            <p className="eyebrow text-background/60">Next session</p>
            <h2 className="mt-3 font-display text-3xl">17 September</h2>
            <p className="mt-2 text-sm text-background/70">18:30–21:30 · Mayfair</p>
            <div className="mt-6 space-y-3 border-t border-background/20 pt-5 text-sm text-background/80">
              <p>01 · Decisions since last Table</p>
              <p>02 · Two member challenges</p>
              <p>03 · Succession: founder after founder</p>
              <p>04 · Commitments and introductions</p>
            </div>
          </div>

          <div className="border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
              <div>
                <p className="text-sm font-medium">Chatham House rules, plus context.</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  No recording. No screenshots. No forwarding challenge notes. Commercial opportunities can be discussed only when the member explicitly asks for them.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="border border-border bg-card p-5 md:p-6">
          <p className="eyebrow text-bronze">Bring a challenge</p>
          <h2 className="mt-3 font-display text-3xl">What decision deserves the room?</h2>
          {submitted ? (
            <div className="mt-6 flex items-start gap-3 border-t border-border pt-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-bronze" />
              <div>
                <p className="text-sm font-medium">Challenge submitted privately.</p>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">
                  The moderator will contact you before the session to sharpen the question and decide whether it belongs on this agenda.
                </p>
              </div>
            </div>
          ) : (
            <form className="mt-6" onSubmit={handleSubmit}>
              <Textarea
                required
                rows={6}
                className="rounded-none"
                placeholder="State the decision, the constraint and what you need from the Table. Avoid a polished presentation — bring the real problem."
              />
              <Button type="submit" className="mt-4 rounded-none">
                Submit confidentially <Send className="ml-2 h-3.5 w-3.5" />
              </Button>
            </form>
          )}
        </div>

        <div className="border border-border bg-card p-5 md:p-6">
          <p className="eyebrow text-bronze">Your commitments</p>
          <h2 className="mt-3 font-display text-3xl">What you said you would do.</h2>
          <div className="mt-6 space-y-4">
            {[
              "Document the three decisions only you can currently make in the business.",
              "Introduce Daniel to the healthcare operator you mentioned.",
              "Speak with your finance lead about the first family-office reporting pack.",
            ].map((item, index) => (
              <label key={item} className="flex gap-3 border-t border-border pt-4 text-sm leading-6 first:border-0 first:pt-0">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-current" defaultChecked={index === 1} />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
