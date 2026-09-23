# Y32 CareOps Design QA

## Comparison target

- Source visual truth: `docs/design-qa/calm-source-login-1440.png` and `docs/design-qa/calm-source-overview-1440.png`, generated from the two Calm Care directions approved by the stakeholder, plus the supplied `Y32 Solutions logo.jpeg`.
- Rendered implementation: the production Docker image at `http://localhost:8081`, captured by Chromium after the final rebuild.
- State: Harbor Behavioral Health, English interface, light theme, synthetic demo data. The overview comparison uses the default untouched dashboard state.
- Browser and density: Chromium at device scale factor 1. Source and implementation desktop captures are both 1440 × 1024, so no density normalization was required.
- Intentional normalization: the approved overview source is presented inside a dark concept-gallery frame; the implementation removes that surrounding gallery and lets the application fill the browser viewport.

## Browser-rendered evidence

| Evidence | CSS viewport | PNG dimensions | Purpose |
|---|---:|---:|---|
| `docs/design-qa/calm-source-login-1440.png` | 1440 × 1024 | 1440 × 1024 | Approved login source |
| `docs/design-qa/entry-desktop-pass5.png` | 1440 × 1024 | 1440 × 1024 | Final implemented login |
| `docs/design-qa/comparison-login-desktop-pass5.png` | normalized composite | 1440 × 512 | Final source and implementation in one visual comparison |
| `docs/design-qa/calm-source-overview-1440.png` | 1440 × 1024 | 1440 × 1024 | Approved sidebar/dashboard source |
| `docs/design-qa/overview-desktop-pass5.png` | 1440 × 1024 | 1440 × 1024 | Final implemented dashboard |
| `docs/design-qa/comparison-overview-desktop-pass5.png` | normalized composite | 1440 × 512 | Final source and implementation in one visual comparison |
| `docs/design-qa/entry-tablet.png` | 834 × 1194 | 834 × 1262 | Stacked tablet sign-in |
| `docs/design-qa/entry-mobile.png` | 390 × 844 | 390 × 1364 | Stacked mobile sign-in |
| `docs/design-qa/overview-tablet-pass5.png` | 834 × 1194 | 834 × 1194 | Collapsed tablet sidebar with compact tenant selector |
| `docs/design-qa/overview-mobile.png` | 390 × 844 | 390 × 1411 | Mobile application shell |
| `docs/design-qa/reschedule-details-desktop.png` | 1440 × 1024 | 1440 × 1024 | Working transfer-context drawer |
| `docs/design-qa/campaign-review-desktop-pass5.png` | 1440 × 1024 | 1440 × 1024 | Campaign choices preserved through Review |
| `docs/design-qa/assistant-northstar-desktop-pass5.png` | 1440 × 1024 | 1440 × 1024 | Northstar-specific AI script preview |
| `docs/design-qa/loading-state-desktop-pass5.png` | 1440 × 1024 | 1440 × 1024 | Labeled route loading state |
| `docs/design-qa/error-state-desktop-pass5.png` | 1440 × 1024 | 1440 × 1024 | Recoverable route error with Retry |
| `docs/design-qa/routes/*.png` | 1440 × 1024 | 11 full-page captures | Every internal destination |

The two composite images are the required same-input comparisons. Separate focused crops were not needed: both source and implementation were captured at the same desktop pixel dimensions, and the full-size originals keep typography, controls, icons, logo treatment, spacing, and borders readable. The drawer evidence is reviewed separately because it is a product interaction beyond the two static source states.

## Required fidelity surfaces

- Fonts and typography: DM Sans is used for interface copy and Manrope for headings. Weight, hierarchy, line height, wrapping, and compact labels track the source; no clipping or truncated primary label appears in the target viewports.
- Spacing and layout rhythm: the login preserves the split composition on desktop and stacks before the columns can overflow on tablet. The logged-in desktop uses the fixed 250 px sidebar; tablet uses a 76 px rail; mobile uses a focus-managed sheet and single-column content.
- Colors and visual tokens: deep teal navigation, cyan accents, pale aqua canvas, white operational surfaces, and semantic status colors match the selected Calm Care direction and the Y32 brand.
- Image quality and asset fidelity: the supplied Y32 JPEG logo is imported directly with its aspect ratio preserved. No CSS drawing, emoji, handcrafted SVG, or placeholder replaces a source visual asset.
- Copy and content: the interface is natively English and consistently labels synthetic data, demo-only actions, and the unvalidated Credible scheduling boundary.
- Icons and controls: Phosphor icons share one visual family. Primary controls meet the 40 px target, keep visible focus, and retain accessible names when the tablet sidebar hides captions.
- States and interactions: login, protected routes, all eleven destinations, desktop and tablet tenant switching, notifications, appointment detail, campaign creation with complete review, live-call transfer preparation, reschedule details/accept/resolve/return, integration configuration, route loading/error recovery, secret clearing, logout, and browser-back protection were exercised.
- Accessibility: all pages have named headings and Operations/Administration landmarks; loading and error states are announced; status does not rely on color alone; overlay focus is contained/restored; reduced motion is supported; automated axe coverage reports no serious or critical violations.

