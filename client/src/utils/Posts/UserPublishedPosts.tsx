import { AuthData } from '../auth/Auth'
import { Post } from '../../stories/Post'
import { useQuery } from '@tanstack/react-query'

export const UsersPublishedPosts = () => {
  const { user: userData } = AuthData()
  const user = userData.userInfo

  const {
    isFetching,
    isError,
    data: posts,
  } = useQuery(['data'], async () => {
    const data = await (
      await fetch(`http://localhost:3001/posts/publish/${user.id}`)
    ).json()
    const data2 = await (
      await fetch(`http://localhost:3001/follow/posts/${user.id}`)
    ).json()

    return [data, data2].flat()
  })

  if (isFetching) {
    return (
      <span className="h-screen flex items-center justify-center text-xl text-gray-500">
        Loading...
      </span>
    )
  }

  if (posts?.length === 0) {
    return (
      <span className="h-screen flex items-center justify-center text-xl text-gray-500">
        No Posts
      </span>
    )
  }

  if (isError) {
    return (
      <span className="h-screen flex items-center justify-center text-xl text-gray-500">
        {isError}
      </span>
    )
  }

  return (
    <div className="posts font-Inter">
      {posts?.map(
        (
          userPost: {
            content: string
            createdAt: string
            author:
              | {
                  id: number
                  email: string
                  username: string
                  published: boolean
                }
              | undefined
          },
          i: number | undefined
        ) => (
          <Post
            content={userPost.content}
            iconBackgroundColor="bg-slate-400"
            loggedInUser
            published
            timestamp={userPost.createdAt}
            username={
              !userPost.author?.username.length
                ? user.username
                : userPost.author?.username
            }
            key={i}
          />
        )
      )}
    </div>
  )
}

// userPost.author?.username ||
