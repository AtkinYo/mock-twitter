import { AuthData } from '../auth/Auth'
import { Post } from '../../stories/Post'
import { useQuery } from '@tanstack/react-query'

export const UsersDraftedPosts = () => {
  const { user: userData } = AuthData()
  const user = userData.userInfo

  const { data: posts, isFetching } = useQuery(['data'], async () => {
    return await (
      await fetch(`http://localhost:3001/posts/draft/${user.id}`)
    ).json()
  })

  if (isFetching) {
    return (
      <span className="text-gray-500 h-screen flex items-center justify-center text-xl">
        Loading...
      </span>
    )
  }

  if (!posts.length) {
    return (
      <span className="text-gray-500 h-screen flex items-center justify-center text-xl">
        Looks like you don't have any drafts here
      </span>
    )
  }

  return (
    <div className="posts font-Inter">
      {posts.map(
        (
          userPost: { content: string; createdAt: string | undefined },
          i: number | undefined
        ) => (
          <Post
            content={userPost.content}
            timestamp={userPost.createdAt}
            iconBackgroundColor="bg-slate-400"
            loggedInUser
            username={user.username || ''}
            key={i}
          />
        )
      )}
    </div>
  )
}
