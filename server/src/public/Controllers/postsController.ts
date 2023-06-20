export {
  createPublishedPost,
  createDraftedPost,
  deletePost,
  getPublishedPosts,
  getDraftedPosts,
  getUsersPublishedPosts,
  getUsersDraftedPosts,
  getUserPostsByUsername,
}

import { PrismaClient, Prisma } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

// Create a published post
const createPublishedPost = async (req: Request, res: Response) => {
  const { id } = req.params
  const { content } = req.body

  const publishPost = await prisma.post.create({
    data: {
      content,
      authorId: Number(id),
      published: true,
    },
  })

  return res.status(200).json(publishPost)
}

// Create a drafted post
const createDraftedPost = async (req: Request, res: Response) => {
  const { id } = req.params
  const { content } = req.body

  const draftPost = await prisma.post.create({
    data: {
      content,
      authorId: Number(id),
      published: false,
    },
  })

  return res.status(200).json(draftPost)
}
// Delete post
const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params

  const deletePostHandler = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })

  return res.status(200).json('Post Gone')
}

// Get all published posts
const getPublishedPosts = async (req: Request, res: Response) => {
  const publishedPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
  })

  return res.json(publishedPosts)
}

// Get all drafted posts
const getDraftedPosts = async (req: Request, res: Response) => {
  const draftedPosts = await prisma.post.findMany({
    where: {
      published: false,
    },
  })

  return res.json(draftedPosts)
}

// Get all published posts by user
const getUsersPublishedPosts = async (req: Request, res: Response) => {
  const { id } = req.params

  const userPublishedPosts = await prisma.post.findMany({
    where: {
      published: true,
      authorId: Number(id),
    },
    include: {
      author: true,
    },
  })

  return res.status(200).json(userPublishedPosts)
}
// const getUsersPublishedPosts = async (req: Request, res: Response) => {
//   const { id } = req.params

//   const userPublishedPosts = await prisma.post.findMany({
//     where: {
//       published: true,
//       authorId: Number(id),
//     },
//   })

//   return res.status(200).json(userPublishedPosts)
// }

// Get all drafted posts by user
const getUsersDraftedPosts = async (req: Request, res: Response) => {
  const { id } = req.params

  const userDraftedPosts = await prisma.post.findMany({
    where: {
      published: false,
      authorId: Number(id),
    },
  })

  return res.json(userDraftedPosts)
}

// Get posts by username
const getUserPostsByUsername = async (req: Request, res: Response) => {
  const { username } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        posts: {
          where: {
            published: true,
          },
        },
      },
    })

    if (!user) {
      throw new Error(username)
      return res.status(400).json(username)
    }

    return res.status(200).json(user.posts)
  } catch (error) {
    console.error('Error retrieving user posts:', error)
    throw error
  }
}
