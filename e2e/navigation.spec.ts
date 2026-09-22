import { expect, test } from '@playwright/test'

const routes = [
  ['/overview', 'Good afternoon, Olivia'],
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

test('renders every product destination from the primary navigation', async ({ page }) => {
  await page.goto('/overview')
  await expect(page.getByRole('link', { name: 'Y32 CareOps home' })).toBeVisible()
  for (const [path, heading] of routes) {
    await page.getByRole('link', { name: heading === 'Good afternoon, Olivia' ? 'Overview' : heading }).click()
    await expect(page).toHaveURL(new RegExp(`${path}$`))
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
  }
})
