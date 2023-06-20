import { NavLink, Outlet, useLocation } from 'react-router-dom'

export const FollowPage = () => {
  const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
    return {
      borderBottom: isActive ? '3px solid #2563EB' : 0,
      fontWeight: isActive ? 700 : 400,
    }
  }

  const location = useLocation()

  let displayText

  if (location.pathname.includes('/followers')) {
    displayText = 'Followers'
  } else if (location.pathname.includes('/following')) {
    displayText = 'Following'
  } else {
    displayText = 'Follows'
  }

  return (
    <>
      <div>
        <div className="m-3">
          <div className="sticky top-0 left-0 flex items-center justify-between w-full h-36 pb-8 z-10 backdrop-blur-lg bg-[#ffffff]/80">
            <h1 className="text-3xl font-Inter tracking-wide font-extralight select-none text-black">
              {displayText}
            </h1>
          </div>
          <div className="w-full bg-slate-200 flex items-center justify-between font-Inter tracking-wider text-gray-800 rounded-sm font-light mb-6">
            <NavLink
              to={'followers'}
              className="w-1/2 text-center p-4"
              style={navLinkStyles}
            >
              Followers
            </NavLink>
            <NavLink
              to={'following'}
              className="w-1/2 text-center p-4"
              style={navLinkStyles}
            >
              Following
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  )
}
