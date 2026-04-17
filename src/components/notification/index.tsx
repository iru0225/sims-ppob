import { useEffect } from "react"

interface NotificationProps {
  children: React.ReactNode
  onClose: (data: boolean) => void
  autoClose?: boolean
}

const Notification = ({
  children,
  onClose,
  autoClose
}: NotificationProps) => {
  useEffect(() => {
    if (autoClose) {
      setTimeout(() => {
        onClose(true)
      }, 3000)
    }
  }, [])

  return(
    <div
      className="fixed inset-0 bg-black/50"
      onClick={() => onClose(true)}
    >
      <div
        className="absolute top-[25%] left-[35%] w-fit p-6 bg-white rounded-sm"
      >
        {children}
      </div>
    </div>
  )
}

export default Notification