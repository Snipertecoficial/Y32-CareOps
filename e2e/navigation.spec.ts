import { expect, test } from '@playwright/test'

const routes = [
  ['/overview', 'Today’s patient outreach'],
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

test('opens the branded demo entry and accepts the default credentials', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Welcome back to coordinated care.' })).toBeVisible()
  await page.getByRole('button', { name: 'Sign in to demo' }).click()
  await expect(page).toHaveURL(/\/overview$/)
})

test('renders every product destination from the primary navigation', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Sign in to demo' }).click()
  await expect(page.getByRole('link', { name: 'Y32 CareOps home' })).toBeVisible()
  for (const [path, heading] of routes) {
    await page.getByRole('link', { name: heading === 'Today’s patient outreach' ? 'Overview' : heading, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${path}$`))
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
  }
})

test('reads every project document in the app and follows the visual roadmap', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Sign in to demo' }).click()

  const documents = [
    ['PRD', '/documents/prd', 'Product Requirements Document'],
    ['Roadmap', '/documents/roadmap', 'Delivery Roadmap'],
    ['API feasibility', '/documents/api-feasibility', 'API Feasibility Assessment'],
    ['Design system', '/documents/design-system', 'Design System'],
  ] as const

  for (const [label, path, heading] of documents) {
    await page.getByRole('navigation', { name: 'Project documents' }).getByRole('link', { name: label }).click()
    await expect(page).toHaveURL(new RegExp(`${path}$`))
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
  }

  await page.getByRole('navigation', { name: 'Project documents' }).getByRole('link', { name: 'Roadmap' }).click()
  const map = page.getByRole('region', { name: 'Roadmap map' })
  await expect(map.getByRole('link')).toHaveCount(7)
  await map.getByRole('link', { name: /06 Planned Production scale/ }).click()
  await expect(page).toHaveURL(/#phase-6-production-scale$/)
  await expect(page.getByRole('heading', { name: 'Phase 6 — Production scale' })).toBeInViewport()

  await page.getByRole('navigation', { name: 'Project documents' }).getByRole('link', { name: 'PRD' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Product Requirements Document' })).toBeInViewport()
})
