import React, { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import DeliveryDate from "../hooks/DeliveryDate"
import {
  ShoppingBagIcon,
  CreditCardIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid"

import { getCartTotal } from "../features/cartSlice"
import StripeCheckout from "../components/Checkout/StripeCheckout"
import emptycart from "../images/emptycart.svg"

import useAuth from "../hooks/useAuth"
import { usePageTitle } from "../hooks/usePageTitle"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
const stripePromise = loadStripe(
  "pk_live_51Js5CtAPJHZBKVIUOmlXgjpgUoxrT5vbbLW9lEp75LnEL4rGTjIhth9rH1X9Px08A5Q3zKoUYGTtUONAAWHz7oII002zPY8NaA",
  {
    locale: "pl",
  }
)
// const stripePromise = loadStripe(
//   "pk_test_51Js5CtAPJHZBKVIU6iy3GSiMk4JJOn9FSggbhmmB6oKFIwIGz6fIsIH2NhEpNwTkt7KdbWreF6AuXaTyhw9LiZbm00HTDbLch0",
//   {
//     locale: "pl",
//   }
// )

export default function Paymentscreen() {
  usePageTitle("Twój koszyk")
  const { email, id } = useAuth()

  const { cartItems, totalAmount, totalCount, deliveryInfo } = useSelector(
    (state) => state.cart
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (cartItems) dispatch(getCartTotal())
  }, [cartItems, dispatch])

  const [clientSecret, setClientSecret] = useState("")
  const [paymentId, setPaymentId] = useState("")
  const [backErr, setBackErr] = useState("")
  const effectRan = useRef(false)

  useEffect(() => {
    if (!effectRan.current && cartItems[0]) {
      const line_items_order = cartItems.map((item) => {
        if (item.price) {
          return {
            itemId: item._id,
            quantity: item.quantity,
            // Zmienic na przyszlosc na zczytywanie ceny subtotal z bazy nie z req body bo przypał
            price: item.price, // cena w centach
            name: item.name,
            images: item.image,
            week: item.week,
          }
        }
        return null
      })
      if (id) {
        // declare the data fetching function
        fetch("/api/orders/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems,
            id,
            line_items_order,
            email,
            deliveryInfo,
          }),
        }).then(async (res) => {
          const { clientSecret, error, paymentId } = await res.json()
          setClientSecret(clientSecret)
          setPaymentId(paymentId)
          setBackErr(error)
        })
      } else {
        fetch("/api/orders/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems,
            line_items_order,
            email,
            deliveryInfo,
          }),
        }).then(async (res) => {
          const { clientSecret, error, paymentId } = await res.json()
          setClientSecret(clientSecret)
          setPaymentId(paymentId)
          setBackErr(error)
        })
      }
      // Create PaymentIntent as soon as the page loads ONCE
      effectRan.current = true
    }
  })

  const appearance = {
    theme: "night",
    variables: {
      colorPrimary: "#e84822",
      colorDanger: "#df1b41",
      colorText: "#fff",
      colorBackground: "#171717",
      borderRadius: "16px",
      colorPrimaryText: "#fff",
      colorIconTabSelected: "#fff",
      colorIconCardCvc: "#e84822",
    },
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div className='relative justify-center px-4 sm:px-0'>
        <div className='mx-auto flex max-w-7xl flex-col py-2 px-0 sm:px-6 md:py-8 lg:px-8'>
          {cartItems[0] && (
            <div className='flex flex-col items-center'>
              <DeliveryDate />
            </div>
          )}
          {cartItems[0] ? (
            <div className='mt-0 flex flex-col items-center gap-3 rounded-xl sm:mt-8 sm:gap-0 sm:bg-neutral-100 sm:dark:bg-neutral-800'>
              <div className='my-4 flex w-full max-w-fit items-center justify-between gap-0 rounded-xl bg-neutral-200 p-2 dark:bg-neutral-800 sm:w-auto sm:gap-5 sm:p-5 sm:dark:bg-neutral-900'>
                <div className='flex items-center'>
                  <div className='relative flex h-8 w-8 items-center justify-center rounded-full bg-neutral-600 text-white'>
                    <ShoppingBagIcon className='h-4 w-4' />
                  </div>
                  <div className='ml-2 flex flex-row gap-2 text-sm font-medium text-neutral-600 sm:ml-4 sm:text-base'>
                    <p>Koszyk</p>
                    <p className='flex w-8'>({totalCount})</p>
                  </div>
                </div>
                <div className='mx-4 text-neutral-500'>
                  <ChevronRightIcon className='h-4 w-4' />
                </div>
                <div className='flex items-center'>
                  <div className='relative flex h-8 w-8 items-center justify-center rounded-full bg-klik text-white'>
                    <CreditCardIcon className='h-4 w-4' />
                  </div>
                  <div className='ml-2 text-sm font-medium text-klik sm:ml-4 sm:text-base'>
                    Płatność
                  </div>
                </div>
              </div>
              <div className='flex h-fit w-full flex-col items-center rounded-md p-0 sm:bg-neutral-100 sm:p-5 sm:dark:bg-neutral-800'>
                <div className='flex flex-col items-center'>
                  <div className='flex flex-col'>
                    <span className='text-bold text-2xl'>
                      Podsumowanie zamówienia
                    </span>
                  </div>
                  <div className='flex flex-col justify-center py-3'>
                    {clientSecret && stripePromise && (
                      <Elements options={options} stripe={stripePromise}>
                        <StripeCheckout paymentId={paymentId} />
                      </Elements>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center sm:h-auto'>
              <div className='text-2xl font-bold'> Twój koszyk jest pusty</div>
              <img
                src={emptycart}
                alt='Zdjęcie pustego koszyka'
                className='max-h-64 items-center pt-3'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
