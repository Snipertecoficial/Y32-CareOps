# Y32 CareOps Design System

**Version:** 0.3
**Source of truth:** `Y32 Solutions logo.jpeg` and the approved `calm-care-sidebar-preview.html` direction
**Interface language:** English

## 1. Design Direction

The interface should feel calm, operational, precise, and trustworthy. A deep teal sidebar anchors the workspace, pale clinical surfaces reduce visual noise, and white panels carry the operational detail. The visual hierarchy should direct attention to progress and human handoffs without feeling urgent or alarming.

## 2. Brand Assets

- Primary logo: `Y32 Solutions logo.jpeg`
- Use the full logo in sign-in and organization settings.
- Use a cropped symbol variant in the application sidebar when space is limited.
- Preserve the logo's aspect ratio and white breathing room.
- Do not recolor, distort, outline, or place the logo over noisy imagery.

## 3. Color Tokens

The primary colors are derived from the supplied logo and adjusted into accessible UI roles.

| Token | Value | Usage |
|---|---:|---|
| `brand-700` | `#0A4F5A` | Sidebar, primary actions, active text |
| `brand-600` | `#0B6F78` | Links and secondary brand actions |
| `brand-100` | `#E5F5F3` | Selected rows and subtle highlights |
| `cyan-600` | `#0B7F81` | Accessible teal text and icons |
| `cyan-500` | `#0FA3A2` | Focus, progress, and active accents |
| `cyan-100` | `#DFF4F2` | Soft icon and avatar backgrounds |
| `navy-950` | `#173443` | Strongest text |
| `navy-800` | `#294B59` | Headings and controls |
| `slate-700` | `#435D69` | Body text |
| `slate-500` | `#5F737D` | Secondary text, AA on white and canvas |
| `slate-300` | `#BFD2D1` | Strong borders |
| `slate-200` | `#D9E7E5` | Standard borders |
| `slate-100` | `#EDF5F4` | Dividers and muted surfaces |
| `surface` | `#FFFFFF` | Primary surface |
| `canvas` | `#F2F8F7` | Application background |
| `success-600` | `#16845B` | Confirmed, connected, completed |
| `warning-600` | `#B86A00` | Waiting, attention required |
| `danger-600` | `#C23B3B` | Failed, disconnected, destructive |
| `info-600` | `#2878B8` | Informational states |

Status meaning must never rely on color alone. Every status includes a text label and, where useful, an icon.

## 4. Typography

- Interface family: DM Sans, with `system-ui`, `Segoe UI`, and sans-serif fallbacks.
- Display and heading family: Manrope, then DM Sans.
- Display: 44–50/54, weight 700.
- Page title: 29/34, weight 700.
- Section title: 18/26, weight 700.
- Body: 14/21, weight 400.
- Label: 12/16, weight 600.
- Metric: 28/34, weight 700, tabular numerals.
- Long copy stays below 65 characters per line.

## 5. Spacing and Layout

- Base spacing unit: 4 px.
- Common spacing: 8, 12, 16, 20, 24, 32, 40, and 48 px.
- Desktop sidebar: 250 px expanded, 76 px collapsed.
- Top utility bar: 68 px.
- Content maximum width: 1600 px.
- Content gutters: 32 px desktop, 20 px tablet, 16 px mobile.
- Standard panel radius: 15 px.
- Control radius: 10 px.
- Borders: 1 px using `slate-300` at reduced opacity.
- Elevation is reserved for menus, dialogs, drawers, and sticky controls.

## 6. Core Components

### Navigation

- App sidebar with logo, tenant switcher, grouped Operations, Project documents, and Administration navigation, user profile, and sign-out action.
- Active items use a white surface, deep-teal text, and teal icon emphasis.
- Mobile uses an accessible sheet opened from the top bar.

### Buttons

- Primary: brand-filled, used once per task region.
- Secondary: white surface with neutral border.
- Tertiary: text-only for low-emphasis actions.
- Destructive: danger tone and confirmation dialog.
- Minimum target size: 40 x 40 px.

### Status chips

Supported statuses: `Confirmed`, `Pending`, `Calling`, `Needs reschedule`, `Transferred`, `No answer`, `Failed`, `Connected`, `Limited`, and `Disconnected`.

### Data tables

- Sticky headers on long views.
- Search, explicit filters, result count, and pagination.
- Row actions remain visible on keyboard focus.
- Empty states explain why no results appear and how to recover.

### Metric panels

- One principal metric, one concise comparison, and optional sparkline.
- Avoid nested cards and ornamental metrics.

### Drawers and dialogs

- Appointment and call details use a right-side drawer on desktop.
- Focus is trapped while open and restored on close.
- Destructive and externally consequential actions require confirmation.

### Forms

- Labels remain visible above controls.
- Secret fields are masked and never populated with realistic credentials.
- Validation appears next to the field and in an error summary when necessary.

## 7. Screen Blueprints

### Sign in

Split layout with a white sign-in panel and soft-teal patient-journey preview. The primary heading is `Welcome back to coordinated care.`; the demo fields are prefilled with `Admin` / `Admin` and the CTA is `Sign in to demo`.

### Overview

Top row: tenant context, active page, demo state, notifications, and operator avatar. Main content: one four-part outreach signal strip, an active patient journey, a compact human-attention queue, and FHIR health. Human handoffs remain immediately visible.

### Appointments

Date strip, search and filters, table/calendar toggle, grouped appointment rows, and an appointment detail drawer with outreach timeline.

### Campaigns

Campaign progress list with audience, schedule, completion rate, and failure count. Creation uses a short step flow: audience, timing, script, review.

### Live calls

Active call list on the left and selected-call workspace on the right. The workspace shows elapsed time, detected intent, conversation transcript, and transfer readiness.

### Reschedule queue

Priority queue with wait time, language, clinic, original appointment, and reception assignment. Accepting an item opens the patient context panel.

### Patients

Searchable directory with communication preference, consent status, language, and recent appointment outcome. Sensitive clinical detail is intentionally excluded.

### AI assistant

Voice selection, supported languages, editable reminder script, pronunciation rules, calling hours, retry policy, disclosure wording, and human-escalation behavior.

### Integrations

Connection cards for Credible FHIR, Credible scheduling, telephony, and AI. Each card exposes capability, environment, health, last sync, and a safe configuration action.

### Team & roles

Member directory, role filter, location access, invite flow, and role permission summaries.

### Audit log

Chronological event table with filters for actor, category, date, and outcome. Details show request correlation identifiers without exposing secrets.

### Organization settings

Organization identity, locations, time zone, default language, calling windows, data retention, and escalation destination.

## 8. Responsive Behavior

- Above 1050 px, use the full sidebar and multi-column overview.
- From 768 to 1050 px, collapse the sidebar to icons and stack secondary panels.
- Below 768 px, use a navigation sheet, stacked metrics, simplified tables, and full-screen detail panels.
- Operational actions remain reachable without horizontal page scrolling.

## 9. Accessibility

- WCAG 2.2 AA contrast for text and controls.
- Visible focus ring using `brand-600` plus a white offset.
- Logical heading order and landmark regions.
- Semantic tables with sortable-column announcements.
- Reduced-motion support.
- Text alternatives for meaningful logo usage.
- Live call state changes announced politely to assistive technology.

## 10. Voice and Content

- Tone: concise, calm, operational, and respectful.
- Use `patient`, not `consumer` or `lead`.
- Use `Needs reschedule`, not `problem`.
- Use `Connection needs attention`, not `integration failed`, unless failure is confirmed.
- Prototype actions use helper text such as `Demo action — no external system will be updated.`

