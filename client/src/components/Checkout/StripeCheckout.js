import React, { useEffect, useState } from "react"
import Loading from "../Notifications/Loading"

import StripeCheckoutComponent from "./components/StripeCheckoutComponent"
import { useGetOneUserQuery } from "../../features/userApiSlice"
import useAuth from "../../hooks/useAuth"

export default function StripeCheckout(paymentId) {
  const { email, id } = useAuth()
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOneUserQuery(id, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  })

  let content

  if (isLoading) content = <Loading />

  // In case no user is found
  // still display payment element but don't fill it with user data
  if (isError) {
    // content = <Error error={error?.data?.message} />
    content = <StripeCheckoutComponent paymentId={paymentId} />
  }

  if (isSuccess) {
    const tableContent = user ? (
      <StripeCheckoutComponent key={user} user={user} paymentId={paymentId} />
    ) : null

    content = <>{tableContent}</>
  }
  return content
}
