import { Megaphone, Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import { useTenant } from '../../app/TenantProvider'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/ToastProvider'
import type { Campaign } from '../../domain/types'
import { CampaignDialog } from './CampaignDialog'

export function CampaignsPage() {
  const { tenantId, repository } = useTenant()
  const { notify } = useToast()
  const [open, setOpen] = useState(false)
  const [localCampaigns, setLocalCampaigns] = useState<Campaign[]>([])
  const campaigns = [...localCampaigns, ...repository.getCampaigns(tenantId)]
  const create = (name: string) => { setLocalCampaigns((rows) => [{ id: `draft-${Date.now()}`, tenantId, name, audience: 'Appointments tomorrow', schedule: 'Not scheduled', progress: 0, completed: 0, total: 0, confirmed: 0, reschedule: 0, failed: 0, status: 'Draft' }, ...rows]); notify('Demo only — no external system will be updated.') }
  return <><header className="page-heading"><div><div className="eyebrow">Automated outreach</div><h1>Campaigns</h1><p>Plan, monitor, and review appointment reminder outreach.</p></div><Button onClick={() => setOpen(true)}><Plus size={18} />Create campaign</Button></header><section className="panel"><div className="panel-header"><div><h2>Reminder campaigns</h2><div className="subtle">{campaigns.filter((item) => item.status === 'Active').length} active now</div></div><Megaphone size={22} color="var(--brand-600)" /></div>{campaigns.map((item) => <article className="campaign-card" key={item.id}><div className="campaign-top"><div><div className="row-title">{item.name}</div><div className="row-meta">{item.audience} · {item.schedule}</div></div><Badge>{item.status}</Badge></div><div className="progress-track" aria-label={`${item.name} ${item.progress}% complete`}><div className="progress-value" style={{ width: `${item.progress}%` }} /></div><div className="campaign-stats"><div><strong>{item.completed}/{item.total}</strong>Completed</div><div><strong>{item.confirmed}</strong>Confirmed</div><div><strong>{item.reschedule}</strong>Reschedule</div><div><strong>{item.failed}</strong>Failed</div></div></article>)}</section><CampaignDialog open={open} onClose={() => setOpen(false)} onCreate={create} /></>
}
