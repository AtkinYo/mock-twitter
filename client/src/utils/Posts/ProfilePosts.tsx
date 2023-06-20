import { Post } from '../../stories/Post'
import { useMutation, useQuery } from 'react-query'
import { deletePost, getPostsByUsername } from '../../api/PostsOperations'
import moment from 'moment'
import { AuthData } from '../auth/Auth'

export const ProfilePosts = ({ userId }: { userId: string }) => {
  const { user } = AuthData()
  const deletePostMutation = useMutation(deletePost)

  const loggedUsername = user.userInfo.username

  const {
    data: posts,
    isFetching,
    isLoading,
    refetch,
  } = useQuery(
    ['ProfilePosts', userId],
    () => getPostsByUsername(userId || ''),
    {
      refetchOnMount: true,
    }
  )

  if (isFetching || isLoading) {
    return (
      <span className="h-screen flex items-center justify-center text-xl text-gray-500">
        Loading...
      </span>
    )
  }

  if (posts?.data.length === 0) {
    return (
      <span className="h-screen flex items-center justify-center text-xl text-gray-500">
        No Posts
      </span>
    )
  }

  // Render & sort posts by date
  const RenderProfilePosts = [posts?.data].flat().sort((a, b) => {
    return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
  })

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePostMutation.mutateAsync(postId)
    } catch (error) {
      console.error('Error deleting post:', error)
    }

    return refetch()
  }

  return (
    <div className="posts font-Inter">
      {RenderProfilePosts?.map(
        (render: {
          content: string
          createdAt: string | undefined
          id: number
          published: boolean
          author: {
            username: string
          }
        }) => (
          <Post
            content={render.content}
            iconBackgroundColor="bg-slate-400"
            loggedInUser={loggedUsername !== userId ? false : true}
            published
            timestamp={moment(render.createdAt).fromNow()}
            username={userId}
            key={render.id}
            onDelete={() => handleDeletePost(render.id)}
          />
        )
      )}
    </div>
  )
}
