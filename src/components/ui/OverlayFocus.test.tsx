import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { Dialog } from './Dialog'
import { Drawer } from './Drawer'

function DialogHarness() {
  const [open, setOpen] = useState(false)
  return <><button onClick={() => setOpen(true)}>Open dialog</button><Dialog open={open} title="Keyboard dialog" onClose={() => setOpen(false)}><button>Last dialog action</button></Dialog></>
}

function DrawerHarness() {
  const [open, setOpen] = useState(false)
  return <><button onClick={() => setOpen(true)}>Open drawer</button><Drawer open={open} title="Keyboard drawer" onClose={() => setOpen(false)}><button>Last drawer action</button></Drawer></>
}

describe('modal focus contract', () => {
  it('moves focus into a dialog, traps Tab, closes on Escape, and restores focus', async () => {
    const user = userEvent.setup()
    render(<DialogHarness />)
    const opener = screen.getByRole('button', { name: 'Open dialog' })
    await user.click(opener)
    const dialog = screen.getByRole('dialog', { name: 'Keyboard dialog' })
    expect(within(dialog).getByRole('button', { name: 'Close' })).toHaveFocus()
    await user.tab({ shift: true })
    expect(within(dialog).getByRole('button', { name: 'Last dialog action' })).toHaveFocus()
    await user.tab()
    expect(within(dialog).getByRole('button', { name: 'Close' })).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(dialog).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })

  it('moves focus into a drawer, traps Tab, closes on Escape, and restores focus', async () => {
    const user = userEvent.setup()
    render(<DrawerHarness />)
    const opener = screen.getByRole('button', { name: 'Open drawer' })
    await user.click(opener)
    const drawer = screen.getByRole('dialog', { name: 'Keyboard drawer' })
    expect(within(drawer).getByRole('button', { name: 'Close' })).toHaveFocus()
    await user.tab({ shift: true })
    expect(within(drawer).getByRole('button', { name: 'Last drawer action' })).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(drawer).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })
})
