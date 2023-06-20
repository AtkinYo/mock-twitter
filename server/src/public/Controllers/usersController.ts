export {
  getUser,
  updateUser,
  deleteUser,
  createUser,
  getAllUsers,
  getUserProfile,
  getLoggedInUser,
  editUserProfile,
}

import { PrismaClient, Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import argon2 from 'argon2'
require('dotenv').config()

const prisma = new PrismaClient()

// Create user
const createUser = async (req: Request, res: Response) => {
  const { name, username, email, password, confirmPwd } = req.body
  const hashedPassword = await argon2.hash(password)
  const minUsernameLengthConstraint: number = 3
  const maxUsernameLengthConstraint: number = 50
  const passwordLengthConstraint: number = 8

  if (
    username.length <= minUsernameLengthConstraint ||
    username.length >= maxUsernameLengthConstraint
  ) {
    return res
      .status(400)
      .json(
        `Username must be between ${minUsernameLengthConstraint} and ${maxUsernameLengthConstraint} characters`
      )
  }

  if (password.length < passwordLengthConstraint) {
    return res
      .status(400)
      .json(`Password must be at least ${passwordLengthConstraint} characters`)
  }

  if (email.length == 0) {
    return res
      .status(400)
      .json(`Looks like you've left a field empty. Please check and try again.`)
  }

  if (password !== confirmPwd) {
    return res.status(400).json(`no match`)
  }

  try {
    const createUserHandler = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        profile: {
          create: {
            bio: "I'm new here. Say hi!",
          },
        },
      },
    })
    res.status(200).json({
      message: 'Account creation successful! Welcome aboard!',
      user: createUserHandler,
    })
  } catch (e: any) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      const uniqueConstraint = e.meta!.target!
      res.status(400).json(`The ${uniqueConstraint} entered is in use`)
    } else {
      console.error(e)
      res.status(500).json('Internal Server Error')
    }
  }
}

// Find all users
const getAllUsers = async (res: Response) => {
  return res.json(await prisma.user.findMany())
}

// Find specific user
const getUser = async (req: Request, res: Response) => {
  const { id } = req.params

  const getUserHandler = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (getUserHandler === null) {
    return res.status(400).json(`User with ID ${id} doesn't exist`)
  }

  return res.json(getUserHandler)
}

// Update user
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { email, password, name, username } = req.body

  const updateUserHandler = await prisma.user
    .update({
      where: { id: Number(id) },
      data: { email, password, username, name },
    })
    .catch((e: Error) => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          const uniqueConstraint = e.meta!.target!

          res.status(400).json(`That ${uniqueConstraint} is taken`)
        }
      }
    })

  res.json(updateUserHandler)
}

// Find user by email
const getLoggedInUser = async (req: Request, res: Response) => {
  const { email } = req.body

  const getUserHandler = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (getUserHandler === null) {
    return res.status(400).json(`That ${email} doesn't exist`)
  }

  return res.json(getUserHandler)
}

// Delete user
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params

  return (
    await prisma.user.delete({ where: { id: Number(id) } }),
    res.status(200).json('User deleted')
  )
}

// Get Profile
const getUserProfile = async (req: Request, res: Response) => {
  const { username } = req.params

  const getProfile = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      profile: true,
    },
  })

  if (!getProfile) {
    return res.status(400).json(`User doesn't exist`)
  } else {
    return res.status(200).json(getProfile?.profile)
  }
}

// Edit Profile
const editUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params

  const { bio } = req.body

  const updateProfile = await prisma.profile.update({
    where: {
      userId: Number(id),
    },
    data: {
      bio: bio,
    },
  })

  if (!updateProfile) {
    return res.status(400).json(`User doesn't exist`)
  } else {
    return res.status(200).json(updateProfile)
  }
}
