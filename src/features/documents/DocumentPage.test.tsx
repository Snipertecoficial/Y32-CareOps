import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { TenantProvider } from '../../app/TenantProvider'
import { AppRoutes } from '../../app/routes'
import { ToastProvider } from '../../components/ui/ToastProvider'

function renderDocument(path: string) {
  render(<MemoryRouter initialEntries={[path]}><TenantProvider><ToastProvider><AppRoutes /></ToastProvider></TenantProvider></MemoryRouter>)
}

describe('project documents', () => {
  beforeEach(() => window.sessionStorage.setItem('y32-careops-demo-session', 'active'))

  it.each([
    ['/documents/prd', 'Product Requirements Document', '14. Product Decisions for the Prototype'],
    ['/documents/roadmap', 'Delivery Roadmap', 'Recommended next commercial milestone'],
    ['/documents/api-feasibility', 'API Feasibility Assessment', 'Risk Controls'],
    ['/documents/design-system', 'Design System', '10. Voice and Content'],
  ])('renders the complete %s document inside the app', (path, title, finalSection) => {
    renderDocument(path)

    expect(screen.getByRole('heading', { name: title, level: 1 })).toBeVisible()
    expect(screen.getByRole('heading', { name: finalSection })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'On this page' })).toBeVisible()
  })

  it('renders roadmap tables and follows the PRD reference inside the app', async () => {
    const user = userEvent.setup()
    renderDocument('/documents/prd')

    await user.click(screen.getByRole('link', { name: 'ROADMAP.md' }))

    expect(screen.getByRole('heading', { name: 'Delivery Roadmap', level: 1 })).toBeVisible()
    expect(screen.getAllByRole('table').length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: 'Dependency gates' })).toBeInTheDocument()
  })

  it('draws all seven roadmap phases and connects each card to its full explanation', () => {
    renderDocument('/documents/roadmap')

    const map = screen.getByRole('region', { name: 'Roadmap map' })
    expect(within(map).getByRole('img', { name: 'Connected path through seven delivery phases' })).toBeInTheDocument()
    const phaseLinks = within(map).getAllByRole('link')
    expect(phaseLinks).toHaveLength(7)
    expect(within(map).getByText('Current prototype')).toBeVisible()

    for (const phase of phaseLinks) {
      const targetId = phase.getAttribute('href')?.slice(1)
      expect(targetId).toBeTruthy()
      expect(document.getElementById(targetId!)).toBeInTheDocument()
    }
  })
})
