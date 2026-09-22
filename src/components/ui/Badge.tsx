import type { PropsWithChildren } from 'react'

const toneFor = (label: string) => {
  if (['Confirmed', 'Connected', 'Completed', 'Active', 'Granted', 'Success', 'Resolved'].includes(label)) return 'success'
  if (['Needs reschedule', 'Waiting', 'Limited', 'Attention', 'Review needed', 'Scheduled'].includes(label)) return 'warning'
  if (['Failed', 'Disconnected', 'Denied', 'Opted out'].includes(label)) return 'danger'
  if (['Calling', 'Assigned', 'Draft'].includes(label)) return 'info'
  return 'neutral'
}

export function Badge({ children }: PropsWithChildren) {
  const label = String(children)
  return <span className={`badge badge-${toneFor(label)}`}>{children}</span>
}
