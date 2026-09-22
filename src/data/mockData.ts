import type { Appointment, AuditEvent, CallSession, Campaign, Integration, Patient, TeamMember, Tenant, TransferRequest } from '../domain/types'

const day = (offset: number) => {
  const value = new Date()
  value.setHours(9, 0, 0, 0)
  value.setDate(value.getDate() + offset)
  return value
}

const iso = (offset: number, hour: number, minute = 0) => {
  const value = day(offset)
  value.setHours(hour, minute, 0, 0)
  return value.toISOString()
}

const displayDate = (offset: number) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(day(offset))

export const tenants: Tenant[] = [
  { id: 'harbor', name: 'Harbor Behavioral Health', shortName: 'Harbor', locations: ['Downtown Clinic', 'North Campus', 'Telehealth'], timezone: 'America/New_York' },
  { id: 'northstar', name: 'Northstar Family Care', shortName: 'Northstar', locations: ['Riverside Office', 'West End'], timezone: 'America/Chicago' },
]

export const appointments: Appointment[] = [
  { id: 'appt-h-01', tenantId: 'harbor', patientId: 'p-h-01', patientName: 'Maya Thompson', patientInitials: 'MT', time: '9:30 AM', date: displayDate(0), dateTime: iso(0, 9, 30), provider: 'Dr. Elena Morris', location: 'Downtown Clinic', visitType: 'Therapy follow-up', status: 'Needs reschedule', phone: '(202) 555-0142', language: 'English', outreachAttempts: 1, lastContact: 'Live call in progress' },
  { id: 'appt-h-02', tenantId: 'harbor', patientId: 'p-h-02', patientName: 'Jordan Lee', patientInitials: 'JL', time: '10:15 AM', date: displayDate(0), dateTime: iso(0, 10, 15), provider: 'Dr. Marcus Chen', location: 'North Campus', visitType: 'Medication review', status: 'Confirmed', phone: '(202) 555-0178', language: 'English', outreachAttempts: 1, lastContact: 'Confirmed 18 min ago' },
  { id: 'appt-h-03', tenantId: 'harbor', patientId: 'p-h-03', patientName: 'Sofia Ramirez', patientInitials: 'SR', time: '11:00 AM', date: displayDate(0), dateTime: iso(0, 11), provider: 'Alicia Warren, LCSW', location: 'Telehealth', visitType: 'Initial assessment', status: 'Pending', phone: '(202) 555-0116', language: 'Spanish', outreachAttempts: 0, lastContact: 'Queued for 4:15 PM' },
  { id: 'appt-h-04', tenantId: 'harbor', patientId: 'p-h-04', patientName: 'Ethan Brooks', patientInitials: 'EB', time: '1:30 PM', date: displayDate(0), dateTime: iso(0, 13, 30), provider: 'Dr. Elena Morris', location: 'Downtown Clinic', visitType: 'Therapy follow-up', status: 'No answer', phone: '(202) 555-0199', language: 'English', outreachAttempts: 2, lastContact: 'No answer 42 min ago' },
  { id: 'appt-h-05', tenantId: 'harbor', patientId: 'p-h-05', patientName: 'Nora Wilson', patientInitials: 'NW', time: '2:45 PM', date: displayDate(0), dateTime: iso(0, 14, 45), provider: 'Dr. Priya Shah', location: 'North Campus', visitType: 'Psychiatric consult', status: 'Confirmed', phone: '(202) 555-0134', language: 'English', outreachAttempts: 1, lastContact: 'Confirmed 1 hr ago' },
  { id: 'appt-h-06', tenantId: 'harbor', patientId: 'p-h-06', patientName: 'Liam Foster', patientInitials: 'LF', time: '3:30 PM', date: displayDate(0), dateTime: iso(0, 15, 30), provider: 'Alicia Warren, LCSW', location: 'Telehealth', visitType: 'Group intake', status: 'Pending', phone: '(202) 555-0181', language: 'English', outreachAttempts: 0, lastContact: 'Queued for 5:00 PM' },
  { id: 'appt-h-07', tenantId: 'harbor', patientId: 'p-h-07', patientName: 'Camila Ortiz', patientInitials: 'CO', time: '9:00 AM', date: displayDate(1), dateTime: iso(1, 9), provider: 'Dr. Marcus Chen', location: 'Downtown Clinic', visitType: 'Medication review', status: 'Pending', phone: '(202) 555-0127', language: 'Spanish', outreachAttempts: 0, lastContact: 'Scheduled tonight' },
  { id: 'appt-h-08', tenantId: 'harbor', patientId: 'p-h-08', patientName: 'Noah Bennett', patientInitials: 'NB', time: '10:30 AM', date: displayDate(1), dateTime: iso(1, 10, 30), provider: 'Dr. Priya Shah', location: 'North Campus', visitType: 'Psychiatric consult', status: 'Pending', phone: '(202) 555-0153', language: 'English', outreachAttempts: 0, lastContact: 'Scheduled tonight' },
  { id: 'appt-n-01', tenantId: 'northstar', patientId: 'p-n-01', patientName: 'Avery Collins', patientInitials: 'AC', time: '8:45 AM', date: displayDate(0), dateTime: iso(0, 8, 45), provider: 'Dr. Henry Cole', location: 'Riverside Office', visitType: 'Primary care follow-up', status: 'Confirmed', phone: '(312) 555-0108', language: 'English', outreachAttempts: 1, lastContact: 'Confirmed 27 min ago' },
  { id: 'appt-n-02', tenantId: 'northstar', patientId: 'p-n-02', patientName: 'Isabella Reed', patientInitials: 'IR', time: '11:20 AM', date: displayDate(0), dateTime: iso(0, 11, 20), provider: 'Dr. Dana Mills', location: 'West End', visitType: 'Wellness visit', status: 'Pending', phone: '(312) 555-0164', language: 'Spanish', outreachAttempts: 0, lastContact: 'Queued for 3:30 PM' },
  { id: 'appt-n-03', tenantId: 'northstar', patientId: 'p-n-03', patientName: 'Caleb Price', patientInitials: 'CP', time: '2:00 PM', date: displayDate(0), dateTime: iso(0, 14), provider: 'Dr. Henry Cole', location: 'Riverside Office', visitType: 'Lab review', status: 'No answer', phone: '(312) 555-0190', language: 'English', outreachAttempts: 2, lastContact: 'No answer 1 hr ago' },
]

