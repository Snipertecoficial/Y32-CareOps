import { createContext, useCallback, useContext, useState, type PropsWithChildren } from 'react'

type ToastContextValue = { notify: (message: string) => void }
const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<string[]>([])
  const notify = useCallback((message: string) => {
    setMessages((current) => [...current.slice(-2), message])
    window.setTimeout(() => setMessages((current) => current.slice(1)), 3600)
  }, [])
  return <ToastContext.Provider value={{ notify }}>{children}<div className="toast-region" role="status" aria-live="polite">{messages.map((message, index) => <div className="toast" key={`${message}-${index}`}>{message}</div>)}</div></ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context
}
