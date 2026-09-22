import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { AppointmentsPage } from '../features/appointments/AppointmentsPage'
import { OverviewPage } from '../features/overview/OverviewPage'
import { CampaignsPage } from '../features/campaigns/CampaignsPage'
import { LiveCallsPage } from '../features/calls/LiveCallsPage'
import { ReschedulePage } from '../features/reschedule/ReschedulePage'
import { PatientsPage } from '../features/patients/PatientsPage'
import { AssistantPage } from '../features/assistant/AssistantPage'
import { IntegrationsPage } from '../features/integrations/IntegrationsPage'
import { TeamPage } from '../features/team/TeamPage'
import { AuditPage } from '../features/audit/AuditPage'
import { SettingsPage } from '../features/settings/SettingsPage'
import { DemoEntryPage } from '../features/auth/DemoEntryPage'

export function AppRoutes() {
  return <Routes><Route path="/" element={<DemoEntryPage />} /><Route element={<AppShell />}><Route path="/overview" element={<OverviewPage />} /><Route path="/appointments" element={<AppointmentsPage />} /><Route path="/campaigns" element={<CampaignsPage />} /><Route path="/live-calls" element={<LiveCallsPage />} /><Route path="/reschedule" element={<ReschedulePage />} /><Route path="/patients" element={<PatientsPage />} /><Route path="/assistant" element={<AssistantPage />} /><Route path="/integrations" element={<IntegrationsPage />} /><Route path="/team" element={<TeamPage />} /><Route path="/audit" element={<AuditPage />} /><Route path="/settings" element={<SettingsPage />} /></Route><Route path="*" element={<Navigate to="/overview" replace />} /></Routes>
}
