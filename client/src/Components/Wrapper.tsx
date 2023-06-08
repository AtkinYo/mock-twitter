import { AuthData } from '../utils/auth/Auth'

type Props = {
  children?: JSX.Element | JSX.Element[]
}

export const Wrapper = ({ children }: Props) => {
  const { isLoggedIn } = AuthData()

  return (
    <div
      className={`wrapper bg-cover bg-fixed bg-center ${
        !isLoggedIn ? 'bg-HomeBg' : 'bg-LoggedBg'
      }`}
    >
      {children}
    </div>
  )
}

// [040f0f]
