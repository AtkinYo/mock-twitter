import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './auth/Register'
import { Dashboard } from '../Components/Pages/Dashboard'
import { PrivateRoutes } from './auth/PrivateRoutes'
import ErrorPage from '../error-page'
import { Feed } from '../Components/Pages/Feed'
import { AuthData } from './auth/Auth'
import { Home } from './auth/Home'
import { Login } from './auth/Login'
import { Drafts } from '../Components/Pages/Drafts'
import { Profile } from '../Components/Pages/Profile'
import { Followers } from '../Components/Pages/Followers'

const NavigationRoutes = () => {
  const { isLoggedIn } = AuthData()
  // prettier-ignore

  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route
        path="login"
        element={isLoggedIn ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="register"
        element={isLoggedIn ? <Navigate to="/" /> : <Register />}
      />

      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<Feed />} />
          <Route path="drafts" element={<Drafts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="followers" element={<Followers />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export const MemoizedRoutes = React.memo(NavigationRoutes)
