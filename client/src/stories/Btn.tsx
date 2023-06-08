interface BtnProps {
  label: string
  backgroundColor?: string
  onClick?: () => void
}

export const Btn = ({ backgroundColor, label, ...props }: BtnProps) => {
  return (
    <button
      className={`text-center px-8 py-2 rounded-md text-lg flex justify-center ${backgroundColor} text-white border-red-500`}
      {...props}
    >
      {label}
    </button>
  )
}
