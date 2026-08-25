import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { enableSupplierPreview } from "@/components/supplier/SupplierShell";
import { site } from "@/config/site";
import { supplierLegalVersionBundle } from "@/config/legal";
import { recordSupplierAcceptance } from "@/lib/legalAcceptance";
import { supplierOrgs } from "@/data/privateServices";

export const Route = createFileRoute("/supplier-portal")({
  head: () => ({
    meta: [
      { title: `Partner & Supplier Portal — ${site.name}` },
      {
        name: "description",
        content: "The private entrance for Montvelle partners and suppliers.",
      },
    ],
  }),
  component: SupplierPortalPage,
});

const boundaries = [
  "Your own business profile, locations and service offerings.",
  "Requests and bookings that a member or the concierge desk has assigned to you.",
  "Only the booking context a member has chosen to share.",
  "Conversations attached to that specific piece of work.",
] as const;

const never = [
  "No member directory, household records or contact lists.",
  "No Decision Rooms, Table, Family or Network content.",
  "No member preferences beyond what a booking requires.",
  "No visibility of other suppliers' work.",
] as const;

function SupplierPortalPage() {
  const navigate = useNavigate();
  const [supplierId, setSupplierId] = useState(supplierOrgs[0]!.id);
  /** Required at every supplier sign-in; never remembered between sessions. */
  const [accepted, setAccepted] = useState(false);

  const enter = () => {
    if (!accepted) return;
    // PREVIEW EVIDENCE ONLY — see src/lib/legalAcceptance.ts.
    recordSupplierAcceptance(supplierId);
    enableSupplierPreview(supplierId);
    void navigate({ to: "/supplier" });
  };

  return (
    <>
      <section className="bg-foreground py-24 text-background md:py-32">
        <Container>
          <p className="eyebrow text-bronze">Partner & Supplier Portal</p>
          <h1 className="mt-6 max-w-[18ch] font-display text-5xl leading-[0.98] md:text-7xl">
            A separate door, for the people we work with.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-background/70">
            This entrance is for invited and approved providers only. It holds your own profile, your own services and
            the work assigned to you — and nothing else about the members we serve, or about anyone else who works with us.
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-background/55">
            Montvelle is deliberately demand-led. We do not build a supplier list in advance; providers are approached
            because a member asked for something specific, and are invited here only after they have done that work well.
          </p>
        </Container>
      </section>

      <section className="border-b border-border bg-background py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-oxblood">What you see</p>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {boundaries.map((item) => (
                  <li key={item} className="py-4 text-sm leading-7 text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-oxblood">What you never see</p>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {never.map((item) => (
                  <li key={item} className="py-4 text-sm leading-7 text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-accent/40 py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div className="border border-border bg-card p-7">
              <p className="eyebrow text-oxblood">Sign in</p>
              <h2 className="mt-4 font-display text-3xl">Enter the supplier portal</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Accounts are issued individually to invited providers. While the portal is in private preview, the
                accounts below are test records used to check the portal itself; they are not Montvelle relationships.
              </p>
              <label className="mt-6 block text-[9px] uppercase tracking-[0.16em] text-muted-foreground" htmlFor="supplier-account">
                Supplier account
              </label>
              <select
                id="supplier-account"
                value={supplierId}
                onChange={(event) => setSupplierId(event.target.value)}
                className="mt-2 w-full border border-border bg-background px-3 py-3 text-sm"
              >
                {supplierOrgs.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              <label className="mt-6 flex gap-3 border-t border-border pt-5 text-[11px] leading-6 text-muted-foreground">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#7b2230]"
                />
                <span>
                  I confirm I am authorised to act for this organisation and accept the current{" "}
                  <Link to="/supplier-agreement" className="underline underline-offset-2">
                    Supplier &amp; Partner Agreement
                  </Link>
                  ,{" "}
                  <Link to="/privacy" className="underline underline-offset-2">Privacy Notice</Link>{" "}
                  and{" "}
                  <Link to="/confidentiality" className="underline underline-offset-2">
                    Confidentiality &amp; No Solicitation
                  </Link>{" "}
                  standard.
                </span>
              </label>
              <p className="mt-2 text-[10px] leading-5 text-muted-foreground">
                {supplierLegalVersionBundle}
              </p>
              <Button className="mt-5 rounded-none" onClick={enter} disabled={!accepted}>
                Enter portal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="mt-3 text-[10px] leading-5 text-muted-foreground">
                Acceptance is required at every sign-in. In this preview it is recorded in your
                browser only, not in a production audit store.
              </p>
            </div>

            <div className="border border-border bg-foreground p-7 text-background">
              <ShieldCheck className="h-5 w-5 text-bronze" />
              <h2 className="mt-6 font-display text-3xl leading-tight">Not yet a Montvelle partner?</h2>
              <p className="mt-4 text-sm leading-7 text-background/65">
                Most providers reach us the same way: a member needed something, we came looking, and the work was done
                properly. An invitation follows that. If you would rather introduce yourself, you may apply — two
                references and assurance are required either way.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-6 h-auto whitespace-normal rounded-none border-background/35 bg-transparent py-3 text-left text-background hover:bg-background hover:text-foreground"
              >
                <Link to="/partner-application">Apply to become a Montvelle supplier or partner</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
