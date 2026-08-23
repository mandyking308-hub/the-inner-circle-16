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
          <span className="inline-flex border border-bronze/40 bg-accent/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-bronze">
            Draft template · legal review required before launch
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-6xl">{title}</h1>
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
          "Questions, privacy requests, formal notices and cancellation instructions are handled through our secure contact form. We do not publish an email address."}
      </p>
      <Link
        to="/contact"
        className="mt-6 inline-flex bg-oxblood px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-oxblood-foreground"
      >
        Contact Montvelle
      </Link>
    </div>
  );
}
