import { AuthData } from '../auth/Auth'
import { Post } from '../../stories/Post'
import { useQueries, useMutation } from 'react-query'
import moment from 'moment'

import {
  getUsersPublishedPosts,
  getFollowingPosts,
  deletePost,
} from '../../api/PostsOperations'

export const FeedPosts = () => {
  const { user: userData } = AuthData()
  const user = userData.userInfo
  const userId = user.id

  const getFeedPosts = useQueries([
    {
      queryKey: ['Published-Posts', userId],
      queryFn: () => getUsersPublishedPosts(userId || 0),
    },
    {
      queryKey: ['Following-Posts', userId],
      queryFn: () => getFollowingPosts(userId || 0),
    },

    {
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
    },
  ])

  const refetchFeed = getFeedPosts.some((query) => query.refetch)

  const RenderFeedPosts = [
    getFeedPosts[0].data?.data || [],
    getFeedPosts[1].data?.data || [],
  ]
    .flat()
    .sort((a, b) => {
      return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
    })

  const deletePostMutation = useMutation(deletePost)

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePostMutation.mutateAsync(postId)
      getFeedPosts.forEach((query) => query.refetch())
    } catch (error) {
      console.error('Error deleting post:', error)
    }

    return refetchFeed
  }

  return (
    <div className="posts font-Inter">
      {RenderFeedPosts?.map(
        (userPost: {
          content: string
          createdAt: string
          authorId: number
          id: number
          author:
            | {
                id: number
                email: string
                username: string
                published: boolean
              }
            | undefined
        }) => (
          <Post
            content={userPost.content}
            iconBackgroundColor="bg-slate-400"
            loggedInUser={user.id !== userPost.authorId ? false : true}
            published
            timestamp={moment(userPost.createdAt).fromNow()}
            username={
              !userPost.author?.username.length
                ? user.username || ''
                : userPost.author?.username || ''
            }
            key={userPost.id}
            postId={userPost.id}
            onDelete={() => handleDeletePost(userPost.id)}
          />
        )
      )}
    </div>
  )
}
