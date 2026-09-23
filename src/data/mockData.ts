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
  { id: 'camp-h-04', tenantId: 'harbor', name: 'Downtown morning confirmations', audience: '18 appointments', schedule: 'Today at 9:00 AM', progress: 100, completed: 18, total: 18, confirmed: 15, reschedule: 2, failed: 1, status: 'Completed' },
  { id: 'camp-h-05', tenantId: 'harbor', name: 'North Campus callbacks', audience: '9 appointments', schedule: 'Today at 1:00 PM', progress: 100, completed: 9, total: 9, confirmed: 6, reschedule: 1, failed: 2, status: 'Completed' },
  { id: 'camp-h-06', tenantId: 'harbor', name: 'Telehealth consent review', audience: '7 appointments', schedule: 'Tomorrow at 10:00 AM', progress: 0, completed: 0, total: 7, confirmed: 0, reschedule: 0, failed: 0, status: 'Scheduled' },
  { id: 'camp-h-07', tenantId: 'harbor', name: 'Weekend appointment check-in', audience: '14 appointments', schedule: 'Sep 26 at 11:30 AM', progress: 0, completed: 0, total: 14, confirmed: 0, reschedule: 0, failed: 0, status: 'Draft' },
  { id: 'camp-h-08', tenantId: 'harbor', name: 'No-answer recovery', audience: '6 appointments', schedule: 'Today at 3:30 PM', progress: 50, completed: 3, total: 6, confirmed: 2, reschedule: 0, failed: 1, status: 'Active' },
  { id: 'camp-n-01', tenantId: 'northstar', name: 'Next-day reminders', audience: '21 appointments', schedule: 'Today at 4:00 PM', progress: 48, completed: 10, total: 21, confirmed: 8, reschedule: 1, failed: 1, status: 'Active' },
  { id: 'camp-n-02', tenantId: 'northstar', name: 'Riverside confirmations', audience: '11 appointments', schedule: 'Today at 10:00 AM', progress: 100, completed: 11, total: 11, confirmed: 9, reschedule: 1, failed: 1, status: 'Completed' },
  { id: 'camp-n-03', tenantId: 'northstar', name: 'West End follow-up', audience: '8 appointments', schedule: 'Tomorrow at 4:30 PM', progress: 0, completed: 0, total: 8, confirmed: 0, reschedule: 0, failed: 0, status: 'Scheduled' },
]

