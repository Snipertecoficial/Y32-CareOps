# In-App Project Documents Implementation Plan

**Goal:** Present the four documents in the Project documents menu inside Y32 CareOps, with a readable, drawn roadmap above the complete roadmap text.

**Architecture:** Keep the Markdown files in `docs/` as the single content source and import them into the Vite app as raw text. Render them through one document reader route with a table of contents, responsive tables, and safe external links. Add a dedicated roadmap map component that lays out seven phases along a visible connected path and links each phase to its detailed section in the Markdown reader.

**Tech Stack:** React 19, TypeScript, React Router 7, Vite raw imports, react-markdown, remark-gfm, CSS, Vitest, Testing Library.

**Spec:** User request of September 25, 2026; `docs/PRD.md`, `docs/ROADMAP.md`, `docs/API_FEASIBILITY.md`, and `docs/DESIGN_SYSTEM.md` remain the authoritative source text.

## Constraints

- Keep all four documents fully legible without navigating to GitHub.
- Preserve the current demo authentication and mobile navigation behavior.
- Show Phase 0 as the current prototype; Phases 1–6 are planned work.
- The drawn map and full roadmap text must agree on phase names and order.
- Keep Markdown HTML untrusted; do not enable raw HTML rendering.

## Work

### 1. Internal document routes and navigation

- [x] Change the four sidebar links to `/documents/prd`, `/documents/roadmap`, `/documents/api-feasibility`, and `/documents/design-system`.
- [x] Register protected document routes in `src/app/routes.tsx` and show the active document in the breadcrumb.
- [x] Test that the menu keeps navigation inside the app and supports all four documents.

### 2. Readable document renderer

- [x] Import the four Markdown files as raw text and define their titles and descriptions in a small catalog.
- [x] Render complete Markdown, including GFM tables, lists, links, and code blocks, in `DocumentPage`.
- [x] Add a table of contents, heading anchors, safe external links, responsive table scrolling, and clear typography.
- [x] Test PRD content, the final section, a Markdown table, and the PRD's relative Roadmap link.

### 3. Drawn roadmap

- [x] Add a seven-phase visual map with a visible SVG route, readable phase cards, status labels, and links to the detailed phase sections.
- [x] Lay the phases out as a winding desktop route and a vertical connected route on small screens.
- [x] Keep every phase's complete narrative and dependency gates underneath the map.
- [x] Test the seven phase links and current/planned distinction; inspect desktop and mobile rendering.

### 4. Verify and publish

- [x] Run the focused tests, full test suite, lint, build, and browser navigation checks.
- [x] Update README to describe the in-app document reader.
- [x] Commit and push to `main`, then confirm the remote commit and clean local tree.
