import { HiHome } from 'react-icons/hi'
import { BsChatDotsFill, BsFillChatQuoteFill } from 'react-icons/bs'
import { LuDoorOpen } from 'react-icons/lu'
import { FaPeopleArrows, FaUser } from 'react-icons/fa'
import BirdLogo from '../assets/images/twitter-logo-bird.png'
import { AuthData } from '../utils/auth/Auth'
import { NavLink } from 'react-router-dom'
import { Btn } from '../stories/Btn'

export const SideNav = () => {
  const { logout } = AuthData()

  const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
    return {
      borderRight: isActive ? '3px solid #2563EB' : 0,
      fontWeight: isActive ? 700 : 400,
    }
  }
  return (
    <div className="sidenav h-screen hidden lg:flex flex-col justify-center font-Inter sticky top-0">
      <div className="h-full hidden lg:flex flex-col items-center justify-between text-center py-8">
        <ul className="w-full h-2/3 flex flex-col items-start justify-between text-gray-800">
          <li className="mx-auto">
            <img src={BirdLogo} width={48} />
          </li>
          <li className="w-full">
            <NavLink
              className="flex items-center justify-center xl:justify-between w-full p-3"
              style={navLinkStyles}
              to={'/'}
            >
              <HiHome size={24} />
              <span className="hidden xl:block text-lg">Home</span>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              className="flex items-center justify-center xl:justify-between w-full p-3"
              style={navLinkStyles}
              to={'drafts'}
            >
              <BsChatDotsFill size={24} />
              <span className="hidden xl:block text-lg">Drafts</span>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              className="flex items-center justify-center xl:justify-between w-full p-3"
              style={navLinkStyles}
              to={'followers'}
            >
              <FaPeopleArrows size={24} />
              <span className="hidden xl:block text-lg">Followers</span>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              className="flex items-center justify-center xl:justify-between w-full p-3"
              style={navLinkStyles}
              to={'profile'}
            >
              <FaUser size={24} />
              <span className="hidden xl:block text-lg">Profile</span>
            </NavLink>
          </li>

          <li className="flex items-center justify-center w-full">
            <NavLink to={'tweet'}>
              <Btn label="Tweet" backgroundColor="bg-blue-500" />
            </NavLink>
          </li>
        </ul>
        <ul className="w-full cursor-pointer" onClick={logout}>
          <li className="flex items-center justify-center w-full">
            <Btn
              label="Logout"
              backgroundColor="bg-blue-500"
              onClick={logout}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

export const MobileNavbar = () => {
  const { logout } = AuthData()

  const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
    return {
      backgroundColor: isActive ? '#2563EB' : 'transparent',
    }
  }
  return (
    <div className="block lg:hidden">
      <div className="absolute">
        <div className="flex justify-center backdrop-blur-lg bg-black/30 mx-auto rounded-lg lg:hidden my-3 h-16 w-10/12 fixed left-0 right-0 bottom-0 z-20">
          <div className="menu w-full flex items-center rounded-md">
            <ul className="w-full flex justify-around items-center">
              <li>
                <NavLink
                  className="flex p-1 rounded-md"
                  style={navLinkStyles}
                  to={'/'}
                >
                  <HiHome size={24} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex p-1 rounded-md"
                  style={navLinkStyles}
                  to={'drafts'}
                >
                  <BsChatDotsFill size={22} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex p-1 rounded-md"
                  style={navLinkStyles}
                  to={'followers'}
                >
                  <FaPeopleArrows size={22} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex p-1 rounded-md"
                  style={navLinkStyles}
                  to={'profile'}
                >
                  <FaUser size={22} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex p-1 rounded-md"
                  style={navLinkStyles}
                  to={'tweet'}
                >
                  <BsFillChatQuoteFill size={22} />
                </NavLink>
              </li>
              <li onClick={logout} className="cursor-pointer">
                <LuDoorOpen size={26} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
