import React, { useState } from "react"
import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"

import { useGetAllOrdersQuery } from "../../features/ordersApiSlice"
import OrdersList from "./components/OrdersList"

export default function Orderslist() {
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllOrdersQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const [filter, setFilter] = useState("")

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const { ids, entities } = orders

    let filteredIds
    filteredIds = ids.filter((orderId) => {
      return (
        entities[orderId]._id.includes(filter) ||
        entities[orderId].email.toLowerCase().includes(filter.toLowerCase())
      )
    })

    const tableContent = ids?.length
      ? filteredIds.map((orderId) => (
          <OrdersList key={orderId} orderId={orderId} />
        ))
      : null

    content = (
      <div className='flex w-full flex-col items-center gap-3'>
        <h3 className='text-center text-2xl font-bold'>Zamówienia</h3>
        <div className='flex flex-row items-center'>
          <input
            type='text'
            placeholder='Szukaj po numerze lub e-mailu'
            className='w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
            onChange={(e) => setFilter(e.target.value)}
          ></input>
        </div>
        <div className='w-full max-w-6xl'>{tableContent}</div>
      </div>
    )
  }
  return content
}
