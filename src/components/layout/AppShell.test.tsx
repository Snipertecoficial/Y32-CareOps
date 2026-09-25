import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { AppRoutes } from '../../app/routes'
import { ToastProvider } from '../ui/ToastProvider'
import { AppShell, routeItems } from './AppShell'

describe('AppShell', () => {
  beforeEach(() => window.sessionStorage.clear())

  it('renders the complete navigation and active organization context', () => {
    render(
      <MemoryRouter initialEntries={['/overview']}>
        <TenantProvider>
          <ToastProvider><AppShell /></ToastProvider>
        </TenantProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute('href', '/overview')
    expect(screen.getByRole('combobox', { name: 'Organization' })).toHaveValue('harbor')
    expect(screen.getByText('Demo environment')).toBeVisible()
    expect(screen.getByRole('navigation', { name: 'Operations' })).toBeVisible()
    expect(screen.getByRole('navigation', { name: 'Administration' })).toBeVisible()
    expect(routeItems).toHaveLength(11)
    for (const [, label] of routeItems) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })

  it('opens the project documents from the sidebar without leaving the demo', () => {
    render(<MemoryRouter initialEntries={['/overview']}><TenantProvider><ToastProvider><AppShell /></ToastProvider></TenantProvider></MemoryRouter>)

    const documents = screen.getByRole('navigation', { name: 'Project documents' })
    const expectedLinks = [
      ['PRD', 'PRD.md'],
      ['Roadmap', 'ROADMAP.md'],
      ['API feasibility', 'API_FEASIBILITY.md'],
      ['Design system', 'DESIGN_SYSTEM.md'],
    ] as const

    for (const [label, filename] of expectedLinks) {
      const link = within(documents).getByRole('link', { name: label })
      expect(link).toHaveAttribute('href', `https://github.com/Snipertecoficial/Y32-CareOps/blob/main/docs/${filename}`)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('explains the prototype notification state', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/overview']}><TenantProvider><ToastProvider><AppShell /></ToastProvider></TenantProvider></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: 'Notifications' }))

    expect(screen.getByRole('status')).toHaveTextContent('No new demo notifications.')
  })

  it('updates the operator identity with the selected organization', async () => {
    const user = userEvent.setup()
    window.sessionStorage.setItem('y32-careops-demo-session', 'active')
    render(<MemoryRouter initialEntries={['/overview']}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)
    await user.selectOptions(screen.getByRole('combobox', { name: 'Organization' }), 'northstar')
    expect(screen.getByRole('heading', { name: 'Today’s patient outreach' })).toBeVisible()
    expect(screen.getByText('Grace Turner')).toBeVisible()
  })

  it('signs out, clears the demo session, and returns to the login screen', async () => {
    const user = userEvent.setup()
    window.sessionStorage.setItem('y32-careops-demo-session', 'active')
    render(<MemoryRouter initialEntries={['/overview']}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: 'Sign out' }))

    expect(window.sessionStorage.getItem('y32-careops-demo-session')).toBeNull()
    expect(screen.getByRole('heading', { name: 'Welcome back to coordinated care.' })).toBeVisible()
  })

  it('exposes a recoverable demo error state for every routed data view', async () => {
    const user = userEvent.setup()
    window.sessionStorage.setItem('y32-careops-demo-session', 'active')
    render(<MemoryRouter initialEntries={['/appointments?demoState=error']}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)

    expect(screen.getByRole('alert')).toHaveTextContent('Appointments data is temporarily unavailable')
    await user.click(screen.getByRole('button', { name: 'Retry loading Appointments' }))
    expect(screen.getByRole('heading', { name: 'Appointments' })).toBeVisible()
  })

  it('exposes a labeled loading state for routed data views', () => {
    window.sessionStorage.setItem('y32-careops-demo-session', 'active')
    render(<MemoryRouter initialEntries={['/appointments?demoState=loading']}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)

    expect(screen.getByRole('status', { name: 'Appointments loading state' })).toHaveTextContent('Loading Appointments data')
  })
})
