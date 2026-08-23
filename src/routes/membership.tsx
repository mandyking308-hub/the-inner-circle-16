import { type FormEvent, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { familyMembershipPricing, membershipPricing } from "@/config/membershipPricing";
import { site } from "@/config/site";
import { createMembershipCheckoutFn } from "@/functions/membershipCheckout";
import { recordCheckoutAcceptance } from "@/lib/legalAcceptance";
import { memberLegalVersionBundle } from "@/config/legal";
import membershipHero from "@/assets/membership-hero-dinner.jpg";
import membershipRoom from "@/assets/membership-standard-room.jpg";

const included = [
  {
    title: "A private membership",
    body: "Held in the name of the approved member or household, for a twelve-month term from the agreed activation date.",
  },
  {
    title: "People you would not otherwise meet",
    body: "Curated peer relationships, small private gatherings and introductions made only with consent on both sides.",
  },
  {
    title: "A life that travels well",
    body: "Global Life and private-service coordination, wherever the year happens to take you.",
  },
  {
    title: "Room for the next generation",
    body: "Age-appropriate next-generation participation and approved household access are agreed with us and recorded in your Membership Schedule — each approved person with their own login and their own permissions.",
  },
  {
    title: "A serious private office behind it",
    body: "Private Office tools and Decision Room access, for the matters that deserve quiet, careful thought.",
  },
] as const;

const invitation = [
  {
    label: "Belonging",
    body: "A room of people who understand the weight of what you are building, without needing it explained.",
  },
  {
    label: "Discretion",
    body: "Confidentiality is the default setting, not a policy page. Nothing travels further than it should.",
  },
  {
    label: "Access",
    body: "Fewer, better introductions — offered when they are genuinely useful, and never as a transaction.",
  },
] as const;

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: `Membership — ${site.name}` },
      {
        name: "description",
        content: `One standard of Montvelle membership in two forms: individual at ${membershipPricing.annualDisplay} per 12 months plus a one-time ${membershipPricing.joiningDisplay} admission fee, or family membership ${familyMembershipPricing.fromAnnualDisplay} per 12 months, confirmed in the Membership Schedule.`,
      },
      { property: "og:title", content: `Membership — ${site.name}` },
      {
        property: "og:description",
        content: "A private membership for families building something intended to outlast them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MembershipPage,
});

function MembershipPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const beginCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const form = new FormData(event.currentTarget);

    const acceptedTerms = form.get("acceptedTerms") === "on";
    const acknowledgedAdmissionChecks = form.get("acknowledgedAdmissionChecks") === "on";
    const requestedImmediateService = form.get("requestedImmediateService") === "on";

    if (!acceptedTerms || !acknowledgedAdmissionChecks) {
      setError("Please confirm both acceptance statements before continuing to checkout.");
      setSubmitting(false);
      return;
    }

    // PREVIEW EVIDENCE ONLY — mirrored server-side once production auth is live.
    const acceptance = recordCheckoutAcceptance(String(form.get("email") ?? "").trim() || null);

    try {
      const result = await createMembershipCheckoutFn({
        data: {
          name: String(form.get("name") ?? "").trim(),
          email: String(form.get("email") ?? "").trim(),
          ...(String(form.get("country") ?? "").trim()
            ? { country: String(form.get("country") ?? "").trim() }
            : {}),
          acceptedTerms: true as const,
          acknowledgedAdmissionChecks: true as const,
          requestedImmediateService,
          legalVersionBundle: acceptance.legalVersionBundle,
          acceptedAt: acceptance.timestamp,
        },
      });
      window.location.assign(result.checkoutUrl);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Secure checkout could not be started. Please try again shortly.",
      );
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[78vh] overflow-hidden bg-[#11110f] text-white">
        <img
          src={membershipHero}
          alt="A small private dinner by candlelight on the terrace of a European residence"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,8,0.80)_0%,rgba(9,9,8,0.46)_46%,rgba(9,9,8,0.14)_82%)]" />
        <Container className="relative flex min-h-[78vh] items-end py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d8b36c]">
              By invitation · Founding membership {membershipPricing.pricingYear}
            </p>
            <h1 className="mt-6 max-w-[13ch] font-display text-5xl leading-[0.96] md:text-7xl">
              A seat at a very private table.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/75">
              Montvelle is a small, deliberately quiet membership for families and principals
              building something intended to outlast them. Fewer people. Longer conversations.
              Nothing said twice.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#join"
                className="inline-flex items-center gap-2 border-b border-[#d8b36c] pb-1 text-sm font-medium tracking-wide text-[#d8b36c] transition-colors hover:text-[#e8c98d]"
              >
                Membership & enrolment </a>
              <Link
                to="/apply"
                className="text-sm text-white/60 underline-offset-4 transition-colors hover:text-white/90 hover:underline"
              >
                Or speak with us first
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Invitation / atmosphere */}
      <section className="bg-background py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-oxblood">
              The invitation
            </p>
            <h2 className="mt-6 font-display text-4xl leading-[1.06] md:text-6xl">
              Membership is not something we sell. It is something we extend.
            </h2>
            <p className="mt-8 text-base leading-8 text-muted-foreground md:text-lg">
              What follows is the whole of it — the people, the places, the family years, the
              private service and the office behind it. Held together as one membership, so that
              nothing about your life has to be explained more than once.
            </p>
          </div>

          <div className="mt-16 grid gap-px border border-foreground/12 bg-foreground/12 md:grid-cols-3">
            {invitation.map((item) => (
              <div key={item.label} className="bg-background p-8 md:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-oxblood">
                  {item.label}
                </p>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What membership holds */}
      <section className="bg-[#f4ede1] py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-oxblood">
                What membership holds
              </p>
              <h2 className="mt-6 font-display text-4xl leading-[1.04] md:text-5xl">
                One membership, quietly complete.
              </h2>
            </div>
            <div>
              {included.map((item) => (
                <div
                  key={item.title}
                  className="border-t border-foreground/15 py-7 first:border-t-0 first:pt-0"
                >
                  <p className="font-display text-2xl md:text-[1.75rem]">{item.title}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
              <Link
                to="/montvelle-world"
                className="mt-9 inline-block border-b border-foreground/25 pb-1 text-xs uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:border-oxblood hover:text-oxblood"
              >
                Inside Montvelle World →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* The standard */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-24">
            <figure className="overflow-hidden">
              <img
                src={membershipRoom}
                alt="A quiet drawing room in a London townhouse at golden hour"
                className="aspect-[16/11] w-full object-cover"
                loading="lazy"
                width={1600}
                height={1104}
              />
            </figure>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-oxblood">
                Selective, not complicated
              </p>
              <h2 className="mt-5 font-display text-4xl leading-[1.04] md:text-6xl">
                The price is public. The standard remains private.
              </h2>
              <p className="mt-7 text-base leading-8 text-muted-foreground">
                A fee opens a conversation; it does not purchase anyone else's confidence. Montvelle
                remains a curated membership, with strict confidentiality, consent-led
                introductions, and the quiet freedom to protect the community whenever conduct,
                safety, law or trust asks it of us.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Enrolment */}
      <section id="join" className="bg-[#f4ede1] py-24 md:py-32">
        <Container>
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-oxblood">
              Enrolment
            </p>
            <h2 className="mt-6 font-display text-4xl leading-[1.04] md:text-5xl">
              One standard, in two forms.
            </h2>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              There are no tiers at Montvelle. Membership is held either by an individual or by a
              household, and the difference is service capacity rather than a better or lesser
              Montvelle. These are the rates for memberships commencing in{" "}
              {membershipPricing.pricingYear}; renewal is at the rate set out in your renewal
              invitation and Membership Schedule.
            </p>
          </div>

          <div className="mt-14 grid gap-px border border-foreground/12 bg-foreground/12 lg:grid-cols-2">
            <div className="bg-[#f4ede1] p-8 md:p-11">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-oxblood">
                Individual membership
              </p>
              <p className="mt-6 font-display text-5xl leading-none md:text-6xl">
                {membershipPricing.annualDisplay}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                per 12-month membership · paid annually in advance
              </p>
              <div className="mt-8 border-t border-foreground/15 pt-6">
                <p className="font-display text-2xl">{membershipPricing.joiningDisplay}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  one-time admission &amp; onboarding fee
                </p>
              </div>
              <div className="mt-8 border-t border-foreground/15 pt-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  First-year total
                </p>
                <p className="mt-3 font-display text-4xl">{membershipPricing.firstYearDisplay}</p>
              </div>
              <p className="mt-6 max-w-sm text-[11px] leading-6 text-muted-foreground">
                One approved principal member. Before applicable taxes and any third-party goods or
                services purchased separately.
              </p>
              <a
                href="#enrol"
                className="mt-8 inline-flex items-center gap-2 border-b border-oxblood pb-1 text-sm font-medium text-oxblood transition-opacity hover:opacity-70"
              >
                Continue to secure checkout </a>
            </div>

            <div className="bg-[#efe6d7] p-8 md:p-11">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-oxblood">
                Family membership
              </p>
              <p className="mt-6 font-display text-5xl leading-none md:text-6xl">
                {familyMembershipPricing.fromAnnualDisplay}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                per 12-month household membership
              </p>
              <div className="mt-8 space-y-4 border-t border-foreground/15 pt-6 text-sm leading-7 text-muted-foreground">
                <p>
                  A household relationship, because more than one approved adult may use Montvelle
                  independently — each with their own login, their own matters and their own
                  privacy. It is not account sharing.
                </p>
                <p>
                  The final annual fee, the approved household composition and any admission or
                  onboarding amount are confirmed after review and recorded in your Membership
                  Schedule.
                </p>
              </div>
              <Button asChild className="mt-8 h-12 rounded-none bg-oxblood px-7 text-sm">
                <Link to="/apply" search={{ membership: "Family" }}>
                  Discuss family membership </Link>
              </Button>
            </div>
          </div>

          <p className="mt-8 max-w-2xl font-display text-2xl leading-snug text-foreground/80 md:text-[1.75rem]">
            The standard is the same. The relationship is wider.
          </p>

          <div className="mt-16 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div className="lg:pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-oxblood">
                Household access
              </p>
              <h3 className="mt-5 font-display text-3xl leading-tight md:text-4xl">
                Who is included is agreed, not assumed.
              </h3>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                Approved adult family members, age-appropriate next-generation participation and any
                authorised household delegate are agreed with us and recorded in the Membership
                Schedule. There is no seat menu and no automatic inclusion — an authorised delegate
                is not a Montvelle member.
              </p>
            </div>

            <div id="enrol">
              <div className="border border-foreground/12 bg-[#171716] p-8 text-white md:p-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d8b36c]">
                  Individual membership · private enrolment
                </p>
                <h3 className="mt-5 font-display text-4xl leading-[1.04] md:text-5xl">
                  Take your seat.
                </h3>
                <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
                  Three details, then a secure hosted checkout handled entirely by our payment
                  partner. Montvelle never sees or stores your card or bank credentials.
                </p>

                <form onSubmit={beginCheckout} className="mt-10 space-y-7">
                  <div className="space-y-2.5">
                    <Label
                      htmlFor="membership-name"
                      className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50"
                    >
                      Full name
                    </Label>
                    <Input
                      id="membership-name"
                      name="name"
                      required
                      autoComplete="name"
                      className="h-12 rounded-none border-0 border-b border-white/20 bg-transparent px-0 text-white shadow-none focus-visible:border-[#d8b36c] focus-visible:ring-0"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label
                      htmlFor="membership-email"
                      className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50"
                    >
                      Email
                    </Label>
                    <Input
                      id="membership-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="h-12 rounded-none border-0 border-b border-white/20 bg-transparent px-0 text-white shadow-none focus-visible:border-[#d8b36c] focus-visible:ring-0"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label
                      htmlFor="membership-country"
                      className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50"
                    >
                      Country of residence
                    </Label>
                    <Input
                      id="membership-country"
                      name="country"
                      required
                      autoComplete="country-name"
                      className="h-12 rounded-none border-0 border-b border-white/20 bg-transparent px-0 text-white shadow-none focus-visible:border-[#d8b36c] focus-visible:ring-0"
                    />
                  </div>

                  <div className="space-y-5 border-t border-white/12 pt-8">
                    <p className="text-[11px] leading-6 text-white/45">
                      Before you continue: you will receive and may retain the current contractual
                      documents shown below, and your Membership Schedule records the approved
                      member, the term and the agreed commercial details. Your cancellation rights
                      are set out in{" "}
                      <Link to="/cancellation" className="text-white/80 underline underline-offset-2">
                        Cancellation Rights
                      </Link>
                      . Document set {memberLegalVersionBundle}.
                    </p>
                    <label className="flex gap-4 text-[11px] leading-6 text-white/55">
                      <input
                        type="checkbox"
                        name="acceptedTerms"
                        required
                        className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#d8b36c]"
                      />
                      <span>
                        I have read and agree to the{" "}
                        <Link
                          to="/membership-agreement"
                          className="text-white/80 underline underline-offset-2"
                        >
                          Membership Agreement
                        </Link>
                        ,{" "}
                        <Link to="/terms" className="text-white/80 underline underline-offset-2">
                          Website Terms
                        </Link>
                        ,{" "}
                        <Link to="/privacy" className="text-white/80 underline underline-offset-2">
                          Privacy Notice
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/confidentiality"
                          className="text-white/80 underline underline-offset-2"
                        >
                          Confidentiality &amp; No Solicitation standard
                        </Link>
                        . My Membership Schedule records the approved member, term and commercial
                        details.
                      </span>
                    </label>
                    <label className="flex gap-4 text-[11px] leading-6 text-white/55">
                      <input
                        type="checkbox"
                        name="acknowledgedAdmissionChecks"
                        required
                        className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#d8b36c]"
                      />
                      <span>
                        I understand that payment does not override GSM&rsquo;s admission,
                        sanctions, fraud, safety or compliance checks. If a membership is not
                        accepted, the membership and admission fees paid for it are returned,
                        subject to mandatory law and payment-provider processing.
                      </span>
                    </label>
                    <label className="flex gap-4 border-t border-white/12 pt-5 text-[11px] leading-6 text-white/55">
                      <input
                        type="checkbox"
                        name="requestedImmediateService"
                        className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#d8b36c]"
                      />
                      <span>
                        Optional, and separate from the acceptances above: I ask that onboarding and
                        service preparation begin as soon as GSM accepts my membership, including
                        during any statutory cancellation period. Where such a right applies and I
                        then cancel, a proportionate amount for services already supplied may be
                        deducted from any refund to the extent permitted by applicable law. If I
                        leave this unticked, service preparation begins after the cancellation
                        period ends.
                      </span>
                    </label>
                  </div>

                  {error ? (
                    <p
                      className="border border-[#d8b36c]/35 bg-[#d8b36c]/8 p-4 text-xs leading-6 text-[#f1d69d]"
                      role="alert"
                    >
                      {error}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="h-14 w-full rounded-none bg-[#d8b36c] text-sm font-semibold tracking-wide text-[#15130f] hover:bg-[#e4c47f]"
                  >
                    {submitting
                      ? "Opening secure checkout…"
                      : `Continue securely · ${membershipPricing.firstYearDisplay}`}
                    </Button>
                </form>

                <div className="mt-10 flex gap-4 border-t border-white/12 pt-7">
                  <p className="text-[10px] leading-5 text-white/45">
                    Montvelle is operated by {site.operator}, a Delaware limited liability company.
                    Membership activates only after acceptance, required checks, contractual
                    acceptance and cleared funds.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-foreground/15 pt-8">
                <div>
                  <p className="font-display text-2xl md:text-3xl">Prefer a conversation first?</p>
                  <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                    Many families would rather sit with us before anything is signed. That door is
                    always open.
                  </p>
                </div>
                <Link
                  to="/apply"
                  className="inline-flex items-center gap-2 border-b border-oxblood pb-1 text-sm font-medium text-oxblood transition-opacity hover:opacity-70"
                >
                  Request membership </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
