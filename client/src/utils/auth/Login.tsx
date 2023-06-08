import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FormEvent, useReducer } from 'react'
import HomeLogo from '../../assets/images/twitter-logo.png'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { AuthData } from './Auth'

export const Login = () => {
  const { login } = AuthData()

  const [formData, setFormData] = useReducer(
    (
      formData: { email: string; password: string },
      newItem: Partial<{ email: string; password: string }>
    ) => {
      return { ...formData, ...newItem }
    },
    { email: '', password: '' }
  )

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await login(formData.email, formData.password)
    } catch (error) {
      console.log('error')
    }
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center font-Inter">
        <div className="w-full py-36 lg:w-2/3 flex items-center justify-center flex-col rounded-md backdrop-blur-lg bg-slate-800/10">
          <img src={HomeLogo} width={120} height={120} className="mb-14" />

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-10 items-center justify-center"
          >
            <label>
              <input
                type="text"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ email: e.target.value })}
                className="bg-transparent outline-none border-b-2 border-indigo-500 text-indigo-100"
              />
            </label>

            <label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ password: e.target.value })}
                className="bg-transparent outline-none border-b-2 border-indigo-500 text-indigo-100"
              />
            </label>

            <button className="bg-indigo-500 w-full rounded-md mt-10 py-2 font-semibold text-indigo-100">
              Login
            </button>
          </form>
          <NavLink
            to={'/register'}
            className="text-sky-400 text-sm pt-10 text-center"
          >
            Want to create an account? <br />
            <span className="text-sky-200"> Click here to register</span> and
            become a member!
          </NavLink>
          <NavLink to={'/home'} className="text-sky-400 pt-10">
            <AiOutlineHome size={24} />
          </NavLink>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}
