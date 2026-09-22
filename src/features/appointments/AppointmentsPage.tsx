import { CalendarBlank, ListBullets, MagnifyingGlass, Plus } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { useTenant } from '../../app/TenantProvider'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/ToastProvider'
import type { Appointment } from '../../domain/types'
import { AppointmentDrawer } from './AppointmentDrawer'
import { filterAppointments } from './appointmentFilters'

export function AppointmentsPage() {
  const { tenant, tenantId, repository } = useTenant()
  const { notify } = useToast()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [location, setLocation] = useState('all')
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [selected, setSelected] = useState<Appointment | null>(null)
  const rows = useMemo(() => filterAppointments(repository.getAppointments(tenantId), query, status, location), [repository, tenantId, query, status, location])
  const clear = () => { setQuery(''); setStatus('all'); setLocation('all') }
  const demo = () => notify('Demo only — no external system will be updated.')

  return <>
    <header className="page-heading"><div><div className="eyebrow">Patient operations</div><h1>Appointments</h1><p>Coordinate outreach and follow-up across {tenant.name}.</p></div><Button onClick={demo}><Plus size={18} />Add appointment</Button></header>
    <div className="toolbar"><div className="field search-field"><label htmlFor="appointment-search">Search</label><div className="search-wrap"><MagnifyingGlass size={18} /><input id="appointment-search" className="input search-input" type="search" aria-label="Search appointments" placeholder="Patient, provider, status…" value={query} onChange={(event) => setQuery(event.target.value)} /></div></div><div className="field"><label htmlFor="status-filter">Status</label><select id="status-filter" className="select" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option><option>Confirmed</option><option>Pending</option><option>Needs reschedule</option><option>No answer</option></select></div><div className="field"><label htmlFor="location-filter">Location</label><select id="location-filter" className="select" value={location} onChange={(event) => setLocation(event.target.value)}><option value="all">All locations</option>{tenant.locations.map((item) => <option key={item}>{item}</option>)}</select></div><div className="segmented" aria-label="View"><button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view"><ListBullets size={17} /></button><button className={view === 'calendar' ? 'active' : ''} onClick={() => setView('calendar')} aria-label="Calendar view"><CalendarBlank size={17} /></button></div></div>
    <section className="panel"><div className="panel-header"><h2>{rows.length} appointments</h2><span className="subtle">Today and upcoming</span></div>{rows.length === 0 ? <EmptyState title="No appointments match these filters" description="Try a different search term or clear the active filters." action={<Button variant="secondary" onClick={clear}>Clear filters</Button>} /> : view === 'list' ? <div className="table-wrap"><table className="data-table"><thead><tr><th>Patient</th><th>Time</th><th>Provider</th><th>Location</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td><div className="person"><span className="avatar">{row.patientInitials}</span><div><strong>{row.patientName}</strong><small>{row.visitType}</small></div></div></td><td><strong>{row.time}</strong><div className="row-meta">{row.date}</div></td><td>{row.provider}</td><td>{row.location}</td><td><Badge>{row.status}</Badge></td><td><button className="row-button" aria-label={`Open ${row.patientName}`} onClick={() => setSelected(row)}>Open</button></td></tr>)}</tbody></table></div> : <div className="panel-body"><div className="calendar-grid">{Array.from(new Set(rows.map((item) => item.date))).map((date) => <div className="calendar-day" key={date}><strong>{date}</strong>{rows.filter((item) => item.date === date).map((item) => <button className="calendar-slot" key={item.id} onClick={() => setSelected(item)}><strong>{item.time}</strong>{item.patientName}</button>)}</div>)}</div></div>}</section>
    <AppointmentDrawer appointment={selected} onClose={() => setSelected(null)} onDemoAction={demo} />
  </>
}
