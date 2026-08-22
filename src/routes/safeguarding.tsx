import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/safeguarding")({
  head: () => ({ meta: [{ title: `Safeguarding — ${site.name}` }, { name: "description", content: "Montvelle safeguarding principles for family and next-generation programmes." }] }),
  component: SafeguardingPage,
});

function SafeguardingPage() {
  return <LegalTemplate title="Safeguarding" intro={`Montvelle includes family and next-generation experiences. ${site.operator} treats the safety, dignity and privacy of children and young people as a core operating responsibility. Programme-specific procedures must also reflect the law and safeguarding requirements of the country in which an activity takes place.`} sections={[
    { heading: "Age-appropriate participation", body: "Under-18 participants should receive access, communications, supervision and activities appropriate to their age and the relevant programme. They must not receive unmanaged access to adult confidential member spaces, adult member directories or sensitive private-office information." },
    { heading: "Guardian authority and consent", body: "Appropriate parent or legal-guardian authority should be obtained for participation, material travel or activity permissions, image use, emergency contacts and other decisions where consent is required. Consent for one purpose is not treated as blanket consent for unrelated uses." },
    { heading: "People and providers", body: "Roles involving direct or repeated contact with children should be risk-assessed. Identity, references, qualifications, background checks and local safeguarding checks should be obtained where the role, jurisdiction and law make them appropriate. Independent schools, tutors, activity providers and other suppliers remain responsible for their own safeguarding duties." },
    { heading: "Communications and boundaries", body: "Staff, mentors and volunteers should use approved communication routes and maintain clear professional boundaries. One-to-one contact, transport, overnight activity, private messaging, photography and social-media interaction require controls appropriate to the age, context and risk." },
    { heading: "Privacy and images", body: "Children's information is shared on a strict need-to-know basis. Photographs, names, school details, travel plans, locations and family circumstances should not be published or shared externally without appropriate authority. The member directory is not a source of information about children." },
    { heading: "Travel and international activity", body: "Where Montvelle helps coordinate travel or activities involving minors, the responsible adults, permissions, emergency arrangements, insurance, medical information required for safety, supplier responsibilities and local legal requirements should be confirmed before participation." },
    { heading: "Raising a concern", body: "A concern about a child's welfare, conduct by an adult, unsafe practice or possible abuse must be escalated promptly through the safeguarding route supplied for the relevant programme. Immediate danger should be referred to the appropriate emergency or statutory authority in the country concerned." },
    { heading: "Record keeping and confidentiality", body: "Safeguarding records should be accurate, limited to those who need them, retained securely and shared only where necessary for welfare, law, investigation or professional advice. Confidentiality does not prevent a necessary safeguarding disclosure." },
  ]} />;
}
