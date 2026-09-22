import { CalendarBlank, Clock, Headset, Translate } from '@phosphor-icons/react'
import { useTenant } from '../../app/TenantProvider'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/ToastProvider'
import type { TransferStatus } from '../../domain/status'
import { useTransferQueue } from './useTransferQueue'

export function ReschedulePage() {
  const { tenantId, repository } = useTenant()
  const { notify } = useToast()
  const { items, acceptTransfer, resolveTransfer } = useTransferQueue(repository.getTransfers(tenantId))
  const accept = (id: string) => { acceptTransfer(id, 'Olivia Carter'); notify('Demo only — no external system will be updated.') }
  const resolve = (id: string) => { resolveTransfer(id, 'Follow-up required'); notify('Demo only — no external system will be updated.') }
  const columns: TransferStatus[] = ['Waiting', 'Assigned', 'Resolved']
  return <><header className="page-heading"><div><div className="eyebrow">Reception handoff</div><h1>Reschedule queue</h1><p>Help patients who requested a new appointment time during outreach.</p></div><Badge>{items.filter((item) => item.status === 'Waiting').length} waiting</Badge></header><div className="queue-columns">{columns.map((status) => <section className="queue-column" key={status}><header className="queue-column-header"><h2>{status}</h2><span className="badge badge-neutral">{items.filter((item) => item.status === status).length}</span></header>{items.filter((item) => item.status === status).map((item) => <article className="queue-card" key={item.id}><div className="person"><span className="avatar">{item.patientInitials}</span><div><strong>{item.patientName}</strong><small>{item.priority} priority</small></div></div><div className="queue-card-details">{status === 'Waiting' && <span><Clock size={15} />Waiting for reception · {item.waitMinutes} min</span>}{item.assignee && <span><Headset size={15} />Assigned to {item.assignee}</span>}<span><CalendarBlank size={15} />{item.originalAppointment}</span><span><Translate size={15} />{item.language} · wants {item.requestedWindow}</span>{item.outcome && <span>Outcome · {item.outcome}</span>}</div><div className="queue-card-actions">{status === 'Waiting' && <Button onClick={() => accept(item.id)} aria-label={`Accept ${item.patientName}`}>Accept</Button>}{status === 'Assigned' && <Button onClick={() => resolve(item.id)} aria-label={`Resolve ${item.patientName}`}>Resolve</Button>}<Button variant="secondary">Details</Button></div></article>)}</section>)}</div></>
}
