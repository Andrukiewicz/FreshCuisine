import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"

export default function PostCode() {
  const [postCode, setPostCode] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handlePostCode = (e) => {
    let value = e.target.value
    value = value.replace("-", "")
    if (value.length > 2) {
      value = value.substring(0, 2) + "-" + value.substring(2)
    }

    // console.log(value.length + " value length")
    setPostCode(value)
  }

  const handleInputFocus = (e) => {
    // Open the keyboard when the user taps on the input field
    e.target.focus()
  }

  useEffect(() => {
    if (postCode.length === 6) {
      const postCodeChecker = async () => {
        try {
          const res = await axios.post("/api/orders/postcodehome", {
            postCode,
          })
          setSuccess(res.data.message)
          // console.log(res.data.message)
        } catch (err) {
          setError(err.response.data.error)
          // console.log(err.response.data.error)
        }
      }
      postCodeChecker()
    } else {
      setSuccess("")
      setError("")
    }
  }, [postCode])

  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      {/* <h3 className='text-md font-bold text-center text-red-500'>
        Jesteśmy świadomi błędu systemu płatności
      </h3>
      <h3 className='text-md font-bold text-center text-red-500'>
        Przedłużamy możliwość składania zamówień do poniedziałku
      </h3> */}
      {success && (
        <h3 className='text-sm sm:text-base font-bold text-klikgreen'>
          Dostarczamy pod Twój adres! Zamawiaj śmiało!
        </h3>
      )}
      {error && (
        <h3 className='text-sm sm:text-base font-bold text-red-500'>
          Jeszcze nie dostarczamy pod Twój adres...
        </h3>
      )}
      {!success && !error && (
        <h3 className='text-sm sm:text-base'>
          Sprawdź czy już dostarczamy pod Twój adres:
        </h3>
      )}
      <div className='relative flex flex-row'>
        <input
          type='text'
          id='Post code'
          name='Post code'
          autoComplete='off'
          inputMode='numeric'
          placeholder='Kod pocztowy'
          onChange={handlePostCode}
          pattern='/[0-9]{2}-[0-9]{3}/'
          maxLength='6'
          onFocus={handleInputFocus}
          onInput={(e) => {
            // Remove any non-numeric or non-dash characters
            e.target.value = e.target.value.replace(/[^0-9-]/g, "")
          }}
          onKeyDown={(e) => {
            // Allow only numbers and dashes
            if (
              !/^[0-9-]*$/.test(e.key) &&
              e.key !== "Backspace" &&
              !(e.ctrlKey && e.key === "a") &&
              !(e.ctrlKey && e.key === "c") &&
              !(e.ctrlKey && e.key === "v")
            ) {
              e.preventDefault()
            }
          }}
          className={`${
            success &&
            "rounded-none rounded-l-md border-klikgreen focus:ring-0 dark:focus:ring-0"
          } ${
            error &&
            "rounded-none rounded-l-md border-red-700 focus:ring-0 dark:focus:ring-0"
          } flex h-10 w-32 appearance-none rounded-md border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 transition ease-in-out focus:border-klik focus:ring-klik dark:border-neutral-600  dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-200`}
          value={postCode}
        ></input>
        {success ? (
          <div className='absolute right-0 mr-[-3rem] flex h-10 items-center rounded-r-md border-y-2 border-klikgreen bg-klikgreen px-3 text-white ring-klikgreen'>
            <CheckIcon className='inline-block h-6 w-6' aria-hidden='true' />
          </div>
        ) : (
          ""
        )}
        {error ? (
          <div className='absolute right-0 mr-[-3rem] flex h-10 items-center rounded-r-md border border-red-700 bg-red-700 px-3 text-white ring-red-700'>
            <XMarkIcon className='inline-block h-6 w-6' aria-hidden='true' />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