## Findings and comparison history

### Pass 1 — blocked

- [P2] Wide appointment and team tables could escape into page-level horizontal scrolling at 390 px.
  - Fix: constrained overflow to the table wrapper while keeping the page itself fixed to the viewport.
- [P2] Live-call identity and metadata shared one narrow baseline on mobile.
  - Fix: separated the identity copy into a compact responsive grid.

### Pass 2 — blocked

- [P2] The desktop login grid retained a combined minimum width of 940 px, causing horizontal overflow on the 834 px tablet viewport.
  - Fix: introduced a 940 px breakpoint that stacks the login and patient-journey regions.
- [P2] The tablet sidebar hid navigation captions but left the sign-out caption visible, breaking the compact rail rhythm.
  - Fix: collapsed the sign-out caption with the other labels while preserving `aria-label="Sign out"`.

### Pass 3 — blocked

- [P2] Collapsed sidebar links lost programmatic names when their visible text was hidden.
  - Fix: added explicit accessible labels to every route link; the tablet browser test checks `Appointments` and `Organization settings` by accessible name.
- [P2] `Details` buttons in the reschedule queue had no action.
  - Fix: connected every Details action to a drawer showing priority, state, original appointment, requested window, location, language, assignee, and outcome when available.

### Pass 4 — passed at the earlier checkpoint

- Post-fix evidence: `comparison-login-desktop.png`, `comparison-overview-desktop.png`, `entry-tablet.png`, `overview-tablet.png`, and `reschedule-details-desktop.png`.
- Desktop fidelity: the application preserves the approved hierarchy, calm clinical palette, sidebar grouping, metric strip, attention queue, whitespace, and restrained elevation. The dark concept-gallery frame is intentionally excluded from the shipped app.
- Responsive evidence: automated checks found no page-level horizontal overflow on all eleven routes at 390 px and 834 px.
- Interaction evidence: the final Docker build completed the campaign wizard, notification feedback, both tenant contexts, live-call transfer preparation, reschedule detail/accept/resolve/return, masked integration secret clearing, logout, and protected back navigation.
- Console review: the 17 final browser-rendered captures completed with zero console warnings, console errors, or page errors.

### Pass 5 — passed after independent review

- [P2] The Northstar AI preview still used Maya and a fixed Harbor appointment. Fixed by deriving the preview patient, date, time, and tenant name from the active tenant repository.
- [P2] The collapsed 834 px sidebar removed the only visible tenant selector. Fixed with a compact top-bar organization selector shown from 768–1050 px.
- [P2] Overview used `Accept` for an action that only opened the queue. Fixed to `Open request` with a patient-specific accessible name.
- [P2] Campaign Review discarded the selected audience, date, time, and script. Fixed with a controlled draft model carried into the created campaign.
- [P2] Loading and recoverable-error behavior was specified but not demonstrable. Fixed with labeled route states and a Retry path that restores the requested screen.
- [P2] Several tenant collections were too sparse for the stated demo contract. Fixed to exactly 8 Harbor and 3 Northstar records per operational list, with 4 integrations per tenant.
- [P2] Operations and Administration navigation landmarks lacked distinct accessible names. Fixed with explicit labels.
- Post-fix visual evidence: `comparison-login-desktop-pass5.png`, `comparison-overview-desktop-pass5.png`, `overview-tablet-pass5.png`, `campaign-review-desktop-pass5.png`, `assistant-northstar-desktop-pass5.png`, `loading-state-desktop-pass5.png`, and `error-state-desktop-pass5.png`.
- Final automated evidence: 53/53 Vitest checks, 9/9 Chromium journeys, clean ESLint, successful production build, healthy Docker service, and HTTP 200 for all 12 routes.
- The seven Pass 5 browser captures completed with zero console warnings, console errors, or page errors.
- No actionable P0, P1, or P2 finding remains.

### Pass 6 — evidence integrity check

- The first Pass 5 composite export placed both screenshots in the left pane, leaving the right pane blank. This affected only the QA artifact, not the prototype.
- Both comparison files were regenerated with the approved source on the left and the final implementation on the right at 720 × 512 per pane.
- The corrected composites were reopened and visually inspected; the source and implementation are now simultaneously visible at the documented 1440 × 512 output size.
- No new actionable P0, P1, or P2 finding was introduced.

## Open questions

- None for the prototype. Production identity, real PHI, telephony, AI providers, and Credible appointment write-back remain intentionally gated by the roadmap and API feasibility assessment.

## Follow-up polish

- [P3] Replace the supplied JPEG logo with an official transparent SVG if Y32 provides one for sharper rendering on very high-density displays.

## Final result

final result: passed
