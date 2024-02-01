import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useEditProducenciMutation } from "../../../features/producenciApiSlice"
import Error from "../../Notifications/Error"
import Success from "../../Notifications/Success"
import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

const EditProducenci = ({ producenci }) => {
  usePageTitleAdmin(producenci.name)
  const [editProducenci, { isLoading, isSuccess, isError, error, data }] =
    useEditProducenciMutation()

  const navigate = useNavigate()
  const [name, setName] = useState(producenci.name)

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
    const editedproducenci = {
      _id: producenci.id,
      name,
    }
    await editProducenci({ editedproducenci })
  }

  const content = (
    <div className='d-flex justify-content-center flex-column  align-items-center withSidebar'>
      <h5>Edytuj producenta</h5>
      <div className='d-flex justify-content-center flex-column  align-items-center w-50'>
        <form
          onSubmit={formHandler}
          className='justify-content-center flex-column  align-items-center w-100'
        >
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
          <button type='submit'>Zapisz producenta</button>
        </form>
        {isSuccess ? <Success success={data?.message} /> : ""}
        {isError ? <Error error={error?.data} /> : ""}
      </div>
    </div>
  )

  return content
}

export default EditProducenci
