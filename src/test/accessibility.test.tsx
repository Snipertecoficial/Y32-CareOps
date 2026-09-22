import { render, screen } from '@testing-library/react'
import axe from 'axe-core'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TenantProvider } from '../app/TenantProvider'
import { AppRoutes } from '../app/routes'
import { ToastProvider } from '../components/ui/ToastProvider'

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

describe.each(routes)('%s accessibility', (path, heading) => {
  it('has a named page heading and no serious axe violations', async () => {
    const { container } = render(<MemoryRouter initialEntries={[path]}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeVisible()
    const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })
    expect(results.violations.filter((item) => item.impact === 'serious' || item.impact === 'critical')).toEqual([])
  })
})

it('exposes labels, a live toast region, and integration status text', () => {
  render(<MemoryRouter initialEntries={['/integrations']}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)
  expect(screen.getByRole('combobox', { name: 'Organization' })).toBeVisible()
  expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
  expect(screen.getByText('Limited')).toBeVisible()
})
