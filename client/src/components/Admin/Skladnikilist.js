import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useLocation } from "react-router-dom"

import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"
import Success from "../Notifications/Success"

import { useGetAllSkladnikiQuery } from "../../features/skladnikiApiSlice"
import { selectAllKontrahenci } from "../../features/kontrahenciApiSlice"
import SkladnikiList from "./components/SkladnikiList"

export default function Skladnikilist() {
  const {
    data: skladniki,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllSkladnikiQuery(undefined, {
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

  const allKontrahenci = useSelector((state) => selectAllKontrahenci(state))

  const [filter, setFilter] = useState("")
  const [query, setQuery] = useState("")

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const { ids, entities } = skladniki

    let filteredIds
    filteredIds = ids.filter(
      (przepisyId) =>
        entities[przepisyId].kontrahent.includes(query) &&
        (entities[przepisyId].name
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
          entities[przepisyId].category
            .toLowerCase()
            .includes(filter.toLowerCase()))
    )

    const tableContent = ids?.length
      ? filteredIds.map((skladnikiId) => (
          <SkladnikiList key={skladnikiId} skladnikiId={skladnikiId} />
        ))
      : null

    content = (
      <div className='flex w-full flex-col items-center gap-5'>
        {state ? <Success success={state.data?.message} /> : ""}
        <div className='flex flex-col items-center justify-between gap-5'>
          <h3 className='text-2xl font-bold'>Składniki</h3>
          <div className='flex flex-row items-center'>
            <input
              type='text'
              placeholder='Szukaj...'
              className='w-full appearance-none rounded-l-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:w-1/2 sm:text-base'
              onChange={(e) => setFilter(e.target.value)}
            ></input>
            <select
              onChange={(e) => {
                setQuery(e.target.value)
              }}
              value={query}
              className='w-full appearance-none rounded-r-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:w-1/2 sm:text-base'
              name='query'
              id='query'
            >
              <option value=''>Wszyscy kontrahenci</option>
              {allKontrahenci.map((x, y) => (
                <option key={y} value={x.shortName}>
                  {x.shortName}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col'>
            <Link to='/admin/addskladniki'>
              <button
                type='button'
                className='flex items-center gap-2 rounded-lg bg-klik px-2.5 py-2.5 text-xs font-medium uppercase text-white hover:bg-kliklight focus:outline-none focus:ring-4 focus:ring-klikdark sm:px-5'
              >
                Dodaj składnik
              </button>
            </Link>
          </div>
        </div>
        <table className='w-full max-w-6xl table-auto border-collapse border-neutral-800'>
          <thead>
            <tr className='bg-neutral-200 text-xs dark:bg-neutral-700 sm:p-3 sm:text-base'>
              <th className='w-1/6 border border-neutral-600 p-1 sm:w-auto sm:p-3'>
                Cena
              </th>
              <th className='hidden border border-neutral-600 md:table-cell'>
                Podatek
              </th>
              <th className='w-1/3 border border-neutral-600 p-1 sm:w-auto sm:p-3'>
                Nazwa
              </th>
              <th className="sm:p-3' hidden w-1/6 border border-neutral-600 p-1 sm:table-cell sm:w-auto">
                Kontrahent
              </th>
              <th className='w-1/6 border border-neutral-600 p-1 sm:w-auto sm:p-3'>
                Producent
              </th>
              <th className='hidden border border-neutral-600 md:table-cell'>
                Kategoria
              </th>
              <th className='w-1/6 border border-neutral-600 p-1 sm:w-auto sm:p-3'>
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
