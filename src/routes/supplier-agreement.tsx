import { createFileRoute } from "@tanstack/react-router";

import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/supplier-agreement")({
  head: () => ({
    meta: [
      { title: `Supplier & Partner Agreement — ${site.name}` },
      { name: "description", content: "The business terms that apply to organisations and specialists formally engaged by Montvelle to serve a member need." },
      { property: "og:title", content: `Supplier & Partner Agreement — ${site.name}` },
      { property: "og:description", content: "Business-to-business terms for suppliers, partners and independent specialists working with Montvelle." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SupplierAgreementPage,
});

function SupplierAgreementPage() {
  return (
    <LegalTemplate
      documentKey="supplierAgreement"
      title="Supplier & Partner Agreement"
      intro="These business-to-business terms apply to an organisation, firm or independent specialist (the 'Supplier') that is formally engaged, assigned work or given Supplier Portal access by Global Solutions Management LLC ('GSM', trading as Montvelle). They do not apply merely because Montvelle has sourced or booked an organisation through its ordinary public route, and they confer no membership rights. The Confidentiality & No Solicitation standard and Privacy Notice apply alongside these terms where relevant."
      contactPrompt="Questions about these terms, an assignment, a conflict disclosure, insurance, security incident or data matter should be raised through the secure contact form, selecting 'Supplier / partner' or 'Legal / formal notice'."
      sections={[
        {
          heading: "1. Formal Supplier status; no membership or directory rights",
          body: "Acceptance as a formal Supplier does not create membership, a member seat, exclusivity, preferred status, a guarantee of work or any right of access to members, member identities, household information or Montvelle's private member environment. Montvelle does not sell or license access to members. Being recorded as a Supplier is not a public endorsement. An organisation that Montvelle merely contacts, recommends or books through an ordinary public route is not bound by this Agreement unless it separately accepts it or enters a formal assignment.",
        },
        {
          heading: "2. Request-led and assignment-based engagement",
          body: "Montvelle researches, sources, checks and coordinates external organisations in response to specific member needs. A formal Supplier performs work only under a defined assignment, statement of work, booking confirmation or a direct engagement with the member. There is no minimum volume, continuity or exclusivity. GSM may use other suppliers, decline to assign work, or stop an uncommitted assignment if member needs change. The Supplier must not incur cost or start chargeable work on GSM's account without the authority stated for that assignment.",
        },
        {
          heading: "3. Assignment documents, commercial terms and order of precedence",
          body: "Each formal assignment should identify, as applicable, the scope, deliverables, timing, contracting party, paying party, fees or rates, taxes, authorised expenses, cancellation terms, insurance requirements, data role and any special risk controls. A signed or expressly accepted assignment or statement of work prevails over these general terms only for the matter it expressly changes. The Confidentiality & No Solicitation standard applies to confidential/member information unless a stricter written term applies. Supplier boilerplate, portal terms, click-through terms or booking conditions do not override a negotiated Montvelle assignment unless GSM or the member, as relevant contracting party, was given those terms before commitment and expressly accepted them.",
        },
        {
          heading: "4. Licences, authorisations and competence",
          body: "The Supplier warrants that it holds and will maintain all licences, registrations, regulatory permissions, professional memberships, qualifications and authorisations required for the services it performs in each relevant jurisdiction, and that all personnel deployed are competent and appropriately supervised. The Supplier must notify GSM promptly of any loss, suspension, condition, sanction, disciplinary finding, material complaint or investigation that affects or could reasonably affect its ability, fitness or authority to perform, and of any material change in ownership or control. A regulated Supplier remains solely responsible for regulatory perimeter, client-classification, suitability, licensing and professional-duty assessments required by its own regime.",
        },
        {
          heading: "5. Accurate credentials and continuing disclosure",
          body: "Credentials, regulatory statuses, insurances, accreditations, capability claims, ownership information and references supplied to GSM must be accurate and current and must be corrected promptly if they cease to be accurate. The Supplier must not overstate capability, capacity, geographic reach or its relationship with Montvelle. Diligence carried out by GSM does not transfer to GSM responsibility for the Supplier's continuing accuracy, solvency, licensing, insurance or competence.",
        },
        {
          heading: "6. Insurance standards",
          body: "Unless an assignment requires a higher amount or GSM agrees another amount in writing after considering the risk, a formal Supplier must maintain general/public liability insurance of at least £1,000,000 (or reasonable local equivalent). For inherently higher-risk activities — including private aviation, helicopter operations, marine or yacht activity, motorsport or specialist driving, equestrian activity, armed or close-protection security, and comparable hazardous activities — the minimum is £5,000,000 (or local equivalent). A professional or regulated Supplier must maintain professional indemnity/errors-and-omissions cover of at least £1,000,000 or the regulatory/professional minimum, whichever is higher, unless the assignment states another approved limit. A Supplier processing substantial sensitive member data or operating an integrated technology service may be required to maintain cyber insurance of at least £1,000,000 or another stated amount. Employer's liability, product liability and other legally required insurance must also be maintained. Claims-made professional cover must include appropriate run-off or equivalent protection. Evidence of cover, limits, material exclusions and renewal must be provided on reasonable request; material loss or reduction of required cover must be reported immediately and may suspend work.",
        },
        {
          heading: "7. Supplier terms, pricing, cancellation and refunds must be disclosed before commitment",
          body: "Any supplier terms that could affect a member or GSM — including deposits, cancellation charges, refund rules, rescheduling terms, minimum spends, automatic renewals, waivers, eligibility rules or liability limitations — must be provided clearly before the relevant booking, purchase or engagement is committed. A Supplier must not introduce a material adverse term after commitment unless the contracting party expressly agrees. Quotes and availability must state when they expire or remain subject to confirmation. Where a Supplier owes a refund, credit or reimbursement under its terms, law or an agreed service recovery, it must process it promptly to the person that paid and must not require GSM to fund the Supplier's liability from GSM's own resources.",
        },
        {
          heading: "8. Confidentiality and the Montvelle confidentiality standard",
          body: "The Supplier must comply with the current Confidentiality & No Solicitation standard accepted with its portal access and any stricter assignment-specific confidentiality term. Member identity, membership status, the existence and nature of a matter, household/family information, ownership, wealth, health, legal, financial, security, travel, safeguarding and adviser context are confidential. Confidential information may be used only for the assignment and may not be publicised, referenced in marketing, used in credentials or case studies, or disclosed except on a strict need-to-know basis or where law or professional duty requires it. These obligations survive termination in accordance with the Confidentiality & No Solicitation standard.",
        },
        {
          heading: "9. Minimum-necessary member information",
          body: "GSM discloses only the information reasonably necessary for the Supplier to perform the assignment and may withhold or pseudonymise member identity where practical. The Supplier must not seek, aggregate, infer or retain member information beyond what the assignment requires; must not attempt to re-identify pseudonymised information; and must not combine separate assignments to build a profile of a member or household. Access to one matter never creates access to the wider household or membership.",
        },
        {
          heading: "10. Data protection roles and processing terms",
          body: "Depending on the assignment, the Supplier may act as GSM's processor, as a separate controller with its own professional or legal duties, or in another legally recognised role. The assignment or required data terms will identify that role where necessary. The Supplier must comply with applicable privacy and data-protection law, process only for authorised purposes, assist with rights requests where relevant, implement required transfer safeguards and flow equivalent obligations to authorised subprocessors. Where law requires a formal processing agreement, standard contractual clauses, UK addendum, international data transfer agreement or controller-to-controller arrangement, the Supplier must execute and comply with it before the relevant restricted processing begins.",
        },
        {
          heading: "11. Security, cyber incidents and breach notification",
          body: "The Supplier must maintain technical and organisational security appropriate to the sensitivity of member information, including least-privilege access, strong authentication and multi-factor authentication for remote/admin access, encryption in transit and at rest where appropriate, patching, malware protection, secure backups and disposal, staff training, logging, monitoring and an incident-response process. Montvelle credentials must not be shared. A suspected or confirmed incident involving Montvelle credentials, systems or member information must be reported to GSM without undue delay and, contractually, within 24 hours of the Supplier becoming aware where reasonably possible, with continuing updates as facts develop. The Supplier must preserve relevant evidence, contain and remediate the incident, cooperate with investigation/notification duties and not make a public statement naming Montvelle or a member without authority unless law requires it.",
        },
        {
          heading: "12. No resale, prospecting or secondary use of member data",
          body: "The Supplier must not sell, rent, share, publish, scrape, bulk-export or otherwise commercialise member information; add members or their contacts to unrelated marketing lists; approach a member, household, staff or advisers for unrelated business using Montvelle-derived information; or use confidential member information to train, tune or evaluate a public or general-purpose AI system. Direct ongoing contact is permitted where the member has separately instructed the Supplier or expressly invited the relationship. Montvelle-derived contact intelligence must not be repackaged as a database or prospecting asset.",
        },
        {
          heading: "13. Subcontracting and supply chain",
          body: "The Supplier must not subcontract, delegate or materially offshore an assignment without GSM's prior written consent, except for ordinary use of the Supplier's own appropriately supervised employees and personnel within the disclosed delivery model. Approved subcontractors must be suitably qualified and bound by equivalent confidentiality, privacy, security, safeguarding, professional, insurance, sanctions and conduct duties. The Supplier remains fully responsible for its personnel, affiliates and subcontractors and must maintain reasonable oversight of its supply chain.",
        },
        {
          heading: "14. Safeguarding and vulnerable people",
          body: "Where an assignment involves children, young people or adults at risk, the Supplier must maintain appropriate safeguarding policies, supervision, jurisdiction-specific background checks and safe recruitment practices, ensure personnel are suitable for the contact involved, and report concerns promptly in accordance with law and to GSM where lawful. A serious safeguarding concern permits immediate suspension or termination regardless of any ordinary notice period.",
        },
        {
          heading: "15. Employment, modern slavery, harassment and human-rights standards",
          body: "The Supplier must comply with applicable employment, wage, working-time, anti-discrimination, harassment, modern-slavery, forced-labour, human-trafficking and human-rights laws and must take reasonable steps to ensure comparable standards in material subcontracting arrangements. Personnel dealing with members or Montvelle staff must act with professionalism, dignity and respect. Credible allegations of serious exploitation, harassment, violence or discriminatory abuse connected with an assignment must be escalated promptly and may justify suspension pending investigation.",
        },
        {
          heading: "16. Anti-bribery, tax evasion, money laundering and financial crime",
          body: "The Supplier must comply with applicable anti-bribery, anti-corruption, anti-facilitation-of-tax-evasion, anti-money-laundering and counter-terrorist-financing laws; must not offer, request or accept an improper payment, kickback or advantage in connection with Montvelle or a member; and must maintain procedures proportionate to its risk. Gifts or hospitality must not be used to influence a member decision improperly or conceal a conflict.",
        },
        {
          heading: "17. Sanctions, export controls and restricted activity",
          body: "The Supplier warrants that, to the best of its knowledge after reasonable checks appropriate to its risk, it and the personnel used for the assignment are not prohibited from performing the work by applicable sanctions or trade restrictions. It must not perform an assignment in a manner that would cause GSM or the member to breach sanctions, export-control or similar law and must notify GSM promptly if a relevant designation, restriction or material sanctions risk arises.",
        },
        {
          heading: "18. Conflicts, commissions and inducements",
          body: "The Supplier must disclose promptly any actual or potential conflict of interest and any commission, referral fee, rebate, introducer payment, revenue share, preferred-rate arrangement or other material consideration payable to or by it in connection with a member matter. Undisclosed material inducements are a material breach. Nothing here displaces stricter disclosure, fiduciary or conflict obligations imposed by the Supplier's own regulator or profession.",
        },
        {
          heading: "19. Service standards and change control",
          body: "The Supplier must perform with reasonable skill, care and diligence, in accordance with applicable law, professional standards, agreed scope, timescales and budget. It must communicate honestly about progress, risk, delay, availability and cost; notify GSM promptly if it cannot perform as requested; and obtain authority before materially exceeding an agreed estimate, changing scope or substituting a material service/provider where member approval is reasonably required. The Supplier is responsible for the accuracy, completeness and professional quality of its own advice, reports, calculations, filings, work product and representations and must correct a material error promptly after discovery.",
        },
        {
          heading: "20. Independent professional responsibility",
          body: "Where the Supplier provides legal, tax, investment, immigration, medical, accounting, fiduciary, banking or other professional or regulated advice, that advice is the Supplier's own and is given under the Supplier's own engagement, regulatory duties and professional responsibility. The Supplier must provide the member with engagement terms, scope, fees, required disclosures, complaints information and regulatory information. Montvelle may coordinate, relay, organise or summarise information but does not review, approve, adopt or share professional responsibility for the Supplier's advice. Complaints or claims about professional work must be handled promptly under the Supplier's own complaints, regulatory and insurance arrangements, with GSM kept reasonably informed where lawful.",
        },
        {
          heading: "21. Independent contractor; no agency or authority",
          body: "The Supplier is an independent contractor. Nothing creates a partnership, joint venture, employment relationship, franchise, fiduciary relationship or agency between the Supplier and GSM or between the Supplier and a member. Neither party may bind the other. Unless GSM expressly contracts as principal in writing, the underlying contract for third-party goods or professional services is between the Supplier and the member/member entity, and GSM acts to source, introduce and coordinate only. The Supplier must not state or imply that Montvelle guarantees, endorses or assumes responsibility for its goods, advice or work product.",
        },
        {
          heading: "22. Fees, invoices, taxes and authorised expenses",
          body: "The paying party for each assignment is the party identified in the assignment, booking or direct supplier engagement. If GSM is not identified as payer or principal, GSM has no obligation to pay the Supplier merely because it made an introduction or coordinated the work. Where GSM is payer, invoices must be accurate, itemised where reasonably requested, supported by authorised expenses and issued in accordance with the stated payment terms. The Supplier is responsible for its own taxes, payroll, personnel and business expenses except for expressly authorised reimbursable amounts. GSM may withhold a genuinely disputed amount while the parties investigate it, without withholding an undisputed amount that is properly due.",
        },
        {
          heading: "23. Records, audits and assurance",
          body: "The Supplier must keep accurate records sufficient to evidence the work performed, advice given, fees/expenses, required disclosures, relevant consents, licences, insurance and compliance with material assignment obligations for the period required by law and professional rules. On reasonable notice, GSM may request evidence or conduct a proportionate desk-based or on-site audit of matters relevant to member risk, confidentiality, security, privacy, safeguarding, insurance, sanctions, financial crime or billed amounts. Following a serious incident or credible compliance concern, reasonable evidence may be required urgently. The Supplier must remediate material findings within an agreed reasonable period. Audit rights do not give GSM access to unrelated client-confidential information or legally privileged material.",
        },
        {
          heading: "24. Business continuity and events outside reasonable control",
          body: "The Supplier must maintain business-continuity and recovery arrangements proportionate to the services it provides. If an event outside its reasonable control threatens performance, it must notify GSM promptly, mitigate the effect, protect member information, communicate revised timing and use reasonable alternatives where appropriate. Force majeure does not excuse confidentiality, security, safeguarding or amounts already accrued, and does not entitle the Supplier to charge for services not performed. Where a booking or service cannot be delivered, refunds or credits remain governed by the Supplier's disclosed terms, applicable law and any assignment-specific commitment.",
        },
        {
          heading: "25. Complaints, claims and cooperation",
          body: "The Supplier must maintain an appropriate complaints route and respond promptly and professionally to a member complaint. It must cooperate reasonably with GSM on complaints, regulatory enquiries, insurance claims, safety incidents and disputes concerning its work. The Supplier must notify GSM promptly of any serious complaint, threatened claim or regulatory matter that could materially affect a member or Montvelle, where lawful. Cooperation does not transfer professional or supplier responsibility to GSM.",
        },
        {
          heading: "26. Intellectual property, deliverables and third-party rights",
          body: "Each party retains its pre-existing intellectual property. Deliverables prepared specifically for a member are governed by the applicable assignment or direct professional engagement. To the extent needed for GSM to coordinate and deliver the assignment, the Supplier grants GSM a non-exclusive right to receive, store, display and transmit relevant deliverables to the authorised member and participants. The Supplier warrants that, to its knowledge and subject to disclosed third-party materials, its deliverables and authorised use of them will not knowingly infringe third-party intellectual-property rights. The Supplier must not introduce malware, hidden tracking or unauthorised access mechanisms into material or systems supplied to GSM or a member.",
        },
        {
          heading: "27. Montvelle name, publicity and case studies",
          body: "The Supplier may not use the Montvelle name, marks, imagery or any reference to Montvelle, GSM, a member or an assignment in marketing, credentials, client lists, case studies, websites, tenders, social media, press or awards without prior written consent. It must stop an authorised use when the permission expires or is withdrawn. Nothing prevents legally required disclosure, but the Supplier should give advance notice where law permits.",
        },
        {
          heading: "28. Supplier indemnity",
          body: "The Supplier indemnifies, defends and holds harmless GSM, its affiliates and their officers, employees and contractors against losses, liabilities, damages, fines, penalties, third-party claims and reasonable legal/professional costs arising from or connected with the Supplier's breach of these terms or an assignment; breach of confidentiality, privacy, security or safeguarding duties; infringement of third-party rights; loss of required licence or insurance; undisclosed conflict; regulatory breach; negligent or unlawful conduct; professional negligence or negligent misstatement; defective goods or work product; bodily injury or property damage caused by the Supplier; or the acts or omissions of personnel/subcontractors for whom it is responsible, including member or third-party claims arising from the Supplier's goods, services or advice. The indemnity does not apply to the extent the loss was caused by GSM's own negligence, breach or unlawful conduct. GSM must notify the Supplier reasonably promptly of an indemnified third-party claim, subject to prejudice; the Supplier must keep GSM informed and may not admit liability or settle a claim in a way that imposes liability, admission, confidentiality restriction or non-monetary obligation on GSM without GSM's prior written consent. GSM may participate with its own advisers at its own cost, except where the Supplier's breach reasonably requires separate representation as part of the indemnified loss.",
        },
        {
          heading: "29. Liability between GSM and the Supplier",
          body: "Nothing excludes or limits liability that cannot lawfully be excluded or limited, including fraud or fraudulent misrepresentation and death or personal injury caused by negligence where applicable. Subject to that, neither party is liable to the other for indirect or consequential loss, loss of anticipated profit, loss of opportunity, loss of goodwill or punitive damages arising from the supplier relationship. Subject to mandatory law and except for GSM amounts properly due under an accepted assignment, GSM's total aggregate liability to the Supplier arising out of an assignment or supplier relationship will not exceed the fees actually paid or payable by GSM itself to that Supplier for the affected assignment during the 12 months preceding the event giving rise to the claim. Where the member contracts and pays the Supplier directly and GSM has not expressly assumed payment or principal liability, GSM does not become liable for the member's payment or performance. The Supplier's indemnity, confidentiality, data/security, professional-negligence and other liabilities remain governed by the terms that expressly apply to them. Recoveries from insurers or other persons for the same loss must be taken into account to prevent double recovery.",
        },
        {
          heading: "30. Suspension, remediation and termination",
          body: "GSM may suspend portal access, stop new assignments, require remediation, remove personnel or terminate an assignment or the supplier relationship immediately where there is a material breach, serious confidentiality/data/security incident, safeguarding concern, financial-crime or sanctions issue, loss/material reduction of required licence or insurance, undisclosed material conflict, material misrepresentation, serious complaint, insolvency risk affecting performance, or professional/regulatory investigation that could reasonably create material member risk. Either party may otherwise end the ongoing supplier relationship on reasonable notice, subject to live commitments. GSM may require a reasonable cure period for a remediable breach but is not required to delay urgent protective action. Termination does not release liability for prior acts or work.",
        },
        {
          heading: "31. Effect of termination and handover",
          body: "On termination the Supplier must stop unauthorised use of member information, return or securely delete confidential information except where law/professional rules require retention, revoke portal credentials, cooperate in an orderly handover of live matters and account for outstanding authorised amounts, refunds and member property. On reasonable request it must confirm deletion/return subject to stated lawful-retention exceptions. Confidentiality, privacy/security, no-solicitation, records, professional responsibility, insurance/run-off, indemnity, liability, intellectual property and dispute provisions survive to the extent stated or required by their nature.",
        },
        {
          heading: "32. Assignment, notices and corporate changes",
          body: "The Supplier may not assign, novate or transfer a formal Montvelle assignment or supplier relationship without GSM's prior written consent. GSM may assign or transfer its rights and obligations to an affiliate, successor or purchaser of substantially all of the relevant business or assets, subject to applicable law. Routine operational notices may be electronic. Formal legal notices should use the contact method stated in an assignment or formal correspondence. Each party must keep its principal notice contact reasonably current.",
        },
        {
          heading: "33. Entire agreement, precedence, severability and waiver",
          body: "For a formal Supplier relationship, the applicable assignment or statement of work, this Supplier & Partner Agreement, the Confidentiality & No Solicitation standard, required privacy/data terms and any expressly incorporated schedule form the contractual framework for the subject matter they cover and supersede prior inconsistent discussions. An assignment prevails only where it expressly changes these general terms for that assignment. Later Supplier boilerplate does not override this framework without express written acceptance. If a provision is invalid or unenforceable, it will be modified or severed to the minimum extent necessary and the remainder continues. Failure or delay in enforcing a right is not a waiver.",
        },
        {
          heading: "34. Updates and acceptance",
          body: "These general terms are versioned centrally. GSM may update them prospectively as the service, risk environment or law changes. The current version is presented for acceptance through the Supplier Portal and applies to assignments accepted after that version becomes effective unless a signed assignment says otherwise. A material change will not retroactively rewrite accrued rights or liabilities without agreement or lawful basis. Acceptance events should record the applicable version and timestamp.",
        },
        {
          heading: "35. Governing law and disputes",
          body: "Unless a signed assignment says otherwise, these terms and non-contractual disputes arising from them are governed by the laws of the State of Delaware, United States, and the parties submit to the exclusive jurisdiction of the state and federal courts located in Delaware, without prejudice to mandatory local law or either party seeking urgent injunctive/equitable relief where necessary to protect confidentiality, security, intellectual property or safety. The parties should first attempt in good faith to resolve a dispute directly where urgent relief is not required.",
        },
      ]}
    />
  );
}
