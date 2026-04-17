import { createBrowserRouter } from 'react-router'
import App from '../App'
import RegisterPage from '../pages/register'
import LoginPage from '../pages/login'
import HomePage from '../pages/home'
import TopupPage from '../pages/topup'
import PaymentPage from '../pages/payment'
import TransactionPage from '../pages/transaction'
import AccountPage from '../pages/account'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'topup',
        element: <TopupPage />
      },
      {
        path: 'payments/:id',
        element: <PaymentPage />
      },
      {
        path: 'transaction',
        element: <TransactionPage />
      },
      {
        path: 'akun',
        element: <AccountPage />
      }
    ]
  },
])
