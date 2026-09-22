import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { ToastProvider } from '../../components/ui/ToastProvider'
import { TeamPage } from './TeamPage'

it('renders Team & roles and filters members by role', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><TenantProvider><ToastProvider><TeamPage /></ToastProvider></TenantProvider></MemoryRouter>)
  expect(screen.getByRole('heading', { name: 'Team & roles' })).toBeVisible()
  await user.selectOptions(screen.getByRole('combobox', { name: 'Role' }), 'Receptionist')
  expect(screen.getByText('Marcus Hill')).toBeVisible()
  expect(screen.queryByText('Olivia Carter')).not.toBeInTheDocument()
})
