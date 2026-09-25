# Y32 CareOps

Interactive, English-language prototype for presenting Y32 Solutions' AI-assisted appointment outreach workflow. It demonstrates reminder campaigns, live call monitoring, patient confirmation, reception handoff for rescheduling, and integration administration across two synthetic tenant organizations.

This repository is a frontend-only demonstration. It does not place calls, connect to an EHR, persist credentials, contain real patient data, or claim HIPAA compliance.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

Demo access:

- Username: `Admin`
- Password: `Admin`

## Local Docker preview

```bash
docker compose up --build
```

Open `http://localhost:8080`.

If port 8080 is already in use, choose another local port before starting Compose. In PowerShell:

```powershell
$env:Y32_WEB_PORT=8081
docker compose up --build
```

## Verification

```bash
npm run test:run
npm run lint
npm run build
npx playwright test
```

## Deploy to Vercel

After pushing this project to GitHub, import the repository into Vercel with:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The included `vercel.json` sends client-side routes back to `index.html`, so direct links such as `/appointments` and `/integrations` work after deployment.

## Product documentation

The Project documents menu opens the four primary documents inside the app. Each page includes a table of contents and the complete source text. The Roadmap also includes a drawn, seven-phase map with links to the full phase details. The Markdown files below remain the source of truth for the in-app reader.

- [`docs/PRD.md`](docs/PRD.md) — product requirements and release boundary
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — visual tokens and interface standards
- [`docs/API_FEASIBILITY.md`](docs/API_FEASIBILITY.md) — current Credible and FHIR feasibility findings
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — phased path from prototype to controlled production rollout
- [`docs/superpowers/specs/2026-09-22-y32-careops-design.md`](docs/superpowers/specs/2026-09-22-y32-careops-design.md) — approved prototype design
- [`docs/superpowers/plans/2026-09-22-y32-careops-prototype.md`](docs/superpowers/plans/2026-09-22-y32-careops-prototype.md) — implementation plan
- [`docs/superpowers/plans/2026-09-25-in-app-project-documents.md`](docs/superpowers/plans/2026-09-25-in-app-project-documents.md) — in-app document reader implementation plan
- [`design-qa.md`](design-qa.md) — visual quality review

## Demo safety

- Every person, organization detail, appointment, and phone number is fictional.
- Tenant switching demonstrates presentation-level separation only; it is not production authorization.
- Integration credentials entered in dialogs remain in memory and are cleared when the dialog closes.
- Credible scheduling write-back remains visibly limited until Qualifacts validates supported scheduling APIs and authorization.
