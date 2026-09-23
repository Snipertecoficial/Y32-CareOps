import { ArrowRight, CheckCircle, PhoneCall, Radio } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useTenant } from '../../app/TenantProvider'
import { Badge } from '../../components/ui/Badge'

export function OverviewPage() {
  const { tenant, tenantId, repository } = useTenant()
  const appointments = repository.getAppointments(tenantId)
  const calls = repository.getCalls(tenantId)
  const transfers = repository.getTransfers(tenantId)
  const waiting = transfers.filter((item) => item.status === 'Waiting').length
  const completion = Math.round((appointments.filter((item) => item.outreachAttempts > 0).length / appointments.length) * 100)
  const noAnswer = appointments.filter((item) => item.status === 'No answer').length
  const activeCalls = calls.filter((item) => ['Calling', 'Connected'].includes(item.status)).length
  const featuredAppointments = appointments.slice(0, 4)
  const waitingTransfers = transfers.filter((item) => item.status === 'Waiting')

  const journeyStatus = (appointmentId: string, fallback: string) => {
    if (appointmentId.endsWith('03') && calls.some((item) => item.patientName === 'Sofia Ramirez' && item.status === 'Calling')) return 'Calling'
    return fallback
  }

  return <>
    <header className="page-heading"><div><div className="eyebrow">Operations overview</div><h1>Today’s patient outreach</h1><p>A calm view of what is moving and what needs a person at {tenant.shortName}.</p></div><Link className="button button-secondary" to="/campaigns"><Radio size={18} />Open active campaign</Link></header>

    <section className="signal-grid" aria-label="Outreach status">
      <div className="signal-primary"><span>Confirmation progress</span><strong>{completion}%</strong><small>{appointments.filter((item) => item.outreachAttempts > 0).length} of {appointments.length} patients reached</small></div>
      <div className="signal-item"><span>In progress</span><strong>{activeCalls}</strong><small>AI calls live now</small></div>
      <div className="signal-item"><span>Reception</span><strong>{waiting}</strong><small>Requests waiting</small></div>
      <div className="signal-item"><span>No answer</span><strong>{noAnswer}</strong><small>Retry at 3:30 PM</small></div>
    </section>

    <div className="calm-dashboard-grid">
      <section className="panel journey-panel"><div className="panel-header"><h2>Active patient journey</h2><Link className="section-link" to="/appointments">View all appointments <ArrowRight size={14} /></Link></div><div className="panel-body journey-list">{featuredAppointments.map((item) => <div className="journey-row" key={item.id}><span className="avatar">{item.patientInitials}</span><div><div className="row-title">{item.patientName}</div><div className="row-meta">{item.time} · {item.provider}</div></div><span className="journey-language">{item.language}</span><Badge>{journeyStatus(item.id, item.status)}</Badge></div>)}</div></section>

      <section className="panel attention-panel"><div className="panel-header"><h2>Human attention</h2><Link className="section-link" to="/reschedule">Open queue</Link></div><div className="panel-body"><div className="attention-card-list">{waitingTransfers.map((item) => <div className="attention-card" key={item.id}><span className="attention-icon"><PhoneCall size={19} /></span><div><div className="row-title">{item.patientName}</div><div className="row-meta">Waiting {item.waitMinutes} min · {item.clinic.replace(' Clinic', '')}</div></div><Link className="attention-action" to="/reschedule" aria-label={`Open ${item.patientName} request`}>Open request</Link></div>)}</div><div className="integration-health"><span><CheckCircle size={20} />FHIR read sync healthy</span><Link to="/integrations">Integration details</Link></div></div></section>
    </div>
  </>
}
