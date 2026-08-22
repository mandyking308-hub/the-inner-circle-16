# Project Table — Incident Response Runbook

**Status:** operating draft for pre-launch rehearsal. Final notification duties and contacts must be confirmed with privacy/legal counsel before production.

Project Table may eventually hold information about families, ownership, advisers, movements, children and private decisions. An incident is therefore not merely an IT inconvenience. The response must protect people first, contain access quickly and preserve enough evidence to understand what happened.

## 1. What counts as an incident

Treat any of the following as an incident until triaged:

- suspected account takeover or shared credentials;
- a member seeing another household's private data;
- a partner account reaching member-only or household data;
- unexpected access to the family vault;
- leaked credentials, API keys, service-role keys or signing secrets;
- lost or stolen staff device with active access;
- malicious or accidental deletion of member records;
- unusual bulk reads, downloads or exports;
- a safeguarding concern involving a young person or mentor;
- an application or form endpoint being abused at scale;
- a third-party provider reporting a security/privacy event that may affect Project Table;
- a staff member sending confidential information to the wrong recipient;
- credible evidence that private Table discussion has been recorded, exported or distributed without permission.

## 2. Immediate response — first 30 minutes

The first person who becomes aware of the incident owns escalation until an Incident Lead explicitly accepts it.

1. **Stop the spread.** Revoke affected sessions, disable compromised accounts, rotate exposed secrets or temporarily disable the affected feature.
2. **Do not destroy evidence.** Preserve relevant audit events, application logs, auth logs, storage events, emails and screenshots. Do not casually delete suspicious records before the Incident Lead decides what must be retained.
3. **Open one incident record.** Give it an ID, time detected, reporter, affected system, known households/users, current containment action and next owner.
4. **Escalate.** Notify the Incident Lead and technical/security owner. If personal data, regulated advice, payment information, children or physical safety may be involved, bring the relevant legal/privacy/safeguarding owner in immediately.
5. **Use minimum necessary communication.** Do not discuss the incident in broad community channels or expose affected member identities internally unless people need that information to respond.

## 3. Severity

### SEV-1 — Critical

Use for active compromise, cross-household data exposure, partner-to-member boundary failure, exposed restricted documents, service-role key compromise, child safety issue, or a breach likely to create material harm.

Target behaviour: immediate containment, named Incident Lead, executive/technical/legal involvement, continuous response until stable.

### SEV-2 — High

Use for a contained privacy/security failure with limited exposure, repeated malicious access attempts with some control failure, or a service outage that materially prevents members from accessing urgent private-office functionality.

Target behaviour: same-day containment and investigation with named owner.

### SEV-3 — Operational

Use for lower-risk misconfiguration, non-sensitive service interruption, isolated spam/abuse, or a near miss where controls worked but a weakness should be fixed.

Target behaviour: record, repair, test and close with a lesson.

## 4. Roles

Before production, assign named people to these roles and keep the contact sheet outside the affected application:

- **Incident Lead:** coordinates decisions and timeline.
- **Technical Lead:** containment, logs, systems, credentials and recovery.
- **Privacy/Legal Lead:** assesses personal-data, contractual and notification duties.
- **Safeguarding Lead:** owns any concern involving a child or young person.
- **Member Communications Lead:** communicates with affected members accurately and privately.
- **Executive Decision Owner:** approves major shutdowns, external specialist engagement and material member communications.

One person can hold more than one role in a small founding team, but the roles must still be explicit.

## 5. Investigation questions

Record facts, not guesses:

- What happened and how was it detected?
- When did it begin and when was it contained?
- Which accounts, households, records, files or systems were affected?
- Was data merely accessible, actually viewed, downloaded, changed or deleted?
- What authentication and role did the actor have?
- Did a partner or staff role cross a boundary it should not have crossed?
- Were children, health information, financial/ownership data, identity documents or physical-location information involved?
- Which audit events and provider logs support the conclusions?
- Is the weakness still exploitable?
- Which third parties need to be involved in containment or evidence collection?

## 6. Member communication standard

When communication is required:

- tell affected people directly before broad public statements where reasonably possible;
- state what is known, what is not yet known and what has been done;
- do not minimise uncertainty or overstate containment;
- give clear steps the member should take, if any;
- provide a named route for questions;
- update when material facts change;
- do not reveal another household's identity while explaining the incident.

Notification to regulators, insurers, law enforcement, professional bodies or other parties must be decided using the facts, applicable law, contracts and professional advice — not improvised from this runbook.

## 7. Recovery

A system is not recovered merely because the site loads again.

Before normal access resumes:

- compromised credentials/secrets are rotated;
- affected sessions are invalidated;
- the specific access-control weakness is fixed;
- household and partner boundaries are re-tested;
- affected files/records are checked for unauthorised change or deletion;
- backup restoration is tested when integrity is in doubt;
- monitoring is temporarily increased;
- the Incident Lead accepts the recovery state.

## 8. Post-incident review

Within a reasonable period after stabilisation, record:

- root cause;
- control that failed or was missing;
- what contained the problem;
- what made response slower than it should have been;
- member/provider communications sent;
- legal/privacy/safeguarding conclusions;
- code/configuration/process changes;
- tests added to prevent recurrence;
- whether the Launch Control should add or reopen a hard gate.

Do not turn the review into blame. The purpose is to make the institution harder to break twice in the same way.

## 9. Rehearsal before launch

Run at least these tabletop scenarios with fictional data:

1. Partner account can unexpectedly query a family graph.
2. A staff laptop with an active privileged session is stolen.
3. A restricted family-vault document is returned to the wrong household.
4. A service-role key appears in a public code commit.
5. A guardian reports inappropriate mentor communication with a young person.
6. A member says a confidential Table conversation has been recorded and circulated.

For each rehearsal, record containment time, missing information, unclear ownership and resulting fixes. The incident-response Launch Control gate should remain open until this rehearsal has happened and named owners exist.
