import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import Loading from "../../components/Notifications/Loading"

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"

function ActivationScreen() {
  const { activation_token } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const verifyActivation = async () => {
      setIsLoading(true)
      try {
        const res = await axios.post("/api/users/weryfikacja", {
          activation_token,
        })
        setSuccess(res.data.message)
        setIsActivated(true)
      } catch (err) {
        setError(err.response.data.error)
      }
      setIsLoading(false)
    }

    if (!isActivated) {
      verifyActivation()
    }
  }, [activation_token, isActivated])
  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-8 lg:px-8'>
        <div className='relative flex h-96 w-full flex-col items-center justify-center bg-cover bg-center md:h-[32rem]'>
          <div className='py-5 text-2xl font-bold'>
            {isLoading ? (
              <div className='flex flex-col items-center justify-center gap-5 text-center'>
                <Loading />
              </div>
            ) : (
              <>
                {isActivated ? (
                  <div className='flex flex-col items-center justify-center gap-5 text-center'>
                    <div className='rounded-full bg-klikgreen p-5'>
                      <CheckIcon
                        className='inline-block h-32 w-32'
                        aria-hidden='true'
                      />
                    </div>
                    <span>{success}</span>
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center gap-5 text-center'>
                    <div className='rounded-full bg-red-800 p-5'>
                      <XMarkIcon
                        className='inline-block h-32 w-32'
                        aria-hidden='true'
                      />
                    </div>
                    <span>{error}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivationScreen
