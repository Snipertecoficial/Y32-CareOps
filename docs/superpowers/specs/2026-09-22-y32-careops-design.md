# Y32 CareOps Client-Validation Prototype Design

**Date:** September 22, 2026  
**Status:** Ready for stakeholder review  
**Related documents:** `docs/PRD.md`, `docs/DESIGN_SYSTEM.md`, `docs/API_FEASIBILITY.md`

## Intent

Create an English-language, multi-tenant healthcare appointment operations prototype that enables Y32 Solutions to demonstrate automated reminder calls, patient confirmations, rescheduling handoffs, and integration administration to a prospective client.

The prototype is an honest simulation: it uses synthetic data, performs no external calls, stores no credentials, and does not imply that undocumented Credible scheduling operations are available.

## Selected Approach

Build an integration-ready frontend prototype rather than a static design file or an early production backend.

This approach provides the best client demonstration because every primary route and core interaction works, while service adapters and capability states communicate how real integrations will be introduced later. A static mockup would not demonstrate the operational flow; a production backend now would add security and compliance cost before the client validates the experience.

## Product Architecture for This Phase

- React and TypeScript single-page application.
- Route-driven application shell with tenant-scoped mock data.
- Reusable UI primitives and design tokens derived from the Y32 brand.
- In-memory mock service layer with realistic latency and explicit demo notices.
- Responsive desktop-first interface.
- Local Docker image serving the compiled frontend.
- Automated tests for navigation, tenant isolation, core queue actions, and accessibility-sensitive states.

No backend, database, authentication provider, telephony provider, AI provider, or EHR connection is implemented in this phase.

## Information Architecture

The primary navigation contains:

1. Overview
2. Appointments
3. Campaigns
4. Live calls
5. Reschedule queue
6. Patients
7. AI assistant
8. Integrations
9. Team & roles
10. Audit log
11. Organization settings

The shell contains the Y32 mark, tenant selector, environment badge, help entry, notifications, and signed-in user menu.

## Core Demonstration Story

The default demonstration begins on Overview for Harbor Behavioral Health. The presenter can show today's outreach progress, open an appointment, move to an active call, observe the patient's reschedule intent, accept the request in the reception queue, and mark it resolved. The presenter can then open Integrations to explain that Credible FHIR is connected for supported read capabilities while scheduling write-back remains limited pending vendor approval.

## Mock Data Contract

Every record uses synthetic identifiers and a `tenantId`. Two fictional tenants demonstrate separation:

- Harbor Behavioral Health
- Northstar Family Care

Data includes appointments, patients, providers, locations, campaigns, call sessions, transfer requests, integration connections, team members, and audit events. Dates are generated relative to the current day so the demonstration remains chronologically credible.

## Interaction Model

- Sidebar navigation changes routes without reload.
- Tenant switching updates all visible data and returns the user to Overview.
- Appointment search and filters update the visible results.
- Selecting an appointment opens a detail drawer.
- Campaign creation uses a guided modal and creates a local simulated campaign.
- Live calls expose a transcript and intent state.
- Reception staff can accept and resolve a queued handoff in local state.
- Integration setup forms accept masked demonstration values but never persist them.
- Toasts and inline notices label simulated operations.

## Visual System

The application uses a white and cool-gray canvas, navy navigation, Y32 blue for primary controls, and cyan as a supporting accent. Semantic green, amber, red, and informational blue are reserved for operational states. Inter is the primary typeface with system fallbacks.

The layout avoids excessive cards. Tables, grouped rows, spacing, typography, and dividers carry most of the hierarchy. Shadows are limited to floating elements such as drawers and dialogs.

## State and Error Design

Every primary data view includes populated, empty, loading, and recoverable-error states. Integration cards distinguish `Connected`, `Limited`, and `Disconnected`. Actions requiring a real integration are disabled with an explanation. External-looking actions display a `Demo only` notice before updating local state.

## Security and Privacy Boundaries

- All names, phone numbers, and appointment details are fictional.
- No local storage is used for secrets or patient records.
- Tenant switching is a presentation feature, not a production authorization mechanism.
- The design anticipates RBAC, auditability, encryption, consent, retention, and regional calling rules.
- The prototype does not claim HIPAA compliance.

## Testing Strategy

- Component tests cover navigation, tenant filtering, appointment details, campaign creation, queue acceptance, and integration capability states.
- Automated accessibility checks cover labeled controls, focus behavior, semantic headings, and status text.
- Production build verification confirms TypeScript compilation and asset packaging.
- Browser QA covers desktop, tablet, and mobile widths plus all primary routes.
- Docker verification confirms the compiled application is served and client-side routing recovers correctly.

## Handoff Boundary

Client approval applies to information architecture, visual direction, terminology, and simulated workflow. After approval, the next phase validates Credible sandbox access, selects telephony and AI providers, and designs the production backend. Production claims remain blocked until those integrations are tested with vendor-issued credentials and contractual requirements are satisfied.

