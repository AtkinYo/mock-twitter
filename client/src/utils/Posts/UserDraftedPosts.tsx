import { useState } from 'react'
import { AuthData } from '../auth/Auth'
import { Post } from '../../stories/Post'
import { useQuery } from '@tanstack/react-query'
export const UsersDraftedPosts = () => {
  const { user: userData } = AuthData()
  const user = userData.userInfo

  const [posts, setPosts] = useState([
    {
      authorId: 0,
      content: '',
      createdAt: '',
      id: Number,
      published: Boolean,
    },
  ])

  const { isLoading } = useQuery(['data'], async () => {
    const data = await (
      await fetch(`http://localhost:3001/posts/draft/${user.id}`)
    ).json()

    console.log(data)

    return setPosts(data)
  })

  if (isLoading) {
    return (
      <span className="text-gray-500 h-screen flex items-center justify-center text-xl">
        Loading...
      </span>
    )
  }

  // useEffect(() => {
  //   // Fetch data from the API
  //   fetch(`http://localhost:3001/posts/draft/${user.id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPosts(data)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching API data:', error)
  //     })
  // }, [user.id])

  return (
    <div className="posts font-Inter">
      {posts.map((userPost, i) => (
        <Post
          content={userPost.content}
          timestamp={userPost.createdAt}
          iconBackgroundColor="bg-slate-400"
          loggedInUser
          username={user.username || ''}
          key={i}
        />
      ))}
    </div>
  )
}
