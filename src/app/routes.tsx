import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell, routeItems } from '../components/layout/AppShell'
import { AppointmentsPage } from '../features/appointments/AppointmentsPage'
import { OverviewPage } from '../features/overview/OverviewPage'
import { CampaignsPage } from '../features/campaigns/CampaignsPage'
import { LiveCallsPage } from '../features/calls/LiveCallsPage'
import { ReschedulePage } from '../features/reschedule/ReschedulePage'
import { PatientsPage } from '../features/patients/PatientsPage'
import { AssistantPage } from '../features/assistant/AssistantPage'

function PlaceholderPage({ title }: { title: string }) {
  return <><header className="page-heading"><div><div className="eyebrow">Y32 CareOps</div><h1>{title}</h1><p>This workspace is ready for its tenant-scoped operational experience.</p></div></header><section className="panel"><div className="panel-body" style={{ paddingTop: 24 }}>Screen content is being prepared.</div></section></>
}

export function AppRoutes() {
  return <Routes><Route element={<AppShell />}><Route path="/overview" element={<OverviewPage />} /><Route path="/appointments" element={<AppointmentsPage />} /><Route path="/campaigns" element={<CampaignsPage />} /><Route path="/live-calls" element={<LiveCallsPage />} /><Route path="/reschedule" element={<ReschedulePage />} /><Route path="/patients" element={<PatientsPage />} /><Route path="/assistant" element={<AssistantPage />} />{routeItems.slice(7).map(([path, title]) => <Route key={path} path={path} element={<PlaceholderPage title={title} />} />)}<Route path="*" element={<Navigate to="/overview" replace />} /></Route></Routes>
}
