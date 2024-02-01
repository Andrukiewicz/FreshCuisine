import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEditProductMutation } from "../../../features/productsApiSlice"
import { selectAllPrzepisy } from "../../../features/przepisyApiSlice"
import Error from "../../Notifications/Error"
import Success from "../../Notifications/Success"
import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

const EditProduct = ({ product }) => {
  usePageTitleAdmin(product.name)
  const [editProduct, { isLoading, isSuccess, isError, error, data }] =
    useEditProductMutation()

  const przepisy = useSelector((state) => selectAllPrzepisy(state))

  const navigate = useNavigate()
  const [name, setName] = useState(product.name || "")
  const [price, setPrice] = useState(product.price || "")
  const [image, setImage] = useState(product.image || "")
  const [description, setDescription] = useState(product.description || "")
  const [description2, setDescription2] = useState(product.description2 || "")
  const [description3, setDescription3] = useState(product.description3 || "")
  const [category, setCategory] = useState(product.category || "")
  const [number, setNumber] = useState(product.number || "")

  const [daniaList, setDaniaList] = useState(product.week)

  const [wylicz, setWylicz] = useState("")

  const handleWylicz = () => {
    axios
      .post(
        "/api/products/wyliczproduct",
        { productId: product._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => setPrice(res.data.message))
      .catch((err) => setWylicz(err.message))
  }

  const handleDania = (e, i) => {
    const list = JSON.parse(JSON.stringify(daniaList))
    list[i][e.target.name] = e.target.value
    setDaniaList(list)
  }

  // handle click event of the Remove button
  const handleRemoveDania = (index) => {
    const list = [...daniaList]
    list.splice(index, 1)
    setDaniaList(list)
  }

  // handle click event of the Add button
  const handleAddDania = () => {
    setDaniaList([
      // ...przepisy,
      ...daniaList,
      { name: "" },
    ])
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/products", {
        state: {
          data,
        },
      })
    }
  }, [isSuccess, navigate, data])

  const formHandler = async (e) => {
    e.preventDefault()
    const editedproduct = {
      _id: product.id,
      name,
      image,
      description,
      description2,
      description3,
      category,
      price,
      number,
      week: daniaList,
    }
    await editProduct({ editedproduct })
  }

  const content = (
    <div className='flex flex-col items-center justify-center gap-5'>
      <h2>Edytuj zestaw</h2>
      <div className='flex flex-col'>
        <form
          onSubmit={formHandler}
          className='flex max-w-md flex-col items-center gap-5'
        >
          <div className='flex w-full flex-col items-center justify-center gap-3'>
            <label htmlFor='name'>Nazwa zestawu</label>
            <input
              className='w-full appearance-none rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
              type='text'
              id='name'
              placeholder='Nazwa zestawu'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            ></input>
            <label htmlFor='number'>Ile osob</label>
            <input
              className='w-full appearance-none rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
              type='text'
              id='number'
              placeholder='Ile osob'
              value={number}
              onChange={(e) => {
                setNumber(e.target.value)
              }}
            ></input>
            <div className='flex flex-row'>
              <label htmlFor='price'>Cena</label>
              <button type='button' onClick={() => handleWylicz()}>
                <i className='fa fa-calculator m-1'></i>
                {wylicz}
              </button>
            </div>
            <input
              className='w-full appearance-none rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
              type='text'
              id='price'
              placeholder='Cena'
              value={price}
              onChange={(e) => {
                setPrice(e.target.value)
              }}
            ></input>
            <label htmlFor='image'>Zdjecie (plik)</label>
            <input
              className='w-full appearance-none rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
              type='text'
              id='image'
              placeholder='zdjęcie'
              value={image}
              onChange={(e) => {
                setImage(e.target.value)
              }}
            ></input>
            <label htmlFor='description'>Opis zestawu</label>
            <textarea
              className='w-full resize-none appearance-none rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
              type='description'
              rows='3'
              id='description'
              placeholder='Opis zestawu'
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            ></textarea>
            <label htmlFor='description2'>Opis zestawu 2</label>
            <textarea
              className='w-full resize-none appearance-none rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
              type='description'
              rows='3'
              id='description2'
              placeholder='Opis zestawu 2'
              value={description2}
              onChange={(e) => {
                setDescription2(e.target.value)
              }}
            ></textarea>
            <label htmlFor='description3'>Opis zestawu 3</label>
            <textarea
              className='w-full resize-none appearance-none rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
              type='description'
              rows='2'
              id='description3'
              placeholder='Opis zestawu 3'
              value={description3}
              onChange={(e) => {
                setDescription3(e.target.value)
              }}
            ></textarea>
            <label htmlFor='category'>Kategoria</label>
            <select
              onChange={(e) => {
                setCategory(e.target.value)
              }}
              value={category}
              className='w-full appearance-none rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
              name='category'
              id='category'
            >
              <option value='Wege'>Wege</option>
              <option value='Mieszany'>Mieszany</option>
            </select>
          </div>
          <div className='flex w-full flex-col items-center justify-center gap-3'>
            <hr />
            <span>Dania w zestawie</span>
            {daniaList.map((item, i) => {
              return (
                <div
                  key={i}
                  className='flex w-full flex-col items-center justify-center gap-5'
                >
                  <div className='flex w-full flex-row items-center justify-center gap-3'>
                    <select
                      className='mr-2 w-full appearance-none rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
                      id='name'
                      name='name'
                      value={item.name}
                      onChange={(e) => handleDania(e, i)}
                    >
                      {przepisy.map((x, y) => (
                        <option key={y} value={x.name}>
                          {x.name} | {x.totalprzepis.toFixed(2)}
                        </option>
                      ))}
                    </select>
                    <div className='btn-box'>
                      {daniaList.length !== 1 && (
                        <button
                          type='button'
                          className='flex items-center justify-center rounded-lg border border-transparent bg-klik px-2 py-2 text-sm text-white transition-transform hover:scale-105 hover:bg-kliklight'
                          onClick={() => handleRemoveDania(i)}
                        >
                          Usuń
                        </button>
                      )}
                    </div>
                  </div>
                  {daniaList.length - 1 === i && (
                    <button
                      type='button'
                      className='flex items-center justify-center rounded-lg border border-transparent bg-klik px-2 py-2 text-sm text-white transition-transform hover:scale-105 hover:bg-kliklight'
                      onClick={handleAddDania}
                    >
                      Dodaj
                    </button>
                  )}
                </div>
              )
            })}
            {/* <div>
              <pre>{JSON.stringify(daniaList, null, 2)}</pre>
            </div> */}
          </div>
          <button
            className='flex items-center justify-center rounded-lg border border-transparent bg-klik px-2 py-2 text-sm text-white transition-transform hover:scale-105 hover:bg-kliklight'
            type='submit'
          >
            Zapisz produkt
          </button>
        </form>
        {isSuccess ? <Success success={data?.message} /> : ""}
        {isError ? <Error error={error?.data} /> : ""}
      </div>
    </div>
  )

  return content
}

export default EditProduct
