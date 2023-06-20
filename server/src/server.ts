// Controller Imports
import * as followersController from './public/Controllers/followersController'
import * as userController from './public/Controllers/usersController'
import * as postController from './public/Controllers/postsController'
import { loginUser } from './auth/login'

import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client'
import express, { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import cors from 'cors'
const path = require('path')
require('dotenv').config()
const app = express()
const PORT = 3001
const prisma = new PrismaClient()

// Middleware
import { isAuth } from './auth/authMiddleware'
import { createAccessToken, createRefreshToken } from './auth/auth'
app.use(cookieParser())
app.use(express.json())
app.use(cors())

// Refresh token
app.post('/refresh_token', async (req: Request, res: Response) => {
  const token = req.cookies.jid

  if (!token)
    return res.send({ ok: false, accesToken: '', message: 'Token not true' })

  let payload: any = null
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
  } catch (err) {
    console.error('++++++++++++++++ Error Here ++++++++++++++++', err)
    return res.send({ ok: false, accesToken: '', message: 'Payload error' })
  }

  // Token is valid
  // Send back an access token

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
  })

  if (!user) return res.send({ ok: false, accessToken: '' })

  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
  })

  return res.send({ ok: true, accessToken: createAccessToken(user) })
})

// User operations
app.delete('/user/:id', userController.deleteUser)
app.patch('/user/:id', userController.updateUser)
app.post('/register', userController.createUser)
app.get('/users', userController.getAllUsers)
app.get('/user/:id', userController.getUser)
app.post('/login', loginUser)

// Post operations
app.get('/posts/publish/:id', postController.getUsersPublishedPosts)
app.get('/posts/:username', postController.getUserPostsByUsername)
app.post('/post/publish/:id', postController.createPublishedPost)
app.get('/posts/draft/:id', postController.getUsersDraftedPosts)
app.post('/post/draft/:id', postController.createDraftedPost)
app.get('/posts/publish', postController.getPublishedPosts)
app.get('/posts/draft', postController.getDraftedPosts)
app.delete('/post/:id', postController.deletePost)

// Follow operations
app.get('/follow/posts/:id', followersController.getFollowingPosts)
app.get('/followers/:id', followersController.getUserFollowers)
app.get('/following/:id', followersController.getUserFollowing)
app.delete('/follow/:id', followersController.unfollowUser)
app.post('/follow/:id', followersController.followUser)

// Profile Operations
app.get('/profile/:username', userController.getUserProfile)
app.post('/profile/update/:id', userController.editUserProfile)

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})
