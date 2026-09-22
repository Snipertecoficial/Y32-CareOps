import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { PatientsPage } from './PatientsPage'

describe('PatientsPage', () => {
  it('filters the directory by language and exposes contact consent as text', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><TenantProvider><PatientsPage /></TenantProvider></MemoryRouter>)

    await user.selectOptions(screen.getByRole('combobox', { name: 'Language' }), 'Spanish')

    expect(screen.getByRole('button', { name: 'Open Sofia Ramirez' })).toBeVisible()
    expect(screen.queryByRole('button', { name: 'Open Maya Thompson' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Sofia Ramirez' }))
    const details = screen.getByRole('region', { name: 'Patient details' })
    expect(within(details).getByText('Contact consent')).toBeVisible()
    expect(within(details).getByText('Granted')).toBeVisible()
  })
})
