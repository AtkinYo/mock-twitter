interface HeaderProps {
  username: string
  bio: string
  followerCount: number
  followingCount: number
  following?: boolean
  loggedUser: boolean
  backgroundColor: string
  onClick?: () => void
  userId: number
}

export const ProfileHeader = ({
  username,
  bio,
  following,
  followerCount,
  followingCount,
  loggedUser,
  backgroundColor,
}: HeaderProps) => {
  return (
    <header
      className={`${backgroundColor} rounded-md p-4 font-Inter text-black mb-4`}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">{username}</h2>
        {!loggedUser ? (
          <button className="bg-blue-500 text-white font-medium tracking-wider px-6 py-2 rounded-md">
            {following ? 'Following' : 'Follow'}
          </button>
        ) : null}
      </div>

      <p className="lg:w-3/4 text-justify mb-4 font-medium">{bio}</p>

      <div className="follower-count flex gap-6">
        <p className="font-light">
          <span className="font-semibold">{followerCount}</span>
          {followerCount == 1 ? ' Follower' : ' Followers'}
        </p>
        <p className="font-light">
          <span className="font-semibold">{followingCount}</span> Following
        </p>
      </div>
    </header>
  )
}
