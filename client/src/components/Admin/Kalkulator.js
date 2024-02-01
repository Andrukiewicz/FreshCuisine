import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useGetAllKalkulatorQuery } from "../../features/kalkulatorApiSlice"
import { selectAllPrzepisy } from "../../features/przepisyApiSlice"
import { selectAllKontrahenci } from "../../features/kontrahenciApiSlice"

import Kalkulator from "./components/Kalkulator"

import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"

export default function Kalkulatorlist() {
  const {
    data: kalkulator,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllKalkulatorQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const [filter, setFilter] = useState("")
  const [query, setQuery] = useState("")

  const kontrahenci = useSelector((state) => selectAllKontrahenci(state))

  const sortedKontrahenci = kontrahenci.sort((a, b) =>
    a.name
      .toLowerCase()
      .localeCompare(b.name.toLowerCase(), "pl", { sensitivity: "base" })
  )

  const [isPakowanie, setPakowanie] = useState(
    localStorage.getItem("isPakowanie") === "true"
  )

  useEffect(() => {
    localStorage.setItem("isPakowanie", isPakowanie)
  }, [isPakowanie])

  const handlePakowanieChange = () => {
    const newPakowanie = !isPakowanie
    setPakowanie(newPakowanie)
  }

  useEffect(() => {
    const savedOption = localStorage.getItem("queryKalkulator")
    if (savedOption) {
      setQuery(savedOption)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("queryKalkulator", query)
  }, [query])

  useEffect(() => {
    const savedOption = localStorage.getItem("filterKalkulator")
    if (savedOption) {
      setFilter(savedOption)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("filterKalkulator", filter)
  }, [filter])

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const { ids, entities } = kalkulator

    let kwotaZamowienia
    kwotaZamowienia = ids.reduce(
      (accum, kalkulatorId) => entities[kalkulatorId].cena + accum,
      0
    )

    let filteredIds
    filteredIds = ids.filter(
      (przepisyId) =>
        entities[przepisyId].name
          .toLowerCase()
          .includes(filter.toLowerCase()) &&
        entities[przepisyId].kontrahent.includes(query)
    )

    let cenaFilter
    cenaFilter = filteredIds.reduce(
      (accum, filter) => entities[filter].cena + accum,
      0
    )

    filteredIds.sort((a, b) => entities[a].name.localeCompare(entities[b].name))

    const tableContent = ids?.length
      ? filteredIds.map((kalkulatorId, index) => (
          <Kalkulator
            key={kalkulatorId}
            kalkulatorId={kalkulatorId}
            index={index}
            isPakowanie={isPakowanie}
          />
        ))
      : null

    content = (
      <div className='flex w-full flex-col items-center'>
        <div className='flex flex-col items-center pb-3'>
          <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center gap-3 sm:flex-row'>
              <div className='flex flex-col items-center'>
                <p>Całość</p>
                <span className='font-bold text-klik'>
                  ~{(kwotaZamowienia / 2).toFixed(2)}
                </span>
              </div>
              <div className='flex flex-col items-center'>
                <span>Cena filtr</span>
                <span>~{(cenaFilter / 2).toFixed(2)}</span>
              </div>
            </div>
            <div className='my-2 flex flex-row'>
              <select
                onChange={(e) => {
                  setQuery(e.target.value)
                }}
                value={query}
                className='w-full appearance-none rounded-l-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:w-1/2 sm:text-base'
                name='query'
                id='query'
              >
                <option value=''>Kontrahenci</option>
                {sortedKontrahenci.map((x, y) => (
                  <option key={y} value={x.shortName}>
                    {x.shortName}
                  </option>
                ))}
              </select>
              <input
                type='text'
                value={filter}
                placeholder='Szukaj...'
                className='w-full appearance-none rounded-r-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:w-1/2 sm:text-base'
                onChange={(e) => setFilter(e.target.value)}
              ></input>
            </div>
            <div className='my-2 flex flex-row gap-3'>
              <p className={`${!isPakowanie ? "text-klik" : ""}`}>Zakupy</p>
              <label className='relative inline-flex cursor-pointer items-center'>
                <span className='sr-only'>Tryb pakowania</span>
                <input
                  type='checkbox'
                  checked={isPakowanie}
                  onChange={handlePakowanieChange}
                  className='peer sr-only'
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-klik peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-orange-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-orange-800"></div>
              </label>
              <p className={`${isPakowanie ? "text-klik" : ""}`}>Pakowanie</p>
            </div>
          </div>
        </div>
        <table className='w-auto max-w-6xl table-auto border-collapse border-neutral-800'>
          <thead>
            <tr className='bg-neutral-200 p-1 text-xs dark:bg-neutral-700 sm:text-base'>
              <th className='hidden border border-neutral-600 md:table-cell'>
                LP
              </th>
              <th className='border border-neutral-600 p-1 sm:w-auto'>Nazwa</th>
              {!isPakowanie ? (
                <>
                  <th className='hidden border border-neutral-600 md:table-cell'>
                    Producent
                  </th>
                </>
              ) : (
                <>
                  <th className='border border-neutral-600 p-1 sm:w-auto'>
                    Ilość
                  </th>
                  <th className='border border-neutral-600 p-1 sm:w-auto'>
                    x1
                  </th>
                </>
              )}
              <th className='border border-neutral-600 p-1 sm:w-auto'>
                {isPakowanie ? "Razem" : "Ilość"}
              </th>
              <th className='border border-neutral-600 p-1 sm:w-auto'>Cena</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    )
  }
  return content
}
