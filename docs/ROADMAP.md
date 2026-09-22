# Y32 CareOps Delivery Roadmap

**Version:** 1.1
**Date:** September 22, 2026
**Language of the product:** English
**Current stage:** Interactive sales prototype

## Delivery principles

- Multi-tenant isolation is enforced at every server and data boundary, not only in the interface.
- Capabilities are enabled per connector; unsupported operations stay disabled with an explanation.
- No real patient data enters the prototype.
- No production feature is called complete until security, compliance, observability, failure recovery, and acceptance tests are in place.
- Appointment rescheduling remains human-assisted until Qualifacts approves a documented scheduling contract.

## Phase 0 — Interactive prototype

**Purpose:** Help Y32 demonstrate and validate the end-to-end product story.

Delivered in the local prototype:

- Calm Care sign-in and fixed desktop sidebar using the Y32 logo and teal palette.
- Tab-scoped demo session with `Admin` / `Admin`, protected routes, and sign out.
- Eleven internal destinations across Operations and Administration.
- Two synthetic tenant contexts with isolated mock records.
- Search, filters, appointment and transfer-detail drawers, dialogs, campaign wizard, call selection, queue actions, form feedback, and notifications.
- Responsive desktop, tablet, and mobile navigation, including an overflow-safe stacked sign-in and accessible names in the collapsed sidebar.
- Automated component, accessibility, navigation, build, and Docker checks.

Exit criteria:

- Every menu opens the intended screen.
- Every primary CTA changes local state, opens the next screen, or explains an unavailable capability.
- Demo-only actions never imply that a patient, provider, phone service, or EHR was changed.

### Phase 0 menu-by-menu delivery status

| Surface | Demonstrable prototype behavior | Production work already scheduled |
|---|---|---|
| Sign in | `Admin` / `Admin` creates a tab-scoped session; protected routes redirect unauthenticated visitors | OIDC/SSO, MFA policy, server session, timeout, lockout, and role claims in Phases 2 and 4 |
| Overview | Opens campaigns, routes human-attention items to the queue, and opens integration health | Event-backed aggregates and real-time queue telemetry in Phase 4 |
| Appointments | Search, status/location filters, list/calendar state, empty-state recovery, and appointment drawer | Approved appointment import, pagination, freshness, and audited actions in Phases 3 and 4 |
| Campaigns | Four-step creation flow adds a local Draft and labels the action as simulated | Persistence, eligibility, scheduling, approval, launch, pause, retry, and cancellation in Phase 4 |
| Live calls | Selecting a call updates transcript, intent, connection, and transfer context | Telephony webhooks/stream, reconnect handling, recording policy, and supervisor controls in Phases 3 and 4 |
| Reschedule queue | Accept, inspect Details, choose outcome, resolve, and return to queue update local tenant-scoped state | Atomic assignment, SLA tracking, concurrency protection, reconciliation, and approved write-back in Phase 4 |
| Patients | Search, language/consent filtering, and patient selection update the communication panel | Minimum-necessary server access, consent enforcement, masking, and audited access in Phase 4 |
| AI assistant | Voice, language, script, call window, retry, disclosure, and escalation forms update the demo state | Versioning, approvals, evaluations, guardrails, secret isolation, and rollback in Phase 4 |
| Integrations | Capability cards and masked forms demonstrate Credible, scheduling, telephony, and AI setup; unsupported write-back stays disabled | Vendor sandbox validation in Phases 1 and 3; encrypted secrets and capability discovery in Phases 2 and 4 |
| Team & roles | Role/location filters and a local invite dialog demonstrate administration | IdP invitations, least privilege, access reviews, and tenant-bound RBAC in Phases 2 and 4 |
| Audit log | Actor/category/outcome/date filters narrow synthetic immutable-style events and expose correlation context | Append-only store, export, retention, investigation, and reconciliation in Phases 2 and 4 |
| Organization settings | Tenant identity, locations, calling defaults, escalation, and retention save locally with demo feedback | Validated persistence, approvals, policy enforcement, audit events, and rollback in Phase 4 |
| Global shell | Tenant switch resets to Overview with isolated data; notifications provide feedback; Sign out clears the demo session | Server-authorized tenant context, notification center, token revocation, and IdP logout in Phases 2 and 4 |

## Phase 1 — Vendor and workflow discovery

**Purpose:** Replace assumptions with approved integration contracts.

1. Register Y32 with the Qualifacts FHIR developer program.
2. Obtain sandbox `client_id`, `client_secret`, callback approval, sample credentials, and organization approval for a system-to-system app.
3. Validate OAuth 2.0/OIDC, JWT refresh, PKCE S256 where applicable, TLS 1.2, scopes, tenant identifiers, rate limits, and error responses.
4. Confirm the approved source for upcoming appointments.
5. Request schemas and approval for confirmation and rescheduling operations exposed outside the public FHIR list.
6. Select a telephony provider with outbound calls, speech/DTMF, status callbacks, configurable recording, and warm PSTN/SIP transfer.
7. Confirm BAA, TCPA, consent, call-recording, retention, and jurisdiction requirements with counsel and each customer.

Exit criteria: one signed-off capability matrix naming the source, method, scope, owner, and fallback for each operation.

