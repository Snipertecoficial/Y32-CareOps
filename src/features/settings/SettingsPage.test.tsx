import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { ToastProvider } from '../../components/ui/ToastProvider'
import { SettingsPage } from './SettingsPage'

it('renders Organization settings and labels local saving as a simulation', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><TenantProvider><ToastProvider><SettingsPage /></ToastProvider></TenantProvider></MemoryRouter>)
  expect(screen.getByRole('heading', { name: 'Organization settings' })).toBeVisible()
  await user.click(screen.getByRole('button', { name: 'Save organization settings' }))
  expect(screen.getByText('Demo only — no external system will be updated.')).toBeVisible()
})

it('labels location management as a demo-only action', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><TenantProvider><ToastProvider><SettingsPage /></ToastProvider></TenantProvider></MemoryRouter>)
  await user.click(screen.getByRole('button', { name: 'Manage Downtown Clinic' }))
  expect(screen.getByText('Demo only — no external system will be updated.')).toBeVisible()
})
