import React, { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useLoginMutation } from "../features/authApiSlice"
import { setCredentials } from "../features/authSlice"
import Loading from "../components/Notifications/Loading"
import Error from "../components/Notifications/Error"
import Success from "../components/Notifications/Success"

import { LockClosedIcon } from "@heroicons/react/20/solid"

// import logo from "../images/logo128.png"
import { usePersist } from "../hooks/usePersist"
import { usePageTitle } from "../hooks/usePageTitle"

const Loginscreen = () => {
  usePageTitle("Logowanie")
  const emailRef = useRef()
  const errRef = useRef()

  const navigate = useNavigate()
  const location = useLocation()
  const { state } = useLocation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [persist, setPersist] = usePersist()
  const [data, setData] = useState(state)
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const [showSuccess, setShowSuccess] = useState(null)

  useEffect(() => {
    if (state) {
      setShowSuccess(true)
      // console.log(state)
      const timer = setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [state])

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
    setData("")
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setPersist(true)
      const { accessToken } = await login({ email, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setEmail("")
      setPassword("")
      if (accessToken) navigate("/")
    } catch (err) {
      if (!err.status) {
        setErrMsg("Brak odpowiedzi")
        setPersist(false)
        errRef.current.focus()
      } else if (err) {
        setPersist(false)
        setErrMsg(err.data?.message)
        errRef.current.focus()
      }
    }
  }

  if (isLoading)
    return (
      <div className='flex h-[calc(100vh-64px)] items-center justify-center'>
        <Loading />
      </div>
    )

  const content = (
    <div className='relative h-[calc(100vh-64px)] justify-center px-4 py-6 sm:px-0'>
      <div className='mx-auto max-w-7xl py-2 px-0 sm:px-6 md:py-16 lg:px-8'>
        {showSuccess ? <Success success={state?.data} /> : ""}
        <div className='flex min-h-full items-center justify-center py-12 px-0 sm:px-4 lg:px-8'>
          <div className='shadow-lg w-full max-w-md space-y-8 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800 dark:shadow-black/50 sm:p-16'>
            <div>
              <h2 className='text-center text-3xl font-bold tracking-tight'>
                Zaloguj się do swojego konta
              </h2>
              <h2 className='text-center text-3xl font-bold tracking-tight text-klik'>
                Jedz tanio, smacznie i zdrowo!
              </h2>
            </div>
            <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
              <input type='hidden' name='remember' defaultValue='true' />
              <div className='shadow-sm items-center -space-y-px rounded-md'>
                <div>
                  <label htmlFor='email-address' className='sr-only'>
                    Email address
                  </label>
                  <input
                    id='email-address'
                    name='email'
                    type='email'
                    autoComplete='email'
                    ref={emailRef}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    required
                    className='relative block w-full appearance-none rounded-none rounded-t-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight sm:text-sm'
                    placeholder='Adres email'
                  />
                </div>
                <div>
                  <label htmlFor='password' className='sr-only'>
                    Password
                  </label>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight sm:text-sm'
                    placeholder='Hasło'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                </div>
              </div>
              {data ? (
                <div className='flex items-center justify-center'>
                  <Success success={state?.data} />
                </div>
              ) : (
                ""
              )}
              {errMsg ? (
                <div className='flex items-center justify-center'>
                  <Error error={errMsg} />
                </div>
              ) : (
                ""
              )}
              <div className='flex items-center justify-between'>
                <div className='text-sm'>
                  <Link
                    to='/przypomnienie-hasla'
                    className='font-medium text-klik hover:text-klik'
                  >
                    Przypomnij hasło
                  </Link>
                </div>
                <p className='text-center text-sm'>
                  lub{" "}
                  <Link
                    to='/rejestracja'
                    className='font-medium text-klik hover:text-kliklight'
                  >
                    Załóż konto
                  </Link>
                </p>
              </div>
              <div>
                <button
                  type='submit'
                  className='group relative flex w-full justify-center rounded-md border border-transparent bg-klik py-2 px-4 text-sm font-medium text-white hover:bg-klikdark focus:outline-none focus:ring-2 focus:ring-kliklight focus:ring-offset-2'
                >
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                    <LockClosedIcon
                      className='h-5 w-5 text-klikdark group-hover:text-kliklight'
                      aria-hidden='true'
                    />
                  </span>
                  Zaloguj
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
  return content
}

export default Loginscreen
