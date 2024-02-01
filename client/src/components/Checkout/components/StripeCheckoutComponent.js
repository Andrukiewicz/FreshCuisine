import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

import Error from "../../Notifications/Error"
import Success from "../../Notifications/Success"

export default function StripeCheckoutComponent({ user, paymentId }) {
  const stripe = useStripe()
  const elements = useElements()

  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState(null)

  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const [deliveryFee, setDeliveryFee] = useState("")

  const addressRef = useRef()
  const paymentRef = useRef()
  const mountedRef = useRef(false)

  const handlePostalCodeChange = async (event) => {
    if (event.complete && event.value.address.postal_code.length === 6) {
      try {
        const postCode = event.value.address.postal_code
        const res = await axios.post("/api/orders/postcode", {
          postCode,
          paymentId,
        })
        setError(null)
        setSuccess(res.data.message)
        setDeliveryFee(res.data.deliveryFee)
      } catch (err) {
        setSuccess(null)
        setError(err.response.data.error)
        setDeliveryFee(err.response.data.deliveryFee)
      }
    } else {
      setSuccess("")
      setError("")
      setDeliveryFee(false)
    }
  }

  useEffect(() => {
    var phoneNumberShort = user?.phoneNumber.replace("(+48s*)", "")
    if (!mountedRef.current && elements) {
      // Create an instance of the AddressElement
      if (user) {
        addressRef.current = elements?.create("address", {
          mode: "shipping",
          allowedCountries: ["PL"],
          fields: {
            phone: "always",
          },
          autocomplete: {
            mode: "automatic",
          },
          validation: {
            phone: {
              required: "always",
            },
          },
          contacts: [
            {
              name: user?.fullName,
              address: {
                line1: user?.shipping[0]?.line1,
                line2: user?.shipping[0]?.line2,
                postal_code: user?.shipping[0]?.postal_code,
                city: user?.shipping[0]?.city,
                country: "PL",
              },
              phone: phoneNumberShort,
            },
          ],
        })
      } else {
        addressRef.current = elements?.create("address", {
          mode: "shipping",
          allowedCountries: ["PL"],
          fields: {
            phone: "always",
          },
          autocomplete: {
            mode: "automatic",
          },
          validation: {
            phone: {
              required: "always",
            },
          },
          defaultValues: {
            name: "",
            address: {
              line1: "",
              line2: "",
              postal_code: "",
              city: "",
              country: "PL",
            },
            phone: "",
          },
        })
      }

      paymentRef.current = elements?.create("payment", {
        paymentMethodOrder: ["blik", "p24", "card"],
      })

      //Update element
      addressRef.current.on("change", handlePostalCodeChange)
      paymentRef.current.mount("#payment-element")
      // Add the element to the DOM
      addressRef.current.mount("#address-element")
      mountedRef.current = true
    }
  }, [elements, addressRef.current, paymentRef.current])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/successpayment`,
      },
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occured.")
    }

    setIsProcessing(false)
  }

  return (
    <form
      id='payment-form'
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center gap-3 rounded-xl bg-neutral-800 dark:bg-none'
    >
      <div className='mt-8 flex sm:pt-0'>
        Koszt dostawy: {deliveryFee ? "25zł" : "Darmowa dostawa"}
      </div>
      <div className='flex flex-col sm:flex-row'>
        <div className='flex flex-col items-center gap-3 p-5'>
          <p className='text-lg font-bold text-white'>Adres dostawy</p>
          <div id='address-element' />
        </div>
        <div className='flex flex-col items-center gap-3 p-5'>
          <p className='text-lg font-bold text-white'>Płatność</p>
          <div id='payment-element' />
          <button
            disabled={isProcessing || !stripe || !elements || error || !success}
            id='StripePaymentButton'
            type='submit'
            className='mt-3 rounded-md bg-klik py-2 px-4 disabled:cursor-default disabled:opacity-50'
          >
            <span id='button-text' className='text-white'>
              {isProcessing ? "Przetwarzanie ... " : "Opłać zamówienie"}
            </span>
          </button>
          <div className='relative flex h-12 w-full items-center'>
            {success && <Success success={success} />}
            {error && <Error error={error} />}
          </div>
        </div>
        {/* Show any error or success messages */}
        {/* {message && (
          <div
            id='payment-message'
            className='mt-2 rounded-xl bg-red-700 p-3 font-bold text-white'
          >
            {message}
          </div>
        )} */}
      </div>
    </form>
  )
}
