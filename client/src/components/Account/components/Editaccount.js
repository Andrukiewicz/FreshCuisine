import React, { useState } from "react"
import { useDispatch } from "react-redux"

export default function Editaccount({ user }) {
  const [fullName, setFullName] = useState(user.fullName)
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
  const [email, setEmail] = useState(user.email)

  function formHandler(e) {
    e.preventDefault()

    const editedUser = {
      fullName,
      phoneNumber,
      email,
    }
    console.log(editedUser, "EDITACCOUNT.JS")
  }

  return (
    <div className='mt-12 flex h-full w-full flex-col gap-5 rounded-lg bg-neutral-200 p-5 dark:bg-neutral-800 sm:mt-0'>
      <div className='my-2 flex w-full'>
        <h2 className='text-2xl sm:text-4xl'>Ustawienia konta</h2>
      </div>
      <form onSubmit={formHandler}>
        <div className='flex max-w-[550px] flex-col'>
          <div className='flex flex-col gap-5'>
            <div className='text-xl sm:text-2xl'>
              <span>Dane konta</span>
            </div>
            <div className='form-group'>
              <label>Imię i nazwisko</label>
              <input
                className='block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 transition ease-in-out focus:border-klik focus:ring-klik dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-200 dark:focus:border-klik dark:focus:ring-klik'
                type='text'
                name='name'
                placeholder='Nazwa użytkownika'
                maxLength='50'
                onChange={(e) => {
                  setFullName(e.target.value)
                }}
                value={fullName}
              />
            </div>
            <div className='form-group'>
              <label>Numer telefonu</label>
              <input
                className='block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 transition ease-in-out focus:border-klik focus:ring-klik dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-200 dark:focus:border-klik dark:focus:ring-klik'
                type='tel'
                pattern='[0-9]{3}[0-9]{3}[0-9]{3}'
                maxLength='9'
                name='numertelefonu'
                placeholder='Numer telefonu'
                onChange={(e) => {
                  setPhoneNumber(e.target.value)
                }}
                value={phoneNumber}
              />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input
                className='block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 transition ease-in-out focus:border-klik focus:ring-klik dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-200 dark:focus:border-klik dark:focus:ring-klik'
                type='text'
                placeholder='Email'
                maxLength='35'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                value={email}
              />
            </div>
          </div>
          <div className='mt-5'>
            <button className='flex items-center gap-2 rounded-lg bg-klik px-5 py-2.5 text-xs font-medium uppercase text-white hover:bg-kliklight focus:outline-none focus:ring-4 focus:ring-klikdark'>
              Zapisz
            </button>
          </div>
        </div>
      </form>
      <section className='mt-16 flex max-w-[550px] flex-col gap-5 text-sm'>
        <h3 className='text-xl sm:text-2xl'>Usuwanie konta</h3>
        <p>
          Jeśli klikniesz w ten przycisk, usuniesz swoje konto w naszym sklepie.
          Upewnij się, że na pewno chcesz to zrobić – Twojego konta nie będziemy
          mogli przywrócić.
        </p>
        <p>
          Jeśli chcesz zachować swoje konto, ale nie chcesz dostawać od nas
          wiadomości – odznacz zgody w ustawieniach powiadomień.
        </p>
        <form>
          <button className='flex items-center gap-2 rounded-lg bg-klik px-5 py-2.5 text-xs font-medium uppercase text-white hover:bg-kliklight focus:outline-none focus:ring-4 focus:ring-klikdark'>
            Usuń konto
          </button>
        </form>
      </section>
    </div>
  )
}
