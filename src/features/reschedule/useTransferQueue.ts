import { useState } from 'react'
import type { TransferRequest } from '../../domain/types'

export function useTransferQueue(initial: TransferRequest[]) {
  const [items, setItems] = useState(initial)
  const acceptTransfer = (id: string, assignee: string) => setItems((current) => current.map((item) => item.id === id ? { ...item, status: 'Assigned', assignee } : item))
  const resolveTransfer = (id: string, outcome: TransferRequest['outcome']) => setItems((current) => current.map((item) => item.id === id ? { ...item, status: 'Resolved', outcome } : item))
  return { items, acceptTransfer, resolveTransfer }
}
