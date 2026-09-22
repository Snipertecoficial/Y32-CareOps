import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
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
})
