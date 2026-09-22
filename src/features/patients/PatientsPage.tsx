import { ChatCircleText, MagnifyingGlass, Phone, ShieldCheck, Translate } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { useTenant } from '../../app/TenantProvider'
import { Badge } from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/EmptyState'

export function PatientsPage() {
  const { tenant, tenantId, repository } = useTenant()
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('all')
  const [consent, setConsent] = useState('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const patients = repository.getPatients(tenantId)
  const visiblePatients = useMemo(() => patients.filter((patient) => {
    const matchesQuery = `${patient.name} ${patient.phone}`.toLowerCase().includes(query.trim().toLowerCase())
    return matchesQuery && (language === 'all' || patient.language === language) && (consent === 'all' || patient.consent === consent)
  }), [patients, query, language, consent])
  const selected = visiblePatients.find((patient) => patient.id === selectedId) ?? visiblePatients[0]

  return <>
    <header className="page-heading">
      <div><div className="eyebrow">Patient communication</div><h1>Patients</h1><p>Review outreach preferences and consent across {tenant.name}.</p></div>
      <Badge>{visiblePatients.length} profiles</Badge>
    </header>
    <div className="toolbar">
      <div className="field search-field"><label htmlFor="patient-search">Search</label><div className="search-wrap"><MagnifyingGlass size={18} /><input id="patient-search" className="input search-input" type="search" placeholder="Name or phone…" value={query} onChange={(event) => setQuery(event.target.value)} /></div></div>
      <div className="field"><label htmlFor="patient-language">Language</label><select id="patient-language" className="select" value={language} onChange={(event) => setLanguage(event.target.value)}><option value="all">All languages</option><option>English</option><option>Spanish</option></select></div>
      <div className="field"><label htmlFor="patient-consent">Consent</label><select id="patient-consent" className="select" value={consent} onChange={(event) => setConsent(event.target.value)}><option value="all">All consent states</option><option>Granted</option><option>Review needed</option><option>Opted out</option></select></div>
    </div>
    {visiblePatients.length === 0 ? <section className="panel"><EmptyState title="No patients match these filters" description="Try a broader search or another consent state." /></section> : <div className="patient-layout">
      <section className="panel patient-directory" aria-label="Patient directory">
        <div className="panel-header"><h2>Patient directory</h2><span className="subtle">Synthetic demo data</span></div>
        <div className="patient-list">{visiblePatients.map((patient) => <button type="button" className={`patient-row ${selected?.id === patient.id ? 'selected' : ''}`} aria-label={`Open ${patient.name}`} aria-pressed={selected?.id === patient.id} key={patient.id} onClick={() => setSelectedId(patient.id)}><span className="avatar">{patient.initials}</span><span><strong>{patient.name}</strong><small>{patient.phone} · {patient.language}</small></span><Badge>{patient.consent}</Badge></button>)}</div>
      </section>
      {selected && <section className="panel patient-detail" aria-label="Patient details">
        <div className="patient-detail-hero"><span className="avatar avatar-large">{selected.initials}</span><div><div className="eyebrow">Selected patient</div><h2>{selected.name}</h2><p>{selected.phone}</p></div></div>
        <div className="detail-list">
          <div><ShieldCheck size={19} /><span><small>Contact consent</small><strong>{selected.consent}</strong></span></div>
          <div><Phone size={19} /><span><small>Preferred channel</small><strong>{selected.preference}</strong></span></div>
          <div><Translate size={19} /><span><small>Preferred language</small><strong>{selected.language}</strong></span></div>
        </div>
        <div className="patient-history"><h3>Communication history</h3><div className="history-event"><ChatCircleText size={18} /><div><strong>{selected.lastOutcome}</strong><p>Most recent outreach outcome · {selected.nextAppointment}</p></div></div><div className="history-event"><Phone size={18} /><div><strong>Reminder eligible</strong><p>Contact settings allow the configured outreach workflow.</p></div></div></div>
      </section>}
    </div>}
  </>
}
