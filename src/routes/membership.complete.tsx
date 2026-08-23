import { createFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export const Route = createFileRoute("/membership/complete")({
  head: () => ({
    meta: [
      { title: `Membership payment — ${site.name}` },
      { name: "description", content: "Montvelle membership payment confirmation." },
      { name: "robots", content: "noindex,nofollow,noarchive" },
    ],
  }),
  component: MembershipCompletePage,
});

function MembershipCompletePage() {
  return (
    <section className="min-h-[70vh] bg-[#171716] py-24 text-white md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl border border-white/15 p-8 md:p-12">
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d8b36c]">Secure checkout returned</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Thank you. We are confirming your membership payment.</h1>
          <p className="mt-7 text-base leading-8 text-white/68">A return from the payment provider is not, by itself, the final activation record. GSM confirms cleared funds, admission/compliance checks and the applicable Membership Agreement and Schedule before Montvelle member access is activated.</p>
          <p className="mt-5 text-sm leading-7 text-white/52">You will receive the next membership step through the contact details supplied during checkout. Please do not submit a second payment while confirmation is being completed.</p>
          <Button asChild size="lg" className="mt-9 rounded-full bg-[#d8b36c] px-7 text-[#15130f] hover:bg-[#e4c47f]"><Link to="/">Return to Montvelle </Link></Button>
        </div>
      </Container>
    </section>
  );
}
