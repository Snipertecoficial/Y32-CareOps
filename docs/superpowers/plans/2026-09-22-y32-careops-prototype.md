# Y32 CareOps Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a presentation-ready, English-language, multi-tenant Y32 CareOps web prototype with all approved screens, realistic synthetic data, interactive core workflows, and local Docker execution.

**Architecture:** A React and TypeScript single-page application uses React Router for navigation, a tenant-scoped in-memory repository for mock data, and feature folders for focused screens. Shared design tokens and primitives establish the Y32 visual system; the compiled Vite output is served by Nginx with SPA fallback inside Docker.

**Tech Stack:** Node.js 24, npm 11, React 19, TypeScript 5, Vite 7, React Router 7, Phosphor Icons, Recharts, Vitest, React Testing Library, axe-core, Playwright, Nginx, Docker.

**Spec:** `docs/superpowers/specs/2026-09-22-y32-careops-design.md`

## Global Constraints

- The application language is English.
- The product label is `Y32 CareOps`.
- The source logo is `Y32 Solutions logo.jpeg`; preserve its ratio and colors.
- All visible patient, employee, location, phone, and appointment information is synthetic.
- Every domain record includes a `tenantId`, and tenant switching must never combine records.
- No backend, database, login provider, real phone call, credential persistence, or live EHR request is part of this prototype.
- Any simulated external action must display `Demo only — no external system will be updated.`
- Credible scheduling write-back must display `Limited` until a supported contract is validated.
- Desktop is primary; tablet and mobile remain usable without horizontal page scrolling.
- UI text and controls must satisfy WCAG 2.2 AA expectations.

## Review Focus

- Unknown or stale tenant IDs must fall back to the default tenant without showing cross-tenant records; Task 2 tests this behavior.
- Empty search results must show a recovery message instead of a blank table; Task 4 tests this behavior.
- A reschedule item accepted by one receptionist must leave the waiting queue and expose its assigned state; Task 5 tests this behavior.
- A connection without `appointment.reschedule` capability must keep write-back actions disabled with an explanation; Task 7 tests this behavior.
- Mobile navigation must open, move focus to the first item, close after route selection, and restore focus to the menu button; Task 8 tests this behavior.

---

