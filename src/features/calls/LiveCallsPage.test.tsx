import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { LiveCallsPage } from './LiveCallsPage'

describe('LiveCallsPage', () => {
  it('shows the selected call transcript and detected intent', () => {
    render(<MemoryRouter><TenantProvider><LiveCallsPage /></TenantProvider></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Maya Thompson' })).toBeVisible()
    expect(screen.getByText('Reschedule')).toBeVisible()
  })
})
