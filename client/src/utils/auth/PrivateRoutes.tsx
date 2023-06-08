import { Navigate, Outlet } from 'react-router-dom'
import { AuthData } from './Auth'
export const PrivateRoutes = () => {
  const { isLoggedIn } = AuthData()

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}
