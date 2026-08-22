import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: `Privacy — ${site.name}` }, { name: "description", content: "How Project Table approaches privacy, member data, introductions and next-generation information." }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <LegalTemplate title="Privacy" intro="A private community only works if people can trust what happens to their information. Our approach is to collect less, restrict access, use context only for the reason it was given and never turn the member directory into a commercial asset." sections={[
    { heading: "Information we use", body: "We may use information you provide in an application, member profile, concierge request, event response, introduction request, learning programme or operational conversation. We do not ask for sensitive family, financial, medical or identity documents unless they are genuinely required for a specific service and an appropriate secure process is in place." },
    { heading: "Why we use it", body: "Information is used to assess membership or partner applications, operate membership, curate Tables and gatherings, coordinate requested services, broker consent-led introductions, protect community safety, manage family and learning permissions, and improve the relevance of the service." },
    { heading: "Member directory", body: "Member profiles are visible only within the authorised community experience. Contact details are hidden by default. Directory information must not be sold, scraped, bulk-exported, provided to sponsors or used for unsolicited prospecting." },
    { heading: "Introductions and partners", body: "Concierge may use enough context to assess whether an introduction is relevant. A member's private contact details or sensitive case context should not be released to another member or Trusted Partner until the member has agreed to that connection." },
    { heading: "Next generation", body: "Information about under-18 participants is handled under stricter role and permission boundaries. Guardian approval, age-appropriate access and safeguarding controls apply, and under-18s do not receive unmanaged access to adult confidential member spaces." },
    { heading: "Sharing and professional advisers", body: "We may share information with service providers or professional advisers only where this is required to operate the service, protect the community or complete a request you have authorised. Legal, tax, immigration, medical, fiduciary and other regulated professionals are independently responsible for information you provide when you formally instruct them." },
    { heading: "Retention and control", body: "Information should be retained only for as long as there is a legitimate membership, operational, safety or legal reason to keep it. Members and applicants can ask the membership team about access, correction, deletion or other applicable privacy rights using the contact route supplied in their membership correspondence." },
    { heading: "Security", body: "Access to private information is restricted by role and purpose. Production systems should use appropriate authentication, permissioning, secure storage, audit controls and vendor oversight for the sensitivity of the information involved." },
  ]} />;
}