## Phase 2 — Production foundation

**Purpose:** Establish the secure multi-tenant platform before live integrations.

- API gateway and backend service boundary.
- Tenant-aware relational data model and row-level authorization.
- OIDC/SSO, role-based access, session timeout, invitation, and access-review flows.
- Managed per-tenant secret storage; no raw tokens in browser storage or source control.
- Job queue, idempotency keys, retries, dead-letter handling, and reconciliation.
- Append-only audit trail with correlation IDs.
- Encryption in transit and at rest, structured logs, metrics, tracing, alerts, backups, and recovery procedures.
- Development, sandbox, staging, and production environments with CI/CD and infrastructure as code.

Exit criteria: security review, automated tenant-isolation tests, disaster-recovery exercise, and production-like staging environment.

## Phase 3 — Integration proof of concept

**Purpose:** Prove one safe end-to-end synthetic workflow.

### Credible adapter

- Read permitted Patient, Practitioner, Organization, and Location resources through FHIR.
- Implement the approved appointment import source behind `appointment.read`.
- Keep `appointment.confirm` and `appointment.reschedule` disabled until each write contract passes sandbox tests.
- Record source identifiers, sync cursor, last successful sync, and normalized errors.

### Voice and AI adapters

- Place one synthetic outbound reminder call.
- Detect confirmation, reschedule, voicemail, no-answer, and opt-out intents.
- Transfer a synthetic reschedule request to a reception destination with context.
- Apply tenant calling windows, retry policy, disclosure wording, and recording controls.

Exit criteria: documented synthetic confirmation and warm-transfer traces, including failures and audit records.

## Phase 4 — Operational MVP

**Purpose:** Turn each prototype screen into an authorized, persistent workflow.

| Product area | Production behavior | Key acceptance criteria |
|---|---|---|
| Sign in | OIDC/SSO session, role claims, timeout, logout | Protected URLs, session expiry, and role denial tested |
| Overview | Live aggregates from appointments, jobs, calls, and queue | Metrics reconcile with source events and remain tenant-scoped |
| Appointments | Paginated EHR-backed search and detail | Import freshness, filters, empty/error states, and audit trail |
| Campaigns | Persisted audience, schedule, approval, launch, pause, retry | Idempotent launch and safe cancellation |
| Live calls | Provider event stream, transcript controls, supervisor state | Reconnect, callback ordering, and recording policy tested |
| Reschedule queue | Atomic assignment, SLA, outcome, and reconciliation | Two agents cannot claim the same request |
| Patients | Minimum-necessary directory and consent context | Authorization, masking, and opt-out enforcement |
| AI assistant | Versioned prompts, voices, languages, evaluation, rollback | Guardrails and deterministic escalation verified |
| Integrations | Encrypted credentials, capability discovery, test connection | No secret exposure; unsupported operations disabled |
| Team & roles | Invitations, roles, locations, access review | Least privilege and tenant-bound identities |
| Audit log | Queryable append-only events and exports | Actor, action, tenant, timestamp, outcome, and correlation ID |
| Organization settings | Validated policy configuration | Change approval, audit event, and rollback |

Exit criteria: end-to-end acceptance suite, security testing, operational runbooks, and stakeholder sign-off.

## Phase 5 — Controlled customer pilot

**Purpose:** Validate real operations with one approved customer before broad release.

- Execute Qualifacts/customer agreements and BAAs.
- Configure tenant-specific numbers, reception queues, calling windows, languages, consent, and retention.
- Import a limited appointment cohort and run in supervised mode.
- Start with confirmation plus human reschedule handoff; enable write-back only if the validated connector advertises it.
- Track delivery, answer, confirmation, transfer, abandonment, error, opt-out, and reconciliation rates.
- Train reception and operations teams; document escalation and rollback.

Exit criteria: pilot KPIs accepted, zero unresolved high-severity security findings, reconciled source records, and customer go-live approval.

## Phase 6 — Production scale

- Tenant onboarding automation and connector versioning.
- Additional EHR adapters through the same capability contract.
- High availability, capacity planning, SLOs, incident response, and regional resilience.
- Analytics by location and campaign without cross-tenant leakage.
- Continuous AI evaluation, prompt/version governance, and regulatory review.

## Dependency gates

| Gate | Owner | Blocks |
|---|---|---|
| Qualifacts sandbox registration and credentials | Y32 + Qualifacts | Credible proof of concept |
| Approved appointment read contract | Qualifacts/customer | Live appointment import |
| Approved confirmation write contract | Qualifacts/customer | Automated confirmation write-back |
| Approved reschedule contract | Qualifacts/customer | Automated schedule update |
| Telephony provider and BAA | Y32 + provider | Live outbound calls and transfer |
| Customer consent/calling policy | Y32 + customer counsel | Pilot outreach |
| Production identity and secret management | Y32 engineering | Any real tenant or patient data |

## Recommended next commercial milestone

Sell the next engagement as a fixed-scope technical proof of concept: one Qualifacts sandbox tenant, one synthetic appointment feed, one outbound reminder call, one confirmation outcome, and one warm transfer to reception. Automatic rescheduling should remain an optional follow-on gated by written Qualifacts approval.
