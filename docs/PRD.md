# Y32 CareOps — Product Requirements Document

**Document version:** 0.3
**Date:** September 22, 2026  
**Product stage:** Client-validation prototype  
**Primary product language:** English  
**Working product name:** Y32 CareOps

## 1. Product Summary

Y32 CareOps is a multi-tenant appointment operations platform for healthcare organizations. It helps operations teams reduce missed appointments by automatically calling patients, recording confirmations, and routing patients who want to reschedule to the correct reception team.

The first release is an interactive, presentation-ready prototype. It uses realistic mock data and simulates external integrations without storing or transmitting real patient information.

## 2. Problem

Healthcare reception teams spend significant time reminding patients, recording responses, and coordinating rescheduling. Manual workflows are inconsistent, difficult to audit, and do not scale across multiple clinics.

## 3. Product Goals

- Give operations staff a clear daily view of appointments and outreach outcomes.
- Demonstrate automated reminder calls, confirmation capture, and warm transfer workflows.
- Support multiple healthcare organizations with visibly separated tenant contexts.
- Provide a credible integration model for Credible/Qualifacts, telephony, and AI providers.
- Create a reusable design system suitable for the future production application.

## 4. Non-Goals for the Prototype

- Placing real phone calls.
- Reading or writing live patient data.
- Persisting API credentials or AI tokens.
- Claiming HIPAA compliance or production readiness.
- Performing autonomous appointment rescheduling.
- Billing, claims processing, clinical documentation, or medical decision support.

## 5. Primary Users

### Operations Manager

Monitors appointment outreach, confirmation rates, unresolved calls, and clinic performance across locations.

### Receptionist

Receives warm transfers, reviews reschedule context, and records the outcome of each request.

### Tenant Administrator

Configures locations, team access, integrations, calling windows, scripts, and escalation rules.

### Platform Administrator

Manages tenant lifecycle and monitors platform-level integration health without accessing tenant clinical data by default.

## 6. Core User Journeys

### Appointment confirmation

1. Upcoming appointments are imported into the tenant workspace.
2. A reminder campaign selects eligible appointments.
3. The voice assistant calls the patient using the configured language and script.
4. The patient confirms the appointment.
5. The dashboard records the confirmation and queues a write-back when the EHR connector supports it.

### Reschedule request and warm transfer

1. During the reminder call, the patient requests a different appointment time.
2. The assistant explains that a scheduling specialist will help.
3. The call is transferred to the correct reception queue with appointment context.
4. The receptionist records the outcome.
5. A future production connector writes the new appointment to the source system only when the tenant's integration supports an approved scheduling operation.

### Failed or unanswered call

1. The attempt is recorded with a normalized outcome.
2. The retry policy schedules another attempt within the tenant's permitted calling window.
3. After the retry limit, the item is moved to a manual follow-up queue.

## 7. Prototype Scope

The prototype must include the following interactive screens:

1. **Sign in** — branded entry point with a demo access action.
2. **Overview** — today's operational summary, outreach progress, upcoming appointments, and integration health.
3. **Appointments** — searchable list and calendar-style views with confirmation status and appointment detail drawer.
4. **Campaigns** — reminder campaign list, progress, audience criteria, and a guided create-campaign flow.
5. **Live calls** — active and recently completed calls with transcript preview and call state.
6. **Reschedule queue** — patients waiting for reception, transfer priority, wait time, and resolution actions.
7. **Patients** — directory with contact preferences, consent state, language, and appointment history preview.
8. **AI assistant** — voice, language, call script, escalation behavior, and calling-window configuration.
9. **Integrations** — Credible FHIR, scheduling adapter, telephony, and AI provider connection states.
10. **Team & roles** — users, roles, locations, and access scope.
11. **Audit log** — immutable-style activity list with actor, tenant, action, and timestamp.
12. **Organization settings** — tenant identity, locations, time zone, notification defaults, and data-retention controls.

### 7.1 Navigation and interaction contract

The demo uses one published prototype account (`Admin` / `Admin`). It exposes every screen so a prospect can evaluate the complete product vision. This is not the production authorization model; production roles are defined in section 5 and must be enforced by the backend.

