import { EnvelopeSimple, Plus, UsersThree } from '@phosphor-icons/react'
import { useMemo, useState, type FormEvent } from 'react'
import { useTenant } from '../../app/TenantProvider'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Dialog } from '../../components/ui/Dialog'
import { EmptyState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/ToastProvider'

export function TeamPage() {
  const { tenant, tenantId, repository } = useTenant()
  const { notify } = useToast()
  const [role, setRole] = useState('all')
  const [location, setLocation] = useState('all')
  const [inviteOpen, setInviteOpen] = useState(false)
  const members = repository.getTeam(tenantId)
  const visible = useMemo(() => members.filter((member) => (role === 'all' || member.role === role) && (location === 'all' || member.locations.includes(location) || member.locations.includes('All locations'))), [members, role, location])
  const invite = (event: FormEvent) => {
    event.preventDefault()
    setInviteOpen(false)
    notify('Demo only — no external system will be updated.')
  }

  return <>
    <header className="page-heading"><div><div className="eyebrow">Access management</div><h1>Team &amp; roles</h1><p>Coordinate operational access for {tenant.name}.</p></div><Button onClick={() => setInviteOpen(true)}><Plus size={18} />Invite team member</Button></header>
    <div className="toolbar"><div className="field"><label htmlFor="team-role">Role</label><select id="team-role" className="select" value={role} onChange={(event) => setRole(event.target.value)}><option value="all">All roles</option><option>Administrator</option><option>Operations manager</option><option>Receptionist</option><option>Viewer</option></select></div><div className="field"><label htmlFor="team-location">Location</label><select id="team-location" className="select" value={location} onChange={(event) => setLocation(event.target.value)}><option value="all">All locations</option>{tenant.locations.map((item) => <option key={item}>{item}</option>)}</select></div></div>
    <section className="panel"><div className="panel-header"><div><h2>Workspace members</h2><p className="subtle">Role-based access preview</p></div><Badge>{visible.length} members</Badge></div>{visible.length === 0 ? <EmptyState title="No team members match" description="Change a role or location filter to continue." /> : <div className="table-wrap"><table className="data-table"><thead><tr><th>Team member</th><th>Role</th><th>Location access</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{visible.map((member) => <tr key={member.id}><td><div className="person"><span className="avatar">{member.initials}</span><div><strong>{member.name}</strong><small>{member.email}</small></div></div></td><td>{member.role}</td><td>{member.locations.join(', ')}</td><td><Badge>{member.status}</Badge></td><td><button className="row-button" type="button">Manage</button></td></tr>)}</tbody></table></div>}</section>
    <Dialog open={inviteOpen} title="Invite team member" onClose={() => setInviteOpen(false)}><form className="dialog-form" onSubmit={invite}><div className="dialog-illustration"><UsersThree size={24} /></div><div className="field"><label htmlFor="invite-email">Work email</label><div className="input-with-icon"><EnvelopeSimple size={18} /><input id="invite-email" className="input" type="email" placeholder="name@example.test" required /></div></div><div className="form-grid"><div className="field"><label htmlFor="invite-role">Role</label><select id="invite-role" className="select"><option>Receptionist</option><option>Operations manager</option><option>Viewer</option></select></div><div className="field"><label htmlFor="invite-location">Location</label><select id="invite-location" className="select">{tenant.locations.map((item) => <option key={item}>{item}</option>)}</select></div></div><div className="dialog-actions"><Button type="button" variant="ghost" onClick={() => setInviteOpen(false)}>Cancel</Button><Button type="submit">Send demo invitation</Button></div></form></Dialog>
  </>
}
