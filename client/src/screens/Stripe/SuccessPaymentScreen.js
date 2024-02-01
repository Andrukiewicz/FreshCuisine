import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import axios from "axios"

import { clearCart } from "../../features/cartSlice"
import useAuth from "../../hooks/useAuth"

export default function SuccessPaymentScreen() {
  const [stripeMessage, setStripeMessage] = useState("")
  const [stripeError, setStripeError] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("")

  const { id, email } = useAuth()
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const query = new URLSearchParams(useLocation().search)
  const paymentIntent = query.get("payment_intent")

  // declare the async data fetching function
  const checkPayment = useCallback(async () => {
    try {
      const res = await axios.post("/api/orders/paymentstatus", {
        paymentIntent,
      })
      setStripeMessage(res.data.message)
      setPaymentStatus(res.data.payment_status)
    } catch (err) {
      setStripeError(err.response.data.error)
    }
  }, [])

  useEffect(() => {
    checkPayment().catch(console.error)
  }, [checkPayment])

  useEffect(() => {
    if (cartItems.length !== 0) {
      dispatch(clearCart())
    }
  }, [dispatch, cartItems])
  return (
    <div className='mx-auto flex min-h-[calc(100vh-128px)] max-w-7xl items-center justify-center py-12 sm:h-auto sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl py-4 px-4 sm:py-24 sm:px-6 md:py-16 lg:max-w-7xl lg:px-8'>
        {stripeError}
        {paymentStatus && (
          <div className='flex flex-col items-center'>
            {stripeMessage && (
              <div className='flex flex-col items-center gap-10'>
                <span className='text-xl font-bold text-klikgreen sm:text-2xl'>
                  {stripeMessage}
                </span>
                <span>
                  Wkrótce wyślemy Ci więcej informacji na temat Twojego
                  zamówienia
                </span>
                {id && email && (
                  <span className='flex flex-col items-center gap-5'>
                    Przejdź do strony
                    <a href='/konto/zamowienia'>
                      <button className='flex items-center gap-2 rounded-lg bg-klik px-5 py-2.5 text-xs font-medium uppercase text-white hover:bg-kliklight focus:outline-none focus:ring-4 focus:ring-klikdark'>
                        zamówienia
                      </button>
                    </a>
                    aby sprawdzić status swoich zamówień
                  </span>
                )}
              </div>
            )}
            {stripeError && (
              <div className='flex flex-col items-center gap-10'>
                <span className='text-xl font-bold text-red-600 sm:text-2xl'>
                  {stripeError}
                </span>

                <span className='flex flex-col items-center gap-5'>
                  Przejdź do strony
                  <a href='/'>
                    <button className='flex items-center gap-2 rounded-lg bg-klik px-5 py-2.5 text-xs font-medium uppercase text-white hover:bg-kliklight focus:outline-none focus:ring-4 focus:ring-klikdark'>
                      Strona główna
                    </button>
                  </a>
                  aby spróbować ponownie
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
