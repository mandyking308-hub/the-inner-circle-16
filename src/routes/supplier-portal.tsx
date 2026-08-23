import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { enableSupplierPreview } from "@/components/supplier/SupplierShell";
import { site } from "@/config/site";
import { supplierOrgs } from "@/data/privateServices";

export const Route = createFileRoute("/supplier-portal")({
  head: () => ({
    meta: [
      { title: `Partner & Supplier Portal — ${site.name}` },
      {
        name: "description",
        content: "The private entrance for Montvelle partners and suppliers.",
      },
      { name: "robots", content: "noindex,nofollow,noarchive" },
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

  const enter = () => {
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
            Suppliers and partners have their own private entrance to Montvelle. It holds your profile, your services
            and the work assigned to you — and nothing else about the members we serve.
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
                Accounts are issued individually. While the portal is in private preview, choose the partner account you
                have been given access to.
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
              <Button className="mt-6 rounded-none" onClick={enter}>
                Enter portal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="border border-border bg-foreground p-7 text-background">
              <ShieldCheck className="h-5 w-5 text-bronze" />
              <h2 className="mt-6 font-display text-3xl leading-tight">Not yet a Montvelle partner?</h2>
              <p className="mt-4 text-sm leading-7 text-background/65">
                We work with a small number of providers, chosen slowly and reviewed regularly. If you believe your work
                belongs here, you are welcome to apply.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-6 rounded-none border-background/35 bg-transparent text-background hover:bg-background hover:text-foreground"
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
