import { useState, type ElementType } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Bell, CalendarBlank, ChartPieSlice, CirclesFour, ClockCounterClockwise, Gear, Headset, List, Megaphone, PhoneCall, Robot, ShieldCheck, Users, X } from '@phosphor-icons/react'
import logo from '../../assets/y32-logo.jpeg'
import { useTenant } from '../../app/TenantProvider'
import type { TenantId } from '../../domain/types'

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
  const { tenantId, tenant, tenants, setTenantId } = useTenant()
  const location = useLocation()
  const navigate = useNavigate()
  const current = routeItems.find(([path]) => location.pathname.startsWith(path))?.[1] ?? 'Overview'

  const changeTenant = (id: TenantId) => {
    setTenantId(id)
    navigate('/overview')
  }

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
        <NavLink to="/overview" className="brand-lockup" aria-label="Y32 CareOps home" onClick={() => setMenuOpen(false)}>
          <img className="brand-logo" src={logo} alt="Y32 Solutions" />
          <span className="brand-name">Y32 CareOps<small>Patient operations</small></span>
        </NavLink>
        <div className="tenant-control">
          <label htmlFor="tenant-select">Organization</label>
          <select id="tenant-select" value={tenantId} onChange={(event) => changeTenant(event.target.value as TenantId)}>{tenants.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
        </div>
        <div className="nav-group-label">Operations</div>
        <nav className="nav-list">{routeItems.slice(0, 7).map(([path, label]) => { const Icon = icons[label]; return <NavLink key={path} to={path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}><Icon size={19} aria-hidden="true" /><span>{label}</span></NavLink> })}</nav>
        <div className="nav-group-label">Administration</div>
        <nav className="nav-list">{routeItems.slice(7).map(([path, label]) => { const Icon = icons[label]; return <NavLink key={path} to={path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}><Icon size={19} aria-hidden="true" /><span>{label}</span></NavLink> })}</nav>
        <div className="sidebar-footer"><div className="demo-badge"><span className="demo-dot" /><span>Synthetic data only</span></div><div className="profile-row"><span className="avatar">OC</span><span className="profile-meta"><strong>Olivia Carter</strong><small>Operations manager</small></span></div></div>
      </aside>
      <section className="main-area">
        <header className="mobile-header"><div className="mobile-brand"><img src={logo} alt="" />Y32 CareOps</div><button className="icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <List size={21} />}</button></header>
        <header className="topbar"><div className="breadcrumb"><span>{tenant.shortName}</span><span>/</span><strong>{current}</strong></div><div className="topbar-actions"><span className="badge badge-info">Demo environment</span><button className="icon-button" aria-label="Notifications"><Bell size={19} /></button><span className="avatar">OC</span></div></header>
        <main className="content" id="main-content"><Outlet /></main>
      </section>
    </div>
  </>
}
