import clsx from "clsx"
import { useMemo } from "react"

interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}

const ButtonComponent: React.FC<ButtonProps> = ({ label, onClick, className, disabled, variant = 'primary', type = 'button' }) => {
  const variantClass = useMemo(() => ({
    primary: 'bg-[#F42619] hover:bg-[#d32217] hover:border-[#d32217] text-white',
    secondary: 'bg-white border border-[#F42619] hover:bg-[#F42619] hover:text-white'
  }), [])
  return (
    <button
      onClick={onClick}
      className={clsx(
        `w-full px-4 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed`,
        variantClass[variant],
        className
      )}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  )
}

export default ButtonComponent;