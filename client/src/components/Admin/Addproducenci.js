import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddProducenciMutation } from "../../features/producenciApiSlice"
import Error from "../Notifications/Error"

const Addproducenci = () => {
  const [addProducenci, { isSuccess, isError, error, data }] =
    useAddProducenciMutation()

  const navigate = useNavigate()
  const [name, setName] = useState("")

  useEffect(() => {
    if (isSuccess) {
      setName("")
      navigate("/admin/producenci", {
        state: {
          data,
        },
      })
    }
  }, [isSuccess, navigate, data])

  const formHandler = async (e) => {
    e.preventDefault()
    const producenci = {
      name,
    }
    await addProducenci({ producenci })
  }

  const content = (
    <div className='d-flex flex-column withSidebar item-center'>
      <h5>Dodaj producenta</h5>
      <div className='d-flex w-50'>
        <form onSubmit={formHandler} className='flex-column w-100 item-center'>
          <div className='d-flex flex-column form-group w-100 mx-2'>
            <label htmlFor='name'>Nazwa producenta</label>
            <input
              className='form-control'
              type='text'
              placeholder='Nazwa producenta'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            ></input>
          </div>
          <button type='submit'>Dodaj producenta</button>
        </form>
      </div>
      {isError ? <Error error={error?.data} /> : ""}
    </div>
  )

  return content
}

export default Addproducenci
