type Props = {
  children?: JSX.Element | JSX.Element[]
}

export const Container = ({ children }: Props) => {
  return <div className="max-w-7xl mx-auto px-6">{children}</div>
}
