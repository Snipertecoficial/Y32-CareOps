# Y32 CareOps — Product Requirements Document

**Document version:** 0.1  
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
- Receptionists can accept, resolve, or return an item to the queue in the local prototype state.
- No alternative time is booked automatically in this phase.

### Integrations

- Connection cards display environment, last synchronization, permissions, and health.
- Credential fields are masked and never persist in the prototype.
- Credible scheduling write-back is shown as unavailable until partner access proves a supported contract.

## 9. Design Requirements

- Use the supplied Y32 Solutions logo and its blue-to-cyan visual identity.
- Maintain a calm, trustworthy clinical-operations tone rather than a consumer wellness aesthetic.
- Use a dense but readable desktop layout for operational work.
- Meet WCAG 2.2 AA contrast and keyboard-navigation expectations.
- Avoid decorative gradients except for small brand accents derived from the logo.
- Use plain English labels, explicit statuses, and no medical jargon where it is unnecessary.

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

## 13. Delivery Phases

### Phase 1 — Product design prototype

Design system, all application screens, realistic mock data, interactions, documentation, automated UI checks, and local Docker execution.

### Phase 2 — Technical proof of concept

Qualifacts developer registration, sandbox credentials, capability validation, telephony provider selection, and one end-to-end non-production call flow.

### Phase 3 — Production foundation

Backend services, tenant isolation, identity and access management, encrypted secrets, audit logging, observability, consent controls, and production deployment pipeline.

### Phase 4 — Customer rollout

Per-customer Credible approval, BAA completion, controlled pilot, operational training, monitoring, and staged production release.

## 14. Product Decisions for the Prototype

- Desktop web application is the primary surface.
- The application language is English.
- Mock data uses fictional names and organizations.
- The default tenant is `Harbor Behavioral Health`.
- Appointment rescheduling remains a human-assisted workflow.
- The UI may simulate connection and action states but must label them clearly.

