import React, { useEffect } from "react"
import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"
import Success from "../Notifications/Success"
import { useGetAllProducenciQuery } from "../../features/producenciApiSlice"
import ProducenciList from "./components/ProducenciList"
import { useLocation, useNavigate } from "react-router-dom"

export default function Producencilist() {
  const {
    data: producenci,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllProducenciQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const { state } = useLocation()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(location.pathname, { replace: true })
    }, 5000)
    return () => clearTimeout(timer)
  }, [navigate, location])

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const { ids } = producenci

    const tableContent = ids?.length
      ? ids.map((producenciId) => (
          <ProducenciList key={producenciId} producenciId={producenciId} />
        ))
      : null

    content = (
      <div className='flex w-full flex-col items-center'>
        {state ? <Success success={state.data?.message} /> : ""}
        <h3>Producenci</h3>
        <div className='flex flex-col items-center gap-3'>
          <a href='/admin/addproducenci'>
            <button type='button'>DODAJ PRODUCENTA</button>
          </a>
        </div>
        <table className='w-full max-w-2xl table-auto border-collapse border-neutral-800'>
          <thead>
            <tr className='bg-neutral-200 p-3 text-xs dark:bg-neutral-700 sm:text-base'>
              <th className='border border-neutral-600 p-1 sm:w-auto sm:p-3'>
                Nazwa
              </th>
              <th className='border border-neutral-600 p-1 sm:w-auto sm:p-3'>
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
