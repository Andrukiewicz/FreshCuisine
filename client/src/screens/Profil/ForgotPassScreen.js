import React, { useEffect, useState } from "react"
import axios from "axios"
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
    name: "korzystaj z kodów rabatowych (wkrótce!)",
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

function ForgotPasswordScreen() {
  usePageTitle("Przypomnienie hasła")
  const [email, setEmail] = useState("")
  const [err, setErr] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/users/forgotpassword", {
        email,
      })
      setSuccess(res.data.message)
    } catch (err) {
      err.response.data.error && setErr(err.response.data.error)
    }
  }

  useEffect(() => {
    setErr("")
    setSuccess("")
  }, [email])

  return (
    <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div className='relative justify-center px-4 sm:px-0'>
        <div className='mx-auto flex max-w-7xl flex-col gap-5 py-2 px-4 sm:flex-row sm:px-6 md:py-8 lg:px-8'>
          <div className='shadow-xl relative flex h-fit w-full flex-col items-center gap-5 rounded-2xl bg-neutral-100 p-5 dark:bg-neutral-800 sm:w-1/2'>
            <div className='flex flex-col gap-5 px-0 pt-0 sm:px-5 sm:pt-5'>
              <h3 className='text-center text-2xl font-bold'>
                Nie pamiętasz hasła?
              </h3>
              <span className='text-center text-lg'>
                Podaj adres e-mail, a pomożemy Ci zresetować hasło
              </span>
            </div>
            <form
              className='flex w-full'
              autoComplete='off'
              onSubmit={handleSubmit}
            >
              <div className='m-auto flex flex-col items-center justify-center gap-5 p-0 sm:p-5'>
                <input
                  type='text'
                  autoComplete='off'
                  placeholder='e-mail'
                  onChange={handleChange}
                  className='block w-full rounded-lg border  border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 transition ease-in-out focus:border-klik focus:ring-klik dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-200 dark:focus:border-klik dark:focus:ring-klik'
                  name='email'
                  value={email}
                />
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md border border-transparent bg-klik py-2 px-4 text-sm font-medium text-white hover:bg-klikdark focus:outline-none focus:ring-2 focus:ring-kliklight focus:ring-offset-2'
                >
                  Odzyskaj hasło
                </button>
              </div>
            </form>
            {err ? (
              <div className='flex items-center justify-center p-5'>
                <Error error={err} />
              </div>
            ) : (
              ""
            )}
            {success ? (
              <div className='flex items-center justify-center p-5'>
                <Success success={success} />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className='flex  w-full flex-col gap-5 sm:w-1/2'>
            <h4 className='text-xl font-bold'>
              Dlaczego warto mieć konto w 3klik-u
            </h4>
            {features.map((feature) => (
              <div
                key={feature.name}
                className='shadow-xl flex flex-row items-center gap-5 rounded-2xl bg-neutral-100 p-5 dark:bg-neutral-800'
              >
                <div className='my-5 flex h-8 w-8 items-center justify-center text-klik sm:h-12 sm:w-12'>
                  <feature.icon
                    className='h-8 w-8 sm:h-12 sm:w-12'
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

export default ForgotPasswordScreen