export const patients: Patient[] = appointments.map((appointment) => ({
  id: appointment.patientId,
  tenantId: appointment.tenantId,
  name: appointment.patientName,
  initials: appointment.patientInitials,
  phone: appointment.phone,
  language: appointment.language,
  consent: appointment.patientName === 'Ethan Brooks' ? 'Review needed' : 'Granted',
  preference: appointment.language === 'Spanish' ? 'Voice + SMS' : 'Voice',
  nextAppointment: `${appointment.date}, ${appointment.time}`,
  lastOutcome: appointment.status,
}))

export const campaigns: Campaign[] = [
  { id: 'camp-h-01', tenantId: 'harbor', name: 'Tomorrow · All locations', audience: '46 appointments', schedule: 'Today at 5:00 PM', progress: 67, completed: 31, total: 46, confirmed: 23, reschedule: 5, failed: 3, status: 'Active' },
  { id: 'camp-h-02', tenantId: 'harbor', name: 'Spanish-language outreach', audience: '12 appointments', schedule: 'Today at 6:00 PM', progress: 25, completed: 3, total: 12, confirmed: 2, reschedule: 1, failed: 0, status: 'Active' },
  { id: 'camp-h-03', tenantId: 'harbor', name: 'Friday follow-up', audience: '38 appointments', schedule: 'Sep 24 at 4:30 PM', progress: 0, completed: 0, total: 38, confirmed: 0, reschedule: 0, failed: 0, status: 'Scheduled' },
  { id: 'camp-n-01', tenantId: 'northstar', name: 'Next-day reminders', audience: '21 appointments', schedule: 'Today at 4:00 PM', progress: 48, completed: 10, total: 21, confirmed: 8, reschedule: 1, failed: 1, status: 'Active' },
]

export const calls: CallSession[] = [
  { id: 'call-h-01', tenantId: 'harbor', patientName: 'Maya Thompson', initials: 'MT', phone: '(202) 555-0142', appointment: `${displayDate(0)}, 9:30 AM`, duration: '02:14', status: 'Connected', intent: 'Reschedule', language: 'English', connection: 'Excellent', transcript: [{ speaker: 'Assistant', text: 'Hello Maya, this is the appointment assistant from Harbor Behavioral Health.' }, { speaker: 'Patient', text: 'Hi. I need to move my appointment to another day.' }, { speaker: 'Assistant', text: 'Of course. I can connect you with our reception team to help find a new time.' }] },
  { id: 'call-h-02', tenantId: 'harbor', patientName: 'Sofia Ramirez', initials: 'SR', phone: '(202) 555-0116', appointment: `${displayDate(0)}, 11:00 AM`, duration: '00:48', status: 'Calling', intent: 'Listening', language: 'Spanish', connection: 'Good', transcript: [{ speaker: 'Assistant', text: 'Hola Sofia. Llamamos para confirmar su próxima cita.' }] },
  { id: 'call-h-03', tenantId: 'harbor', patientName: 'Jordan Lee', initials: 'JL', phone: '(202) 555-0178', appointment: `${displayDate(0)}, 10:15 AM`, duration: '01:21', status: 'Completed', intent: 'Confirming', language: 'English', connection: 'Excellent', transcript: [{ speaker: 'Patient', text: 'Yes, I will be there.' }, { speaker: 'Assistant', text: 'Thank you. Your appointment is confirmed.' }] },
  { id: 'call-n-01', tenantId: 'northstar', patientName: 'Isabella Reed', initials: 'IR', phone: '(312) 555-0164', appointment: `${displayDate(0)}, 11:20 AM`, duration: '00:32', status: 'Calling', intent: 'Listening', language: 'Spanish', connection: 'Good', transcript: [{ speaker: 'Assistant', text: 'Hola Isabella. Llamamos de Northstar Family Care.' }] },
]

export const transfers: TransferRequest[] = [
  { id: 'tr-h-01', tenantId: 'harbor', patientName: 'Maya Thompson', patientInitials: 'MT', waitMinutes: 2, priority: 'High', language: 'English', clinic: 'Downtown Clinic', originalAppointment: `${displayDate(0)}, 9:30 AM`, requestedWindow: 'Tomorrow afternoon', status: 'Waiting' },
  { id: 'tr-h-02', tenantId: 'harbor', patientName: 'Ethan Brooks', patientInitials: 'EB', waitMinutes: 8, priority: 'Standard', language: 'English', clinic: 'Downtown Clinic', originalAppointment: `${displayDate(0)}, 1:30 PM`, requestedWindow: 'Next Monday morning', status: 'Waiting' },
  { id: 'tr-h-03', tenantId: 'harbor', patientName: 'Camila Ortiz', patientInitials: 'CO', waitMinutes: 0, priority: 'Standard', language: 'Spanish', clinic: 'Downtown Clinic', originalAppointment: `${displayDate(1)}, 9:00 AM`, requestedWindow: 'Thursday after 3 PM', status: 'Assigned', assignee: 'Marcus Hill' },
  { id: 'tr-n-01', tenantId: 'northstar', patientName: 'Caleb Price', patientInitials: 'CP', waitMinutes: 5, priority: 'Standard', language: 'English', clinic: 'Riverside Office', originalAppointment: `${displayDate(0)}, 2:00 PM`, requestedWindow: 'Friday morning', status: 'Waiting' },
]

export const integrations: Integration[] = [
  { id: 'int-h-fhir', tenantId: 'harbor', name: 'Credible FHIR', category: 'EHR', status: 'Connected', environment: 'Sandbox', lastSync: '3 minutes ago', capabilities: ['patient.read', 'provider.read', 'location.read'], detail: 'FHIR R4 clinical resources are available in the demo sandbox.' },
  { id: 'int-h-schedule', tenantId: 'harbor', name: 'Credible Scheduling', category: 'Scheduling', status: 'Limited', environment: 'Sandbox', lastSync: 'Not validated', capabilities: ['appointment.read'], detail: 'Appointment write access has not been validated by Qualifacts.' },
  { id: 'int-h-phone', tenantId: 'harbor', name: 'Twilio Voice', category: 'Telephony', status: 'Connected', environment: 'Demo', lastSync: '8 minutes ago', capabilities: ['call.create', 'call.transfer', 'call.status'], detail: 'Demo connection using synthetic call activity.' },
  { id: 'int-h-ai', tenantId: 'harbor', name: 'OpenAI Voice Agent', category: 'AI', status: 'Connected', environment: 'Demo', lastSync: '8 minutes ago', capabilities: ['speech.intent', 'speech.transcript', 'handoff'], detail: 'Constrained reminder and handoff intent model.' },
  { id: 'int-n-fhir', tenantId: 'northstar', name: 'Credible FHIR', category: 'EHR', status: 'Connected', environment: 'Sandbox', lastSync: '11 minutes ago', capabilities: ['patient.read', 'provider.read'], detail: 'FHIR R4 demo connection.' },
  { id: 'int-n-schedule', tenantId: 'northstar', name: 'Credible Scheduling', category: 'Scheduling', status: 'Limited', environment: 'Sandbox', lastSync: 'Not validated', capabilities: [], detail: 'Appointment access has not been validated by Qualifacts.' },
]

export const team: TeamMember[] = [
  { id: 'tm-h-01', tenantId: 'harbor', name: 'Olivia Carter', initials: 'OC', email: 'olivia.carter@example.test', role: 'Operations manager', locations: ['All locations'], status: 'Active' },
  { id: 'tm-h-02', tenantId: 'harbor', name: 'Marcus Hill', initials: 'MH', email: 'marcus.hill@example.test', role: 'Receptionist', locations: ['Downtown Clinic'], status: 'Active' },
  { id: 'tm-h-03', tenantId: 'harbor', name: 'Elena Park', initials: 'EP', email: 'elena.park@example.test', role: 'Administrator', locations: ['All locations'], status: 'Active' },
  { id: 'tm-n-01', tenantId: 'northstar', name: 'Grace Turner', initials: 'GT', email: 'grace.turner@example.test', role: 'Operations manager', locations: ['All locations'], status: 'Active' },
]

export const auditEvents: AuditEvent[] = [
  { id: 'audit-h-01', tenantId: 'harbor', actor: 'Y32 Voice Agent', action: 'Detected reschedule intent for Maya Thompson', category: 'Call', outcome: 'Attention', timestamp: 'Today, 3:42 PM', correlationId: 'cor_7A21F3' },
  { id: 'audit-h-02', tenantId: 'harbor', actor: 'Olivia Carter', action: 'Confirmed appointment for Jordan Lee', category: 'Appointment', outcome: 'Success', timestamp: 'Today, 3:28 PM', correlationId: 'cor_2D91B8' },
  { id: 'audit-h-03', tenantId: 'harbor', actor: 'System', action: 'Credible FHIR synchronization completed', category: 'Integration', outcome: 'Success', timestamp: 'Today, 3:15 PM', correlationId: 'cor_9C113A' },
  { id: 'audit-n-01', tenantId: 'northstar', actor: 'Grace Turner', action: 'Updated calling window', category: 'Settings', outcome: 'Success', timestamp: 'Today, 2:54 PM', correlationId: 'cor_4F38D0' },
]
