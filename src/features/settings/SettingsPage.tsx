import { Buildings, Clock, Database, MapPin, PhoneTransfer } from '@phosphor-icons/react'
import { type FormEvent } from 'react'
import { useTenant } from '../../app/TenantProvider'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/ToastProvider'

export function SettingsPage() {
  const { tenant } = useTenant()
  const { notify } = useToast()
  const save = (event: FormEvent) => {
    event.preventDefault()
    notify('Demo only — no external system will be updated.')
  }
  return <>
    <header className="page-heading"><div><div className="eyebrow">Workspace administration</div><h1>Organization settings</h1><p>Set operational defaults for {tenant.name}.</p></div></header>
    <form className="settings-form" onSubmit={save}>
      <section className="panel settings-section"><div className="panel-header"><div className="settings-title"><span className="integration-icon"><Buildings size={21} /></span><div><h2>Organization identity</h2><p>Used in greetings and reminder scripts.</p></div></div></div><div className="form-grid panel-body"><div className="field"><label htmlFor="organization-name">Organization name</label><input id="organization-name" className="input" defaultValue={tenant.name} /></div><div className="field"><label htmlFor="organization-timezone">Time zone</label><select id="organization-timezone" className="select" defaultValue={tenant.timezone}><option value="America/New_York">Eastern Time</option><option value="America/Chicago">Central Time</option></select></div></div></section>
      <section className="panel settings-section"><div className="panel-header"><div className="settings-title"><span className="integration-icon"><MapPin size={21} /></span><div><h2>Locations</h2><p>Locations available to reception and campaign filters.</p></div></div></div><div className="settings-row-list">{tenant.locations.map((location) => <div className="settings-row" key={location}><span><strong>{location}</strong><small>Active · Uses organization calling defaults</small></span><button type="button" className="row-button" aria-label={`Manage ${location}`} onClick={() => notify('Demo only — no external system will be updated.')}>Manage</button></div>)}</div></section>
      <section className="settings-grid"><div className="panel settings-section"><div className="panel-header"><div className="settings-title"><span className="integration-icon"><Clock size={21} /></span><div><h2>Calling defaults</h2><p>Local outreach window.</p></div></div></div><div className="panel-body form-grid"><div className="field"><label htmlFor="calls-start">Start time</label><input id="calls-start" className="input" type="time" defaultValue="09:00" /></div><div className="field"><label htmlFor="calls-end">End time</label><input id="calls-end" className="input" type="time" defaultValue="18:00" /></div></div></div><div className="panel settings-section"><div className="panel-header"><div className="settings-title"><span className="integration-icon"><PhoneTransfer size={21} /></span><div><h2>Escalation routing</h2><p>Reception handoff defaults.</p></div></div></div><div className="panel-body"><div className="field"><label htmlFor="routing-destination">Default destination</label><select id="routing-destination" className="select"><option>Reception queue</option><option>Operations manager</option></select></div></div></div></section>
      <section className="panel settings-section"><div className="panel-header"><div className="settings-title"><span className="integration-icon"><Database size={21} /></span><div><h2>Data retention</h2><p>Prototype controls for future production policy.</p></div></div></div><div className="panel-body"><div className="field"><label htmlFor="retention-window">Call transcript retention</label><select id="retention-window" className="select" defaultValue="30 days"><option>7 days</option><option>30 days</option><option>90 days</option></select></div><p className="form-help">Production retention must be reviewed against contracts, consent, and applicable healthcare regulations.</p></div></section>
      <div className="settings-actions"><span>Changes remain in this browser session only.</span><Button type="submit">Save organization settings</Button></div>
    </form>
  </>
}
