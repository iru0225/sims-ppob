import React, { useCallback, useEffect, useState } from "react"
import ButtonComponent from "../../components/button"
import EmailIcon from "../../components/icons/email.icon"
import InputComponent from "../../components/input"
import { Link, useNavigate } from "react-router"
import LockIcon from "../../components/icons/lock.icon"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { accessTokenSelector, isFetchFailedSelector, messageSelector, userAction } from "../../store/slice/userSlice"
import CrossIcon from "../../components/icons/cross.icon"
import { useNotification } from "../../context/notification-context"

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isFailed = useAppSelector(isFetchFailedSelector)
  const token = useAppSelector(accessTokenSelector)
  const message = useAppSelector(messageSelector)
  const { showNotification } = useNotification()
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  useEffect(() => {
    if (typeof isFailed !== 'undefined' && isFailed) {
      showNotification?.(<div className="flex flex-col items-center gap-4 mx-auto">
        <div className="rounded-4xl bg-red-600 w-fit p-3">
          <CrossIcon width="24" height="24" color="white"/>
        </div>
        <h5>{message}</h5>
      </div>)

      setTimeout(() => {
        dispatch(userAction.resetMessage())
      }, 500);
    }

  }, [isFailed])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    setLoginForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault()
    dispatch(userAction.login({
      payload: {
        ...loginForm
      }
    }))
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col w-1/2 my-auto">
        <div className="flex gap-2 justify-center">
          <img src='/images/Logo.png' alt='Logo image' className="w-8 h-8"/>
          <h3 className="text-xl font-bold text-center mb-4">SIMS PPOB</h3>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Masuk atau buat akun untuk memulai</h2>
        <form className="w-full max-w-sm mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputComponent
            id="email-input"
            name="email"
            type="email"
            className="pl-8"
            onChange={handleChange}
            value={loginForm['email']}
            placeholder="Masukan email anda"
            leftIcon={<EmailIcon width="20" height="20" color="#888" />}
          />
          <InputComponent
            id="password"
            name="password"
            type="password"
            className="pl-8"
            onChange={handleChange}
            value={loginForm['password']}
            placeholder="Masukan password anda"
            leftIcon={<LockIcon width="20" height="20" color="#888" />}
          />
          <ButtonComponent
            label="Login"
            className="my-4"
            type="submit"
            disabled={Object.values(loginForm).some(value => !value)}
          />
        </form>
        <span className="text-xs text-gray-500 text-center">
          Belum punya akun? Registrasi <Link to='/register' className="text-red-600 no-underline">di sini</Link>
        </span>
      </div>
      <div className="w-1/2 h-screen overflow-hidden overflow-x-hidden">
        <img
          src="/images/login.png"
          alt="Login Ilustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default LoginPage