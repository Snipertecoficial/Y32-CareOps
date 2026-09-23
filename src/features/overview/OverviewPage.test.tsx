import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { OverviewPage } from './OverviewPage'

describe('OverviewPage', () => {
  it('prioritizes the daily outreach operation', () => {
    render(<MemoryRouter><TenantProvider><OverviewPage /></TenantProvider></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Today’s patient outreach' })).toBeVisible()
    expect(screen.getByRole('region', { name: 'Outreach status' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Active patient journey' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Human attention' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Open Maya Thompson request' })).toHaveTextContent('Open request')
    expect(screen.queryByText('Accept')).not.toBeInTheDocument()
  })
})