export const calls: CallSession[] = [
  { id: 'call-h-01', tenantId: 'harbor', patientName: 'Maya Thompson', initials: 'MT', phone: '(202) 555-0142', appointment: `${displayDate(0)}, 9:30 AM`, duration: '02:14', status: 'Connected', intent: 'Reschedule', language: 'English', connection: 'Excellent', transcript: [{ speaker: 'Assistant', text: 'Hello Maya, this is the appointment assistant from Harbor Behavioral Health.' }, { speaker: 'Patient', text: 'Hi. I need to move my appointment to another day.' }, { speaker: 'Assistant', text: 'Of course. I can connect you with our reception team to help find a new time.' }] },
  { id: 'call-h-02', tenantId: 'harbor', patientName: 'Sofia Ramirez', initials: 'SR', phone: '(202) 555-0116', appointment: `${displayDate(0)}, 11:00 AM`, duration: '00:48', status: 'Calling', intent: 'Listening', language: 'Spanish', connection: 'Good', transcript: [{ speaker: 'Assistant', text: 'Hola Sofia. Llamamos para confirmar su próxima cita.' }] },
  { id: 'call-h-03', tenantId: 'harbor', patientName: 'Jordan Lee', initials: 'JL', phone: '(202) 555-0178', appointment: `${displayDate(0)}, 10:15 AM`, duration: '01:21', status: 'Completed', intent: 'Confirming', language: 'English', connection: 'Excellent', transcript: [{ speaker: 'Patient', text: 'Yes, I will be there.' }, { speaker: 'Assistant', text: 'Thank you. Your appointment is confirmed.' }] },
  { id: 'call-h-04', tenantId: 'harbor', patientName: 'Nora Wilson', initials: 'NW', phone: '(202) 555-0134', appointment: `${displayDate(0)}, 2:45 PM`, duration: '01:08', status: 'Completed', intent: 'Confirming', language: 'English', connection: 'Excellent', transcript: [{ speaker: 'Assistant', text: 'Hello Nora. I am calling about your appointment.' }, { speaker: 'Patient', text: 'Yes, I can attend.' }] },
  { id: 'call-h-05', tenantId: 'harbor', patientName: 'Liam Foster', initials: 'LF', phone: '(202) 555-0181', appointment: `${displayDate(0)}, 3:30 PM`, duration: '00:36', status: 'No answer', intent: 'Voicemail', language: 'English', connection: 'Good', transcript: [{ speaker: 'Assistant', text: 'We missed you and will try again during the approved calling window.' }] },
  { id: 'call-h-06', tenantId: 'harbor', patientName: 'Camila Ortiz', initials: 'CO', phone: '(202) 555-0127', appointment: `${displayDate(1)}, 9:00 AM`, duration: '01:14', status: 'Completed', intent: 'Confirming', language: 'Spanish', connection: 'Excellent', transcript: [{ speaker: 'Assistant', text: 'Hola Camila. Llamamos para confirmar su cita.' }, { speaker: 'Patient', text: 'Sí, voy a asistir.' }] },
  { id: 'call-h-07', tenantId: 'harbor', patientName: 'Noah Bennett', initials: 'NB', phone: '(202) 555-0153', appointment: `${displayDate(1)}, 10:30 AM`, duration: '01:02', status: 'Completed', intent: 'Confirming', language: 'English', connection: 'Excellent', transcript: [{ speaker: 'Patient', text: 'The appointment time still works for me.' }, { speaker: 'Assistant', text: 'Thank you. Your appointment is confirmed.' }] },
  { id: 'call-h-08', tenantId: 'harbor', patientName: 'Ethan Brooks', initials: 'EB', phone: '(202) 555-0199', appointment: `${displayDate(0)}, 1:30 PM`, duration: '01:46', status: 'Completed', intent: 'Reschedule', language: 'English', connection: 'Good', transcript: [{ speaker: 'Patient', text: 'I need another time next week.' }, { speaker: 'Assistant', text: 'I have sent your request to reception.' }] },
  { id: 'call-n-01', tenantId: 'northstar', patientName: 'Isabella Reed', initials: 'IR', phone: '(312) 555-0164', appointment: `${displayDate(0)}, 11:20 AM`, duration: '00:32', status: 'Calling', intent: 'Listening', language: 'Spanish', connection: 'Good', transcript: [{ speaker: 'Assistant', text: 'Hola Isabella. Llamamos de Northstar Family Care.' }] },
  { id: 'call-n-02', tenantId: 'northstar', patientName: 'Avery Collins', initials: 'AC', phone: '(312) 555-0108', appointment: `${displayDate(0)}, 8:45 AM`, duration: '01:12', status: 'Completed', intent: 'Confirming', language: 'English', connection: 'Excellent', transcript: [{ speaker: 'Patient', text: 'I will be there.' }, { speaker: 'Assistant', text: 'Thank you. Your visit is confirmed.' }] },
  { id: 'call-n-03', tenantId: 'northstar', patientName: 'Caleb Price', initials: 'CP', phone: '(312) 555-0190', appointment: `${displayDate(0)}, 2:00 PM`, duration: '01:31', status: 'Completed', intent: 'Reschedule', language: 'English', connection: 'Good', transcript: [{ speaker: 'Patient', text: 'Can the office help me find another time?' }, { speaker: 'Assistant', text: 'I will connect your request with reception.' }] },
]

