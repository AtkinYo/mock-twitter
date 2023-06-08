import { TbSearch } from 'react-icons/tb'

export const SideView = () => {
  return (
    <aside className="hidden h-screen lg:block sticky top-0 text-gray-800">
      <div className="aside-in h-screen hidden lg:flex flex-col">
        <div className="h-[90%] hidden lg:flex flex-col px-3 font-Inter mt-14 mb-1 pb-8">
          <form>
            <div className="flex items-center border-gray-200 border-[1px] rounded-md p-2">
              <input
                className="w-full bg-transparent outline-none"
                type="text"
                placeholder="search"
              />
              <TbSearch size={30} />
            </div>
          </form>
          <h1 className="text-2xl mt-14 mb-1 pb-8">What's Trending</h1>
          <div className="box bg-slate-100 p-4 mb-2 rounded-md flex items-center justify-between">
            <div className="img bg-gray-400 rounded-md w-12 h-12"></div>
            <span className="text text-sm w-4/5">
              US Federal government and 48 states file antitrust lawsuits
            </span>
          </div>
          <div className="box bg-slate-100 p-4 mb-2 rounded-md flex items-center justify-between">
            <div className="img bg-gray-400 rounded-md w-12 h-12"></div>
            <span className="text text-sm w-4/5">
              US Federal government and 48 states file antitrust lawsuits
            </span>
          </div>
          <div className="box bg-slate-100 p-4 mb-2 rounded-md flex items-center justify-between">
            <div className="img bg-gray-400 rounded-md w-12 h-12"></div>
            <span className="text text-sm w-4/5">
              US Federal government and 48 states file antitrust lawsuits
            </span>
          </div>
          <div className="box bg-slate-100 p-4 mb-2 rounded-md flex items-center justify-between">
            <div className="img bg-gray-400 rounded-md w-12 h-12"></div>
            <span className="text text-sm w-4/5">
              US Federal government and 48 states file antitrust lawsuits
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
