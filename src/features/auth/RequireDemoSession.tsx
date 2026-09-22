import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { hasDemoSession } from './demoSession'

export function RequireDemoSession() {
  const location = useLocation()
  if (!hasDemoSession()) return <Navigate to="/" replace state={{ from: location.pathname }} />
  return <Outlet />
}
