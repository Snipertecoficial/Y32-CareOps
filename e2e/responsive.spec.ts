import { expect, test } from '@playwright/test'

test('mobile navigation manages focus and closes after route selection', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/overview')

  const menuButton = page.getByRole('button', { name: 'Open navigation' })
  await menuButton.click()
  await expect(page.getByRole('link', { name: 'Overview' })).toBeFocused()

  await page.getByRole('link', { name: 'Appointments' }).click()
  await expect(page).toHaveURL(/\/appointments$/)
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused()
  await expect(page.locator('#primary-sidebar')).not.toHaveClass(/open/)
})

for (const viewport of [{ width: 390, height: 844 }, { width: 834, height: 1194 }]) {
  test(`avoids page overflow at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/integrations')
    const dimensions = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }))
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport)
  })
}
