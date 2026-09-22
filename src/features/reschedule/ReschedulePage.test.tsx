import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
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
})
