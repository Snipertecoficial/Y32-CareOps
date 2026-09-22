import { ArrowRight, CheckCircle, PhoneCall, ShieldCheck } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import logo from '../../assets/y32-logo.jpeg'

export function DemoEntryPage() {
  return <main className="demo-entry">
    <section className="demo-entry-story">
      <div className="entry-brand"><img src={logo} alt="Y32 Solutions" /><span>Y32 Solutions</span></div>
      <div className="entry-copy"><span className="entry-kicker">Patient communication, coordinated</span><h1>Y32 CareOps</h1><p>Turn appointment reminders into confirmed visits and smooth reception handoffs — with an AI-assisted workflow your team can see and control.</p></div>
      <div className="entry-proof"><span><CheckCircle size={18} weight="fill" />Confirm appointments</span><span><PhoneCall size={18} weight="fill" />Route reschedule calls</span><span><ShieldCheck size={18} weight="fill" />Keep an auditable trail</span></div>
    </section>
    <section className="demo-entry-panel" aria-label="Demo access">
      <div><div className="eyebrow">Interactive prototype</div><h2>Explore the care operations workspace</h2><p>Use synthetic data to walk through daily outreach, live calls, patient requests, and integration readiness.</p></div>
      <div className="entry-tenant"><span className="avatar">HB</span><span><strong>Harbor Behavioral Health</strong><small>Demo organization · 8 appointments today</small></span></div>
      <Link className="button button-primary entry-button" to="/overview">Enter demo workspace <ArrowRight size={18} /></Link>
      <p className="entry-disclaimer">No real patient information, credentials, or external systems are used.</p>
    </section>
  </main>
}
