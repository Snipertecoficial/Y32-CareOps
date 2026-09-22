import { CalendarBlank, Clock, Headset, Translate } from '@phosphor-icons/react'
import { useState } from 'react'
import { useTenant } from '../../app/TenantProvider'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/ToastProvider'
import type { TransferStatus } from '../../domain/status'
import type { TransferRequest } from '../../domain/types'
import { useTransferQueue } from './useTransferQueue'

type TransferOutcome = NonNullable<TransferRequest['outcome']>
const outcomes: TransferOutcome[] = ['Rescheduled', 'Kept original', 'Follow-up required']

export function ReschedulePage() {
  const { tenantId, repository } = useTenant()
  const { notify } = useToast()
  const { items, acceptTransfer, resolveTransfer, returnTransfer } = useTransferQueue(repository.getTransfers(tenantId))
  const [selectedOutcomes, setSelectedOutcomes] = useState<Record<string, TransferOutcome | ''>>({})
  const currentAssignee = repository.getTeam(tenantId).find((member) => member.role === 'Operations manager')?.name ?? 'Reception team'
  const accept = (id: string) => { acceptTransfer(id, currentAssignee); notify('Demo only — no external system will be updated.') }
  const resolve = (id: string) => {
    const outcome = selectedOutcomes[id]
    if (!outcome) return
    resolveTransfer(id, outcome)
    notify('Demo only — no external system will be updated.')
  }
  const returnToWaiting = (id: string) => {
    returnTransfer(id)
    setSelectedOutcomes((current) => ({ ...current, [id]: '' }))
    notify('Demo only — no external system will be updated.')
  }
  const columns: TransferStatus[] = ['Waiting', 'Assigned', 'Resolved']
  return <><header className="page-heading"><div><div className="eyebrow">Reception handoff</div><h1>Reschedule queue</h1><p>Help patients who requested a new appointment time during outreach.</p></div><Badge>{items.filter((item) => item.status === 'Waiting').length} waiting</Badge></header><div className="queue-columns">{columns.map((status) => <section className="queue-column" key={status}><header className="queue-column-header"><h2>{status}</h2><span className="badge badge-neutral">{items.filter((item) => item.status === status).length}</span></header>{items.filter((item) => item.status === status).map((item) => <article className="queue-card" key={item.id}><div className="person"><span className="avatar">{item.patientInitials}</span><div><strong>{item.patientName}</strong><small>{item.priority} priority</small></div></div><div className="queue-card-details">{status === 'Waiting' && <span><Clock size={15} />Waiting for reception · {item.waitMinutes} min</span>}{item.assignee && <span><Headset size={15} />Assigned to {item.assignee}</span>}<span><CalendarBlank size={15} />{item.originalAppointment}</span><span><Translate size={15} />{item.language} · wants {item.requestedWindow}</span>{item.outcome && <span>Outcome · {item.outcome}</span>}</div>{status === 'Assigned' && <div className="field queue-outcome"><label htmlFor={`outcome-${item.id}`}>Resolution outcome</label><select id={`outcome-${item.id}`} className="select" aria-label={`Resolution outcome for ${item.patientName}`} value={selectedOutcomes[item.id] ?? ''} onChange={(event) => setSelectedOutcomes((current) => ({ ...current, [item.id]: event.target.value as TransferOutcome }))}><option value="">Select outcome</option>{outcomes.map((outcome) => <option key={outcome}>{outcome}</option>)}</select></div>}<div className="queue-card-actions">{status === 'Waiting' && <Button onClick={() => accept(item.id)} aria-label={`Accept ${item.patientName}`}>Accept</Button>}{status === 'Assigned' && <><Button onClick={() => resolve(item.id)} aria-label={`Resolve ${item.patientName}`} disabled={!selectedOutcomes[item.id]}>Resolve</Button><Button variant="ghost" onClick={() => returnToWaiting(item.id)} aria-label={`Return ${item.patientName} to waiting`}>Return</Button></>}<Button variant="secondary">Details</Button></div></article>)}</section>)}</div></>
}
