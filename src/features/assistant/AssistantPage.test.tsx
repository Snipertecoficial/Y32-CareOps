import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../../app/routes'
import { TenantProvider } from '../../app/TenantProvider'
import { ToastProvider } from '../../components/ui/ToastProvider'
import { AssistantPage } from './AssistantPage'

describe('AssistantPage', () => {
  it('keeps the AI disclosure enabled and labels save as a simulation', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><TenantProvider><ToastProvider><AssistantPage /></ToastProvider></TenantProvider></MemoryRouter>)

    expect(screen.getByRole('checkbox', { name: 'Disclose that this is an AI assistant' })).toBeChecked()
    await user.click(screen.getByRole('button', { name: 'Save assistant settings' }))
    expect(screen.getByText('Demo only — no external system will be updated.')).toBeVisible()
  })

  it('uses the active tenant and one of its patients in the live preview', async () => {
    const user = userEvent.setup()
    window.sessionStorage.setItem('y32-careops-demo-session', 'active')
    render(<MemoryRouter initialEntries={['/assistant']}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)

    await user.selectOptions(screen.getByRole('combobox', { name: 'Organization' }), 'northstar')
    await user.click(screen.getByRole('link', { name: 'AI assistant' }))

    expect(screen.getByText(/Hello Avery, this is Ava, the AI appointment assistant for Northstar Family Care/)).toBeVisible()
    expect(screen.queryByText(/Hello Maya/)).not.toBeInTheDocument()
  })
})
