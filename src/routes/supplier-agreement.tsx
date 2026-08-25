import { createFileRoute } from "@tanstack/react-router";

import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/supplier-agreement")({
  head: () => ({
    meta: [
      { title: `Supplier & Partner Agreement — ${site.name}` },
      { name: "description", content: "The business terms that apply to organisations and specialists engaged by Montvelle to serve a member need." },
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
      intro="These business-to-business terms apply to any organisation, firm or independent specialist (the 'Supplier') that is engaged, assigned work or given portal access by Global Solutions Management LLC ('GSM', trading as Montvelle). They are not member terms and confer no membership rights. Acceptance is required at each sign-in to the Supplier Portal and on each assignment."
      contactPrompt="Questions about these terms, an assignment, a conflict disclosure or a data matter should be raised through the secure contact form, selecting 'Supplier / partner' or 'Legal / formal notice'."
      sections={[
        {
          heading: "1. No membership and no member directory rights",
          body: "Acceptance as a Supplier does not create membership, a member seat, or any right of access to members, member identities, household information or Montvelle's private member environment. Montvelle does not operate a member-facing supplier catalogue or directory, and does not sell or license access to members. Being recorded as a Supplier is not a marketing endorsement, and Montvelle makes no representation about the size, composition or exclusivity of any supplier pool.",
        },
        {
          heading: "2. Engagement is request-led and assignment-based",
          body: "Montvelle researches, sources, checks and coordinates external organisations in response to a specific member need. A Supplier performs work only where Montvelle has assigned a defined matter, or where a member has separately instructed the Supplier directly. There is no guarantee of volume, continuity, exclusivity or any minimum level of work. Montvelle may decline to assign, may assign to others, and may end an assignment where a member's needs change.",
        },
        {
          heading: "3. Licences, authorisations and competence",
          body: "The Supplier warrants that it holds and will maintain all licences, registrations, regulatory permissions, professional memberships, qualifications and authorisations required for the services it performs in each relevant jurisdiction, and that all personnel deployed are competent and appropriately supervised. The Supplier must notify Montvelle promptly of any loss, suspension, condition, sanction, disciplinary finding, complaint or investigation that affects or could reasonably affect its ability, fitness or authority to perform, and of any material change in ownership or control. Where professional or regulated work is involved, the Supplier remains solely responsible for determining whether it is authorised to advise the particular member in the relevant jurisdiction and for any regulatory perimeter, suitability or client-classification assessment required by its own regime.",
        },
        {
          heading: "4. Accurate credentials and no overstatement",
          body: "All credentials, regulatory statuses, insurances, accreditations, capability claims and references supplied to Montvelle must be accurate and current at the time given, and must be corrected promptly if they cease to be accurate. The Supplier must not overstate its capability, capacity, geographic reach or relationship with Montvelle. Any verification or diligence carried out by Montvelle does not transfer to Montvelle the Supplier's responsibility for the accuracy or continuing validity of those matters.",
        },
        {
          heading: "5. Insurance",
          body: "Where appropriate to the nature and risk of the services, the Supplier must hold and maintain adequate insurance, which may include professional indemnity or errors-and-omissions, public liability, employer's liability, product liability and, where relevant, cyber cover, at levels reasonable for the work and consistent with market practice, regulation and the jurisdiction concerned. A professional or regulated Supplier must maintain any insurance required by its regulator or professional body and, where the policy is written on a claims-made basis, must maintain appropriate run-off or equivalent protection for the period in which a claim could reasonably arise. Evidence of cover, insurer, limits, exclusions and renewal must be provided on reasonable request. Loss or material reduction of required cover must be notified to Montvelle immediately and may result in suspension of assignments.",
        },
        {
          heading: "6. Confidentiality",
          body: "All information the Supplier learns about Montvelle, a member, a household or a matter is confidential and must be used only to perform the assignment. Confidentiality survives termination and applies to the fact of a member's involvement, the existence and nature of a matter, and any household, family, financial, health, travel, security or safeguarding detail. The Supplier must not disclose, publicise, reference in marketing, or discuss any member or matter with any third party without Montvelle's prior written consent or the member's explicit consent, except where disclosure is required by law or professional obligation.",
        },
        {
          heading: "7. Minimum-necessary member information",
          body: "Montvelle discloses only the minimum information necessary for the Supplier to perform the assignment, and may withhold or pseudonymise member identity where the work permits. The Supplier must not seek, aggregate, infer or retain member information beyond that minimum, must not attempt to re-identify pseudonymised information, and must not combine information from separate assignments to build a profile of a member or household.",
        },
        {
          heading: "8. Data protection roles and responsibilities",
          body: "Depending on the engagement, the Supplier may act as a processor on Montvelle's documented instructions, or as an independent controller where it owes its own professional or regulatory duties to the member. The parties will identify the applicable role for each assignment and, where required, enter appropriate data processing or controller-to-controller terms. The Supplier must comply with applicable data protection law, assist with data subject rights requests, notify Montvelle without undue delay of any personal data breach affecting member information, and impose equivalent obligations on any authorised sub-processor.",
        },
        {
          heading: "9. Security expectations",
          body: "The Supplier must maintain security measures appropriate to the sensitivity of member information, including access control on a need-to-know basis, multi-factor authentication for remote and administrative access, encryption in transit and at rest where reasonably available, patching and malware protection, secure disposal, staff screening and training, logging, and a documented incident response process. Montvelle credentials and portal access must not be shared. Suspected compromise must be reported promptly.",
        },
        {
          heading: "10. No resale, prospecting or secondary use of member data",
          body: "The Supplier must not sell, rent, share, publish, scrape, bulk-export or otherwise commercialise member information; must not add members or their contacts to marketing lists; must not approach a member, their household, staff or advisers for unrelated business; and must not use member information to train, tune or evaluate any general-purpose or third-party artificial intelligence system. Post-assignment contact is permitted only where the member has invited it or Montvelle has agreed in writing.",
        },
        {
          heading: "11. Subcontracting",
          body: "The Supplier must not subcontract or delegate any part of an assignment without Montvelle's prior written consent, save for routine use of its own supervised personnel. Where subcontracting is approved, the Supplier remains fully responsible for the acts and omissions of its subcontractors and must flow down equivalent confidentiality, data protection, security, safeguarding, professional, insurance and conduct obligations.",
        },
        {
          heading: "12. Safeguarding",
          body: "Where an assignment involves or may bring the Supplier into contact with children, young people or adults at risk, the Supplier must operate an appropriate safeguarding policy, carry out required background checks and supervision in the relevant jurisdiction, ensure personnel are suitable for such contact, and report safeguarding concerns immediately in accordance with law and to Montvelle where lawful to do so.",
        },
        {
          heading: "13. Anti-bribery, anti-money laundering and financial crime",
          body: "The Supplier must comply with applicable anti-bribery, anti-corruption, anti-facilitation of tax evasion, anti-money laundering and counter-terrorist financing laws, must not offer or accept any improper payment or advantage in connection with Montvelle or a member, and must maintain adequate procedures to prevent financial crime within its organisation.",
        },
        {
          heading: "14. Sanctions and export controls",
          body: "The Supplier warrants that it, its owners and its personnel are not subject to applicable sanctions and that it will not perform any assignment in a manner that would breach sanctions, export control, trade or travel restrictions. The Supplier must notify Montvelle immediately if it becomes a designated or restricted party.",
        },
        {
          heading: "15. Conflicts, referral fees and commissions",
          body: "The Supplier must disclose promptly any actual or potential conflict of interest and any commission, referral fee, rebate, introducer payment, revenue share, preferred-rate arrangement or other consideration payable to or by it in connection with a member matter, whether or not required by regulation. Undisclosed inducements are a material breach. Nothing in these terms displaces any disclosure obligation the Supplier owes under its own regulatory regime.",
        },
        {
          heading: "16. Service standards",
          body: "The Supplier must perform with reasonable skill, care and diligence, in accordance with applicable law, regulation, professional standards, agreed scope, timescales and budget, and must communicate promptly and honestly about progress, risk, delay, cost and any matter that could affect a member's decision. Estimates that will be exceeded must be flagged before further cost is incurred. The Supplier is responsible for the accuracy, completeness and professional quality of its own advice, recommendations, reports, opinions, calculations, filings, work product and representations and must correct a material error promptly after becoming aware of it.",
        },
        {
          heading: "16A. Independent professional responsibility",
          body: "Where the Supplier provides legal, tax, investment, immigration, medical, accounting, fiduciary, banking or other professional or regulated advice, that advice is the Supplier's own and is given under the Supplier's own engagement, regulatory duties and professional responsibility. Montvelle may coordinate, relay, organise or summarise information for the member, but the Supplier must not represent that Montvelle has reviewed, approved, adopted or shares responsibility for the Supplier's advice. The Supplier must provide the member with any engagement letter, scope, disclosures, complaints information and regulatory information required by law or professional rules. If a member complaint or claim concerns the Supplier's professional work, the Supplier must handle it promptly under its own complaints and insurance arrangements while keeping Montvelle reasonably informed where lawful.",
        },
        {
          heading: "17. Authority, no agency and contracting position",
          body: "The Supplier is an independent contractor. Nothing creates a partnership, joint venture, employment relationship, franchise or agency between the Supplier and Montvelle or between the Supplier and a member. Neither party may bind the other. Unless GSM expressly contracts as principal in writing, the contract for the underlying services is between the Supplier and the member or the member's entity, and Montvelle acts only to coordinate. Montvelle cannot accept or inherit liability for the Supplier's advice, professional judgement, conduct or work product merely because Montvelle sourced, introduced, checked, coordinated or communicated with the Supplier.",
        },
        {
          heading: "18. Records, cooperation and complaints",
          body: "The Supplier must keep accurate records of work performed, advice given, disclosures made, consents relied on and member information held, for the period required by law and its own professional rules. The Supplier must cooperate reasonably and promptly with Montvelle in relation to member complaints, regulatory enquiries, insurance claims, audits proportionate to the risk of the engagement, and requests for information needed to resolve a matter. Cooperation does not transfer the Supplier's professional responsibility to Montvelle.",
        },
        {
          heading: "19. Brand, name and intellectual property",
          body: "The Supplier may not use the Montvelle name, marks, imagery or any reference to Montvelle, its members or its work in marketing, credentials, case studies, websites, tenders, social media or press without prior written consent, and must cease such use on request. Each party retains its own pre-existing intellectual property. Deliverables prepared specifically for a member are dealt with in the applicable engagement terms; the Supplier grants Montvelle the limited rights needed to deliver and coordinate the assignment.",
        },
        {
          heading: "20. Liability and indemnity",
          body: "Each party remains responsible for its own acts and omissions. The Supplier indemnifies and holds harmless GSM, its affiliates and their officers, employees and contractors against losses, liabilities, damages, claims and reasonable legal and professional costs arising from or connected with the Supplier's breach of these terms, breach of confidentiality, data protection or security obligations, infringement of third-party rights, loss of required licence or insurance, undisclosed conflict, regulatory breach, negligent or unlawful conduct, professional negligence, negligent misstatement, defective work product, or the acts or omissions of personnel or subcontractors for whom the Supplier is responsible, including claims brought by a member or third party arising from the Supplier's goods, services or advice. The indemnity does not apply to the extent a loss was caused by GSM's own negligence, breach or unlawful conduct. Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited, including for death or personal injury caused by negligence, or for fraud. Subject to that, neither party is liable to the other for indirect or consequential loss. Amounts recovered from an insurer or another person for the same loss must be taken into account so that there is no double recovery.",
        },
        {
          heading: "21. Suspension and termination",
          body: "Montvelle may suspend portal access, remove the Supplier from consideration or terminate an assignment or the relationship immediately where there is a material breach, a confidentiality or data incident, loss or material reduction of a required licence or insurance, a safeguarding or financial-crime concern, a sanctions issue, an undisclosed conflict, a serious complaint, professional or regulatory investigation that could reasonably affect member risk, or conduct inconsistent with member trust. Either party may end the relationship on reasonable notice, subject to the orderly completion or handover of live matters. Termination does not release the Supplier from liability for work, advice, acts or omissions occurring before termination.",
        },
        {
          heading: "22. Effect of termination and survival",
          body: "On termination the Supplier must stop using member information, return or securely delete it except where retention is required by law or professional rules, complete any agreed handover, and confirm compliance on request. Confidentiality, data protection, security, non-solicitation of members, records, professional responsibility, insurance where relevant, indemnity, liability, intellectual property and governing law provisions survive termination.",
        },
        {
          heading: "23. Updates and continuing acceptance",
          body: "These terms are versioned centrally. Montvelle may update them, and the current version is presented for acceptance at each Supplier Portal sign-in and applies to assignments accepted after that point. Continued performance or portal use after an update constitutes acceptance of the current version. Acceptance events record the document version and timestamp.",
        },
        {
          heading: "24. Governing law and disputes",
          body: "Unless a signed engagement document says otherwise, these terms are governed by the laws of the State of Delaware, United States, and the parties submit to the exclusive jurisdiction of the courts of that state, without prejudice to mandatory local rights or to either party seeking urgent injunctive relief where necessary to protect confidentiality or safety. The parties will attempt to resolve disputes in good faith before commencing proceedings.",
        },
      ]}
    />
  );
}
