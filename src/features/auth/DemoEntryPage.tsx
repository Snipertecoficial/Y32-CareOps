import { CalendarCheck, Headset, PhoneCall } from '@phosphor-icons/react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/y32-logo.jpeg'
import { startDemoSession } from './demoSession'

export function DemoEntryPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('Admin')
  const [password, setPassword] = useState('Admin')
  const [error, setError] = useState('')

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (username === 'Admin' && password === 'Admin') {
      startDemoSession()
      navigate('/overview', { replace: true })
      return
    }
    setError('Incorrect username or password.')
  }

  return <main className="demo-entry">
    <section className="demo-entry-panel" aria-label="Demo access">
      <div className="entry-brand"><img src={logo} alt="Y32 Solutions" /><span><strong>Y32 CareOps</strong><small>Patient operations</small></span></div>
      <div className="entry-copy"><span className="entry-kicker">Interactive prototype</span><h1>Welcome back to coordinated care.</h1><p>See every reminder, confirmation and reception handoff in one focused workspace.</p></div>
      <form className="entry-login-form" onSubmit={signIn}>
        <div className="field"><label htmlFor="demo-username">Username</label><input id="demo-username" className="input" autoComplete="username" value={username} onChange={(event) => { setUsername(event.target.value); setError('') }} /></div>
        <div className="field"><label htmlFor="demo-password">Password</label><input id="demo-password" className="input" type="password" autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setError('') }} /></div>
        {error && <p className="entry-login-error" role="alert">{error}</p>}
        <button className="button button-primary entry-button" type="submit">Sign in to demo</button>
      </form>
      <div className="entry-credentials" aria-label="Demo credentials"><span>Demo organization</span><strong>Harbor Behavioral Health</strong></div>
      <p className="entry-disclaimer">Prototype access only. No real patient information or external systems are used.</p>
    </section>
    <section className="entry-visual" aria-label="Today’s patient journey">
      <div className="journey-preview">
        <div className="journey-preview-header"><div><h2>Today’s patient journey</h2><p>Live operational preview</p></div><span className="badge badge-success">2 calls active</span></div>
        <div className="journey-preview-list">
          <div className="journey-preview-row"><span className="journey-icon"><CalendarCheck size={18} /></span><span><strong>Appointment scheduled</strong><small>Credible source record</small></span><b>8:45 AM</b></div>
          <div className="journey-preview-row"><span className="journey-icon"><PhoneCall size={18} /></span><span><strong>Reminder call completed</strong><small>Patient requested a new time</small></span><b>9:12 AM</b></div>
          <div className="journey-preview-row"><span className="journey-icon"><Headset size={18} /></span><span><strong>Reception handoff ready</strong><small>Context attached to the queue</small></span><b>Now</b></div>
        </div>
      </div>
    </section>
  </main>
}
