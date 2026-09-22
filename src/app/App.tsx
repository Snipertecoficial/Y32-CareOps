import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from '../components/ui/ToastProvider'
import '../styles/base.css'
import '../styles/pages.css'
import { AppRoutes } from './routes'
import { TenantProvider } from './TenantProvider'

export function App() {
  return <BrowserRouter><TenantProvider><ToastProvider><h1 className="sr-only">Y32 CareOps</h1><AppRoutes /></ToastProvider></TenantProvider></BrowserRouter>
}
