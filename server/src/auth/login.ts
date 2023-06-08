export { loginUser }

import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import argon2 from 'argon2'
import { createAccessToken, createRefreshToken } from './auth'
require('dotenv').config()

const prisma = new PrismaClient()

// Login user
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const loginUserHandler = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!loginUserHandler)
      return res
        .status(401)
        .json('No account associated with that email address')

    const matchHashedPassword = await argon2.verify(
      loginUserHandler!.password,
      password
    )

    if (matchHashedPassword) {
      res.cookie('jid', createRefreshToken(loginUserHandler), {
        httpOnly: true,
      })

      const accessToken: string = createAccessToken(loginUserHandler)
      return res.status(200).json({
        accessToken: accessToken,
        message: 'Welcome back!',
        User: loginUserHandler,
      })
    } else {
      return res.status(401).json('Incorrect password')
    }
  } catch (err) {
    console.error(err)
    res.json(err)
  }
}
