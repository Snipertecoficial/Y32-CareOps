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
})
