import TwitLogo from '../../assets/images/twitter-logo.png'
import { UsersPublishedPosts } from '../../utils/Posts/UserPublishedPosts'

export const Feed = () => {
  return (
    <>
      <div className="feed">
        <div className="feed-container m-3">
          <div className="feed-header sticky top-0 left-0 flex items-center justify-between w-full h-36 pb-8 z-10 backdrop-blur-lg bg-[#ffffff]/80">
            <h1 className="text-3xl font-Inter tracking-wide font-extralight select-none text-black">
              Stream
            </h1>
            <img src={TwitLogo} width={100} />
          </div>
          <div>
            <UsersPublishedPosts />
          </div>
        </div>
      </div>
    </>
  )
}
