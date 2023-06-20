import { Link } from 'react-router-dom'

interface CardProps {
  username: string
  bio?: string
}

export const FollowCard = ({ username }: CardProps) => {
  return (
    <div className="mb-3 bg-slate-400 p-3 rounded-sm font-Inter">
      <div className="flex flex-col gap-6">
        <Link to={`/profile/${username}`}>
          <h1 className="text-xl">{username}</h1>
        </Link>
      </div>
    </div>
  )
}
