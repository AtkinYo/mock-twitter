import { NavLink } from 'react-router-dom'
import HomeLogo from '../../assets/images/twitter-logo-bird.png'

export const Home = () => {
  return (
    <div className="h-screen flex justify-center items-center font-Inter">
      <div className="w-full py-36 lg:w-2/3 flex items-center justify-center flex-col rounded-md backdrop-blur-lg bg-slate-800/10">
        <img src={HomeLogo} width={120} height={120} />

        <h1 className="mt-28 mb-28 text-sky-200 text-2xl tracking-wide font-light text-center select-none">
          Join the Conversation.
        </h1>

        <div className="w-4/5 flex items-center justify-center flex-col md:flex-row gap-5">
          <NavLink
            to={'/login'}
            className="mx-8 w-full text-base  bg-indigo-500 text-white rounded-md py-3 text-center"
          >
            Login
          </NavLink>
          <NavLink
            to={'/register'}
            className="mx-8 w-full text-base  bg-indigo-500 text-white rounded-md py-3 text-center"
          >
            Register
          </NavLink>
        </div>
      </div>
    </div>
  )
}
