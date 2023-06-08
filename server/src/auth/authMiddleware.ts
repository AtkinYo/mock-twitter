const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'

interface AuthRequest extends Request {
  user?: JwtPayload
}

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    console.log('Unauthorized access')
    return res.sendStatus(401)
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: any, user: JwtPayload) => {
      if (err) {
        console.error('------------Token verification failed------------', err)
        return res.status(403).json('Forbidden')
      }

      req.user = user

      return next()
    }
  )
}
