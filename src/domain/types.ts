import type { AppointmentStatus, CallStatus, CampaignStatus, IntegrationStatus, TransferStatus } from './status'

export type TenantId = 'harbor' | 'northstar'

export interface Tenant {
  id: TenantId
  name: string
  shortName: string
  locations: string[]
  timezone: string
}

export interface Appointment {
  id: string
  tenantId: TenantId
  patientId: string
  patientName: string
  patientInitials: string
  time: string
  date: string
  dateTime: string
  provider: string
  location: string
  visitType: string
  status: AppointmentStatus
  phone: string
  language: 'English' | 'Spanish'
  outreachAttempts: number
  lastContact: string
}

export interface Patient {
  id: string
  tenantId: TenantId
  name: string
  initials: string
  phone: string
  language: 'English' | 'Spanish'
  consent: 'Granted' | 'Review needed' | 'Opted out'
  preference: 'Voice' | 'SMS' | 'Voice + SMS'
  nextAppointment: string
  lastOutcome: AppointmentStatus
}

export interface Campaign {
  id: string
  tenantId: TenantId
  name: string
  audience: string
  schedule: string
  progress: number
  completed: number
  total: number
  confirmed: number
  reschedule: number
  failed: number
  status: CampaignStatus
  script?: string
}

export interface TranscriptLine {
  speaker: 'Assistant' | 'Patient'
  text: string
}

export interface CallSession {
  id: string
  tenantId: TenantId
  patientName: string
  initials: string
  phone: string
  appointment: string
  duration: string
  status: CallStatus
  intent: 'Confirming' | 'Reschedule' | 'Listening' | 'Voicemail'
  language: 'English' | 'Spanish'
  connection: 'Excellent' | 'Good' | 'Unstable'
  transcript: TranscriptLine[]
}

export interface TransferRequest {
  id: string
  tenantId: TenantId
  patientName: string
  patientInitials: string
  waitMinutes: number
  priority: 'High' | 'Standard'
  language: 'English' | 'Spanish'
  clinic: string
  originalAppointment: string
  requestedWindow: string
  status: TransferStatus
  assignee?: string
  outcome?: 'Rescheduled' | 'Kept original' | 'Follow-up required'
}

export interface Integration {
  id: string
  tenantId: TenantId
  name: string
  category: 'EHR' | 'Scheduling' | 'Telephony' | 'AI'
  status: IntegrationStatus
  environment: 'Sandbox' | 'Demo'
  lastSync: string
  capabilities: string[]
  detail: string
}

export interface TeamMember {
  id: string
  tenantId: TenantId
  name: string
  initials: string
  email: string
  role: 'Administrator' | 'Operations manager' | 'Receptionist' | 'Viewer'
  locations: string[]
  status: 'Active' | 'Invited'
}

export interface AuditEvent {
  id: string
  tenantId: TenantId
  actor: string
  action: string
  category: 'Appointment' | 'Call' | 'Integration' | 'Access' | 'Settings'
  outcome: 'Success' | 'Attention' | 'Denied'
  timestamp: string
  correlationId: string
}
