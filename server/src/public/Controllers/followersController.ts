export {
  getUserFollowers,
  getUserFollowing,
  followUser,
  unfollowUser,
  getFollowingPosts
}

import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express'

const prisma = new PrismaClient()

// Get followers list from specific user
const getUserFollowers = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id)
    },
    include:
    { followedBy: { include: { follower: true } } },
  })

  if (!user) {
    res.json(`User with ID ${id} not found`)
  }

  res
  .status(200)
  .json(user!.followedBy.map((follow: { follower: any }) => follow.follower))

}

// Get following lists from specific user
const getUserFollowing = async (req: Request, res: Response) => {

  const { id } = req.params

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { following: { include: { following: true } } },
  })

  if (!user) {
    res
    .status(400)
    .json(`User with ID ${id} not found`)
  }

  res
  .status(200)
  .json(user!.following.map((follow: { following: any }) => follow.following))
}

// Follower a user
const followUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { following } = req.body

  async function main(followerId: number, FollowingId: number) {
    const follower = await prisma.user.findUnique({ where: { id: followerId } })
    const following = await prisma.user.findUnique({ where: { id: FollowingId } })

    if (!follower || !following) {
      throw new Error('Invalid user id')
    }

    const newFollow = await prisma.follows.create({
      data: {
        follower: { connect: { id: followerId } },
        following: { connect: { id: FollowingId } },
      },
    })

    return res.json(newFollow)
  }

  main(Number(id), Number(following))
}

// Unfollower a user
const unfollowUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { following } = req.body

  const unfollow =  async (followerId: number, followingId: number) => {
    const unfollowUserHandler = await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    })

    res.json(unfollowUserHandler)
  }

  unfollow(Number(id), Number(following))

}

// Get posts from who user is following
const getFollowingPosts = (req: Request, res: Response) => {
  const { id } = req.params
  
  const getPostsFromFollowedUsers = async (userId: number) => {
    const followedUsers = await prisma.user
      .findUnique({ where: { id: userId } })
      .following();
  
    const followedUserIds = followedUsers!.map((user) => user.followingId);
  
    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: followedUserIds,
        },
      },
    });
  
    return res
    .status(200)
    .json(posts);
  };

  getPostsFromFollowedUsers(Number(id))
  
}
