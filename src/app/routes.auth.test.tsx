import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { ToastProvider } from '../components/ui/ToastProvider'
import { AppRoutes } from './routes'
import { TenantProvider } from './TenantProvider'

describe('protected demo routes', () => {
  beforeEach(() => window.sessionStorage.clear())

  it('redirects a direct protected-route visit to the login screen', () => {
    render(
      <MemoryRouter initialEntries={['/overview']}>
        <TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Y32 CareOps' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: /Good afternoon/ })).not.toBeInTheDocument()
  })
})
