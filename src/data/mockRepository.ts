import { appointments, auditEvents, calls, campaigns, integrations, patients, team, tenants, transfers } from './mockData'
import type { TenantId } from '../domain/types'

export const DEFAULT_TENANT_ID: TenantId = 'harbor'

const resolveTenantId = (tenantId: string): TenantId =>
  tenants.some((tenant) => tenant.id === tenantId) ? (tenantId as TenantId) : DEFAULT_TENANT_ID

export const createMockRepository = () => ({
  getTenants: () => tenants,
  resolveTenant: (tenantId: string) => tenants.find((tenant) => tenant.id === resolveTenantId(tenantId))!,
  getAppointments: (tenantId: string) => appointments.filter((item) => item.tenantId === resolveTenantId(tenantId)),
  getPatients: (tenantId: string) => patients.filter((item) => item.tenantId === resolveTenantId(tenantId)),
  getCampaigns: (tenantId: string) => campaigns.filter((item) => item.tenantId === resolveTenantId(tenantId)),
  getCalls: (tenantId: string) => calls.filter((item) => item.tenantId === resolveTenantId(tenantId)),
  getTransfers: (tenantId: string) => transfers.filter((item) => item.tenantId === resolveTenantId(tenantId)),
  getIntegrations: (tenantId: string) => integrations.filter((item) => item.tenantId === resolveTenantId(tenantId)),
  getTeam: (tenantId: string) => team.filter((item) => item.tenantId === resolveTenantId(tenantId)),
  getAuditEvents: (tenantId: string) => auditEvents.filter((item) => item.tenantId === resolveTenantId(tenantId)),
})

export type MockRepository = ReturnType<typeof createMockRepository>
