import { X } from '@phosphor-icons/react'
import type { PropsWithChildren } from 'react'

export function Dialog({ open, title, onClose, children }: PropsWithChildren<{ open: boolean; title: string; onClose: () => void }>) {
  if (!open) return null
  return <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="dialog" role="dialog" aria-modal="true" aria-label={title}><header className="overlay-header"><h2>{title}</h2><button className="close-button" onClick={onClose} aria-label="Close"><X size={22} /></button></header>{children}</section></div>
}
