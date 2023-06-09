import { Tweet } from '../../stories/Tweet'

export const NewTweet = () => {
  return (
    <>
      <div>
        <div className="m-3">
          <div className="sticky top-0 left-0 flex items-center justify-between w-full h-36 pb-8 z-10 backdrop-blur-lg bg-[#ffffff]/80">
            <h1 className="text-3xl font-Inter tracking-wide font-extralight select-none text-black">
              Tweet
            </h1>
          </div>
          <Tweet />
        </div>
      </div>
    </>
  )
}
