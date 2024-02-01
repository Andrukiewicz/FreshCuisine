import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useEditKontrahenciMutation } from "../../../features/kontrahenciApiSlice"
import Error from "../../Notifications/Error"
import Success from "../../Notifications/Success"
import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

const EditKontrahenci = ({ kontrahenci }) => {
  usePageTitleAdmin(kontrahenci.name)
  const [editKontrahenci, { isLoading, isSuccess, isError, error, data }] =
    useEditKontrahenciMutation()

  const navigate = useNavigate()
  const [shortName, setShortName] = useState(kontrahenci.shortName)
  const [name, setName] = useState(kontrahenci.name)
  const [address, setAddress] = useState(kontrahenci.address)
  const [postCode, setPostCode] = useState(kontrahenci.postCode)
  const [city, setCity] = useState(kontrahenci.city)
  const [nip, setNip] = useState(kontrahenci.nip)
  const [phoneNumber, setPhoneNumber] = useState(kontrahenci.phoneNumber)
  const [email, setEmail] = useState(kontrahenci.email)
  const [accountNumber, setAccountNumber] = useState(kontrahenci.accountNumber)

  useEffect(() => {
    if (isSuccess) {
      setName("")
      navigate("/admin/kontrahenci", {
        state: {
          data,
        },
      })
    }
  }, [isSuccess, navigate, data])

  //   const onNameChanged = e => setName(e.target.value)
  const formHandler = async (e) => {
    e.preventDefault()
    const editedkontrahenci = {
      _id: kontrahenci.id,
      shortName,
      name,
      address,
      postCode,
      city,
      nip,
      phoneNumber,
      email,
      accountNumber,
    }
    await editKontrahenci({ editedkontrahenci })
  }

  const content = (
    <div className='d-flex justify-content-center flex-column  align-items-center withSidebar'>
      <h5>Edytuj kontrahenta</h5>
      <div className='d-flex justify-content-center flex-column  align-items-center w-50'>
        <form
          onSubmit={formHandler}
          className='justify-content-center flex-column  align-items-center w-100'
        >
          <div className='d-flex flex-column form-group w-100 mx-2'>
            <label htmlFor='shortName'>Nazwa skrócona</label>
            <input
              className='form-control'
              type='text'
              placeholder='Nazwa skrócona'
              value={shortName}
              onChange={(e) => {
                setShortName(e.target.value)
              }}
            ></input>
            <label htmlFor='name'>Nazwa pełna</label>
            <input
              className='form-control'
              type='text'
              placeholder='Nazwa pełna'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            ></input>
            <label htmlFor='address'>Adres</label>
            <input
              className='form-control'
              type='text'
              placeholder='Adres'
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
              }}
            ></input>
            <label htmlFor='postCode'>Kod pocztowy</label>
            <input
              className='form-control'
              type='text'
              placeholder='Kod pocztowy'
              value={postCode}
              onChange={(e) => {
                setPostCode(e.target.value)
              }}
            ></input>
            <label htmlFor='city'>Miejscowość</label>
            <input
              className='form-control'
              type='text'
              placeholder='Miejscowość'
              value={city}
              onChange={(e) => {
                setCity(e.target.value)
              }}
            ></input>
            <label htmlFor='nip'>NIP</label>
            <input
              className='form-control'
              type='number'
              placeholder='NIP'
              value={nip}
              onChange={(e) => {
                setNip(e.target.value)
              }}
            ></input>
            <label htmlFor='phoneNumber'>Telefon</label>
            <input
              className='form-control'
              type='text'
              placeholder='Telefon'
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value)
              }}
            ></input>
            <label htmlFor='email'>E-mail</label>
            <input
              className='form-control'
              type='text'
              placeholder='E-mail'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            ></input>
            <label htmlFor='accountNumber'>Numer konta</label>
            <input
              className='form-control'
              type='number'
              placeholder='Numer konta'
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value)
              }}
            ></input>
          </div>
          <button type='submit'>Zapisz kontrahenta</button>
        </form>
        {isSuccess ? <Success success={data?.message} /> : ""}
        {isError ? <Error error={error?.data} /> : ""}
      </div>
    </div>
  )

  return content
}

export default EditKontrahenci
