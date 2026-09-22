import { useEffect, useRef, useState, type ElementType, type KeyboardEvent } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Bell, CalendarBlank, ChartPieSlice, CirclesFour, ClockCounterClockwise, Gear, Headset, List, Megaphone, PhoneCall, Robot, ShieldCheck, SignOut, Users, X } from '@phosphor-icons/react'
import logo from '../../assets/y32-logo.jpeg'
import { useTenant } from '../../app/TenantProvider'
import type { TenantId } from '../../domain/types'
import { endDemoSession } from '../../features/auth/demoSession'

export const routeItems = [
  ['/overview', 'Overview'], ['/appointments', 'Appointments'], ['/campaigns', 'Campaigns'], ['/live-calls', 'Live calls'], ['/reschedule', 'Reschedule queue'], ['/patients', 'Patients'], ['/assistant', 'AI assistant'], ['/integrations', 'Integrations'], ['/team', 'Team & roles'], ['/audit', 'Audit log'], ['/settings', 'Organization settings'],
] as const

const icons: Record<(typeof routeItems)[number][1], ElementType> = {
  Overview: ChartPieSlice,
  Appointments: CalendarBlank,
  Campaigns: Megaphone,
  'Live calls': PhoneCall,
  'Reschedule queue': Headset,
  Patients: Users,
  'AI assistant': Robot,
  Integrations: CirclesFour,
  'Team & roles': ShieldCheck,
  'Audit log': ClockCounterClockwise,
  'Organization settings': Gear,
}

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sidebarRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const { tenantId, tenant, tenants, setTenantId, repository } = useTenant()
  const location = useLocation()
  const navigate = useNavigate()
  const current = routeItems.find(([path]) => location.pathname.startsWith(path))?.[1] ?? 'Overview'
  const operator = repository.getTeam(tenantId).find((member) => member.role === 'Operations manager') ?? repository.getTeam(tenantId)[0]

  const changeTenant = (id: TenantId) => {
    setTenantId(id)
    navigate('/overview')
  }

  const signOut = () => {
    endDemoSession()
    navigate('/', { replace: true })
  }

  useEffect(() => {
    const media = window.matchMedia?.('(max-width: 767px)')
    if (!media) return
    const sync = () => {
      setIsMobile(media.matches)
      if (!media.matches) setMenuOpen(false)
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const frame = window.requestAnimationFrame(() => sidebarRef.current?.querySelector<HTMLElement>('.nav-link')?.focus())
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const closeMobileMenu = (restoreFocus = false) => {
    const shouldRestore = restoreFocus && menuOpen && isMobile
    setMenuOpen(false)
    if (shouldRestore) window.requestAnimationFrame(() => menuButtonRef.current?.focus())
  }

  const trapMenuFocus = (event: KeyboardEvent<HTMLElement>) => {
    if (!menuOpen || !isMobile) return
    if (event.key === 'Escape') {
      event.preventDefault()
      closeMobileMenu(true)
      return
    }
    if (event.key !== 'Tab' || !sidebarRef.current) return
    const controls = Array.from(sidebarRef.current.querySelectorAll<HTMLElement>('a[href], select:not([disabled]), button:not([disabled])'))
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="app-shell">
      {menuOpen && isMobile && <div className="sidebar-scrim" aria-hidden="true" onClick={() => closeMobileMenu(true)} />}
      <aside id="primary-sidebar" ref={sidebarRef} className={`sidebar ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation" aria-hidden={isMobile && !menuOpen ? true : undefined} inert={isMobile && !menuOpen ? true : undefined} onKeyDown={trapMenuFocus}>
        <NavLink to="/overview" className="brand-lockup" aria-label="Y32 CareOps home" onClick={() => closeMobileMenu(true)}>
          <img className="brand-logo" src={logo} alt="Y32 Solutions" />
          <span className="brand-name">Y32 CareOps<small>Patient operations</small></span>
        </NavLink>
        <div className="tenant-control">
          <label htmlFor="tenant-select">Organization</label>
          <select id="tenant-select" value={tenantId} onChange={(event) => changeTenant(event.target.value as TenantId)}>{tenants.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
        </div>
        <div className="nav-group-label">Operations</div>
        <nav className="nav-list">{routeItems.slice(0, 7).map(([path, label]) => { const Icon = icons[label]; return <NavLink key={path} to={path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => closeMobileMenu(true)}><Icon size={19} aria-hidden="true" /><span>{label}</span></NavLink> })}</nav>
        <div className="nav-group-label">Administration</div>
        <nav className="nav-list">{routeItems.slice(7).map(([path, label]) => { const Icon = icons[label]; return <NavLink key={path} to={path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => closeMobileMenu(true)}><Icon size={19} aria-hidden="true" /><span>{label}</span></NavLink> })}</nav>
        <div className="sidebar-footer"><div className="demo-badge"><span className="demo-dot" /><span>Synthetic data only</span></div><div className="profile-row"><span className="avatar">{operator?.initials ?? 'Y32'}</span><span className="profile-meta"><strong>{operator?.name ?? 'CareOps team'}</strong><small>{operator?.role ?? 'Operations'}</small></span></div><button className="sign-out-button" type="button" onClick={signOut}><SignOut size={18} aria-hidden="true" /><span>Sign out</span></button></div>
      </aside>
      <section className="main-area">
        <header className="mobile-header"><div className="mobile-brand"><img src={logo} alt="" />Y32 CareOps</div><button ref={menuButtonRef} className="icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-sidebar" onClick={() => menuOpen ? closeMobileMenu(false) : setMenuOpen(true)}>{menuOpen ? <X size={21} /> : <List size={21} />}</button></header>
        <header className="topbar"><div className="breadcrumb"><span>{tenant.shortName}</span><span>/</span><strong>{current}</strong></div><div className="topbar-actions"><span className="badge badge-info">Demo environment</span><button className="icon-button" aria-label="Notifications"><Bell size={19} /></button><span className="avatar">{operator?.initials ?? 'Y32'}</span></div></header>
        <main className="content" id="main-content"><Outlet /></main>
      </section>
    </div>
  </>
}
