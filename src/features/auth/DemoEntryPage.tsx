import { ArrowRight, CheckCircle, PhoneCall, ShieldCheck } from '@phosphor-icons/react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/y32-logo.jpeg'

export function DemoEntryPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (username === 'Admin' && password === 'Admin') {
      navigate('/overview')
      return
    }
    setError('Incorrect username or password.')
  }

  return <main className="demo-entry">
    <section className="demo-entry-story">
      <div className="entry-brand"><img src={logo} alt="Y32 Solutions" /><span>Y32 Solutions</span></div>
      <div className="entry-copy"><span className="entry-kicker">Patient communication, coordinated</span><h1>Y32 CareOps</h1><p>Turn appointment reminders into confirmed visits and smooth reception handoffs — with an AI-assisted workflow your team can see and control.</p></div>
      <div className="entry-proof"><span><CheckCircle size={18} weight="fill" />Confirm appointments</span><span><PhoneCall size={18} weight="fill" />Route reschedule calls</span><span><ShieldCheck size={18} weight="fill" />Keep an auditable trail</span></div>
    </section>
    <section className="demo-entry-panel" aria-label="Demo access">
      <div><div className="eyebrow">Interactive prototype</div><h2>Explore the care operations workspace</h2><p>Use synthetic data to walk through daily outreach, live calls, patient requests, and integration readiness.</p></div>
      <div className="entry-tenant"><span className="avatar">HB</span><span><strong>Harbor Behavioral Health</strong><small>Demo organization · 8 appointments today</small></span></div>
      <form className="entry-login-form" onSubmit={signIn}>
        <div className="entry-login-fields">
          <div className="field"><label htmlFor="demo-username">Username</label><input id="demo-username" className="input" autoComplete="username" value={username} onChange={(event) => { setUsername(event.target.value); setError('') }} /></div>
          <div className="field"><label htmlFor="demo-password">Password</label><input id="demo-password" className="input" type="password" autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setError('') }} /></div>
        </div>
        {error && <p className="entry-login-error" role="alert">{error}</p>}
        <button className="button button-primary entry-button" type="submit">Sign in to demo <ArrowRight size={18} /></button>
      </form>
      <div className="entry-credentials" aria-label="Demo credentials"><span>Demo username <strong>Admin</strong></span><span>Password <strong>Admin</strong></span></div>
      <p className="entry-disclaimer">Prototype access only. No real patient information or external systems are used.</p>
    </section>
  </main>
}