| Menu / route | What the user sees | Click or input | Immediate result in the prototype | Production delivery |
|---|---|---|---|---|
| Sign in `/` | Y32 identity, credentials, and a live patient-journey preview | Submit `Admin` / `Admin` | Starts a browser-tab demo session and opens Overview | SSO/OIDC, MFA policy, secure server session, timeout, lockout, and role claims |
| Overview `/overview` | Outreach progress, live calls, reception demand, patient journey, and FHIR health | Open active campaign | Opens Campaigns | Live operational aggregates from jobs, calls, and connector events |
| Overview `/overview` | Patients waiting for human attention | Accept on a patient | Opens the Reschedule queue, where the receptionist can claim the request | Atomic server-side assignment with real-time queue updates |
| Overview `/overview` | FHIR sync summary | Integration details | Opens Integrations | Connector telemetry, alerts, and run history |
| Appointments `/appointments` | Searchable list, filters, list/calendar toggle, and visit rows | Search/filter/toggle | Updates the visible synthetic result set without mixing tenants | Server-side pagination, saved filters, and EHR-backed appointment data |
| Appointments `/appointments` | Appointment detail | Select a row | Opens the detail drawer with visit and outreach history | Current source record plus audited status actions |
| Campaigns `/campaigns` | Campaign progress and outcomes | Create campaign | Opens Audience → Timing → Script → Review; saving creates a local Draft | Persisted campaign, eligibility validation, job scheduling, approval, pause/resume |
| Live calls `/live-calls` | Active/recent calls, transcript, detected intent, and transfer state | Select a call | Changes the detail workspace | Provider webhooks, streaming events, recording policy, supervisor controls |
| Reschedule queue `/reschedule` | Waiting, assigned, and resolved requests | Accept | Moves the request from Waiting to Assigned and names the receptionist | Transactional ownership, concurrency protection, SLA tracking |
| Reschedule queue `/reschedule` | Patient and transfer context | Details | Opens a drawer with priority, queue status, original appointment, requested window, clinic, language, assignee, and recorded outcome | Tenant-scoped handoff context assembled from call, appointment, and queue records |
| Reschedule queue `/reschedule` | Assigned request context | Choose outcome and resolve | Moves it to Resolved in local state | Approved Credible scheduling write-back or receptionist-only completion |
| Reschedule queue `/reschedule` | Assigned request context | Return to queue | Returns the request to Waiting and removes the local assignee | Transactional release with concurrency protection and an audit event |
| Patients `/patients` | Communication directory without diagnosis or medication data | Search/filter/select | Filters the directory and changes the detail panel | Minimum-necessary patient access with consent and audit enforcement |
| AI assistant `/assistant` | Voice, languages, script, calling window, retries, disclosure, escalation | Edit and save | Updates the current screen and shows a demo-only notice | Versioned configurations, approvals, secrets isolation, evaluation and rollback |
| Integrations `/integrations` | Credible FHIR, scheduling, telephony, and AI capability cards | Configure | Opens a masked, non-persistent demo form | Encrypted per-tenant secrets and server-side connection validation |
| Integrations `/integrations` | Limited Credible scheduling capability | Attempt write-back | Remains disabled and explains the missing vendor contract | Enabled only after Qualifacts documents and approves the operation |
| Team & roles `/team` | People, roles, status, and location scope | Filter or invite | Filters rows or opens a local invite dialog | Identity-provider invitation, RBAC, least privilege, and access review |
| Audit log `/audit` | Tenant-scoped events and correlation IDs | Search/filter | Narrows the visible immutable-style event list | Append-only audit store, retention, export, and investigation workflow |
| Organization settings `/settings` | Tenant identity, time zone, locations, notifications, and retention | Edit and save | Updates local form state and shows a demo-only notice | Validated persistence, change approval, audit event, and policy enforcement |
| Global sidebar | Organization selector | Change organization | Returns to Overview and replaces all visible records with the selected tenant | Server-authorized tenant context and per-tenant data isolation |
| Global top bar | Notifications | Click bell | Shows `No new demo notifications.` | Notification center backed by actionable events and read state |
| Global sidebar | Sign out | Click Sign out | Clears the demo session and returns to Sign in | Identity-provider logout, token revocation, and server-session termination |

### 7.2 Prototype behavior labels

- **Interactive:** navigation, filters, drawers, dialogs, campaign steps, queue state changes, tenant switching, notifications, and sign out work in browser state.
- **Simulated:** patient records, campaigns, calls, transcripts, configuration saves, invitations, connection tests, and audit events are synthetic or local-only.
- **Blocked by validation:** Credible appointment read, confirmation write-back, and rescheduling write-back remain unavailable until Qualifacts provides sandbox access and an approved contract.
- Every simulated external mutation must show `Demo only — no external system will be updated.`

## 8. Functional Requirements

### Multi-tenancy

- Every mock domain record includes a `tenantId`.
- Switching tenants updates all visible dashboard data and organization identity.
- The interface never combines operational metrics from different tenants.
- Platform administration is visually separated from tenant administration.

### Appointment operations

- Users can search and filter appointments by status, date, location, and provider.
- The appointment detail view shows contact status, scheduled time, assigned provider, and outreach history.
- Prototype actions update local UI state only and are clearly labeled as simulated.

