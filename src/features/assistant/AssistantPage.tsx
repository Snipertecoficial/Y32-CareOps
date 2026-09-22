import { Headset, Info, PhoneTransfer, Play, ShieldCheck, Translate } from '@phosphor-icons/react'
import { useState, type FormEvent } from 'react'
import { useTenant } from '../../app/TenantProvider'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/ToastProvider'
import { renderScriptPreview } from './scriptPreview'

const DEFAULT_TEMPLATE = 'Hello {{firstName}}, this is Ava, the AI appointment assistant for Harbor Behavioral Health. Your appointment is {{date}} at {{time}}. Will you be able to attend?'

export function AssistantPage() {
  const { tenant } = useTenant()
  const { notify } = useToast()
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE.replace('Harbor Behavioral Health', tenant.name))
  const preview = renderScriptPreview(template, { firstName: 'Maya' }, { date: 'September 24', time: '10:30 AM' })
  const save = (event: FormEvent) => {
    event.preventDefault()
    notify('Demo only — no external system will be updated.')
  }

  return <>
    <header className="page-heading"><div><div className="eyebrow">Conversation design</div><h1>AI assistant</h1><p>Configure how the voice assistant represents {tenant.name}.</p></div><span className="status-pill"><span className="status-dot" />Ready for preview</span></header>
    <form className="assistant-layout" onSubmit={save}>
      <div className="stack">
        <section className="panel settings-section"><div className="panel-header"><div><h2>Voice and language</h2><p>Choose the default sound and language coverage.</p></div><Headset size={22} /></div><div className="form-grid panel-body"><div className="field"><label htmlFor="assistant-voice">Voice</label><select id="assistant-voice" className="select" defaultValue="Ava — warm and clear"><option>Ava — warm and clear</option><option>Noah — calm and concise</option></select></div><div className="field"><label htmlFor="primary-language">Primary language</label><select id="primary-language" className="select" defaultValue="English (US)"><option>English (US)</option><option>Spanish (US)</option></select></div><label className="check-row"><input type="checkbox" defaultChecked /> <span><strong>Spanish fallback</strong><small>Switch automatically when the patient prefers Spanish.</small></span><Translate size={19} /></label></div></section>
        <section className="panel settings-section"><div className="panel-header"><div><h2>Reminder script</h2><p>Use approved tokens to personalize each call.</p></div><Play size={22} /></div><div className="panel-body"><div className="field"><label htmlFor="reminder-script">Reminder script</label><textarea id="reminder-script" className="textarea script-editor" value={template} onChange={(event) => setTemplate(event.target.value)} rows={7} /></div><div className="token-row" aria-label="Available script tokens"><code>{'{{firstName}}'}</code><code>{'{{date}}'}</code><code>{'{{time}}'}</code></div></div></section>
        <section className="panel settings-section"><div className="panel-header"><div><h2>Calling policy</h2><p>Set outreach timing, retries, and escalation behavior.</p></div><PhoneTransfer size={22} /></div><div className="form-grid panel-body"><div className="field"><label htmlFor="calling-window">Calling window</label><select id="calling-window" className="select" defaultValue="9:00 AM – 6:00 PM"><option>9:00 AM – 6:00 PM</option><option>10:00 AM – 7:00 PM</option></select></div><div className="field"><label htmlFor="retry-policy">Retry policy</label><select id="retry-policy" className="select" defaultValue="2 attempts · 90 min apart"><option>2 attempts · 90 min apart</option><option>3 attempts · 2 hours apart</option></select></div><div className="field"><label htmlFor="escalation-destination">Escalation destination</label><select id="escalation-destination" className="select" defaultValue="Reception queue"><option>Reception queue</option><option>Operations manager</option></select></div></div></section>
      </div>
      <aside className="stack assistant-preview-column">
        <section className="assistant-preview"><div className="preview-label"><span className="preview-wave"><span /><span /><span /><span /></span> Live script preview</div><blockquote>{preview}</blockquote><div className="preview-meta"><span><Play size={16} weight="fill" /> 0:18 preview</span><span>English (US)</span></div></section>
        <section className="panel disclosure-card"><div className="panel-body"><div className="disclosure-icon"><ShieldCheck size={22} /></div><div><h2>AI disclosure</h2><p>The assistant clearly identifies itself as AI at the beginning of every call.</p></div><label className="check-row mandatory"><input type="checkbox" checked readOnly aria-label="Disclose that this is an AI assistant" /><span><strong>Required on every call</strong><small>This safety setting cannot be disabled.</small></span></label><div className="inline-notice"><Info size={17} /> Consent and calling-hour requirements vary by region.</div></div></section>
        <Button type="submit" className="save-settings">Save assistant settings</Button>
      </aside>
    </form>
  </>
}
