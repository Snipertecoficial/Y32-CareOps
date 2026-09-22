import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { AppRoutes } from '../../app/routes'
import { ToastProvider } from '../../components/ui/ToastProvider'
import { ReschedulePage } from './ReschedulePage'

describe('ReschedulePage', () => {
  it('assigns a waiting patient to the current receptionist', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><TenantProvider><ToastProvider><ReschedulePage /></ToastProvider></TenantProvider></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: 'Accept Maya Thompson' }))
    expect(screen.queryByText('Waiting for reception')).not.toBeInTheDocument()
    expect(screen.getByText('Assigned to Olivia Carter')).toBeVisible()
  })

  it('assigns Northstar requests to the Northstar operations manager', async () => {
    const user = userEvent.setup()
    window.sessionStorage.setItem('y32-careops-demo-session', 'active')
    render(<MemoryRouter initialEntries={['/reschedule']}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)
    await user.selectOptions(screen.getByRole('combobox', { name: 'Organization' }), 'northstar')
    await user.click(screen.getByRole('link', { name: 'Reschedule queue' }))
    await user.click(screen.getByRole('button', { name: 'Accept Caleb Price' }))
    expect(screen.getByText('Assigned to Grace Turner')).toBeVisible()
  })

  it('requires and applies one of the supported resolution outcomes', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><TenantProvider><ToastProvider><ReschedulePage /></ToastProvider></TenantProvider></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: 'Accept Maya Thompson' }))
    const outcome = screen.getByRole('combobox', { name: 'Resolution outcome for Maya Thompson' })
    expect(within(outcome).getByRole('option', { name: 'Rescheduled' })).toBeInTheDocument()
    expect(within(outcome).getByRole('option', { name: 'Kept original' })).toBeInTheDocument()
    expect(within(outcome).getByRole('option', { name: 'Follow-up required' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Resolve Maya Thompson' })).toBeDisabled()
    await user.selectOptions(outcome, 'Rescheduled')
    await user.click(screen.getByRole('button', { name: 'Resolve Maya Thompson' }))
    expect(screen.getByText('Outcome · Rescheduled')).toBeVisible()
  })

  it('returns an assigned request to the waiting queue', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><TenantProvider><ToastProvider><ReschedulePage /></ToastProvider></TenantProvider></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: 'Accept Ethan Brooks' }))
    await user.click(screen.getByRole('button', { name: 'Return Ethan Brooks to waiting' }))
    expect(screen.getByRole('button', { name: 'Accept Ethan Brooks' })).toBeVisible()
    expect(screen.queryByText('Assigned to Olivia Carter')).not.toBeInTheDocument()
  })
})