export const transfers: TransferRequest[] = [
  { id: 'tr-h-01', tenantId: 'harbor', patientName: 'Maya Thompson', patientInitials: 'MT', waitMinutes: 2, priority: 'High', language: 'English', clinic: 'Downtown Clinic', originalAppointment: `${displayDate(0)}, 9:30 AM`, requestedWindow: 'Tomorrow afternoon', status: 'Waiting' },
  { id: 'tr-h-02', tenantId: 'harbor', patientName: 'Ethan Brooks', patientInitials: 'EB', waitMinutes: 8, priority: 'Standard', language: 'English', clinic: 'Downtown Clinic', originalAppointment: `${displayDate(0)}, 1:30 PM`, requestedWindow: 'Next Monday morning', status: 'Waiting' },
  { id: 'tr-h-03', tenantId: 'harbor', patientName: 'Camila Ortiz', patientInitials: 'CO', waitMinutes: 0, priority: 'Standard', language: 'Spanish', clinic: 'Downtown Clinic', originalAppointment: `${displayDate(1)}, 9:00 AM`, requestedWindow: 'Thursday after 3 PM', status: 'Assigned', assignee: 'Marcus Hill' },
  { id: 'tr-h-04', tenantId: 'harbor', patientName: 'Nora Wilson', patientInitials: 'NW', waitMinutes: 0, priority: 'Standard', language: 'English', clinic: 'North Campus', originalAppointment: `${displayDate(0)}, 2:45 PM`, requestedWindow: 'Tomorrow morning', status: 'Resolved', assignee: 'Amelia Ross', outcome: 'Kept original' },
  { id: 'tr-h-05', tenantId: 'harbor', patientName: 'Liam Foster', patientInitials: 'LF', waitMinutes: 0, priority: 'Standard', language: 'English', clinic: 'Telehealth', originalAppointment: `${displayDate(0)}, 3:30 PM`, requestedWindow: 'Friday afternoon', status: 'Assigned', assignee: 'Marcus Hill' },
  { id: 'tr-h-06', tenantId: 'harbor', patientName: 'Jordan Lee', patientInitials: 'JL', waitMinutes: 0, priority: 'Standard', language: 'English', clinic: 'North Campus', originalAppointment: `${displayDate(0)}, 10:15 AM`, requestedWindow: 'Keep current time', status: 'Resolved', assignee: 'Priya Lawson', outcome: 'Follow-up required' },
  { id: 'tr-h-07', tenantId: 'harbor', patientName: 'Sofia Ramirez', patientInitials: 'SR', waitMinutes: 0, priority: 'High', language: 'Spanish', clinic: 'Telehealth', originalAppointment: `${displayDate(0)}, 11:00 AM`, requestedWindow: 'Next week after 2 PM', status: 'Assigned', assignee: 'Elena Park' },
  { id: 'tr-h-08', tenantId: 'harbor', patientName: 'Noah Bennett', patientInitials: 'NB', waitMinutes: 0, priority: 'Standard', language: 'English', clinic: 'North Campus', originalAppointment: `${displayDate(1)}, 10:30 AM`, requestedWindow: 'Call back tomorrow', status: 'Resolved', assignee: 'Renee Stone', outcome: 'Kept original' },
  { id: 'tr-n-01', tenantId: 'northstar', patientName: 'Caleb Price', patientInitials: 'CP', waitMinutes: 5, priority: 'Standard', language: 'English', clinic: 'Riverside Office', originalAppointment: `${displayDate(0)}, 2:00 PM`, requestedWindow: 'Friday morning', status: 'Waiting' },
  { id: 'tr-n-02', tenantId: 'northstar', patientName: 'Isabella Reed', patientInitials: 'IR', waitMinutes: 0, priority: 'Standard', language: 'Spanish', clinic: 'West End', originalAppointment: `${displayDate(0)}, 11:20 AM`, requestedWindow: 'Tomorrow afternoon', status: 'Assigned', assignee: 'Luis Mendoza' },
  { id: 'tr-n-03', tenantId: 'northstar', patientName: 'Avery Collins', patientInitials: 'AC', waitMinutes: 0, priority: 'Standard', language: 'English', clinic: 'Riverside Office', originalAppointment: `${displayDate(0)}, 8:45 AM`, requestedWindow: 'Keep current time', status: 'Resolved', assignee: 'Morgan Bell', outcome: 'Kept original' },
]

