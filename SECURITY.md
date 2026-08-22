# Project Table security gate

Project Table is designed to hold unusually sensitive relationship, family, ownership, education and concierge context. The current repository contains **fictional demonstration data only**. Real member or family data must not be entered until the production security gate below is complete.

## Before any real member data

1. Make the source repository private and restrict collaborator access.
2. Replace browser `localStorage` persistence with a production database protected by row-level / role-based access controls.
3. Replace preview authentication with production identity, secure sessions, account recovery and MFA appropriate to administrator roles.
4. Separate permissions for member, family, rising-generation, Trusted Partner, concierge and administrator data.
5. Introduce encrypted object storage for sensitive documents. Do not store passports, banking data, trust deeds, wills, medical records or identity documents in local browser state.
6. Record security-relevant admin actions in an audit history.
7. Define retention, deletion, export and access processes before accepting live applications at scale.
8. Review vendors, subprocessors, secrets management, backups and incident response.
9. Complete legal review of privacy, membership, safeguarding and professional-boundary language for the contracting entity and launch jurisdictions.
10. Complete a security review / penetration test before positioning the private workspace as a secure vault.

## Data classification

### Public
Marketing copy, public Journal essays, public programme descriptions and non-confidential legal / membership information.

### Member private
Member profiles, introduction context, event responses, private knowledge saves and ordinary member preferences.

### Family confidential
Decision Rooms, Family Architecture, family roles, succession context, adviser context, education plans and other information that could expose family structure or private decisions.

### Restricted
Identity documents, banking information, detailed ownership documents, trust deeds, wills, medical information, credentials, security information, safeguarding records and any document whose disclosure could create financial, legal, personal or physical risk.

Restricted data should never be placed in the current browser-persistence layer.

## Professional boundaries

The platform may organise questions, decisions, deadlines, professional outputs and consent. It does not itself become the lawyer, tax adviser, immigration adviser, fiduciary, investment manager, medical professional or other regulated professional simply because information is coordinated inside the platform.

## Responsible disclosure

Before public launch, designate a monitored security contact and incident route. Security concerns should not be posted into public issues where they could expose member or infrastructure information.
