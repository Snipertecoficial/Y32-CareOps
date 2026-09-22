# Credible / Qualifacts API Feasibility Assessment

**Assessment date:** September 22, 2026  
**Scope:** Appointment reminder, confirmation, rescheduling handoff, and multi-tenant integration

## Executive Finding

The concept is feasible as a platform, but the supplied public documentation does not prove that appointment scheduling can be read and updated through the published Credible FHIR API.

The public Credible FHIR page documents FHIR R4.0.1 and US Core 3.1.1 resources. Its published resource list is primarily read/search oriented and does not include `Appointment`, `Schedule`, or `Slot`. A separate CredibleBH Web API help page exposes appointment-adjacent and schedule routes, but many have no descriptions and the `POST api/schedules/Add` detail page returned an application error during this assessment.

## Confirmed Public Capabilities

- Sandbox base URL: `https://fhir.cbhstg4.crediblebh.com`
- Production base URL: `https://fhir.cbh4.crediblebh.com`
- OAuth 2.0 and OpenID Connect authentication.
- JWT access and refresh tokens.
- PKCE S256 support for clients that cannot securely store a client secret.
- TLS 1.2 requirement.
- JSON responses.
- FHIR R4.0.1 and US Core 3.1.1 alignment.
- Search/read support for resources including Patient, Practitioner, Organization, Encounter, CarePlan, CareTeam, Condition, Observation, DiagnosticReport, DocumentReference, MedicationRequest, Procedure, and related clinical resources.

## Access and Contractual Requirements

- Developer registration is required for sandbox access.
- Qualifacts issues the application `client_id`, `client_secret`, and sample patient credentials.
- Production access is limited to customers that license Credible FHIR functionality.
- Third-party developers must execute a BAA with Qualifacts and separately with each customer.
- Provider-facing or system-to-system applications also require approval from the participating organization.

## Capability Assessment

| Required capability | Feasibility | Evidence and dependency |
|---|---|---|
| Read patient demographics | Supported with constraints | `Patient` search/read is listed; authorization scopes still require sandbox validation. |
| Read provider and organization data | Supported with constraints | `Practitioner`, `Organization`, and `Location` search/read are listed. |
| Read upcoming appointments | Not proven by public FHIR docs | `Appointment`, `Schedule`, and `Slot` are absent from the published resource list. A separate approved API or export is required. |
| Place automated reminder calls | Feasible outside Credible | Requires a telephony provider plus lawful consent and calling-window controls. |
| Capture confirmation by voice or keypad | Feasible outside Credible | Telephony and AI can capture intent; writing the result back to Credible is not proven. |
| Warm-transfer to reception | Feasible outside Credible | Requires PSTN/SIP transfer support and tenant-specific routing. |
| Update or reschedule an appointment | Not proven | Legacy pages reference schedule and appointment operations but lack a reliable public contract. Qualifacts must confirm the supported write path. |
| Multi-tenant operation | Feasible in Y32 architecture | Requires tenant-scoped identity, data, secrets, jobs, audit logs, and connector configuration. |

## Legacy Web API Signals

The supplied CredibleBH Web API index exposes routes including:

- `POST api/schedules/Add`
- `GET api/GmpRequest/PatientAppointment/...`
- `GET api/GmpRequest/UpdatePatientAppointment/...`
- `GET api/GmpRequest/AppointmentsResync/...`
- `GET api/ApptVerify/GetVisitTypes`
- `GET api/visit/employee`

These routes must not be treated as approved integration contracts. Their public index provides little or no documentation, some operation names use `GET` for apparent mutations, and the schedule detail page was not usable during review. Production design should isolate any such connector behind a capability adapter.

## Recommended Integration Architecture

### EHR capability adapter

Each tenant connector reports explicit capabilities:

- `patient.read`
- `appointment.read`
- `appointment.confirm`
- `appointment.reschedule`
- `provider.read`
- `location.read`

The UI and orchestration service enable actions only when the active connector advertises and passes validation for the required capability.

### Telephony adapter

The provider must support outbound calling, status callbacks, speech and DTMF input, call recording controls, regional phone numbers, and warm transfer to PSTN or SIP destinations.

### AI adapter

The voice-agent layer must support constrained intents, deterministic escalation, transcript redaction, interruption handling, language configuration, and a no-medical-advice policy.

## Proof-of-Concept Exit Criteria

Before production implementation begins, the technical proof of concept must demonstrate:

1. Successful OAuth authentication in the Credible sandbox.
2. A documented source for upcoming appointments.
3. A documented and approved method to record confirmation or a defined manual fallback.
4. A documented and approved method to reschedule, or confirmation that rescheduling remains fully receptionist-operated.
5. One synthetic end-to-end call with confirmation.
6. One synthetic reschedule request transferred to a reception destination.
7. Tenant separation across credentials, data, queues, and audit events.
8. Failure handling for timeouts, rate limits, expired tokens, no answer, and transfer failure.

## Risk Controls

- Do not expose ePHI to an AI or telephony provider without the required contracts and configuration.
- Do not record calls by default; make recording jurisdiction-aware and tenant-controlled.
- Do not infer consent from an appointment record.
- Do not allow the AI to choose a new clinical appointment autonomously in the initial production release.
- Maintain immutable audit records for external calls and scheduling commands.
- Use encrypted per-tenant secret storage and short-lived service credentials.

## Sources

- [CredibleBH Web API Help](https://extservice.cbh3.crediblebh.com/Help)
- [Credible FHIR](https://www.qualifacts.com/api-page/platform/credible/credible-fhir.html)
- [FHIR R4](https://hl7.org/fhir/R4/)
- [US Core 3.1.1](https://hl7.org/fhir/us/core/STU3.1.1/)

