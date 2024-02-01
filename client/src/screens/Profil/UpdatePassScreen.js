import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import Error from "../../components/Notifications/Error.js"
import Success from "../../components/Notifications/Success.js"
import { usePageTitle } from "../../hooks/usePageTitle.js"

import {
  ClipboardDocumentIcon,
  ForwardIcon,
  MagnifyingGlassIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline"

const features = [
  {
    name: "korzystaj z kodów rabatowych",
    icon: ReceiptPercentIcon,
  },
  {
    name: "sprawdzaj status swoich zamówień",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "zamawiaj szybciej bez wprowadzania adresu",
    icon: ForwardIcon,
  },
  {
    name: "przeglądaj historię zamówień",
    icon: ClipboardDocumentIcon,
  },
]

function ResetScreen() {
  usePageTitle("Zmiana hasła")
  const { reset_token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [cPassword, setCpassword] = useState("")
  const [err, setErr] = useState("")
  const [success, setSuccess] = useState("")

  const isFormInvalid = () => {
    return !(password && password === cPassword)
  }

  useEffect(() => {
    setErr("")
    setSuccess("")
  }, [password, cPassword])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password !== cPassword) setErr("Hasła nie zgadzają się")
      const res = await axios.post("/api/users/updatepassword", {
        reset_token,
        password,
      })
      setSuccess(res.data.message)
      const data = res.data.message
      navigate("/logowanie", {
        state: {
          data,
        },
      })
    } catch (err) {
      err.response.data.error && setErr(err.response.data.error)
    }
  }
  return (
    <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div className='relative justify-center px-4 sm:px-0'>
        <div className='mx-auto flex max-w-7xl flex-row gap-5 py-2 px-4 sm:px-6 md:py-8 lg:px-8'>
          <div className='shadow-xl flex h-fit w-1/2 flex-col gap-5 rounded-2xl bg-neutral-100 p-5 dark:bg-neutral-800'>
            <div className='flex flex-col gap-5 px-5 pt-5'>
              <h3 className='text-2xl font-bold'>Resetowanie hasła</h3>
              <span className='text-lg'>
                Podaj nowe hasło aby odzyskać dostęp do konta.
              </span>
            </div>
            <form className='w-full' autoComplete='off' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-5 p-5'>
                <input
                  type='password'
                  autoComplete='off'
                  placeholder='Nowe hasło'
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  className='active block w-full rounded-lg border  border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 transition ease-in-out focus:border-klik focus:ring-klik dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-200 dark:focus:border-klik dark:focus:ring-klik'
                  name='password'
                  value={password}
                />
                <input
                  type='password'
                  autoComplete='off'
                  placeholder='Powtórz nowe hasło'
                  onChange={(e) => {
                    setCpassword(e.target.value)
                  }}
                  className='active block w-full rounded-lg border  border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 transition ease-in-out focus:border-klik focus:ring-klik dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-200 dark:focus:border-klik dark:focus:ring-klik'
                  name='cPassword'
                  value={cPassword}
                />
                <button
                  type='submit'
                  disabled={isFormInvalid()}
                  className={`${
                    isFormInvalid()
                      ? "bg-neutral-500 hover:bg-neutral-500"
                      : "bg-klik hover:bg-klikdark"
                  } flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-kliklight focus:ring-offset-2`}
                >
                  Zmień hasło
                </button>
              </div>
            </form>
            {err ? (
              <div className='flex items-center justify-center px-5'>
                <Error error={err} />
              </div>
            ) : (
              ""
            )}
            {success ? (
              <div className='flex items-center justify-center px-5'>
                <Success success={success} />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className='flex w-1/2 flex-col gap-5'>
            <h4 className='text-xl font-bold'>
              Dlaczego warto mieć konto w 3klik-u
            </h4>
            {features.map((feature) => (
              <div
                key={feature.name}
                className='shadow-xl flex flex-row items-center gap-5 rounded-2xl bg-neutral-100 p-5 dark:bg-neutral-800'
              >
                <div className='my-5 flex h-6 w-6 items-center justify-center text-klik sm:h-12 sm:w-12'>
                  <feature.icon
                    className='h-6 w-6 sm:h-12 sm:w-12'
                    aria-hidden='true'
                  />
                </div>
                <p className='ml-0 text-lg font-medium'>{feature.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetScreen
