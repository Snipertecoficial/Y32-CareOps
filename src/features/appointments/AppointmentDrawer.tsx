import { CalendarBlank, Phone, User } from '@phosphor-icons/react'
import type { Appointment } from '../../domain/types'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Drawer } from '../../components/ui/Drawer'

export function AppointmentDrawer({ appointment, onClose, onDemoAction }: { appointment: Appointment | null; onClose: () => void; onDemoAction: () => void }) {
  return <Drawer open={Boolean(appointment)} title={appointment?.patientName ?? 'Appointment'} description="Appointment and outreach context" onClose={onClose}>{appointment && <>
    <section className="drawer-section"><div className="person"><span className="avatar">{appointment.patientInitials}</span><div><strong>{appointment.patientName}</strong><small>{appointment.phone} · {appointment.language}</small></div></div></section>
    <section className="drawer-section"><div className="detail-grid"><div className="detail-item"><small>Status</small><Badge>{appointment.status}</Badge></div><div className="detail-item"><small>Date and time</small><strong>{appointment.date}, {appointment.time}</strong></div><div className="detail-item"><small>Provider</small><strong>{appointment.provider}</strong></div><div className="detail-item"><small>Location</small><strong>{appointment.location}</strong></div></div></section>
    <section className="drawer-section"><h3>Outreach timeline</h3><div className="timeline"><div className="timeline-item"><strong>Appointment imported</strong><small>Credible sandbox · 8:02 AM</small></div><div className="timeline-item"><strong>{appointment.lastContact}</strong><small>{appointment.outreachAttempts} outreach attempt{appointment.outreachAttempts === 1 ? '' : 's'}</small></div><div className="timeline-item"><strong>Next step</strong><small>{appointment.status === 'Needs reschedule' ? 'Reception handoff required' : 'Continue configured workflow'}</small></div></div></section>
    <section className="drawer-section"><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><Button onClick={onDemoAction}><Phone size={17} />Start demo call</Button><Button variant="secondary" onClick={onDemoAction}><CalendarBlank size={17} />Update status</Button><Button variant="ghost" onClick={onDemoAction}><User size={17} />View patient</Button></div></section>
  </>}</Drawer>
}
