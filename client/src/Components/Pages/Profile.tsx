import { useQueries, useQuery } from 'react-query'
import { ProfileHeader } from '../../stories/ProfileHeader'
import { ProfilePosts } from '../../utils/Posts/ProfilePosts'
import { AuthData } from '../../utils/auth/Auth'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const getProfile = (username: string) => {
  return axios.get(`http://localhost:3001/profile/${username}`)
}

const getFollowingCount = (userId: number) => {
  return axios.get(`http://localhost:3001/following/${userId}`)
}

const getFollowerCount = (userId: number) => {
  return axios.get(`http://localhost:3001/followers/${userId}`)
}

export const Profile = () => {
  const { user: userData } = AuthData()
  const loggedUsername = userData.userInfo.username

  const { username } = useParams()

  const { data, isLoading } = useQuery(
    ['ProfileData'],
    () => getProfile(username || ''),
    {
      refetchOnMount: true,
      refetchInterval: 10000,
      placeholderData: {
        data: {
          bio: '',
        },
      },
    }
  )

  const profile = data?.data

  const { id, bio, userId } = profile

  const getFollowCounts = useQueries([
    {
      queryKey: ['Following-Count', userId],
      queryFn: () => getFollowingCount(userId || 0),
    },
    {
      queryKey: ['Follower-Count', userId],
      queryFn: () => getFollowerCount(userId || 0),
    },

    {
      staleTime: Infinity,
      cacheTime: 0,
    },
  ])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  const renderFollowCount = [
    getFollowCounts[0].data?.data.length || [],
    getFollowCounts[1].data?.data.length || [],
  ]

  const [renderFollowingCount, renderFollowerCount] = renderFollowCount

  return (
    <>
      <div>
        <div className="m-3">
          <div className="sticky top-0 left-0 flex items-center justify-between w-full h-36 pb-8 z-10 backdrop-blur-lg bg-[#ffffff]/80">
            <h1 className="text-3xl font-Inter tracking-wide font-extralight select-none text-black">
              Profile
            </h1>
          </div>
          <ProfileHeader
            backgroundColor="bg-slate-400"
            bio={bio || ''}
            followerCount={renderFollowerCount}
            followingCount={renderFollowingCount}
            username={username || ''}
            loggedUser={loggedUsername !== username ? false : true}
            userId={id}
            key={id}
          />

          <ProfilePosts userId={username || ''} />
        </div>
      </div>
    </>
  )
}
