# Y32 CareOps Design System

**Version:** 0.1  
**Source of truth:** `Y32 Solutions logo.jpeg` and the Y32 Solutions public website  
**Interface language:** English

## 1. Design Direction

The interface should feel calm, operational, precise, and trustworthy. It combines Y32's technology identity with the clarity expected from healthcare operations software. Brand color is used to orient and confirm, while neutral surfaces carry most of the information density.

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
| `brand-700` | `#1F49B6` | Primary actions, active navigation |
| `brand-600` | `#245BC7` | Links, focus accents |
| `brand-100` | `#E8EEFF` | Selected rows, subtle highlights |
| `cyan-600` | `#0796AA` | Secondary brand accent |
| `cyan-500` | `#13B8C4` | Progress and positive brand moments |
| `cyan-100` | `#DDF7F8` | Soft accent backgrounds |
| `navy-950` | `#10213D` | Sidebar and strongest text |
| `navy-800` | `#203653` | Headings |
| `slate-700` | `#40536B` | Body text |
| `slate-500` | `#6B7C91` | Secondary text |
| `slate-300` | `#CAD4E0` | Borders |
| `slate-100` | `#EDF2F7` | Dividers and muted surfaces |
| `surface` | `#FFFFFF` | Primary surface |
| `canvas` | `#F5F8FC` | Application background |
| `success-600` | `#16845B` | Confirmed, connected, completed |
| `warning-600` | `#B86A00` | Waiting, attention required |
| `danger-600` | `#C23B3B` | Failed, disconnected, destructive |
| `info-600` | `#2878B8` | Informational states |

Status meaning must never rely on color alone. Every status includes a text label and, where useful, an icon.

## 4. Typography

- Primary family: Inter, with `system-ui`, `Segoe UI`, and sans-serif fallbacks.
- Display: 32/40, weight 650.
- Page title: 26/34, weight 650.
- Section title: 18/26, weight 650.
- Body: 14/21, weight 400.
- Label: 12/16, weight 600.
- Metric: 28/34, weight 700, tabular numerals.
- Long copy stays below 65 characters per line.

## 5. Spacing and Layout

- Base spacing unit: 4 px.
- Common spacing: 8, 12, 16, 20, 24, 32, 40, and 48 px.
- Desktop sidebar: 248 px expanded, 76 px collapsed.
- Top utility bar: 64 px.
- Content maximum width: 1600 px.
- Content gutters: 32 px desktop, 20 px tablet, 16 px mobile.
- Standard panel radius: 14 px.
- Control radius: 10 px.
- Borders: 1 px using `slate-300` at reduced opacity.
- Elevation is reserved for menus, dialogs, drawers, and sticky controls.

## 6. Core Components

### Navigation

- App sidebar with logo, tenant switcher, grouped navigation, help, and user profile.
- Active items use a brand-tinted background and a strong left indicator.
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

Split layout with Y32 brand panel, concise product promise, secure-access messaging, and a clearly labeled demo sign-in action.

### Overview

Top row: tenant context, date range, and primary action. Main content: outreach progress, appointment outcomes, live queue, next appointments, and integration status. The operational queue is visually dominant.

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

- At 1200 px and above, use the full sidebar and multi-column overview.
- From 768 to 1199 px, collapse secondary panels and allow the sidebar to reduce.
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

