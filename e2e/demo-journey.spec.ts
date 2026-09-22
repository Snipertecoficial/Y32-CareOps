import { expect, test } from '@playwright/test'

test('demonstrates appointment outreach through reception handoff', async ({ page }) => {
  await page.goto('/overview')
  await page.getByRole('link', { name: 'Appointments' }).click()
  await page.getByRole('button', { name: /Open Maya Thompson/ }).click()
  await page.getByRole('link', { name: 'Live calls' }).click()
  await expect(page.getByRole('heading', { name: 'Maya Thompson' })).toBeVisible()
  await page.getByRole('link', { name: 'Reschedule queue' }).click()
  await page.getByRole('button', { name: 'Accept Maya Thompson' }).click()
  await expect(page.getByText('Assigned to Olivia Carter')).toBeVisible()
})
