import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAddSkladnikiMutation } from "../../features/skladnikiApiSlice"
import { selectAllProducenci } from "../../features/producenciApiSlice"
import { selectAllKontrahenci } from "../../features/kontrahenciApiSlice"

import Error from "../Notifications/Error"
import Success from "../Notifications/Success"

export default function Addskladniki() {
  const [name, setName] = useState("")
  const [producent, setProducent] = useState("Brak producenta")
  const [kontrahent, setKontrahent] = useState("Brak kontrahenta")
  const [category, setCategory] = useState("-")
  const [cena, setCena] = useState("0")
  const [tax, setTax] = useState("0")
  const [invoice, setInvoice] = useState(false)
  const navigate = useNavigate()

  const [addSkladniki, { isLoading, isSuccess, isError, error, data }] =
    useAddSkladnikiMutation()

  const producenci = useSelector((state) => selectAllProducenci(state))
  const kontrahenci = useSelector((state) => selectAllKontrahenci(state))

  const sortedProducenci = producenci.sort((a, b) =>
    a.name
      .toLowerCase()
      .localeCompare(b.name.toLowerCase(), "pl", { sensitivity: "base" })
  )

  const sortedKontrahenci = kontrahenci.sort((a, b) =>
    a.name
      .toLowerCase()
      .localeCompare(b.name.toLowerCase(), "pl", { sensitivity: "base" })
  )

  const handleCheckboxChange = (event) => {
    setInvoice(event.target.checked)
  }

  const formHandler = async (e) => {
    e.preventDefault()
    const skladniki = {
      name,
      producent,
      kontrahent,
      category,
      cena,
      tax,
      invoice,
    }

    // console.log(addedskladniki);
    await addSkladniki({ skladniki })
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/skladniki", {
        state: {
          data,
        },
      })
    }
  }, [isSuccess, navigate, data])
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <h5>Dodaj skladnik</h5>
      <form onSubmit={formHandler} className='flex flex-col gap-5'>
        <div className='flex flex-col items-center justify-center gap-3'>
          <input
            className='w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
            type='text'
            id='name'
            name='name'
            placeholder='Nazwa skladnika'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          ></input>

          <label htmlFor='cena'>Cena</label>
          <input
            className='w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
            type='number'
            id='cena'
            name='cena'
            placeholder='Cena'
            value={cena}
            onChange={(e) => {
              setCena(e.target.value)
            }}
          ></input>
          <label htmlFor='tax'>Podatek</label>
          <input
            className='w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
            type='number'
            id='tax'
            name='tax'
            placeholder='Podatek'
            value={tax}
            onChange={(e) => {
              setTax(e.target.value)
            }}
          ></input>
          <div className='my-2 flex items-center'>
            <label htmlFor='invoice'>Uwzględnij na fakturze</label>
            <input
              className='ml-2 h-6 w-6 rounded border-kliklight p-2 text-klik focus:ring-2 focus:ring-kliklight dark:border-klikdark dark:ring-offset-neutral-800 dark:focus:ring-kliklight'
              type='checkbox'
              id='invoice'
              checked={invoice}
              name='invoice'
              placeholder='Faktura'
              onChange={handleCheckboxChange}
            ></input>
          </div>
          <label htmlFor='category'>Kategoria</label>
          <select
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            value={category}
            className='w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
            name='category'
            id='category'
          >
            <option value='-'>Wybierz kategorię</option>
            <option value='Mięso'>Mięso</option>
            <option value='Ryby'>Ryby</option>
            <option value='Warzywa'>Warzywa</option>
            <option value='Owoce'>Owoce</option>
            <option value='Nabiał'>Nabiał</option>
            <option value='Sypkie'>Sypkie</option>
            <option value='Przyprawy'>Przyprawy</option>
            <option value='Przetwory'>Przetwory</option>
            <option value='Płyny'>Płyny</option>
            <option value='Opakowania'>Opakowania</option>
          </select>
          <label htmlFor='category'>Kontrahent</label>
          <select
            className='w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
            id='kontrahent'
            name='kontrahent'
            value={kontrahent}
            onChange={(e) => {
              setKontrahent(e.target.value)
            }}
          >
            <option value='Brak kontrahenta'>Brak kontrahenta</option>
            {sortedKontrahenci.map((x, y) => {
              return (
                <option value={x.shortName} key={y}>
                  {x.shortName}
                </option>
              )
            })}
          </select>
          <label htmlFor='category'>Producent</label>
          <select
            className='w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
            id='producent'
            name='producent'
            value={producent}
            onChange={(e) => {
              setProducent(e.target.value)
            }}
          >
            <option value='Brak producenta'>Brak producenta</option>
            {sortedProducenci.map((x, y) => {
              return (
                <option value={x.name} key={y}>
                  {x.name}
                </option>
              )
            })}
          </select>
        </div>
        <div className='flex flex-col items-center'>
          <button
            type='submit'
            className='flex items-center gap-2 rounded-lg bg-klik px-2.5 py-2.5 text-center text-xs font-medium uppercase text-white hover:bg-kliklight focus:outline-none focus:ring-4 focus:ring-klikdark sm:px-5'
          >
            Zapisz produkt
          </button>
        </div>
      </form>
      {isSuccess ? <Success success={data?.message} /> : ""}
      {isError ? <Error error={error?.data} /> : ""}
    </div>
  )
}
