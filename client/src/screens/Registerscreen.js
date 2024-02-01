import React, { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterUserMutation } from "../features/usersApiSlice"
import Loading from "../components/Notifications/Loading"
import Error from "../components/Notifications/Error"
import Success from "../components/Notifications/Success"

import { LockClosedIcon } from "@heroicons/react/20/solid"
import { usePageTitle } from "../hooks/usePageTitle"

export function Registerscreen() {
  usePageTitle("Załóż konto")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")
  const [regulamin, setRegulamin] = useState(false)
  const [regErr, setRegErr] = useState("")
  const emailRef = useRef()
  const [regRefText, setRegRefText] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const [register, { isLoading, isSuccess, isError, error, data }] =
    useRegisterUserMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!regulamin) {
      setRegErr("border-2 border-red-500")
      setRegRefText("Zaznacz zgodę")
    } else {
      if (password !== cpassword) setErrMsg("Hasła nie zgadzają się")
      else await register({ email, password })
    }
  }

  useEffect(() => {
    if (isError) {
      setErrMsg(error?.data.error)
      setSuccessMsg(null)
    }
    if (isSuccess) {
      setSuccessMsg(data?.message)
      setErrMsg(null)
    }
  }, [isError, isSuccess])

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
    setRegErr("")
    setRegRefText("")
  }, [email, password, cpassword, regulamin])

  if (isLoading) return <Loading />
  const content = (
    <div className='relative h-[calc(100vh-64px)] justify-center px-4 py-6 sm:px-0'>
      {errMsg ? <Error error={errMsg} /> : ""}
      {successMsg ? <Success success={data?.message} /> : ""}
      <div className='mx-auto max-w-7xl py-2 px-0 sm:px-6 md:py-16 lg:px-8'>
        <div className='flex min-h-full items-center justify-center py-12 px-0 sm:px-4 lg:px-8'>
          <div className='shadow-lg w-full max-w-md space-y-8 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800 dark:shadow-black/50 sm:p-16'>
            <div>
              <h2 className='text-center text-3xl font-bold tracking-tight'>
                Załóż konto
              </h2>
              <h2 className='text-center text-3xl font-bold tracking-tight text-klik'>
                My zajmiemy się resztą!
              </h2>
            </div>
            <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
              <input type='hidden' name='remember' defaultValue='true' />
              <div className='shadow-sm items-center -space-y-px rounded-md'>
                <div>
                  <label htmlFor='email-address' className='sr-only'>
                    Adres e-mail
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
                    Hasło
                  </label>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='relative block w-full appearance-none rounded-none border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight sm:text-sm'
                    placeholder='Hasło'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                </div>
                <div>
                  <label htmlFor='password' className='sr-only'>
                    Powtórz hasło
                  </label>
                  <input
                    id='cpassword'
                    name='cpassword'
                    type='password'
                    autoComplete='repeat-password'
                    required
                    className='relative block w-full appearance-none rounded-none rounded-b-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight sm:text-sm'
                    placeholder='Powtórz hasło'
                    value={cpassword}
                    onChange={(e) => {
                      setCpassword(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className='relative flex items-center'>
                <label
                  className={`${
                    regErr ? "border-red-500 dark:border-red-500" : ""
                  } flex flex-row items-center rounded-md border-2 border-neutral-200 p-2 text-sm font-medium dark:border-neutral-800`}
                >
                  <input
                    type='checkbox'
                    // value={regulamin}
                    checked={regulamin}
                    // onChange={handleRegulamin}
                    onClick={() => {
                      setRegulamin((old) => !old)
                    }}
                    className={`${
                      regErr ? { regErr } : ""
                    } h-4 w-4 rounded border-neutral-300 bg-neutral-100 text-klik focus:ring-2 focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-kliklight`}
                  />
                  <span className='ml-2'>
                    Akceptuję{" "}
                    <Link
                      to='/regulamin'
                      className='text-klik hover:text-kliklight'
                    >
                      regulamin
                    </Link>{" "}
                    sklepu
                    <span className='text-klik'>*</span>
                  </span>
                </label>
                {regErr ? (
                  <div className='absolute right-0 text-xs font-bold text-red-500'>
                    {regRefText}
                  </div>
                ) : (
                  ""
                )}
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
                  Załóż konto
                </button>
              </div>
            </form>
            <div className='flex items-center justify-between'>
              <div className='text-sm'>
                <p className='font-medium'>Masz już konto?</p>
              </div>
              <p className='text-center text-sm'>
                <Link
                  to='/logowanie'
                  className='font-medium text-klik hover:text-kliklight'
                >
                  Zaloguj się
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  return content
}

export default Registerscreen