### Task 1: Project foundation and test harness

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `vite.config.ts`
- Create: `vitest.setup.ts`
- Create: `eslint.config.js`
- Create: `.gitignore`
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/App.test.tsx`
- Create: `src/assets/y32-logo.jpeg`

**Interfaces:**
- Consumes: the approved product specification and supplied logo.
- Produces: `App(): JSX.Element`, npm scripts `dev`, `build`, `test`, `test:run`, `lint`, and `preview`.

- [ ] **Step 1: Create project metadata and install dependencies**

Use this dependency contract in `package.json`:

```json
{
  "name": "y32-careops-prototype",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "tsc -b && vite build",
    "test": "vitest",
    "test:run": "vitest run",
    "lint": "eslint .",
    "preview": "vite preview --host 0.0.0.0"
  },
  "dependencies": {
    "@fontsource/inter": "^5.2.8",
    "@phosphor-icons/react": "^2.1.10",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.8.2",
    "recharts": "^3.1.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.35.0",
    "@playwright/test": "^1.55.0",
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/react": "^19.1.12",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.2",
    "axe-core": "^4.10.3",
    "eslint": "^9.35.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "jsdom": "^26.1.0",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.42.0",
    "vite": "^7.1.4",
    "vitest": "^3.2.4"
  }
}
```

Run: `npm install`

- [ ] **Step 2: Write the failing application smoke test**

Create `src/app/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
  it('renders the Y32 CareOps product identity', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Y32 CareOps' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run the smoke test and verify RED**

Run: `npm run test:run -- src/app/App.test.tsx`

Expected: FAIL because `src/app/App.tsx` does not exist or does not export `App`.

- [ ] **Step 4: Implement the minimal application shell**

Create `App` with a semantic heading, import Inter in `src/main.tsx`, and render through `createRoot`. Copy the supplied logo without modifying the original:

```powershell
Copy-Item -LiteralPath 'Y32 Solutions logo.jpeg' -Destination 'src/assets/y32-logo.jpeg'
```

- [ ] **Step 5: Verify GREEN and initialize version control**

Run: `npm run test:run -- src/app/App.test.tsx`

Expected: 1 passing test.

Run: `git init`

Run: `git add package.json package-lock.json index.html tsconfig*.json vite.config.ts vitest.setup.ts eslint.config.js .gitignore src`

Run: `git commit -m "chore: scaffold careops prototype"`

---

### Task 2: Tenant-safe domain model and mock repository

**Files:**
- Create: `src/domain/types.ts`
- Create: `src/domain/status.ts`
- Create: `src/data/mockData.ts`
- Create: `src/data/mockRepository.ts`
- Create: `src/data/mockRepository.test.ts`
- Create: `src/app/TenantProvider.tsx`

**Interfaces:**
- Consumes: React context and the prototype's two fictional tenant definitions.
- Produces: `TenantId`, `Appointment`, `Campaign`, `CallSession`, `TransferRequest`, `Patient`, `Integration`, `TeamMember`, `AuditEvent`, `MockRepository`, and `useTenant()`.

- [ ] **Step 1: Write failing tenant-isolation tests**

Create tests that express the repository contract:

```ts
import { describe, expect, it } from 'vitest'
import { createMockRepository, DEFAULT_TENANT_ID } from './mockRepository'

describe('mock repository tenant isolation', () => {
  it('returns only records belonging to the requested tenant', () => {
    const repo = createMockRepository()
    expect(repo.getAppointments('harbor').every(row => row.tenantId === 'harbor')).toBe(true)
    expect(repo.getAppointments('northstar').every(row => row.tenantId === 'northstar')).toBe(true)
  })

  it('falls back safely when the tenant id is unknown', () => {
    const repo = createMockRepository()
    expect(repo.resolveTenant('unknown').id).toBe(DEFAULT_TENANT_ID)
    expect(repo.getAppointments('unknown').every(row => row.tenantId === DEFAULT_TENANT_ID)).toBe(true)
  })
})
```

- [ ] **Step 2: Run repository tests and verify RED**

Run: `npm run test:run -- src/data/mockRepository.test.ts`

Expected: FAIL because `createMockRepository` and the domain types are missing.

- [ ] **Step 3: Define domain types and relative-date fixtures**

Define strict unions for appointment, call, transfer, and integration statuses. Build all dates from a `startOfToday()` helper so mock appointments remain plausible on any demonstration date. Include two tenants and at least eight records per operational list for Harbor plus three per list for Northstar.

- [ ] **Step 4: Implement the repository and tenant context**

Use an explicit fallback before filtering:

```ts
const resolveTenantId = (tenantId: string): TenantId =>
  tenants.some(tenant => tenant.id === tenantId) ? tenantId as TenantId : DEFAULT_TENANT_ID

const getAppointments = (tenantId: string) => {
  const safeTenantId = resolveTenantId(tenantId)
  return appointments.filter(item => item.tenantId === safeTenantId)
}
```

`TenantProvider` exposes `tenant`, `tenants`, and `setTenantId`, and returns to `/overview` after a tenant change.

- [ ] **Step 5: Verify repository behavior**

Run: `npm run test:run -- src/data/mockRepository.test.ts`

Expected: all repository tests pass.

Run: `git add src/domain src/data src/app/TenantProvider.tsx && git commit -m "feat: add tenant-safe mock domain"`

---

### Task 3: Design tokens, primitives, and responsive application shell

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Metric.tsx`
- Create: `src/components/ui/EmptyState.tsx`
- Create: `src/components/ui/Drawer.tsx`
- Create: `src/components/ui/Dialog.tsx`
- Create: `src/components/ui/ToastProvider.tsx`
- Create: `src/components/layout/AppShell.tsx`
- Create: `src/components/layout/AppShell.test.tsx`
- Create: `src/app/routes.tsx`
- Modify: `src/app/App.tsx`

**Interfaces:**
- Consumes: `useTenant()`, React Router route objects, Y32 logo asset, and status unions.
- Produces: shared UI components, `AppShell`, route navigation, tenant switcher, mobile menu, and toast contract `notify(message: string)`.

- [ ] **Step 1: Write failing shell navigation tests**

Test that the shell renders the Y32 identity, all eleven primary navigation links, the active route, tenant selector, and `Demo environment` badge.

```tsx
expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute('href', '/overview')
expect(screen.getByRole('combobox', { name: 'Organization' })).toHaveValue('harbor')
expect(screen.getByText('Demo environment')).toBeVisible()
```

- [ ] **Step 2: Run shell tests and verify RED**

Run: `npm run test:run -- src/components/layout/AppShell.test.tsx`

Expected: FAIL because `AppShell` and route navigation do not exist.

- [ ] **Step 3: Implement tokens and primitives**

Create CSS custom properties using the exact values from `docs/DESIGN_SYSTEM.md`, including focus, motion, spacing, type, radius, and elevation tokens. Components accept native HTML attributes, preserve keyboard behavior, and expose visible focus states.

- [ ] **Step 4: Implement the shell and route map**

Use Phosphor icons and these paths:

```ts
export const routeItems = [
  ['/overview', 'Overview'],
  ['/appointments', 'Appointments'],
  ['/campaigns', 'Campaigns'],
  ['/live-calls', 'Live calls'],
  ['/reschedule', 'Reschedule queue'],
  ['/patients', 'Patients'],
  ['/assistant', 'AI assistant'],
  ['/integrations', 'Integrations'],
  ['/team', 'Team & roles'],
  ['/audit', 'Audit log'],
  ['/settings', 'Organization settings'],
] as const
```

Use a collapsed navigation sheet below 768 px and include a skip link to `#main-content`.

- [ ] **Step 5: Verify the shell**

Run: `npm run test:run -- src/components/layout/AppShell.test.tsx`

Expected: shell tests pass.

Run: `git add src/styles src/components src/app && git commit -m "feat: add y32 design system shell"`

---

### Task 4: Overview and appointment operations

**Files:**
- Create: `src/features/overview/OverviewPage.tsx`
- Create: `src/features/overview/OverviewPage.test.tsx`
- Create: `src/features/appointments/AppointmentsPage.tsx`
- Create: `src/features/appointments/AppointmentsPage.test.tsx`
- Create: `src/features/appointments/AppointmentDrawer.tsx`
- Create: `src/features/appointments/appointmentFilters.ts`
- Create: `src/features/appointments/appointmentFilters.test.ts`
- Modify: `src/app/routes.tsx`

**Interfaces:**
- Consumes: `MockRepository`, `Appointment`, `useTenant()`, `Drawer`, `Badge`, and `Metric`.
- Produces: `/overview`, `/appointments`, `filterAppointments(appointments, query, status, location)`, and appointment detail interactions.

- [ ] **Step 1: Write failing filter and empty-state tests**

```ts
it('matches patient, provider, and confirmation status case-insensitively', () => {
  expect(filterAppointments(fixtures, 'MAYA', 'all', 'all').map(row => row.id)).toEqual(['appt-h-01'])
})
```

Add a component test that enters an impossible search and expects `No appointments match these filters` plus a `Clear filters` button.

- [ ] **Step 2: Run appointment tests and verify RED**

Run: `npm run test:run -- src/features/appointments`

Expected: FAIL because the filters and pages are missing.

- [ ] **Step 3: Implement Overview**

Render a strong operational hierarchy: greeting and date, four key metrics, outreach-progress chart, `Needs attention` queue, today's appointment rows, and integration health. Use `aria-label` text for chart summaries so values remain understandable without the chart.

- [ ] **Step 4: Implement Appointments and detail drawer**

Provide search, status and location filters, list/calendar toggle, result count, grouped rows, and drawer sections for patient contact preference, visit details, and outreach timeline. Simulated status actions invoke `notify('Demo only — no external system will be updated.')`.

- [ ] **Step 5: Verify both screens**

Run: `npm run test:run -- src/features/overview src/features/appointments`

Expected: all overview and appointment tests pass.

Run: `git add src/features/overview src/features/appointments src/app/routes.tsx && git commit -m "feat: add overview and appointment operations"`

---

### Task 5: Campaign, live-call, and reschedule workflows

**Files:**
- Create: `src/features/campaigns/CampaignsPage.tsx`
- Create: `src/features/campaigns/CampaignDialog.tsx`
- Create: `src/features/campaigns/CampaignsPage.test.tsx`
- Create: `src/features/calls/LiveCallsPage.tsx`
- Create: `src/features/calls/LiveCallsPage.test.tsx`
- Create: `src/features/reschedule/ReschedulePage.tsx`
- Create: `src/features/reschedule/ReschedulePage.test.tsx`
- Create: `src/features/reschedule/useTransferQueue.ts`
- Modify: `src/app/routes.tsx`

**Interfaces:**
- Consumes: tenant-scoped campaigns, calls, transfers, `Dialog`, `Badge`, and `notify`.
- Produces: `/campaigns`, `/live-calls`, `/reschedule`, local campaign creation, active-call selection, `acceptTransfer(id, assignee)`, and `resolveTransfer(id, outcome)`.

- [ ] **Step 1: Write failing workflow tests**

Campaign test:

```tsx
await user.click(screen.getByRole('button', { name: 'Create campaign' }))
expect(screen.getByRole('dialog', { name: 'Create reminder campaign' })).toBeVisible()
```

Transfer test:

```tsx
await user.click(screen.getByRole('button', { name: 'Accept Maya Thompson' }))
expect(screen.queryByText('Waiting for reception')).not.toBeInTheDocument()
expect(screen.getByText('Assigned to Olivia Carter')).toBeVisible()
```

- [ ] **Step 2: Run workflow tests and verify RED**

Run: `npm run test:run -- src/features/campaigns src/features/calls src/features/reschedule`

Expected: FAIL because the pages and actions are missing.

- [ ] **Step 3: Implement Campaigns and guided creation**

Render campaign progress rows and a four-step dialog: `Audience`, `Timing`, `Script`, `Review`. Creating a campaign adds it to local state with status `Draft` and shows the demo notice.

- [ ] **Step 4: Implement Live calls**

Use an active-call master/detail layout. Show elapsed duration, language, detected intent, transcript rows, connection quality, and transfer status. Calls use deterministic mock data; no timer writes back outside component state.

- [ ] **Step 5: Implement Reschedule queue**

Group transfers into `Waiting`, `Assigned`, and `Resolved`. Accepting a transfer moves it atomically to assigned state, stores the receptionist name, and keeps tenant scope. Resolution requires selecting `Rescheduled`, `Kept original`, or `Follow-up required`.

- [ ] **Step 6: Verify the workflows**

Run: `npm run test:run -- src/features/campaigns src/features/calls src/features/reschedule`

Expected: all workflow tests pass.

Run: `git add src/features/campaigns src/features/calls src/features/reschedule src/app/routes.tsx && git commit -m "feat: add outreach and handoff workflows"`

---

### Task 6: Patients and AI assistant configuration

**Files:**
- Create: `src/features/patients/PatientsPage.tsx`
- Create: `src/features/patients/PatientsPage.test.tsx`
- Create: `src/features/assistant/AssistantPage.tsx`
- Create: `src/features/assistant/AssistantPage.test.tsx`
- Create: `src/features/assistant/scriptPreview.ts`
- Create: `src/features/assistant/scriptPreview.test.ts`
- Modify: `src/app/routes.tsx`

**Interfaces:**
- Consumes: tenant-scoped patients, appointment history, shared form controls, and toast notifications.
- Produces: `/patients`, `/assistant`, patient search and detail views, plus `renderScriptPreview(template, patient, appointment)`.

- [ ] **Step 1: Write failing patient and script tests**

```ts
expect(renderScriptPreview(
  'Hello {{firstName}}, your appointment is {{date}} at {{time}}.',
  { firstName: 'Maya' },
  { date: 'September 24', time: '10:30 AM' },
)).toBe('Hello Maya, your appointment is September 24 at 10:30 AM.')
```

Add a patient page test verifying that selecting `Spanish` filters the directory and that contact consent is shown as text.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm run test:run -- src/features/patients src/features/assistant`

Expected: FAIL because the pages and script renderer are missing.

- [ ] **Step 3: Implement Patients**

Build a searchable directory with language and consent filters. The selected patient panel contains contact preferences and communication history but excludes diagnosis, medication, and other clinical detail.

- [ ] **Step 4: Implement AI assistant**

Build sections for voice, languages, script template, live preview, calling window, retry policy, mandatory AI disclosure, and escalation destination. Saving only updates local state and displays the demo notice.

- [ ] **Step 5: Verify both screens**

Run: `npm run test:run -- src/features/patients src/features/assistant`

Expected: all patient and assistant tests pass.

Run: `git add src/features/patients src/features/assistant src/app/routes.tsx && git commit -m "feat: add patient and assistant experiences"`

---

### Task 7: Administration, integrations, and auditability

**Files:**
- Create: `src/features/integrations/IntegrationsPage.tsx`
- Create: `src/features/integrations/IntegrationsPage.test.tsx`
- Create: `src/features/team/TeamPage.tsx`
- Create: `src/features/team/TeamPage.test.tsx`
- Create: `src/features/audit/AuditPage.tsx`
- Create: `src/features/audit/AuditPage.test.tsx`
- Create: `src/features/settings/SettingsPage.tsx`
- Create: `src/features/settings/SettingsPage.test.tsx`
- Modify: `src/app/routes.tsx`

**Interfaces:**
- Consumes: integrations, team members, audit events, tenant profile, `Dialog`, `Badge`, and form primitives.
- Produces: `/integrations`, `/team`, `/audit`, `/settings`, connection capability summaries, team filters, audit filters, and local organization settings.

- [ ] **Step 1: Write failing integration-capability tests**

```tsx
expect(screen.getByText('Credible FHIR')).toBeVisible()
expect(screen.getByText('Limited')).toBeVisible()
expect(screen.getByRole('button', { name: 'Enable scheduling write-back' })).toBeDisabled()
expect(screen.getByText('Appointment write access has not been validated by Qualifacts.')).toBeVisible()
```

Add route smoke tests for Team, Audit, and Organization settings, plus a masked secret-field test that verifies submitted values are cleared when the dialog closes.

- [ ] **Step 2: Run administration tests and verify RED**

Run: `npm run test:run -- src/features/integrations src/features/team src/features/audit src/features/settings`

Expected: FAIL because the administration screens are missing.

- [ ] **Step 3: Implement Integrations**

Render Credible FHIR, Credible Scheduling, Telephony, and AI provider cards. Show environment, status, supported capabilities, last checked time, and configuration dialogs with fictional values. Disable unsupported write actions with the approved explanation.

- [ ] **Step 4: Implement Team, Audit, and Settings**

Team includes role and location filters plus a simulated invite dialog. Audit includes actor, category, outcome, and date filters with correlation details. Settings includes identity, locations, time zone, calling defaults, escalation routing, and retention controls.

- [ ] **Step 5: Verify administration screens**

Run: `npm run test:run -- src/features/integrations src/features/team src/features/audit src/features/settings`

Expected: all administration tests pass.

Run: `git add src/features/integrations src/features/team src/features/audit src/features/settings src/app/routes.tsx && git commit -m "feat: add administration and integration screens"`

---

### Task 8: Accessibility, responsive behavior, and end-to-end journeys

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/navigation.spec.ts`
- Create: `e2e/demo-journey.spec.ts`
- Create: `e2e/responsive.spec.ts`
- Create: `src/test/accessibility.test.tsx`
- Modify: `src/components/layout/AppShell.tsx`
- Modify: `src/styles/base.css`

**Interfaces:**
- Consumes: all completed routes and primary interactive controls.
- Produces: verified navigation, core client-demonstration journey, mobile menu focus behavior, reduced-motion styles, and automated accessibility coverage.

- [ ] **Step 1: Write failing end-to-end tests**

The core journey must:

```ts
test('demonstrates appointment outreach through reception handoff', async ({ page }) => {
  await page.goto('/overview')
  await page.getByRole('link', { name: 'Appointments' }).click()
  await page.getByRole('button', { name: /Open Maya Thompson/ }).click()
  await page.getByRole('link', { name: 'Live calls' }).click()
  await page.getByRole('link', { name: 'Reschedule queue' }).click()
  await page.getByRole('button', { name: 'Accept Maya Thompson' }).click()
  await expect(page.getByText('Assigned to Olivia Carter')).toBeVisible()
})
```

The mobile test uses a 390 x 844 viewport and asserts menu focus, route selection, menu closure, and focus restoration.

- [ ] **Step 2: Run end-to-end tests and verify RED**

Run: `npx playwright install chromium`

Run: `npm run build && npx playwright test`

Expected: tests fail on incomplete focus behavior or missing selectors before the accessibility pass.

- [ ] **Step 3: Implement responsive and focus corrections**

Add the 1200 px and 768 px layout breakpoints from the design system, eliminate horizontal page overflow, add focus trapping and restoration, add reduced-motion overrides, and expose stable accessible names for journey controls.

- [ ] **Step 4: Add automated accessibility checks**

Render each route under `TenantProvider`, run `axe.run(container)`, and assert zero serious or critical violations. Add explicit checks for page headings, form labels, live-region toasts, and status text.

- [ ] **Step 5: Verify quality gates**

Run: `npm run test:run`

Expected: all Vitest tests pass.

Run: `npm run lint`

Expected: zero ESLint errors.

Run: `npm run build`

Expected: TypeScript and Vite build exit successfully.

Run: `npx playwright test`

Expected: all Chromium journeys pass at desktop and mobile viewports.

Run: `git add playwright.config.ts e2e src/test src/components/layout/AppShell.tsx src/styles/base.css && git commit -m "test: verify responsive accessible journeys"`

---

### Task 9: Docker delivery and visual QA

**Files:**
- Create: `Dockerfile`
- Create: `nginx.conf`
- Create: `.dockerignore`
- Create: `docker-compose.yml`
- Create: `README.md`
- Create: `design-qa.md`

**Interfaces:**
- Consumes: the verified Vite application in `dist/`.
- Produces: `y32-careops-web` Docker service on port 8080, SPA route fallback, operator documentation, and visual QA evidence.

- [ ] **Step 1: Write the Docker health expectation**

Use this Compose contract:

```yaml
services:
  web:
    build: .
    container_name: y32-careops-web
    ports:
      - "8080:80"
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://127.0.0.1/"]
      interval: 10s
      timeout: 3s
      retries: 3
```

- [ ] **Step 2: Build the production container**

Use a multi-stage Dockerfile with `node:24-alpine` for `npm ci && npm run build` and `nginx:1.29-alpine` for delivery. Configure `try_files $uri $uri/ /index.html;` in `nginx.conf`.

Run: `docker compose build`

Expected: image builds successfully.

- [ ] **Step 3: Run and inspect the container**

Run: `docker compose up -d`

Run: `docker compose ps`

Expected: `y32-careops-web` reports healthy on `0.0.0.0:8080->80/tcp`.

- [ ] **Step 4: Perform visual QA in the browser**

Capture the prototype at 1440 x 1024, 834 x 1194, and 390 x 844. Inspect every route for clipping, missing assets, weak contrast, inconsistent spacing, unreadable text, and broken navigation. Record findings in `design-qa.md`, fix all P0/P1/P2 items, and repeat until the file contains `final result: passed`.

- [ ] **Step 5: Document local and future deployment**

`README.md` must include:

```md
## Local development
npm install
npm run dev

## Local Docker preview
docker compose up --build
Open http://localhost:8080

## Verification
npm run test:run
npm run lint
npm run build
npx playwright test
```

Document that Vercel can import the future Git repository using framework preset `Vite`, build command `npm run build`, and output directory `dist`. Do not deploy during this task.

- [ ] **Step 6: Run the complete delivery gate**

Run: `npm run test:run && npm run lint && npm run build && npx playwright test && docker compose ps`

Expected: all tests pass, lint reports zero errors, build succeeds, Playwright passes, and the container is healthy.

Run: `git add Dockerfile nginx.conf .dockerignore docker-compose.yml README.md design-qa.md && git commit -m "chore: package careops prototype for delivery"`

---

## Final Acceptance Checklist

- [ ] All eleven application navigation destinations render complete screens.
- [ ] Sign-in/demo entry route presents the Y32 brand.
- [ ] The supplied Y32 logo appears correctly without distortion.
- [ ] Tenant switching isolates every displayed operational record.
- [ ] Appointment, campaign, live-call, and reception-handoff journeys are interactive.
- [ ] Every simulated external action is labeled as a demo.
- [ ] Credible FHIR and scheduling limitations match `docs/API_FEASIBILITY.md`.
- [ ] Desktop, tablet, and mobile QA captures have no P0/P1/P2 findings.
- [ ] Unit, accessibility, end-to-end, lint, and production build checks pass.
- [ ] Docker serves the app with healthy status and SPA fallback.
- [ ] No real credential, patient data, or external API call exists in the codebase.

