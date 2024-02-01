import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useGetAllProductsQuery } from "../../features/productsApiSlice"
import ProductsList from "./components/ProductsList"

import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"
import Success from "../Notifications/Success"

export default function Productslist() {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllProductsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const { state } = useLocation()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (state?.data?.message) {
      const timer = setTimeout(() => {
        navigate(location.pathname, { replace: true })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [navigate, location])

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const { ids, entities } = products

    let filteredIds
    filteredIds = ids.filter((productId) =>
      entities[productId].name.toLowerCase()
    )

    const tableContent = ids?.length
      ? filteredIds.map((productId, index) => (
          <ProductsList key={productId} productId={productId} index={index} />
        ))
      : null

    content = (
      <div className='flex w-full flex-col items-center gap-5'>
        <h3 className='text-2xl font-bold'>Zestawy</h3>
        {state ? <Success success={state.data?.message} /> : ""}
        <table className='w-full max-w-6xl table-auto border-collapse border-neutral-800'>
          <thead>
            <tr className='bg-neutral-200 p-3 text-xs dark:bg-neutral-700 sm:text-base'>
              <th className='border border-neutral-600 p-1 sm:p-3'>Nazwa</th>
              <th className='border border-neutral-600 p-1 sm:p-3'>Cena</th>
              <th className='hidden border border-neutral-600 md:table-cell'>
                Kategoria
              </th>
              <th className='w-auto border border-neutral-600 p-1 sm:p-3'>
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    )
  }
  return content
}