export const integrations: Integration[] = [
  { id: 'int-h-fhir', tenantId: 'harbor', name: 'Credible FHIR', category: 'EHR', status: 'Connected', environment: 'Sandbox', lastSync: '3 minutes ago', capabilities: ['patient.read', 'provider.read', 'location.read'], detail: 'FHIR R4 clinical resources are available in the demo sandbox.' },
  { id: 'int-h-schedule', tenantId: 'harbor', name: 'Credible Scheduling', category: 'Scheduling', status: 'Limited', environment: 'Sandbox', lastSync: 'Not validated', capabilities: ['appointment.read'], detail: 'Appointment write access has not been validated by Qualifacts.' },
  { id: 'int-h-phone', tenantId: 'harbor', name: 'Twilio Voice', category: 'Telephony', status: 'Connected', environment: 'Demo', lastSync: '8 minutes ago', capabilities: ['call.create', 'call.transfer', 'call.status'], detail: 'Demo connection using synthetic call activity.' },
  { id: 'int-h-ai', tenantId: 'harbor', name: 'OpenAI Voice Agent', category: 'AI', status: 'Connected', environment: 'Demo', lastSync: '8 minutes ago', capabilities: ['speech.intent', 'speech.transcript', 'handoff'], detail: 'Constrained reminder and handoff intent model.' },
  { id: 'int-n-fhir', tenantId: 'northstar', name: 'Credible FHIR', category: 'EHR', status: 'Connected', environment: 'Sandbox', lastSync: '11 minutes ago', capabilities: ['patient.read', 'provider.read'], detail: 'FHIR R4 demo connection.' },
  { id: 'int-n-schedule', tenantId: 'northstar', name: 'Credible Scheduling', category: 'Scheduling', status: 'Limited', environment: 'Sandbox', lastSync: 'Not validated', capabilities: [], detail: 'Appointment access has not been validated by Qualifacts.' },
  { id: 'int-n-phone', tenantId: 'northstar', name: 'Twilio Voice', category: 'Telephony', status: 'Connected', environment: 'Demo', lastSync: '12 minutes ago', capabilities: ['call.create', 'call.transfer', 'call.status'], detail: 'Demo connection using synthetic call activity.' },
  { id: 'int-n-ai', tenantId: 'northstar', name: 'OpenAI Voice Agent', category: 'AI', status: 'Connected', environment: 'Demo', lastSync: '12 minutes ago', capabilities: ['speech.intent', 'speech.transcript', 'handoff'], detail: 'Constrained reminder and handoff intent model.' },
]

export const team: TeamMember[] = [
  { id: 'tm-h-01', tenantId: 'harbor', name: 'Olivia Carter', initials: 'OC', email: 'olivia.carter@example.test', role: 'Operations manager', locations: ['All locations'], status: 'Active' },
  { id: 'tm-h-02', tenantId: 'harbor', name: 'Marcus Hill', initials: 'MH', email: 'marcus.hill@example.test', role: 'Receptionist', locations: ['Downtown Clinic'], status: 'Active' },
  { id: 'tm-h-03', tenantId: 'harbor', name: 'Elena Park', initials: 'EP', email: 'elena.park@example.test', role: 'Administrator', locations: ['All locations'], status: 'Active' },
  { id: 'tm-h-04', tenantId: 'harbor', name: 'Amelia Ross', initials: 'AR', email: 'amelia.ross@example.test', role: 'Receptionist', locations: ['North Campus'], status: 'Active' },
  { id: 'tm-h-05', tenantId: 'harbor', name: 'Daniel Kim', initials: 'DK', email: 'daniel.kim@example.test', role: 'Viewer', locations: ['Telehealth'], status: 'Active' },
  { id: 'tm-h-06', tenantId: 'harbor', name: 'Priya Lawson', initials: 'PL', email: 'priya.lawson@example.test', role: 'Receptionist', locations: ['Downtown Clinic'], status: 'Active' },
  { id: 'tm-h-07', tenantId: 'harbor', name: 'Theo Grant', initials: 'TG', email: 'theo.grant@example.test', role: 'Viewer', locations: ['All locations'], status: 'Invited' },
  { id: 'tm-h-08', tenantId: 'harbor', name: 'Renee Stone', initials: 'RS', email: 'renee.stone@example.test', role: 'Administrator', locations: ['All locations'], status: 'Active' },
  { id: 'tm-n-01', tenantId: 'northstar', name: 'Grace Turner', initials: 'GT', email: 'grace.turner@example.test', role: 'Operations manager', locations: ['All locations'], status: 'Active' },
  { id: 'tm-n-02', tenantId: 'northstar', name: 'Luis Mendoza', initials: 'LM', email: 'luis.mendoza@example.test', role: 'Receptionist', locations: ['West End'], status: 'Active' },
  { id: 'tm-n-03', tenantId: 'northstar', name: 'Morgan Bell', initials: 'MB', email: 'morgan.bell@example.test', role: 'Administrator', locations: ['All locations'], status: 'Active' },
]

