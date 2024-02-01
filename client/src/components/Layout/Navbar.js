import React, { useEffect, useState, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid"
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"

import { useSendLogoutMutation } from "../../features/authApiSlice"
import { clearCart } from "../../features/cartSlice"

import useAuth from "../../hooks/useAuth"
import Error from "../Notifications/Error"
import Loading from "../Notifications/Loading"

import logo from "../../images/logo128.webp"

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const { email, status, isManager, isAdmin } = useAuth()

  const { cartItems } = useSelector((state) => state.cart)

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  const [isDarkMode, setDarkMode] = useState(false)

  const handleDarkModeChange = () => {
    const newDarkMode = !isDarkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("theme", newDarkMode ? "dark" : "light")
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  useEffect(() => {
    if (isSuccess) {
      if (cartItems.length !== 0) {
        dispatch(clearCart())
      }
      navigate("/")
      // Reload the page
      window.location.reload()
    }
    // if (isSuccess) navigate("/", { replace: true })
  }, [isSuccess, navigate, dispatch, cartItems])

  useEffect(() => {
    const localTheme = localStorage.getItem("theme")

    if (localTheme === "dark") {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    } else if (localTheme === "light") {
      document.documentElement.classList.remove("dark")
      setDarkMode(false)
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      localStorage.setItem("theme", "dark")
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    } else {
      localStorage.setItem("theme", "light")
      document.documentElement.classList.remove("dark")
      setDarkMode(false)
    }
  }, [])

  if (isLoading)
    return (
      <div className='flex h-[calc(100vh-64px)] items-center justify-center'>
        <Loading />
      </div>
    )

  // if (isError) return <p>Error: {error?.data?.message}</p>
  if (isError) return <Error error='Coś poszło nie tak' />

  if (pathname.includes("/admin")) return null

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }

  const content = (
    <Disclosure as='nav'>
      <>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex flex-shrink-0 items-center'>
                <Link
                  to='/'
                  className='rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                >
                  <img className='block h-12 w-12' src={logo} alt='3klik' />
                </Link>
              </div>
            </div>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              {/* Mobile menu bottom navbar */}
              <section className='shadow-lg fixed inset-x-0 bottom-0 z-50 block rounded-t-md bg-white bg-opacity-70 text-gray-900 backdrop-blur-lg dark:bg-zinc-900 dark:bg-opacity-70 dark:text-white md:hidden'>
                <div id='tabs' className='flex justify-between'>
                  <Link
                    to='/'
                    className='focus:text-royal inline-block w-full justify-center pt-2 pb-1 text-center'
                    // activeClassName='dark:text-gray-100 text-black'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='mb-1 inline-block h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                      />
                    </svg>
                    <span className='tab block text-xs'>3klik</span>
                  </Link>
                  <Link
                    to='/koszyk'
                    type='button'
                    className='focus:text-royal inline-block w-full justify-center pt-2 pb-1 text-center'
                  >
                    <span className='sr-only'>Koszyk</span>
                    <ShoppingBagIcon
                      className='mb-1 inline-block h-6 w-6'
                      aria-hidden='true'
                    />
                    <span className='tab block text-xs'>
                      Koszyk ({cartItems ? cartItems?.length : 0})
                    </span>
                  </Link>
                  <Link
                    to='/konto'
                    className='focus:text-royal inline-block w-full justify-center pt-2 pb-1 text-center'
                    // activeClassName='dark:text-gray-100 text-black'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='mb-1 inline-block h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                    <span className='tab block text-xs'>Konto</span>
                  </Link>
                </div>
              </section>
              {/* END OF MOBILE NAVBAR */}
              {/* Profile dropdown DESKTOP PC */}
              <div className='flex h-8 w-8 items-center justify-center rounded-full'>
                {isDarkMode ? (
                  <SunIcon
                    className='inline-block h-6 w-6 rounded-full text-neutral-500'
                    aria-hidden='true'
                  />
                ) : (
                  <SunIcon
                    className='inline-block h-6 w-6 rounded-full text-klik'
                    aria-hidden='true'
                  />
                )}
              </div>
              <label className='relative inline-flex cursor-pointer items-center'>
                <span className='sr-only'>Tryb ciemny</span>
                <input
                  type='checkbox'
                  checked={isDarkMode}
                  onChange={handleDarkModeChange}
                  className='peer sr-only'
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-klik peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-orange-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-orange-800"></div>
              </label>
              <div className='flex h-8 w-8 items-center justify-center rounded-full'>
                {isDarkMode ? (
                  <MoonIcon
                    className='inline-block h-6 w-6 text-white'
                    aria-hidden='true'
                  />
                ) : (
                  <MoonIcon
                    className='inline-block h-6 w-6 text-neutral-500'
                    aria-hidden='true'
                  />
                )}
              </div>
              {cartItems?.length ? (
                <Link
                  to='/koszyk'
                  type='button'
                  className='mr-2 hidden flex-row rounded-full text-klik transition-colors hover:bg-kliklight hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 md:flex'
                >
                  <span className='sr-only'>Koszyk</span>
                  <ShoppingBagIcon
                    className='h-12 w-12 p-1'
                    aria-hidden='true'
                  />
                  <span className='absolute ml-7 flex rounded-full bg-neutral-600 px-2 align-middle font-bold text-white drop-shadow-md dark:bg-neutral-200 dark:text-neutral-900'>
                    {cartItems ? cartItems?.length : 0}
                  </span>
                </Link>
              ) : (
                <Link
                  type='button'
                  className='mr-2 hidden flex-row rounded-full text-klik drop-shadow-md transition-colors hover:bg-kliklight hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-500 md:flex'
                >
                  <span className='sr-only'>Koszyk</span>
                  <ShoppingBagIcon
                    className='h-12 w-12 p-2'
                    aria-hidden='true'
                  />
                  <span className='absolute ml-7 flex rounded-full bg-neutral-200 px-2 align-middle text-klik'>
                    {cartItems ? cartItems?.length : 0}
                  </span>
                </Link>
              )}
              {email ? (
                <>
                  <Menu as='div' className='relative ml-2 hidden md:block'>
                    <div>
                      <Menu.Button className='dark:bg-nutral-800 shadow-md flex rounded-full text-sm text-klik focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-500'>
                        <span className='sr-only'>Otwórz menu użytkownika</span>
                        <UserIcon
                          className='h-12 w-12 p-2'
                          aria-hidden='true'
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='shadow-lg absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-neutral-200 text-center ring-1 ring-neutral-500 ring-opacity-5 focus:outline-none dark:bg-neutral-800'>
                        {isAdmin || isManager ? (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/admin'
                                className={classNames(
                                  active
                                    ? "bg-neutral-300 dark:bg-neutral-700"
                                    : "",
                                  "block w-full rounded-lg px-4 py-2 text-sm"
                                )}
                              >
                                <span className='sr-only'>Admin panel</span>
                                {status} Panel
                              </Link>
                            )}
                          </Menu.Item>
                        ) : (
                          ""
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/konto'
                              className={classNames(
                                active
                                  ? "bg-neutral-300 dark:bg-neutral-700"
                                  : "",
                                "block w-full rounded-lg px-4 py-2 text-sm"
                              )}
                            >
                              <span className='sr-only'>Profil</span>
                              Profil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/konto/zamowienia'
                              className={classNames(
                                active
                                  ? "bg-neutral-300 dark:bg-neutral-700"
                                  : "",
                                "block w-full rounded-lg px-4 py-2 text-sm"
                              )}
                            >
                              <span className='sr-only'>Zamówienia</span>
                              Zamówienia
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active
                                  ? "bg-neutral-300 dark:bg-neutral-700"
                                  : "",
                                "block w-full rounded-lg px-4 py-2 text-sm"
                              )}
                              onClick={sendLogout}
                            >
                              <span className='sr-only'>Wyloguj się</span>
                              Wyloguj się
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
              ) : (
                <div className='hidden items-center justify-end md:flex md:flex-1'>
                  <Link
                    to='/logowanie'
                    type='button'
                    className='shadow-sm inline-flex items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-gray-200 px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900'
                  >
                    Zaloguj się
                  </Link>
                  <Link
                    to='/rejestracja'
                    className='shadow-sm ml-2 inline-flex items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-klik px-4 py-2 text-base font-medium text-white hover:bg-kliklight'
                  >
                    Załóż konto
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  )
  return content
}
