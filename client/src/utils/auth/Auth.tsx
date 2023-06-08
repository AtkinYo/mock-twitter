/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Container } from '../../Components/Container'
import { MemoizedRoutes } from '../RenderRoutes'
import { Wrapper } from '../../Components/Wrapper'

interface UserInfo {
  id?: number
  email?: string
  username?: string
}

interface User {
  isAuthenticated: boolean
  userInfo: UserInfo
}

const AuthContext = createContext<{
  user: User
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoggedIn: string | null
}>({
  user: {
    isAuthenticated: false,
    userInfo: {},
  },
  login: async (_email: string, _password: string) => {},
  logout: () => {},
  isLoggedIn: '',
})

export const AuthData = () => useContext(AuthContext)

export const AuthWrapper = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      return JSON.parse(storedUser)
    }
    return {
      isAuthenticated: false,
      userInfo: {},
    }
  })

  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    try {
      const body = { email, password }
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const parseRes = await res.json()
      const token = parseRes.accessToken
      const userData = parseRes.User

      res.status !== 200
        ? (toast.error(parseRes), null)
        : (setUser({
            isAuthenticated: true,
            userInfo: userData,
          }),
          localStorage.setItem('jid', token),
          navigate('/'))

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message)
    }
  }

  const isLoggedIn = localStorage.getItem('jid')

  const logout = () => {
    setUser({ ...user, isAuthenticated: false })
    localStorage.removeItem('jid')
  }

  useEffect(() => {
    if (user.isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      <>
        <Wrapper>
          <Container>
            <MemoizedRoutes />
          </Container>
        </Wrapper>
      </>
    </AuthContext.Provider>
  )
}
