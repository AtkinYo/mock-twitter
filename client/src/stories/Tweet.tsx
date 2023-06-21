import { ChangeEvent, FormEvent, useState } from 'react'
import { AuthData } from '../utils/auth/Auth'
import { useNavigate } from 'react-router-dom'

export const Tweet = () => {
  const { user } = AuthData()

  const [newTweet, setNewTweet] = useState({
    content: '',
  })

  const navigate = useNavigate()

  const { content } = newTweet

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTweet({ ...newTweet, [e.target.name]: e.target.value })
  }

  const createPublishedPost = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const body = { content }

      const response = await fetch(
        `http://localhost:3001/post/publish/${user.userInfo.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      )

      const parseRes = await response.json()

      response.status == 200 ? navigate('/', { replace: true }) : null

      return parseRes

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message)
    }
  }

  const createDraftedPost = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const body = { content }

      const response = await fetch(
        `http://localhost:3001/post/draft/${user.userInfo.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      )

      const parseRes = await response.json()

      response.status == 200 ? navigate('/', { replace: true }) : null

      return parseRes

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return (
    <div className="border-[1px] border-gray-200 rounded-md p-3">
      <form
        method="post"
        // onSubmit={createPublishedPost}
        className="flex flex-col items-end"
      >
        <textarea
          name="content"
          id="createPost"
          placeholder="Whats on your mind?"
          value={content}
          className="border-[1px] border-gray-200 rounded-md w-full pb-20 outline-none p-2 mb-4 placeholder:text-gray-500 text-gray-600"
          onChange={(e) => onChange(e)}
        />

        {content.length >= 140 ? (
          <p className="text-gray-500 w-full select-none">
            Must be less than 140 characters
          </p>
        ) : null}

        <div className="gap-8 flex">
          <button
            type="submit"
            className={`text-white text-lg px-6 py-1 rounded-md ${
              content.length == 0 || content.length >= 140
                ? 'bg-gray-500'
                : 'bg-blue-500'
            }`}
            disabled={content.trim() === '' || content.length > 140}
            onClick={createPublishedPost}
          >
            Tweet
          </button>

          <button
            type="submit"
            className={`text-white text-lg px-6 py-1 rounded-md ${
              content.length == 0 || content.length >= 140
                ? 'bg-gray-500'
                : 'bg-blue-500'
            }`}
            disabled={content.trim() === '' || content.length > 140}
            onClick={createDraftedPost}
          >
            Draft
          </button>
        </div>
      </form>
    </div>
  )
}
