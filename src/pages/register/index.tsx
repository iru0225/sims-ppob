import React, { useCallback, useState } from "react"
import ButtonComponent from "../../components/button"
import EmailIcon from "../../components/icons/email.icon"
import LockIcon from "../../components/icons/lock.icon"
import UserIcon from "../../components/icons/user.icon"
import InputComponent from "../../components/input"
import { Link, useNavigate } from "react-router"
import { post } from "../../utils/client-action"
import { useNotification } from "../../context/notification-context"
import CheckIcon from "../../components/icons/check-mark.icon"
import CrossIcon from "../../components/icons/cross.icon"

const RegisterPage = () => {
  const navigate = useNavigate()
  const [registerForm, setRegisterForm] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { showNotification } = useNotification()

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    let error = ''

    if (value) {
      if (name === 'email') {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!regex.test(value)) {
          error = 'Format email salah'
        }
      }

      if (name === 'password' && value.length < 8) {
        error = 'Passowrd minimal 8 karakter'
      }

      if (name === 'confirmPassword' && registerForm.password && value !== registerForm.password) {
        error = 'Password tidak sama'
      }
    }

    setRegisterForm((prev) => ({
      ...prev,
      [name]: value
    }))

    setError(prev => ({
      ...prev,
      [name]: error
    }))
  }, [registerForm.password])

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault()
    try {
      const response = await post('registration', {
        email: registerForm.email,
        first_name: registerForm.firstname,
        last_name: registerForm.lastname,
        password: registerForm.password
      })

      showNotification?.(<div className="flex flex-col items-center gap-4 mx-auto">
        <div className="rounded-4xl bg-green-500 w-fit p-3">
          <CheckIcon width="24" height="24" color="white"/>
        </div>
        <h5>{response.message}</h5>
      </div>)

      setTimeout(() => {
        navigate('/login')
      }, 3500);
    } catch (error: unknown) {
      const errorData = error as {
        status: number
        message: string
        data: null
      }
      showNotification?.(<div className="flex flex-col items-center gap-4 mx-auto">
        <div className="rounded-4xl bg-red-600 w-fit p-3">
          <CrossIcon width="24" height="24" color="white"/>
        </div>
        <h5>{errorData.message}</h5>
      </div>)
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col w-1/2 my-auto">
        <div className="flex gap-2 justify-center">
          <img src='/images/Logo.png' alt='Logo image' className="w-8 h-8"/>
          <h3 className="text-xl font-bold text-center mb-4">SIMS PPOB</h3>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Lengkapi data untuk membuat akun</h2>
        <form className="w-full max-w-sm mx-auto flex flex-col gap-4" onSubmit={handleSubmit} method="POST">
          <InputComponent
            id="email-input"
            name="email"
            type="email"
            className="pl-8"
            onChange={handleChange}
            value={registerForm['email']}
            placeholder="Masukan email anda"
            leftIcon={<EmailIcon width="20" height="20" color="#888" />}
            errorMessage={error['email']}
          />
          <InputComponent
            id="firstname"
            name="firstname"
            className="pl-8"
            onChange={handleChange}
            value={registerForm['firstname']}
            placeholder="Nama depan"
            leftIcon={<UserIcon width="20" height="20" color="#888" />}
          />
          <InputComponent
            id="lastname"
            name="lastname"
            className="pl-8"
            onChange={handleChange}
            value={registerForm['lastname']}
            placeholder="Nama belakang"
            leftIcon={<UserIcon width="20" height="20" color="#888" />}
          />
          <InputComponent
            id="password"
            name="password"
            type="password"
            className="pl-8"
            onChange={handleChange}
            value={registerForm['password']}
            placeholder="Buat password"
            leftIcon={<LockIcon width="20" height="20" color="#888" />}
            errorMessage={error['password']}
          />
          <InputComponent
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="pl-8"
            onChange={handleChange}
            value={registerForm['confirmPassword']}
            placeholder="Konfirmasi password"
            leftIcon={<LockIcon width="20" height="20" color="#888" />}
            errorMessage={error['confirmPassword']}
          />
          <ButtonComponent
            label="Registrasi"
            className="my-4"
            type="submit"
            disabled={Object.values(registerForm).some(value => !value) || Object.values(error).some(value => !!value)}
          />
        </form>
        <span className="text-xs text-gray-500 text-center">
          Sudah punya akun? Login <Link to='/login' className="text-red-600 no-underline">di sini</Link>
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

export default RegisterPage