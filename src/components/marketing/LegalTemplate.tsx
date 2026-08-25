import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { legalUpdatedLine, type LegalDocumentKey } from "@/config/legal";

export function LegalTemplate({
  title,
  intro,
  sections,
  documentKey,
  contactPrompt,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  documentKey?: LegalDocumentKey;
  contactPrompt?: string;
}) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl">
          {/* Internal note (not rendered): this pack has not been reviewed by external counsel.
              See src/config/legal.ts — UK/EU/US (Delaware) review required before live trading. */}
          <h1 className="font-display text-5xl md:text-6xl">{title}</h1>

          {documentKey ? (
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {legalUpdatedLine(documentKey)}
            </p>
          ) : null}
          <p className="mt-6 text-sm leading-8 text-muted-foreground">{intro}</p>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {sections.map((section) => (
              <div key={section.heading} className="py-7">
                <h2 className="font-display text-3xl">{section.heading}</h2>
                <p className="mt-3 text-sm leading-8 text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>
          <LegalContactCta {...(contactPrompt ? { prompt: contactPrompt } : {})} />
        </div>
      </Container>
    </section>
  );
}

export function LegalContactCta({ prompt }: { prompt?: string }) {
  return (
    <div className="mt-12 border border-foreground/15 bg-card p-7 md:p-9">
      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">Contact</p>
      <h2 className="mt-3 font-display text-3xl leading-tight">Speak to Montvelle</h2>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
        {prompt ??
          "Questions, privacy requests, formal notices and cancellation instructions can use our secure contact form. GSM's official business email and registered office are listed in the Legal Notice."}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/contact"
          className="inline-flex bg-oxblood px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-oxblood-foreground"
        >
          Contact Montvelle
        </Link>
        <Link
          to="/legal"
          className="inline-flex border border-foreground/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground"
        >
          Legal Notice
        </Link>
      </div>
    </div>
  );
}
