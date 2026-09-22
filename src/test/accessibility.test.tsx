import { render, screen } from '@testing-library/react'
import axe from 'axe-core'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { TenantProvider } from '../app/TenantProvider'
import { AppRoutes } from '../app/routes'
import { ToastProvider } from '../components/ui/ToastProvider'
import '../styles/base.css'

const relativeLuminance = (hex: string) => {
  const channels = hex.match(/[\da-f]{2}/gi)?.map((channel) => Number.parseInt(channel, 16) / 255) ?? []
  const [red, green, blue] = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue)
}

const contrastRatio = (foreground: string, background: string) => {
  const values = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

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

beforeEach(() => window.sessionStorage.setItem('y32-careops-demo-session', 'active'))

describe.each(routes)('%s accessibility', (path, heading) => {
  it('has a named page heading and no serious axe violations', async () => {
    const { container } = render(<MemoryRouter initialEntries={[path]}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeVisible()
    const results = await axe.run(container)
    expect(results.violations.filter((item) => item.impact === 'serious' || item.impact === 'critical')).toEqual([])
  })
})

it('keeps secondary text at AA contrast on surface and canvas backgrounds', () => {
  const styles = getComputedStyle(document.documentElement)
  const secondary = styles.getPropertyValue('--slate-500').trim()
  const surface = styles.getPropertyValue('--surface').trim()
  const canvas = styles.getPropertyValue('--canvas').trim()
  expect(contrastRatio(secondary, surface)).toBeGreaterThanOrEqual(4.5)
  expect(contrastRatio(secondary, canvas)).toBeGreaterThanOrEqual(4.5)
})

it('exposes labels, a live toast region, and integration status text', () => {
  render(<MemoryRouter initialEntries={['/integrations']}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)
  expect(screen.getByRole('combobox', { name: 'Organization' })).toBeVisible()
  expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
  expect(screen.getByText('Limited')).toBeVisible()
})
