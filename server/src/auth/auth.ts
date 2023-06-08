import { sign } from 'jsonwebtoken'
require('dotenv').config()

export const createAccessToken = (user: { id: number }) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '1m',
  })
}

export const createRefreshToken = (user: { id: number }) => {
  return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  })
}
