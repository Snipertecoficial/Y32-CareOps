import { useEffect, useRef, type KeyboardEvent } from 'react'

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useModalFocus(open: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const container = containerRef.current
    const firstControl = container?.querySelector<HTMLElement>(focusableSelector)
    ;(firstControl ?? container)?.focus()
    return () => previousFocus?.focus()
  }, [open])

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab' || !containerRef.current) return
    const controls = Array.from(containerRef.current.querySelectorAll<HTMLElement>(focusableSelector))
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  return { containerRef, handleKeyDown }
}
