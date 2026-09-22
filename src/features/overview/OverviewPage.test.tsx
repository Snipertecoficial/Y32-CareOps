import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { OverviewPage } from './OverviewPage'

describe('OverviewPage', () => {
  it('prioritizes the daily outreach operation', () => {
    render(<MemoryRouter><TenantProvider><OverviewPage /></TenantProvider></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Good afternoon, Olivia' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Needs attention' })).toBeVisible()
  })
})
