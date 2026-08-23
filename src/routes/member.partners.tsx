import { createFileRoute, Link } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/member/partners")({ component: MemberPartnersPage });

function MemberPartnersPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Outside expertise"
        title="There is nothing here to browse — and that is deliberate."
        description="Montvelle does not keep a list of advisers or providers for members to work through. Expertise is found around a real matter, checked, and introduced only when it is right for the thing in front of you."
        action={
          <Button asChild className="rounded-none">
            <Link to="/member/services">Tell us what you need</Link>
          </Button>
        }
      />

      <section className="border border-border bg-card p-8 md:p-12">
        <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight">
          Tell us the matter. We will go and find the right people.
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
          <p>
            We search, make the enquiries, check what comes back and bring you a small number of
            options that are genuinely suited to the matter — with the reason for each introduction
            made plain.
          </p>
          <p>
            Where an introduction is made, we tell you how we came to that person, what we checked,
            and whether any commercial arrangement exists. You always choose your own professionals
            and your own scope.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="rounded-none bg-oxblood">
            <Link to="/member/services">
              Make a request </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-none">
            <Link to="/member/concierge">
              Speak to the Private Office
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
