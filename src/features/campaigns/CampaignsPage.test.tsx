import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { AppRoutes } from '../../app/routes'
import { ToastProvider } from '../../components/ui/ToastProvider'
import { CampaignsPage } from './CampaignsPage'

beforeEach(() => window.sessionStorage.setItem('y32-careops-demo-session', 'active'))

it('opens the guided campaign creator', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><TenantProvider><ToastProvider><CampaignsPage /></ToastProvider></TenantProvider></MemoryRouter>)
  await user.click(screen.getByRole('button', { name: 'Create campaign' }))
  expect(screen.getByRole('dialog', { name: 'Create reminder campaign' })).toBeVisible()
})

it('uses the selected organization in the reminder script', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter initialEntries={['/campaigns']}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)
  await user.selectOptions(screen.getByRole('combobox', { name: 'Organization' }), 'northstar')
  await user.click(screen.getByRole('link', { name: 'Campaigns' }))
  await user.click(screen.getByRole('button', { name: 'Create campaign' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
  expect(screen.getByRole('textbox', { name: 'Reminder script' })).toHaveValue('Hello {{firstName}}, this is Northstar Family Care calling to confirm your upcoming appointment.')
})

it('keeps campaign choices through review and creates the selected draft', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><TenantProvider><ToastProvider><CampaignsPage /></ToastProvider></TenantProvider></MemoryRouter>)

  await user.click(screen.getByRole('button', { name: 'Create campaign' }))
  await user.clear(screen.getByRole('textbox', { name: 'Campaign name' }))
  await user.type(screen.getByRole('textbox', { name: 'Campaign name' }), 'Spanish follow-up')
  await user.selectOptions(screen.getByRole('combobox', { name: 'Audience' }), 'Selected location')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
  await user.clear(screen.getByLabelText('Start date'))
  await user.type(screen.getByLabelText('Start date'), '2026-10-05')
  await user.clear(screen.getByLabelText('Call time'))
  await user.type(screen.getByLabelText('Call time'), '14:30')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
  await user.clear(screen.getByRole('textbox', { name: 'Reminder script' }))
  await user.type(screen.getByRole('textbox', { name: 'Reminder script' }), 'Custom Spanish reminder')
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  expect(screen.getByText('Spanish follow-up')).toBeVisible()
  expect(screen.getByText(/Selected location/)).toBeVisible()
  expect(screen.getByText(/Oct 5, 2026 at 2:30 PM/)).toBeVisible()
  expect(screen.getByText('Custom Spanish reminder')).toBeVisible()

  await user.click(screen.getByRole('button', { name: 'Create draft' }))
  expect(screen.getByText('Selected location · Oct 5, 2026 at 2:30 PM')).toBeVisible()
})
