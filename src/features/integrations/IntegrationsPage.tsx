import { Brain, Database, GearSix, PlugsConnected, PhoneCall, WarningCircle } from '@phosphor-icons/react'
import { useState, type FormEvent } from 'react'
import { useTenant } from '../../app/TenantProvider'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Dialog } from '../../components/ui/Dialog'
import { useToast } from '../../components/ui/ToastProvider'
import type { Integration } from '../../domain/types'

const iconFor = (category: Integration['category']) => {
  if (category === 'EHR') return <Database size={22} />
  if (category === 'Telephony') return <PhoneCall size={22} />
  if (category === 'AI') return <Brain size={22} />
  return <PlugsConnected size={22} />
}

export function IntegrationsPage() {
  const { tenant, tenantId, repository } = useTenant()
  const { notify } = useToast()
  const [selected, setSelected] = useState<Integration | null>(null)
  const [apiToken, setApiToken] = useState('')
  const closeDialog = () => {
    setApiToken('')
    setSelected(null)
  }
  const save = (event: FormEvent) => {
    event.preventDefault()
    closeDialog()
    notify('Demo only — no external system will be updated.')
  }

  return <>
    <header className="page-heading"><div><div className="eyebrow">Connected ecosystem</div><h1>Integrations</h1><p>Review simulated connection health and capabilities for {tenant.name}.</p></div><Badge>Sandbox workspace</Badge></header>
    <div className="integration-summary" aria-label="Integration summary"><div><strong>{repository.getIntegrations(tenantId).filter((item) => item.status === 'Connected').length}</strong><span>Connected</span></div><div><strong>{repository.getIntegrations(tenantId).filter((item) => item.status === 'Limited').length}</strong><span>Capability-limited</span></div><div><strong>0</strong><span>Incidents</span></div></div>
    <div className="integration-grid">{repository.getIntegrations(tenantId).map((integration) => {
      const schedulingLimited = integration.category === 'Scheduling' && !integration.capabilities.includes('appointment.reschedule')
      return <article className="panel integration-card" key={integration.id}>
        <div className="integration-card-top"><span className="integration-icon">{iconFor(integration.category)}</span><Badge>{integration.status}</Badge></div>
        <h2>{integration.name}</h2><p>{schedulingLimited ? 'Read-only appointment capability is represented in this prototype.' : integration.detail}</p>
        <dl className="integration-meta"><div><dt>Environment</dt><dd>{integration.environment}</dd></div><div><dt>Last checked</dt><dd>{integration.lastSync}</dd></div></dl>
        <div className="capability-list" aria-label={`${integration.name} capabilities`}>{integration.capabilities.length > 0 ? integration.capabilities.map((capability) => <code key={capability}>{capability}</code>) : <span>No validated capabilities</span>}</div>
        {schedulingLimited ? <div className="integration-limited"><div><WarningCircle size={18} /><span>Appointment write access has not been validated by Qualifacts.</span></div><Button variant="secondary" disabled aria-label="Enable scheduling write-back">Enable scheduling write-back</Button></div> : <Button variant="secondary" onClick={() => setSelected(integration)} aria-label={`Configure ${integration.name}`}><GearSix size={17} />Configure</Button>}
      </article>
    })}</div>
    <Dialog open={Boolean(selected)} title={`Configure ${selected?.name ?? 'integration'}`} onClose={closeDialog}>
      <form className="dialog-form" onSubmit={save}>
        <p className="dialog-copy">Values entered here remain in memory only and are cleared when this demo dialog closes.</p>
        <div className="field"><label htmlFor="integration-endpoint">API endpoint</label><input id="integration-endpoint" className="input" type="url" defaultValue="https://sandbox.example.test/fhir" /></div>
        <div className="field"><label htmlFor="integration-token">API token</label><input id="integration-token" className="input" type="password" autoComplete="off" placeholder="Enter a temporary demo token" value={apiToken} onChange={(event) => setApiToken(event.target.value)} /></div>
        <div className="dialog-actions"><Button type="button" variant="ghost" onClick={closeDialog}>Cancel</Button><Button type="submit">Save configuration</Button></div>
      </form>
    </Dialog>
  </>
}
