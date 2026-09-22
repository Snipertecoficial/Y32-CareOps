import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { ToastProvider } from '../../components/ui/ToastProvider'
import { IntegrationsPage } from './IntegrationsPage'

function renderPage() {
  return render(<MemoryRouter><TenantProvider><ToastProvider><IntegrationsPage /></ToastProvider></TenantProvider></MemoryRouter>)
}

describe('IntegrationsPage', () => {
  it('shows Credible capabilities without implying scheduling write access', () => {
    renderPage()
    expect(screen.getByText('Credible FHIR')).toBeVisible()
    expect(screen.getByText('Limited')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Enable scheduling write-back' })).toBeDisabled()
    expect(screen.getByText('Appointment write access has not been validated by Qualifacts.')).toBeVisible()
  })

  it('clears a secret after the configuration dialog closes', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'Configure Credible FHIR' }))
    const secret = screen.getByLabelText('API token')
    expect(secret).toHaveAttribute('type', 'password')
    await user.type(secret, 'demo-secret-value')
    await user.click(screen.getByRole('button', { name: 'Save configuration' }))
    await user.click(screen.getByRole('button', { name: 'Configure Credible FHIR' }))
    expect(screen.getByLabelText('API token')).toHaveValue('')
  })
})
