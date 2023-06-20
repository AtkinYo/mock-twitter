import { useQuery } from 'react-query'
import { FollowCard } from '../../stories/FollowCard'
import { AuthData } from '../../utils/auth/Auth'
import { getFollowing } from '../../api/FollowOperations'

export const Following = () => {
  const { user: userData } = AuthData()
  const user = userData.userInfo

  const { data: following } = useQuery(
    'Following',
    () => getFollowing(user.id || 0),
    {
      refetchOnMount: true,
    }
  )

  return (
    <div className="text-black">
      {following?.data.map((f: { username: string }, i: number) => (
        <FollowCard username={f.username} key={i} />
      ))}
    </div>
  )
}
