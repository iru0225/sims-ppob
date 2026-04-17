import { createContext, useContext, useState } from "react";
import Notification from "../components/notification";

interface NotificationContextType {
  showNotification?: (data: React.ReactNode, isPreventAutoClose?: boolean) => void
  hideNotification?: () => void
}

const NotificationContext = createContext<NotificationContextType>({
  showNotification: undefined,
  hideNotification: undefined
});

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<React.ReactNode | null>(null);
  const [showNotif, setShowNotif] = useState(false)
  const [autoClose, setAutoClose] = useState(true)

  const showNotification = (msg: React.ReactNode, preventClose?: boolean) => {
    setMessage(msg)
    setShowNotif(true)
    setAutoClose(!preventClose)
  };

  const hideNotification = () => {
    setMessage(null)
    setShowNotif(false)
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, hideNotification }}
    >
      {children}
      {
        showNotif && (
          <Notification onClose={hideNotification} autoClose={autoClose}>
            {message}
          </Notification>
        )
      }
    </NotificationContext.Provider>
  );
};