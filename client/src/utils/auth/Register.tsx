/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent, FormEvent } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NavLink, useNavigate } from 'react-router-dom'
import HomeLogo from '../../assets/images/twitter-logo.png'
import { AiOutlineHome } from 'react-icons/ai'

const Register = () => {
  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPwd: '',
  })

  const { username, email, password, confirmPwd } = inputs

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate()

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const body = { name, username, email, password, confirmPwd }

      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const parseRes = await response.json()

      if (password !== confirmPwd) {
        response.status == 400
        return toast.error('Passwords do not match')
      }

      if (password.length !== confirmPwd.length) {
        response.status == 400
        return toast.error('Passwords do not match')
      }

      response.status !== 200
        ? toast.error(parseRes)
        : navigate('/login', { replace: true })
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center font-Inter">
        <div className="w-full py-36 lg:w-2/3 flex items-center justify-center flex-col rounded-md backdrop-blur-lg bg-slate-800/10">
          <img src={HomeLogo} width={120} height={120} className="mb-14" />

          <form
            method="post"
            onSubmit={handleRegister}
            className="flex flex-col gap-10 items-center justify-center"
          >
            <label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => onChange(e)}
                className="bg-transparent outline-none border-b-2 border-indigo-500 text-indigo-100"
              />
            </label>

            <label>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                className="bg-transparent outline-none border-b-2 border-indigo-500 text-indigo-100"
              />
            </label>

            <label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                className="bg-transparent outline-none border-b-2 border-indigo-500 text-indigo-100"
              />
            </label>

            <label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPwd"
                onChange={(e) => onChange(e)}
                className="bg-transparent outline-none border-b-2 border-indigo-500 text-indigo-100"
              />
            </label>

            <button className="bg-indigo-500 w-full rounded-md mt-10 py-2 font-semibold text-indigo-100">
              Register
            </button>
          </form>
          <NavLink to={'/login'} className="text-sky-400 text-sm pt-10">
            Already have an account? <span className="text-sky-200">Login</span>
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

export default Register