### Voice outreach

- Campaigns display queued, in-progress, confirmed, reschedule-requested, unanswered, and failed totals.
- Live call details show elapsed time, detected intent, transcript lines, and next action.
- The prototype supports English and Spanish script examples; English remains the application interface language.

### Reception handoff

- Reschedule requests show urgency, patient preference, original appointment, and call context.
- Selecting `Details` opens a contextual drawer without changing queue ownership or status.
- Receptionists can accept, resolve, or return an item to the queue in the local prototype state.
- No alternative time is booked automatically in this phase.

### Integrations

- Connection cards display environment, last synchronization, permissions, and health.
- Credential fields are masked and never persist in the prototype.
- Credible scheduling write-back is shown as unavailable until partner access proves a supported contract.

### Session and access behavior

- Unauthenticated access to any internal route redirects to Sign in.
- Successful demo sign-in replaces browser history so Back does not reopen the credential form as an active session page.
- Sign out clears the tab-scoped session and returns to Sign in.
- The prototype session is stored in `sessionStorage` only. It is not production authentication and is intentionally lost when the tab session is cleared.

## 9. Design Requirements

- Use the supplied Y32 Solutions logo and its blue-to-cyan visual identity.
- Maintain a calm, trustworthy clinical-operations tone rather than a consumer wellness aesthetic.
- Use a dense but readable desktop layout for operational work.
- Meet WCAG 2.2 AA contrast and keyboard-navigation expectations.
- Use restrained teal gradients only on the approved sign-in and summary surfaces; keep operational content on quiet solid backgrounds.
- Use plain English labels, explicit statuses, and no medical jargon where it is unnecessary.
- At tablet widths, the sign-in composition stacks before its columns can create horizontal overflow.
- The tablet sidebar may hide visible captions, but every navigation and sign-out control must retain an accessible name.
- At mobile widths, navigation becomes a focus-managed sheet; routes, actions, and forms remain reachable without horizontal page scrolling.

## 10. Data and Security Requirements

- Prototype data is synthetic and must not resemble real patients.
- Production architecture must encrypt data in transit and at rest.
- Tenant identifiers must be enforced server-side in every data access path.
- Secrets must be stored in a managed secrets service, never browser storage or source control.
- Access must be role-based and audit events must be tenant-scoped.
- Call recording and transcription must be configurable by tenant and jurisdiction.
- A production launch requires HIPAA, TCPA, state call-recording, consent, retention, and BAA review.

## 11. Integration Requirements

- Use an adapter boundary so each EHR integration can expose its supported capabilities independently.
- Treat Credible FHIR as a read-oriented clinical-data source until an approved appointment contract is documented.
- Use a telephony provider capable of outbound calls, DTMF/speech input, status callbacks, and warm PSTN/SIP transfer.
- Keep AI-provider selection configurable per tenant without exposing raw secrets to the frontend.
- Use idempotency keys for outreach jobs and write-back commands in production.

## 12. Success Criteria for Client Approval

- A stakeholder can understand today's operational status within 30 seconds.
- A user can trace an appointment from scheduled to called, confirmed, or transferred.
- Every primary navigation item opens a complete and coherent screen.
- The Y32 brand is recognizable without overwhelming the clinical workflow.
- The prototype is usable at desktop and tablet widths and remains navigable on mobile.
- The client can distinguish simulated functionality from validated production integrations.
- Every visible primary action either changes the current demo state, opens the next relevant screen, or explains why the action is unavailable.
- The sign-in, protected-route, notification, tenant-switch, and sign-out paths pass automated regression tests.

## 13. Delivery Phases

### Phase 1 — Product design prototype

Design system, all application screens, realistic mock data, interactions, documentation, automated UI checks, and local Docker execution.

### Phase 2 — Technical proof of concept

Qualifacts developer registration, sandbox credentials, capability validation, telephony provider selection, and one end-to-end non-production call flow.

### Phase 3 — Production foundation

Backend services, tenant isolation, identity and access management, encrypted secrets, audit logging, observability, consent controls, and production deployment pipeline.

### Phase 4 — Customer rollout

Per-customer Credible approval, BAA completion, controlled pilot, operational training, monitoring, and staged production release.

The detailed sequence, dependencies, exit criteria, and menu-by-menu delivery status are maintained in [`ROADMAP.md`](ROADMAP.md).

## 14. Product Decisions for the Prototype

- Desktop web application is the primary surface.
- The application language is English.
- Mock data uses fictional names and organizations.
- The default tenant is `Harbor Behavioral Health`.
- Appointment rescheduling remains a human-assisted workflow.
- The UI may simulate connection and action states but must label them clearly.