export const auditEvents: AuditEvent[] = [
  { id: 'audit-h-01', tenantId: 'harbor', actor: 'Y32 Voice Agent', action: 'Detected reschedule intent for Maya Thompson', category: 'Call', outcome: 'Attention', timestamp: 'Today, 3:42 PM', correlationId: 'cor_7A21F3' },
  { id: 'audit-h-02', tenantId: 'harbor', actor: 'Olivia Carter', action: 'Confirmed appointment for Jordan Lee', category: 'Appointment', outcome: 'Success', timestamp: 'Today, 3:28 PM', correlationId: 'cor_2D91B8' },
  { id: 'audit-h-03', tenantId: 'harbor', actor: 'System', action: 'Credible FHIR synchronization completed', category: 'Integration', outcome: 'Success', timestamp: 'Today, 3:15 PM', correlationId: 'cor_9C113A' },
  { id: 'audit-h-04', tenantId: 'harbor', actor: 'Marcus Hill', action: 'Accepted reschedule request for Camila Ortiz', category: 'Appointment', outcome: 'Success', timestamp: 'Today, 2:58 PM', correlationId: 'cor_5B82D4' },
  { id: 'audit-h-05', tenantId: 'harbor', actor: 'Elena Park', action: 'Reviewed telephony connection status', category: 'Integration', outcome: 'Success', timestamp: 'Today, 2:41 PM', correlationId: 'cor_8E73C1' },
  { id: 'audit-h-06', tenantId: 'harbor', actor: 'Y32 Voice Agent', action: 'Completed reminder for Nora Wilson', category: 'Call', outcome: 'Success', timestamp: 'Today, 2:20 PM', correlationId: 'cor_1F46A9' },
  { id: 'audit-h-07', tenantId: 'harbor', actor: 'Olivia Carter', action: 'Returned Liam Foster request to queue', category: 'Appointment', outcome: 'Attention', timestamp: 'Today, 1:52 PM', correlationId: 'cor_3D55E7' },
  { id: 'audit-h-08', tenantId: 'harbor', actor: 'System', action: 'Denied invalid demo session', category: 'Access', outcome: 'Denied', timestamp: 'Today, 1:18 PM', correlationId: 'cor_6A24B0' },
  { id: 'audit-n-01', tenantId: 'northstar', actor: 'Grace Turner', action: 'Updated calling window', category: 'Settings', outcome: 'Success', timestamp: 'Today, 2:54 PM', correlationId: 'cor_4F38D0' },
  { id: 'audit-n-02', tenantId: 'northstar', actor: 'Y32 Voice Agent', action: 'Detected reschedule intent for Caleb Price', category: 'Call', outcome: 'Attention', timestamp: 'Today, 2:26 PM', correlationId: 'cor_7D18C2' },
  { id: 'audit-n-03', tenantId: 'northstar', actor: 'System', action: 'Credible FHIR synchronization completed', category: 'Integration', outcome: 'Success', timestamp: 'Today, 2:03 PM', correlationId: 'cor_2A93F6' },
]
