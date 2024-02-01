import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useLocation } from "react-router-dom"

import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"
import Success from "../Notifications/Success"

import {
  selectAllPrzepisy,
  useGetAllPrzepisyQuery,
} from "../../features/przepisyApiSlice"

import PrzepisyList from "./components/PrzepisyList"

export default function Przepisylist() {
  const {
    data: przepisy,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllPrzepisyQuery(undefined, {
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
  }, [navigate, location, state])

  const [filter, setFilter] = useState("")
  const allPrzepisy = useSelector((state) => selectAllPrzepisy(state))

  useEffect(() => {
    const savedOption = localStorage.getItem("filterPrzepisy")
    if (savedOption) {
      setFilter(savedOption)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("filterPrzepisy", filter)
  }, [filter])

  const sortByPrice = () => {
    allPrzepisy.sort((a, b) => (a.totalprzepis > b.totalprzepis ? 1 : -1))
  }

  const przepisyCount = allPrzepisy.length
  const kartyCount = allPrzepisy.reduce((a, c) => (c.karty ? ++a : a), 0)
  const zdjeciaCount = allPrzepisy.reduce((a, c) => (c.zdjecia ? ++a : a), 0)

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const { ids, entities } = przepisy

    let filteredIds
    filteredIds = ids.filter((przepisyId) =>
      entities[przepisyId].name.toLowerCase().includes(filter?.toLowerCase())
    )

    const tableContent = ids?.length
      ? filteredIds.map((przepisyId, index) => (
          <PrzepisyList
            key={przepisyId}
            przepisyId={przepisyId}
            index={index}
          />
        ))
      : null
    content = (
      <div className='flex w-full flex-col items-center'>
        <div className='flex flex-col items-center gap-3 pt-3 pb-3'>
          {state ? <Success success={state.data?.message} /> : ""}
          <h3 className='text-2xl'>Przepisy</h3>
          <div className='flex flex-col items-center gap-3'>
            <p>Ilość przepisów: {przepisyCount}</p>
            <p>Ilość zdjęć: {zdjeciaCount}</p>
            <p>Ilość kart PDF: {kartyCount}</p>
            <Link to='/admin/addprzepisy'>
              <button className='flex items-center gap-2 rounded-lg bg-klik px-2.5 py-2.5 text-xs font-medium uppercase text-white hover:bg-kliklight focus:outline-none focus:ring-4 focus:ring-klikdark sm:px-5'>
                DODAJ PRZEPIS
              </button>
            </Link>
            <input
              type='text'
              placeholder='Szukaj...'
              value={filter}
              className='w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
              onChange={(e) => setFilter(e.target.value)}
            ></input>
          </div>
          <table className='w-full max-w-6xl table-auto border-collapse border-neutral-800'>
            <thead>
              <tr className='bg-neutral-200 p-3 text-xs dark:bg-neutral-700 sm:text-base'>
                <th className='hidden border border-neutral-600 p-1 sm:table-cell sm:w-auto sm:p-3'>
                  Numer
                </th>
                {/* <th>Foto</th> */}
                <th className='border border-neutral-600 p-1 sm:w-auto sm:p-3'>
                  Nazwa
                </th>
                <th className='hidden border border-neutral-600  p-1 sm:table-cell sm:w-auto sm:p-3'>
                  Zdjęcia
                </th>
                <th className='hidden border border-neutral-600  p-1 sm:table-cell sm:w-auto sm:p-3'>
                  Karta
                </th>
                <th className='hidden border border-neutral-600 p-1 sm:table-cell sm:w-auto sm:p-3'>
                  Kategoria
                </th>
                <th className='border border-neutral-600 p-1 sm:w-auto sm:p-3'>
                  <button onClick={sortByPrice}>Cena (35)</button>
                </th>
                <th className='border border-neutral-600 p-1 sm:w-auto sm:p-3'>
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
      </div>
    )
  }
  return content
}
