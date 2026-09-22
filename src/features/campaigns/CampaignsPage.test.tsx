import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { ToastProvider } from '../../components/ui/ToastProvider'
import { CampaignsPage } from './CampaignsPage'

it('opens the guided campaign creator', async () => {
  const user = userEvent.setup()
  render(<MemoryRouter><TenantProvider><ToastProvider><CampaignsPage /></ToastProvider></TenantProvider></MemoryRouter>)
  await user.click(screen.getByRole('button', { name: 'Create campaign' }))
  expect(screen.getByRole('dialog', { name: 'Create reminder campaign' })).toBeVisible()
})
