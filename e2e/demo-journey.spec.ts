import { expect, test } from '@playwright/test'

test('demonstrates appointment outreach through reception handoff', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Sign in to demo' }).click()
  await page.getByRole('link', { name: 'Appointments', exact: true }).click()
  await page.getByRole('button', { name: /Open Maya Thompson/ }).click()
  await page.getByRole('link', { name: 'Live calls', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Maya Thompson' })).toBeVisible()
  await page.getByRole('link', { name: 'Reschedule queue', exact: true }).click()
  await page.getByRole('button', { name: 'Accept Maya Thompson' }).click()
  await expect(page.getByText('Assigned to Olivia Carter')).toBeVisible()
})
