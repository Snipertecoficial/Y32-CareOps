import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Dialog } from '../../components/ui/Dialog'
import { formatCampaignSchedule, type CampaignDraft } from './campaignDraft'

const steps = ['Audience', 'Timing', 'Script', 'Review']

const today = () => new Date().toISOString().slice(0, 10)

const createDraft = (tenantName: string): CampaignDraft => ({
  name: 'Next-day appointment reminders',
  audience: 'Appointments tomorrow',
  startDate: today(),
  callTime: '17:00',
  script: `Hello {{firstName}}, this is ${tenantName} calling to confirm your upcoming appointment.`,
})

type CampaignDialogProps = {
  open: boolean
  tenantName: string
  onClose: () => void
  onCreate: (draft: CampaignDraft) => void
}

export function CampaignDialog({ open, tenantName, onClose, onCreate }: CampaignDialogProps) {
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<CampaignDraft>(() => createDraft(tenantName))

  useEffect(() => {
    if (open) {
      setStep(0)
      setDraft(createDraft(tenantName))
    }
  }, [open, tenantName])

  const updateDraft = <Key extends keyof CampaignDraft>(key: Key, value: CampaignDraft[Key]) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  const close = () => {
    setStep(0)
    setDraft(createDraft(tenantName))
    onClose()
  }

  const finish = () => {
    onCreate(draft)
    close()
  }

  const schedule = formatCampaignSchedule(draft.startDate, draft.callTime)

  return <Dialog open={open} title="Create reminder campaign" onClose={close}>
    <div className="steps" aria-label={`Step ${step + 1} of 4`}>{steps.map((_, index) => <span key={index} className={`step ${index <= step ? 'active' : ''}`} />)}</div>
    <div className="eyebrow">{steps[step]}</div>
    {step === 0 && <div className="form-grid">
      <div className="field"><label htmlFor="campaign-name">Campaign name</label><input id="campaign-name" className="input" value={draft.name} onChange={(event) => updateDraft('name', event.target.value)} /></div>
      <div className="field"><label htmlFor="campaign-audience">Audience</label><select id="campaign-audience" className="select" value={draft.audience} onChange={(event) => updateDraft('audience', event.target.value)}><option>Appointments tomorrow</option><option>Unconfirmed appointments</option><option>Selected location</option></select></div>
    </div>}
    {step === 1 && <div className="form-grid">
      <div className="field"><label htmlFor="campaign-date">Start date</label><input id="campaign-date" className="input" type="date" value={draft.startDate} onChange={(event) => updateDraft('startDate', event.target.value)} /></div>
      <div className="field"><label htmlFor="campaign-time">Call time</label><input id="campaign-time" className="input" type="time" value={draft.callTime} onChange={(event) => updateDraft('callTime', event.target.value)} /></div>
    </div>}
    {step === 2 && <div className="field"><label htmlFor="campaign-script">Reminder script</label><textarea id="campaign-script" className="textarea" value={draft.script} onChange={(event) => updateDraft('script', event.target.value)} /></div>}
    {step === 3 && <div className="campaign-review">
      <strong>{draft.name}</strong>
      <dl><div><dt>Audience</dt><dd>{draft.audience}</dd></div><div><dt>Timing</dt><dd>{schedule}</dd></div><div><dt>Script</dt><dd>{draft.script}</dd></div></dl>
    </div>}
    <div className="dialog-actions"><Button variant="ghost" onClick={step === 0 ? close : () => setStep(step - 1)}>{step === 0 ? 'Cancel' : 'Back'}</Button><Button onClick={step === 3 ? finish : () => setStep(step + 1)}>{step === 3 ? 'Create draft' : 'Continue'}</Button></div>
  </Dialog>
}
