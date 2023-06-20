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
import { FollowPage } from '../Components/Pages/FollowPage'
import { Followers } from '../Components/Pages/Followers'
import { Following } from '../Components/Pages/Following'
import { NewTweet } from '../Components/Pages/NewTweet'

const NavigationRoutes = () => {
  const { isLoggedIn } = AuthData()

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
          <Route path="profile/:username" element={<Profile />} />
          <Route path="follows" element={<FollowPage />}>
            <Route index={true} element={<Followers />} />
            <Route path="followers" element={<Followers />} />
            <Route path="following" element={<Following />} />
          </Route>
          <Route path="tweet" element={<NewTweet />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export const MemoizedRoutes = React.memo(NavigationRoutes)
