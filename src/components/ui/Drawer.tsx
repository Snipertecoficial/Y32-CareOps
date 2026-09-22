import { X } from '@phosphor-icons/react'
import type { PropsWithChildren } from 'react'
import { useModalFocus } from './useModalFocus'

export function Drawer({ open, title, description, onClose, children }: PropsWithChildren<{ open: boolean; title: string; description?: string; onClose: () => void }>) {
  const { containerRef, handleKeyDown } = useModalFocus(open, onClose)
  if (!open) return null
  return <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><aside ref={containerRef} className="drawer" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} onKeyDown={handleKeyDown}><header className="overlay-header"><div><h2>{title}</h2>{description && <p>{description}</p>}</div><button className="close-button" onClick={onClose} aria-label="Close"><X size={22} /></button></header>{children}</aside></div>
}
