import { CiHeart } from 'react-icons/ci'
import { TiDelete } from 'react-icons/ti'

interface PostProps {
  username: string
  timestamp?: string
  content: string
  backgroundColor?: string
  iconBackgroundColor?: string
  published?: boolean
  key?: number
  loggedInUser: boolean
  likedPost?: boolean
  onClick?: () => void
  drafted?: boolean
}

export const Post = ({
  key,
  content,
  username,
  timestamp,
  published,
  likedPost,
  loggedInUser,
  backgroundColor,
  iconBackgroundColor,
}: PostProps) => {
  return (
    <div
      key={key}
      className="font-Inter post mb-2 rounded-lg p-4 bg-slate-100"
      style={{ backgroundColor }}
    >
      <div className="flex items-center text-lg">
        <h3 className="text-base font-semibold pr-1 text-[#040f0f]">
          {username}
        </h3>
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
            <TiDelete size={23} style={{ color: 'white' }} />
          </li>
        ) : (
          false
        )}
      </ul>
    </div>
  )
}
