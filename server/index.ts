import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const following = await prisma.user.findUnique({
    where: { id: 4 },
    select: { following: { select: { following: true } } },
  })
 
  // const posts = await prisma.post.findMany({
  //   where: {
  //     author: {
  //       id: { in: [...following!.following.map((user: { id: any }) => user.id), 4] },
  //     },
  //   },
  //   take: 10
  // })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

// async function main(followerId: number, followingId: number) {
//   const follower = await prisma.user.findUnique({ where: { id: followerId } })
//   const following = await prisma.user.findUnique({ where: { id: followingId } })

//   if (!follower || !following) {
//     throw new Error('Invalid user id')
//   }

//   const followExists = await prisma.follows.findUnique({
//     where: { followerId_followingId: { followerId, followingId } },
//   })

//   if (followExists) {
//     throw new Error('Already following this user')
//   }

//   const newFollow = await prisma.follows.create({
//     data: {
//       follower: { connect: { id: followerId } },
//       following: { connect: { id: followingId } },
//     },
//   })

//   return console.table(newFollow)
// }

// main(16, 4)
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

// const { PrismaClient } = require('@prisma/client')

// const prisma = new PrismaClient()

// async function getFollowers(userId: number) {
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//     include: { followedBy: { include: { follower: true } } },
//   })

//   if (!user) {
//     throw new Error(`User with ID ${userId} not found`)
//   }

//   console.table(user.followedBy.map((follow: { follower: any }) => follow.follower))
// }

// getFollowers(4)
//   .then(async () => {
//   await prisma.$disconnect()
// })
//   .catch(async (e) => {
//   console.error(e)
//   await prisma.$disconnect()
//   process.exit(1)
// })