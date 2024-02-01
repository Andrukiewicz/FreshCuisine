import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useGetAllPakowanieQuery } from "../../features/pakowanieApiSlice"
import { selectAllKontrahenci } from "../../features/kontrahenciApiSlice"

import Pakowanie from "./components/Pakowanie"

import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"

export default function Pakowanielist() {
  const {
    data: pakowanie,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllPakowanieQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const [filter, setFilter] = useState("")
  const [query, setQuery] = useState("")

  // const allPakowanie = useSelector((state) => selectAllPrzepisy(state))

  // console.log(allPakowanie)

  // const kwotaZamowienia = allPakowanie.reduce(
  //   (accum, item) => accum + item.cena,
  //   0
  // )

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const { ids, entities } = pakowanie

    let filteredIds
    filteredIds = ids.filter((przepisyId) =>
      entities[przepisyId]._id.toLowerCase().includes(filter.toLowerCase())
    )

    const tableContent = ids?.length
      ? filteredIds.map((pakowanieId, index) => (
          <Pakowanie
            key={pakowanieId}
            pakowanieId={pakowanieId}
            index={index}
          />
        ))
      : null

    content = (
      <div className='flex w-full flex-col items-center'>
        <div className='flex w-full flex-col items-center pt-3 pb-3'>
          <h3 className='text-2xl'>Pakowanie / drukowanie</h3>
          <div className='flex w-1/4 flex-col items-center py-3'>
            <input
              type='text'
              placeholder='Szukaj...'
              className='w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
              onChange={(e) => setFilter(e.target.value)}
            ></input>
          </div>
        </div>
        <table className='w-full max-w-6xl table-auto border-collapse border-neutral-800'>
          <thead>
            <tr className='bg-neutral-200 p-3 text-xs dark:bg-neutral-700 sm:text-base'>
              <th className='border border-neutral-600 md:table-cell'>LP</th>
              <th className='border border-neutral-600 p-1 sm:w-auto sm:p-3'>
                Nazwa
              </th>
              <th className='border border-neutral-600 md:table-cell'>Ilość</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    )
  }
  return content
}
