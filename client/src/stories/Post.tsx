import { ReactNode } from 'react'
import { CiHeart } from 'react-icons/ci'
import { TiDelete } from 'react-icons/ti'
import { Link } from 'react-router-dom'

interface PostProps {
  username: string
  timestamp?: ReactNode
  content: string
  backgroundColor?: string
  iconBackgroundColor?: string
  published?: boolean
  key?: number
  loggedInUser: boolean
  likedPost?: boolean
  onDelete?: () => void
  drafted?: boolean
  postId?: number
  onClick?: () => void
}

export const Post = ({
  postId,
  content,
  username,
  onDelete,
  timestamp,
  published,
  likedPost,
  loggedInUser,
  backgroundColor,
  iconBackgroundColor,
}: PostProps) => {
  return (
    <div
      className="font-Inter post mb-2 rounded-lg p-4 bg-slate-100"
      style={{ backgroundColor }}
    >
      <div className="flex items-center text-lg">
        <Link
          to={`/profile/${username}`}
          className="text-base font-semibold pr-1 text-[#040f0f]"
        >
          {username}
        </Link>
        <p className="font-extralight text-xs text-[#040f0f]">
          &#8226; {timestamp}
        </p>
      </div>
      <div className="py-4 text-lg text-black font-normal leading-6 -tracking-tight">
        <p content="posts">{content}</p>
      </div>
      <ul className="flex gap-4">
        {published ? (
          <li
            className={`flex items-center ${
              likedPost ? 'bg-pink-700' : iconBackgroundColor
            }  p-1 rounded-md gap-1 cursor-pointer`}
          >
            <CiHeart size={23} style={{ color: 'white' }} />
          </li>
        ) : (
          false
        )}

        {loggedInUser && published ? (
          <li
            className={`flex items-center ${iconBackgroundColor} p-1 rounded-md gap-1 cursor-pointer`}
          >
            <TiDelete
              size={23}
              style={{ color: 'white' }}
              postid={postId}
              onClick={onDelete}
            />
          </li>
        ) : (
          false
        )}
      </ul>
    </div>
  )
}
