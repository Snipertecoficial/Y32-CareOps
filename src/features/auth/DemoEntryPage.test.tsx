import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { DemoEntryPage } from './DemoEntryPage'

function renderEntry() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<DemoEntryPage />} />
        <Route path="/overview" element={<h1>Workspace overview</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('DemoEntryPage', () => {
  it('opens the workspace with the default demo credentials', async () => {
    const user = userEvent.setup()
    renderEntry()

    await user.type(screen.getByRole('textbox', { name: 'Username' }), 'Admin')
    await user.type(screen.getByLabelText('Password'), 'Admin')
    await user.click(screen.getByRole('button', { name: 'Sign in to demo' }))

    expect(screen.getByRole('heading', { name: 'Workspace overview' })).toBeVisible()
  })

  it('keeps the login visible and explains invalid credentials', async () => {
    const user = userEvent.setup()
    renderEntry()

    await user.type(screen.getByRole('textbox', { name: 'Username' }), 'admin')
    await user.type(screen.getByLabelText('Password'), 'wrong')
    await user.click(screen.getByRole('button', { name: 'Sign in to demo' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Incorrect username or password.')
    expect(screen.getByRole('button', { name: 'Sign in to demo' })).toBeVisible()
  })
})
