import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react'
import { createMockRepository, DEFAULT_TENANT_ID } from '../data/mockRepository'
import type { TenantId } from '../domain/types'

const repository = createMockRepository()

type TenantContextValue = {
  tenant: ReturnType<typeof repository.resolveTenant>
  tenants: ReturnType<typeof repository.getTenants>
  tenantId: TenantId
  setTenantId: (id: TenantId) => void
  repository: typeof repository
}

const TenantContext = createContext<TenantContextValue | null>(null)

export function TenantProvider({ children }: PropsWithChildren) {
  const [tenantId, setTenantId] = useState<TenantId>(DEFAULT_TENANT_ID)
  const value = useMemo(() => ({ tenant: repository.resolveTenant(tenantId), tenants: repository.getTenants(), tenantId, setTenantId, repository }), [tenantId])
  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (!context) throw new Error('useTenant must be used inside TenantProvider')
  return context
}
