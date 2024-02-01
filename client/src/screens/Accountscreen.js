import React, { useEffect } from "react"
import { Route, Routes, NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// NOTIFICATIONS
import Loading from "../components/Notifications/Loading"

// AUTH
import useAuth from "../hooks/useAuth"

// LOGOUT & CLEAR CART
import { useSendLogoutMutation } from "../features/authApiSlice"
import { clearCart } from "../features/cartSlice"

// ROUTES
import AccountInfo from "../components/Account/AccountInfo"
import EditAccount from "../components/Account/EditAccount"
// import Addresses from "../components/Account/Addresses"
// import EditPassword from "../components/Account/EditPassword"
// import Newsletter from "../components/Account/Newsletter"
import Orders from "../components/Account/Orders"
// import ShowOrder from "../components/Account/ShowOrder"

// NOTIFICATIONS
import Error from "../components/Notifications/Error"

// AUTH

export default function Accountscreen() {
  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cart)

  const { id, email } = useAuth()

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation(undefined, {
      refetchOnMountOrArgChange: true,
    })

  const navigate = useNavigate()
  useEffect(() => {
    if (!id && !email) {
      navigate("/logowanie")
    }
  }, [id, email])

  useEffect(() => {
    if (isSuccess) {
      if (cartItems?.length !== 0) {
        dispatch(clearCart())
      }
      navigate("/")
    }
    // if (isSuccess) navigate("/", { replace: true })
  }, [isSuccess, navigate, dispatch, cartItems])

  if (isLoading)
    return (
      <div className='flex h-[calc(100vh-64px)] items-center justify-center'>
        <Loading />
      </div>
    )

  // if (isError) return <p>Error: {error?.data?.message}</p>
  if (isError) return <Error error='Coś poszło nie tak' />

  return (
    <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-8 lg:px-8'>
        <div className='relative flex w-full flex-col gap-5 sm:flex-row'>
          <div className='flex h-fit w-full flex-col gap-1 rounded-md bg-neutral-100 py-5 dark:bg-neutral-800 sm:w-1/5'>
            <h4 className='flex items-center px-5 font-bold'>Twoje konto</h4>
            <div className='flex flex-col'>
              <ul>
                <NavLink to='/konto' className='w-full'>
                  <li className='py-3 px-5 hover:bg-neutral-200 hover:dark:bg-neutral-700'>
                    <i className='fa fa-circle-user pr-2'></i>
                    <span className='nav__text'>Przegląd konta</span>
                  </li>
                </NavLink>
                <NavLink to='zamowienia' className='nav__link'>
                  <li className='py-3 px-5 hover:bg-neutral-200 hover:dark:bg-neutral-700'>
                    <i className='fas fa-bag-shopping pr-2'></i>
                    <span className='nav__text'>Zamówienia</span>
                  </li>
                </NavLink>

                <NavLink to='ustawienia-konta' className='nav__link'>
                  <li className='py-3 px-5 hover:bg-neutral-200 hover:dark:bg-neutral-700'>
                    <i className='fa-solid fa-gear pr-2'></i>
                    <span className='nav__text'>Ustawienia konta</span>
                  </li>
                </NavLink>
                <a className='nav__link' href='/' onClick={sendLogout}>
                  <li className='py-3 px-5 hover:bg-neutral-200 hover:dark:bg-neutral-700'>
                    <i className='fas fa-power-off pr-2'></i>
                    <span className='nav__text'>Wyloguj się</span>
                  </li>
                </a>
              </ul>
              <div className='mt-5 hidden w-full flex-col items-center sm:flex'>
                <div className='w-full rounded-md bg-neutral-200 py-3 px-5 text-sm dark:bg-neutral-800'>
                  <div className='w-full text-center'>
                    <span>Pytania?</span>
                  </div>
                  <div className='flex flex-col p-2'>
                    <a href='tel:796445923'>
                      <i className='fas fa-phone text-orange text-lg' />{" "}
                      <span className='text-xl font-bold'>796 445 923</span>
                    </a>
                    <div className='mt-2 flex flex-row gap-2 sm:items-start'>
                      <div className='flex flex-col items-start gap-1 text-xs'>
                        <span>pon. - pt.</span>
                        <span>sob. - niedz.</span>
                      </div>
                      <div className='flex flex-col items-end gap-1 text-xs'>
                        <span>8:00 - 21:00</span>
                        <span>8:00 - 19:00</span>
                      </div>
                    </div>
                    <div className='mt-2'>
                      <a href='mailto:kontakt@3klik.pl'>
                        <i className='fas fa-envelope text-orange' />{" "}
                        <span className='ml-2'>kontakt@3klik.pl</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-4/5'>
            {/* PODSTRONY PROFILU */}
            <Routes>
              <Route path='/' element={<AccountInfo />} />
              <Route path='ustawienia-konta' element={<EditAccount />} />
              {/* <Route path='zmien-haslo' element={<EditPassword />} /> */}
              <Route path='zamowienia' element={<Orders />} />
              {/* <Route path='zamowienia/:zamowieniaid' element={<ShowOrder />} /> */}
              {/* <Route path='adresy' element={<Addresses />} /> */}
              {/* <Route path='newsletter' element={<Newsletter />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}
