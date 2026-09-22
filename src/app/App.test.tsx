import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
  it('renders the Y32 CareOps product identity', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Y32 CareOps' })).toBeInTheDocument()
  })
})
