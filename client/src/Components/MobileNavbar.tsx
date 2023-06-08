import { AiOutlineHome } from 'react-icons/ai'
import { RxCrumpledPaper } from 'react-icons/rx'
import { FiUsers } from 'react-icons/fi'
import { RxPencil2 } from 'react-icons/rx'
import { CgProfile } from 'react-icons/cg'

export const MobileNavbar = () => {
  return (
    <div>
      <div className="absolute">
        <div className="flex justify-center backdrop-blur-lg bg-black/30 mx-auto rounded-lg lg:hidden my-3 h-16 w-10/12 fixed left-0 right-0 bottom-0 z-20">
          <div className="menu w-full flex items-center rounded-md">
            <ul className="w-full flex justify-around items-center">
              <li>
                <AiOutlineHome size={22} />
              </li>
              <li>
                <RxCrumpledPaper size={22} />
              </li>
              <li>
                <FiUsers size={22} />
              </li>
              <li>
                <RxPencil2 size={22} />
              </li>
              <li>
                <CgProfile size={22} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
