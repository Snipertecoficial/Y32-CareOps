import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { ToastProvider } from '../../components/ui/ToastProvider'
import { AppointmentsPage } from './AppointmentsPage'

describe('AppointmentsPage', () => {
  it('shows a recoverable empty state when filters have no matches', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><TenantProvider><ToastProvider><AppointmentsPage /></ToastProvider></TenantProvider></MemoryRouter>)
    await user.type(screen.getByRole('searchbox', { name: 'Search appointments' }), 'Nobody Matches')
    expect(screen.getByText('No appointments match these filters')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeVisible()
  })
})
