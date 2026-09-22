import { expect, test, type Page } from '@playwright/test'

async function signIn(page: Page) {
  await page.goto('/')
  await page.getByRole('button', { name: 'Sign in to demo' }).click()
  await expect(page).toHaveURL(/\/overview$/)
}

test('mobile navigation manages focus and closes after route selection', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await signIn(page)

  const menuButton = page.getByRole('button', { name: 'Open navigation' })
  await menuButton.click()
  await expect(page.getByRole('link', { name: 'Overview' })).toBeFocused()

  await page.getByRole('link', { name: 'Appointments', exact: true }).click()
  await expect(page).toHaveURL(/\/appointments$/)
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused()
  await expect(page.locator('#primary-sidebar')).not.toHaveClass(/open/)
})

const routes = [
  '/overview',
  '/appointments',
  '/campaigns',
  '/live-calls',
  '/reschedule',
  '/patients',
  '/assistant',
  '/integrations',
  '/team',
  '/audit',
  '/settings',
]

for (const viewport of [{ width: 390, height: 844 }, { width: 834, height: 1194 }]) {
  test(`avoids page overflow at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await signIn(page)
    for (const route of routes) {
      await page.goto(route)
      const dimensions = await page.evaluate(() => {
        window.scrollTo({ left: document.documentElement.scrollWidth, top: 0 })
        return { viewport: window.innerWidth, document: document.documentElement.scrollWidth, scrollX: window.scrollX }
      })
      expect(dimensions.scrollX, `${route} should not allow page-level horizontal scrolling at ${viewport.width}px (${dimensions.document}px document)`).toBe(0)
    }
  })
}

test('keeps the demo login within the tablet viewport', async ({ page }) => {
  await page.setViewportSize({ width: 834, height: 1194 })
  await page.goto('/')

  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }))

  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport)
})

test('keeps the collapsed tablet sidebar concise without losing the sign-out name', async ({ page }) => {
  await page.setViewportSize({ width: 834, height: 1194 })
  await signIn(page)

  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
  await expect(page.locator('.sign-out-button span')).toBeHidden()
  await expect(page.getByRole('link', { name: 'Appointments', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Organization settings', exact: true })).toBeVisible()
})

test('keeps live call identity and metadata on separate lines', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await signIn(page)
  await page.goto('/live-calls')

  const row = page.locator('.call-row').first()
  const titleBox = await row.locator('.row-title').boundingBox()
  const metaBox = await row.locator('.row-meta').boundingBox()

  expect(titleBox).not.toBeNull()
  expect(metaBox).not.toBeNull()
  expect(metaBox!.y).toBeGreaterThanOrEqual(titleBox!.y + titleBox!.height)
})
