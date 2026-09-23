import { describe, expect, it } from 'vitest'
import { createMockRepository, DEFAULT_TENANT_ID } from './mockRepository'

describe('mock repository tenant isolation', () => {
  it('returns only records belonging to the requested tenant', () => {
    const repo = createMockRepository()
    expect(repo.getAppointments('harbor').every((row) => row.tenantId === 'harbor')).toBe(true)
    expect(repo.getAppointments('northstar').every((row) => row.tenantId === 'northstar')).toBe(true)
  })

  it('falls back safely when the tenant id is unknown', () => {
    const repo = createMockRepository()
    expect(repo.resolveTenant('unknown').id).toBe(DEFAULT_TENANT_ID)
    expect(repo.getAppointments('unknown').every((row) => row.tenantId === DEFAULT_TENANT_ID)).toBe(true)
  })

  it('provides enough records to demonstrate both tenant workspaces', () => {
    const repo = createMockRepository()
    const operationalLists = [
      repo.getAppointments,
      repo.getPatients,
      repo.getCampaigns,
      repo.getCalls,
      repo.getTransfers,
      repo.getTeam,
      repo.getAuditEvents,
    ]

    for (const getRows of operationalLists) {
      expect(getRows('harbor')).toHaveLength(8)
      expect(getRows('northstar')).toHaveLength(3)
    }
    expect(repo.getIntegrations('harbor')).toHaveLength(4)
    expect(repo.getIntegrations('northstar')).toHaveLength(4)
  })
})
