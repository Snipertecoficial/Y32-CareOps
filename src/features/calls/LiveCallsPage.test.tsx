import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { ToastProvider } from '../../components/ui/ToastProvider'
import { LiveCallsPage } from './LiveCallsPage'

describe('LiveCallsPage', () => {
  it('shows the selected call transcript and detected intent', () => {
    render(<MemoryRouter><TenantProvider><ToastProvider><LiveCallsPage /></ToastProvider></TenantProvider></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Maya Thompson' })).toBeVisible()
    expect(screen.getByText('Reschedule')).toBeVisible()
  })

  it('labels call actions as demo-only when activated', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><TenantProvider><ToastProvider><LiveCallsPage /></ToastProvider></TenantProvider></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: 'Prepare warm transfer' }))
    expect(screen.getByText('Demo only — no external system will be updated.')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Call controls' }))
    expect(screen.getAllByText('Demo only — no external system will be updated.')).toHaveLength(2)
  })
})
