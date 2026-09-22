import { Funnel, MagnifyingGlass, ShieldCheck } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { useTenant } from '../../app/TenantProvider'
import { Badge } from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/EmptyState'

export function AuditPage() {
  const { tenant, tenantId, repository } = useTenant()
  const [query, setQuery] = useState('')
  const [actor, setActor] = useState('all')
  const [category, setCategory] = useState('all')
  const [outcome, setOutcome] = useState('all')
  const [dateRange, setDateRange] = useState('today')
  const events = repository.getAuditEvents(tenantId)
  const actors = Array.from(new Set(events.map((event) => event.actor)))
  const visible = useMemo(() => events.filter((event) => {
    const matchesQuery = `${event.action} ${event.correlationId}`.toLowerCase().includes(query.toLowerCase())
    const matchesDate = dateRange !== 'today' || event.timestamp.startsWith('Today')
    return matchesQuery && matchesDate && (actor === 'all' || event.actor === actor) && (category === 'all' || event.category === category) && (outcome === 'all' || event.outcome === outcome)
  }), [events, query, actor, category, outcome, dateRange])

  return <>
    <header className="page-heading"><div><div className="eyebrow">Operational traceability</div><h1>Audit log</h1><p>Inspect access and workflow events recorded for {tenant.name}.</p></div><span className="status-pill"><ShieldCheck size={16} />Tamper-evident preview</span></header>
    <div className="toolbar audit-toolbar"><div className="field search-field"><label htmlFor="audit-search">Search</label><div className="search-wrap"><MagnifyingGlass size={18} /><input id="audit-search" className="input search-input" type="search" placeholder="Action or correlation ID…" value={query} onChange={(event) => setQuery(event.target.value)} /></div></div><div className="field"><label htmlFor="audit-actor">Actor</label><select id="audit-actor" className="select" value={actor} onChange={(event) => setActor(event.target.value)}><option value="all">All actors</option>{actors.map((item) => <option key={item}>{item}</option>)}</select></div><div className="field"><label htmlFor="audit-category">Category</label><select id="audit-category" className="select" value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option><option>Appointment</option><option>Call</option><option>Integration</option><option>Access</option><option>Settings</option></select></div><div className="field"><label htmlFor="audit-outcome">Outcome</label><select id="audit-outcome" className="select" value={outcome} onChange={(event) => setOutcome(event.target.value)}><option value="all">All outcomes</option><option>Success</option><option>Attention</option><option>Denied</option></select></div><div className="field"><label htmlFor="audit-date">Date</label><select id="audit-date" className="select" value={dateRange} onChange={(event) => setDateRange(event.target.value)}><option value="today">Today</option><option value="7days">Last 7 days</option><option value="all">All activity</option></select></div></div>
    <section className="panel"><div className="panel-header"><h2>Activity</h2><span className="subtle"><Funnel size={15} /> {visible.length} results</span></div>{visible.length === 0 ? <EmptyState title="No audit events match" description="Try widening the selected filters." /> : <div className="table-wrap"><table className="data-table audit-table"><thead><tr><th>Time</th><th>Actor</th><th>Activity</th><th>Category</th><th>Outcome</th><th>Correlation ID</th></tr></thead><tbody>{visible.map((event) => <tr key={event.id}><td>{event.timestamp}</td><td><strong>{event.actor}</strong></td><td>{event.action}</td><td>{event.category}</td><td><Badge>{event.outcome}</Badge></td><td><code>{event.correlationId}</code></td></tr>)}</tbody></table></div>}</section>
  </>
}
