import type { ReactNode } from 'react'

export function Metric({ label, value, meta, icon }: { label: string; value: string; meta: string; icon?: ReactNode }) {
  return <article className="metric"><div className="metric-label"><span>{label}</span>{icon}</div><div className="metric-value">{value}</div><div className="metric-meta">{meta}</div></article>
}
