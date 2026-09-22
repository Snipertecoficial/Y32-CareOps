export const DEMO_SESSION_KEY = 'y32-careops-demo-session'

export const hasDemoSession = () => window.sessionStorage.getItem(DEMO_SESSION_KEY) === 'active'

export const startDemoSession = () => window.sessionStorage.setItem(DEMO_SESSION_KEY, 'active')

export const endDemoSession = () => window.sessionStorage.removeItem(DEMO_SESSION_KEY)
