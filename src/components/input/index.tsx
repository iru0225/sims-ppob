import clsx from "clsx"
import EyeIcon from "../icons/eye.icon"
import { useState } from "react"

interface InputProps {
  id: string
  name: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  leftIcon?: React.ReactNode
  errorMessage?: string
  maxLength?: number
  minLength?: number
  readonly?: boolean
}

const InputComponent: React.FC<InputProps> = ({
  id,
  label,
  name,
  placeholder,
  value,
  onChange,
  className,
  type = 'text',
  leftIcon,
  errorMessage,
  maxLength,
  minLength,
  readonly
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{leftIcon}</div>}
        <input
          id={id}
          name={name}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          minLength={minLength}
          onChange={onChange}
          className={clsx(
            `mt-1 h-8 p-4 block w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`,
            className,
            errorMessage && 'border-red-500',
            type === 'password' && 'pr-10'
          )}
          readOnly={readonly}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            <EyeIcon width="20" height="20" color="#888" />
          </button>
        )}
    </div>
    <span className="text-red-500 text-sm float-right">{errorMessage}</span>
  </div>
  )
}

export default InputComponent;