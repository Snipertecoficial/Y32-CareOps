import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { AuditPage } from './AuditPage'

it('renders Audit log with correlation details', () => {
  render(<MemoryRouter><TenantProvider><AuditPage /></TenantProvider></MemoryRouter>)
  expect(screen.getByRole('heading', { name: 'Audit log' })).toBeVisible()
  expect(screen.getByText('cor_7A21F3')).toBeVisible()
})
