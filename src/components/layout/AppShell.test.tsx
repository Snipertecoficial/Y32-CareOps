import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { AppRoutes } from '../../app/routes'
import { ToastProvider } from '../ui/ToastProvider'
import { AppShell, routeItems } from './AppShell'

describe('AppShell', () => {
  it('renders the complete navigation and active organization context', () => {
    render(
      <MemoryRouter initialEntries={['/overview']}>
        <TenantProvider>
          <AppShell />
        </TenantProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute('href', '/overview')
    expect(screen.getByRole('combobox', { name: 'Organization' })).toHaveValue('harbor')
    expect(screen.getByText('Demo environment')).toBeVisible()
    expect(routeItems).toHaveLength(11)
    for (const [, label] of routeItems) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })

  it('updates the operator identity with the selected organization', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/overview']}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)
    await user.selectOptions(screen.getByRole('combobox', { name: 'Organization' }), 'northstar')
    expect(screen.getByRole('heading', { name: 'Good afternoon, Grace' })).toBeVisible()
    expect(screen.getByText('Grace Turner')).toBeVisible()
  })
})
