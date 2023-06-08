import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { SideNav, MobileNavbar } from '../SideNav'
import { SideView } from '../SideView'
import { AuthData } from '../../utils/auth/Auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const Dashboard = () => {
  const { isLoggedIn } = AuthData()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  return (
    <>
      <div className="relative h-full grid grid-cols-[1fr] lg:grid-cols-[1fr,_5fr,_3fr] text-white">
        <QueryClientProvider client={queryClient}>
          <SideNav />
          <MobileNavbar />
          <Outlet />
          <SideView />
        </QueryClientProvider>
      </div>
    </>
  )
}
