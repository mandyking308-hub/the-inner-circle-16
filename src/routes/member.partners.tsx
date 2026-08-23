import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Handshake, ShieldCheck } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { approvedMemberFacingPartners } from "@/data/infrastructure";
import { getPartnerAssurance } from "@/data/partnerAssurance";

export const Route = createFileRoute("/member/partners")({ component: MemberPartnersPage });

function MemberPartnersPage() {
  const partners = approvedMemberFacingPartners;

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Advisers and providers"
        title="Nobody appears here until they have been checked."
        description="Montvelle does not keep a directory for members to work through. Advisers and providers are found around a real need, spoken to, checked, and introduced only when they are right for the matter in front of you."
        action={
          <Button asChild className="rounded-none">
            <Link to="/member/services">Tell us what you need</Link>
          </Button>
        }
      />

      {partners.length === 0 ? (
        <section className="border border-border bg-card p-8 md:p-12">
          <ShieldCheck className="h-6 w-6 text-oxblood" />
          <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight">
            No approved records yet — by design, not by omission.
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              We would rather show you nothing than show you a list we cannot stand behind. An adviser or provider is added here only after
              Montvelle has worked with them on a real matter, taken references and completed assurance.
            </p>
            <p>
              In the meantime the route is simple. Tell us what you need. We search, make the enquiries, check what comes back, and introduce
              only the people who are genuinely suited to it — with the reason for the introduction made plain.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-none bg-oxblood">
              <Link to="/member/services">
                Start a request <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-none">
              <Link to="/member/concierge">
                <Handshake className="mr-2 h-4 w-4" />
                Speak to Concierge
              </Link>
            </Button>
          </div>
        </section>
      ) : (
        <section className="grid gap-4 xl:grid-cols-2">
          {partners.map((partner) => {
            const assurance = getPartnerAssurance(partner.id);
            return (
              <article key={partner.id} className="border border-border bg-card p-6">
                <p className="text-[10px] uppercase tracking-[0.17em] text-oxblood">{partner.category}</p>
                <h2 className="mt-2 font-display text-3xl">{partner.name}</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{partner.focus}</p>
                <div className="mt-5 grid gap-3 border-y border-border py-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Assurance</p>
                    <p className="mt-1 text-sm">{assurance?.dueDiligence ?? "Recorded by the desk"}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Completed briefs</p>
                    <p className="mt-1 text-sm">{assurance?.completedBriefs ?? "—"}</p>
                  </div>
                </div>
                <Button asChild className="mt-6 rounded-none">
                  <Link to="/member/concierge">
                    <Handshake className="mr-2 h-4 w-4" />
                    Request an introduction
                  </Link>
                </Button>
              </article>
            );
          })}
        </section>
      )}

      <section className="border border-border bg-card p-6">
        <p className="max-w-4xl text-xs leading-6 text-muted-foreground">
          Where an introduction is made, we tell you how we came to that person, what we checked, and whether any commercial arrangement
          exists. Members always choose their own professionals and their own scope.
        </p>
      </section>
    </div>
  );
}
