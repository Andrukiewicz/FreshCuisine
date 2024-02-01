import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAddProductMutation } from "../../features/productsApiSlice"
import { selectAllPrzepisy } from "../../features/przepisyApiSlice"

// import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"
import Success from "../Notifications/Success"

export default function Addproduct() {
  const [addProduct, { isSuccess, isError, error, data }] =
    useAddProductMutation()

  const przepisystate = useSelector((state) => selectAllPrzepisy(state))

  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [price, setPrice] = useState()
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [description2, setDescription2] = useState("")
  const [description3, setDescription3] = useState("")
  const [category, setCategory] = useState("Wege box")
  const [number, setNumber] = useState("")

  const [daniaList, setDaniaList] = useState([
    {
      name: "Bakłażan faszerowany z kaszą jaglaną i serem mozzarella",
    },
  ])

  const sortedPrzepisy = przepisystate.sort((a, b) =>
    a.name
      .toLowerCase()
      .localeCompare(b.name.toLowerCase(), "pl", { sensitivity: "base" })
  )

  // handle input change
  const handleDania = (e, index) => {
    const { name, value } = e.target

    const list = [...daniaList]
    list[index][name] = value
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

  const formHandler = async (e) => {
    e.preventDefault()
    const product = {
      name,
      image,
      description,
      category,
      price,
      week: daniaList,
    }
    await addProduct({ product })
  }

  useEffect(() => {
    if (isSuccess) {
      setName("")
      navigate("/admin/products", {
        state: {
          data,
        },
      })
    }
  }, [isSuccess, navigate, data])

  const content = (
    <div className='d-flex justify-content-center flex-column align-items-center withSidebar'>
      <h2>Dodaj zestaw</h2>
      <div className='d-flex justify-content-center flex-column align-items-center'>
        <form
          onSubmit={formHandler}
          className='justify-content-center flex-column align-items-center'
        >
          <div className='d-flex flex-column mx-2'>
            <input
              className='form-control'
              type='text'
              placeholder='Nazwa zestawu'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            ></input>
            <input
              className='form-control'
              type='text'
              placeholder='Ile osob'
              value={number}
              onChange={(e) => {
                setNumber(e.target.value)
              }}
            ></input>
            <input
              className='form-control'
              type='text'
              placeholder='Cena'
              value={price}
              onChange={(e) => {
                setPrice(e.target.value)
              }}
            ></input>
            <input
              className='form-control'
              type='input'
              placeholder='zdjęcie'
              value={image}
              onChange={(e) => {
                setImage(e.target.value)
              }}
            ></input>
            <input
              className='form-control'
              type='description'
              placeholder='Opis zestawu'
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            ></input>
            <input
              className='form-control'
              type='description'
              placeholder='Opis zestawu'
              value={description2}
              onChange={(e) => {
                setDescription2(e.target.value)
              }}
            ></input>
            <input
              className='form-control'
              type='description'
              placeholder='Opis zestawu'
              value={description3}
              onChange={(e) => {
                setDescription3(e.target.value)
              }}
            ></input>
            <label htmlFor='category'>Kategoria</label>
            <select
              onChange={(e) => {
                setCategory(e.target.value)
              }}
              value={category}
              className='form-control'
              name='category'
              id='category'
            >
              <option value='Wege box'>Wege box</option>
              <option value='Mieszany box'>Mieszany box</option>
              <option value='Wege rodzinny box'>Wege rodzinny box</option>
              <option value='Mieszany rodzinny box'>
                Mieszany rodzinny box
              </option>
            </select>
            <div className='d-flex flex-column'>
              <hr />
              <span className='item-center'>Dania w zestawie</span>
              {daniaList.map((item, i) => {
                return (
                  <div key={i} className='d-flex flex-column'>
                    <div className='d-flex flex-column'>
                      <select
                        className='form-control'
                        id='name'
                        name='name'
                        value={item.name}
                        onChange={(e) => handleDania(e, i)}
                      >
                        {/* {sortedPrzepisy.map((x, y) => {
                        return (
                          <option value={x.name} key={y}>
                            {x.name}
                          </option>
                        );
                      })} */}
                        {sortedPrzepisy.map((x, y) => (
                          <option key={y} value={x.name}>
                            {x.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='btn-box'>
                      {daniaList.length !== 1 && (
                        <button
                          className='btn btn-outline-secondary d-flex m-1 mx-auto'
                          onClick={() => handleRemoveDania(i)}
                        >
                          Usuń
                        </button>
                      )}
                      {daniaList.length - 1 === i && (
                        <button
                          className='btn btn-outline-secondary d-flex m-1 mx-auto'
                          onClick={handleAddDania}
                        >
                          Dodaj
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
              <div>
                <pre>{JSON.stringify(daniaList, null, 2)}</pre>
              </div>
            </div>
          </div>
          <button type='submit'>Dodaj produkt</button>
        </form>
        {isSuccess ? <Success success={data?.message} /> : ""}
        {isError ? <Error error={error?.data} /> : ""}
      </div>
    </div>
  )
  return content
}
