import { useQuery } from 'react-query'
import { FollowCard } from '../../stories/FollowCard'
import { AuthData } from '../../utils/auth/Auth'
import { getFollowers } from '../../api/FollowOperations'

export const Followers = () => {
  const { user: userData } = AuthData()
  const user = userData.userInfo

  const { data: followers } = useQuery(
    'Followers',
    () => getFollowers(user.id || 0),
    {
      refetchOnMount: true,
    }
  )

  return (
    <div className="text-black">
      {followers?.data.map((f: { username: string }, i: number) => (
        <FollowCard username={f.username} key={i} />
      ))}
    </div>
  )
}
