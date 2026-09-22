import { X } from '@phosphor-icons/react'
import type { PropsWithChildren } from 'react'
import { useModalFocus } from './useModalFocus'

export function Dialog({ open, title, onClose, children }: PropsWithChildren<{ open: boolean; title: string; onClose: () => void }>) {
  const { containerRef, handleKeyDown } = useModalFocus(open, onClose)
  if (!open) return null
  return <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section ref={containerRef} className="dialog" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} onKeyDown={handleKeyDown}><header className="overlay-header"><h2>{title}</h2><button className="close-button" onClick={onClose} aria-label="Close"><X size={22} /></button></header>{children}</section></div>
}
