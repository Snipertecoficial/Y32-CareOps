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
