import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import DeliveryDate from "../hooks/DeliveryDate"

import { Disclosure, Transition } from "@headlessui/react"

import {
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
  getCartTotal,
  setDeliveryInfo,
} from "../features/cartSlice"
import emptycart from "../images/emptycart.svg"

import { TrashIcon } from "@heroicons/react/24/outline"
import {
  ShoppingBagIcon,
  CreditCardIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid"

import useAuth from "../hooks/useAuth"
import { usePageTitle } from "../hooks/usePageTitle"
import ImageModal from "../components/Layout/ImageModal"

export default function Cartscreen() {
  usePageTitle("Twój koszyk")
  const { email, id } = useAuth()
  const [deliveryInfoInput, setDeliveryInfoInput] = useState(undefined)
  const [selectedWeek, setSelectedWeek] = useState(null)

  const { cartItems, totalAmount, totalCount } = useSelector(
    (state) => state.cart
  )

  const dispatch = useDispatch()

  const addDeliveryInfo = () => {
    dispatch(setDeliveryInfo(deliveryInfoInput))
  }

  useEffect(() => {
    dispatch(getCartTotal())
  }, [cartItems, dispatch])

  return (
    <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div className='relative justify-center px-0 sm:px-0'>
        <div className='mx-auto flex max-w-7xl flex-col py-2 px-0 sm:px-6 md:py-8 lg:px-8'>
          {cartItems[0] && (
            <div className='flex flex-col items-center'>
              <DeliveryDate />
            </div>
          )}
          {cartItems[0] ? (
            <div className='mt-0 flex flex-col items-center gap-3 rounded-xl sm:mt-8 sm:gap-0 sm:bg-neutral-100 sm:dark:bg-neutral-800/25'>
              <div className='my-4 flex w-full max-w-fit items-center justify-between gap-0 rounded-xl bg-neutral-200 p-2 dark:bg-neutral-800 sm:w-auto sm:gap-5 sm:p-5 sm:dark:bg-neutral-900'>
                <div className='flex items-center'>
                  <div className='relative flex h-8 w-8 items-center justify-center rounded-full bg-klik text-white'>
                    <ShoppingBagIcon className='h-4 w-4' />
                  </div>
                  <div className='ml-2 flex flex-row gap-2 text-base font-medium text-klik sm:ml-4'>
                    <p>Koszyk</p>
                    <p className='flex w-8'>({totalCount})</p>
                  </div>
                </div>
                <div className='mx-4 text-neutral-500'>
                  <ChevronRightIcon className='h-4 w-4' />
                </div>
                <div className='flex items-center'>
                  <div className='relative flex h-8 w-8 items-center justify-center rounded-full bg-neutral-600 text-white'>
                    <CreditCardIcon className='h-4 w-4' />
                  </div>
                  <div className='ml-2 text-base font-medium text-neutral-600 sm:ml-4'>
                    Płatność
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3 sm:gap-0 lg:flex-row'>
                <div className='shadow-xl flex h-fit w-full flex-col gap-3 sm:rounded-md lg:w-2/3 lg:p-3'>
                  {selectedWeek && (
                    <ImageModal
                      week={selectedWeek}
                      onClose={() => setSelectedWeek(null)}
                    />
                  )}
                  {cartItems.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className='shadow-xl flex w-full flex-col p-0 sm:rounded-xl sm:bg-neutral-200 sm:p-8 sm:dark:bg-neutral-700/50'
                      >
                        <div className='flex flex-col items-center gap-5 px-3 pb-4 sm:flex-row sm:px-0'>
                          <div className='flex w-full items-center justify-center sm:w-1/4'>
                            <div className='mx-2 flex items-center justify-center'>
                              <img
                                className='max-h-32 w-32'
                                src={require(`../images/box/${item.image}`)}
                                alt={item.name}
                              ></img>
                            </div>
                          </div>
                          <div className='flex w-full flex-row sm:w-3/4'>
                            <div className='flex w-full flex-col justify-between gap-3'>
                              <div className='flex flex-col'>
                                <p className='text-center text-base sm:text-left lg:text-xl'>
                                  {item.name}
                                </p>
                              </div>
                              <div className='flex flex-col'>
                                <span className='font-bold'>Zawiera:</span>
                                <div className='flex flex-col gap-2 text-sm text-neutral-600 dark:text-neutral-300'>
                                  <span>{item.description}</span>
                                  <span>
                                    {item.description2 ? (
                                      <span>{item.description2}</span>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                  {item.description3 ? (
                                    <span>{item.description3}</span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className='flex w-full flex-row items-center justify-between gap-5 py-5 sm:py-0'>
                                <div className='flex w-1/2'>
                                  <span className='text-2xl font-thin'>
                                    {item.price} zł
                                  </span>
                                </div>
                                <div className='flex w-1/2 justify-end gap-3'>
                                  <div className='sm:dark-bg-neutral-900 flex flex-row items-center rounded-xl bg-neutral-100 text-center dark:bg-neutral-800'>
                                    <div className='rounded-l-xl'>
                                      {item.quantity > 1 ? (
                                        <ChevronLeftIcon
                                          className='h-8 w-8 cursor-pointer items-center text-xl'
                                          onClick={() => {
                                            dispatch(decreaseQuantity(item._id))
                                          }}
                                        ></ChevronLeftIcon>
                                      ) : (
                                        <ChevronLeftIcon className='fa-solid fa-chevron-down h-8 w-8 items-center text-xl text-neutral-500'></ChevronLeftIcon>
                                      )}
                                    </div>
                                    <div className='flex w-8 justify-center text-2xl'>
                                      {item.quantity}
                                    </div>
                                    <div className='rounded-r-xl'>
                                      <ChevronRightIcon
                                        className='h-8 w-8 cursor-pointer items-center text-xl'
                                        onClick={() => {
                                          dispatch(increaseQuantity(item._id))
                                        }}
                                      ></ChevronRightIcon>
                                    </div>
                                  </div>
                                  <div className='flex items-center justify-end text-xl'>
                                    <TrashIcon
                                      className='fa-solid fa-xmark h-8 w-8 cursor-pointer'
                                      onClick={() => {
                                        dispatch(deleteFromCart(item._id))
                                      }}
                                    ></TrashIcon>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-col'>
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={`flex w-full items-center justify-between ${
                                    open ? "rounded-t-lg" : "rounded-lg"
                                  } bg-neutral-300 p-3 text-left text-base font-bold dark:bg-neutral-700`}
                                >
                                  <span>Dania w zestawie</span>
                                  <div className='flex flex-row items-center gap-5 '>
                                    <span className='font-bold text-klik'>
                                      Rozwiń
                                    </span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                      strokeWidth={1.5}
                                      stroke='currentColor'
                                      className={`${
                                        open ? "rotate-180 transform" : ""
                                      } h-5 w-5 text-kliklight`}
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                                      />
                                    </svg>
                                  </div>
                                </Disclosure.Button>
                                <Transition
                                  enter='transition ease-in-out duration-150 transform'
                                  enterFrom='opacity-0 -translate-y-6'
                                  enterTo='opacity-100 translate-y-0'
                                  leave='transition ease-in-out duration-50 transform'
                                  leaveFrom='opacity-100 translate-y-0'
                                  leaveTo='opacity-0 -translate-y-0'
                                >
                                  <Disclosure.Panel
                                    className={`bg-neutral-300 p-5 text-base dark:bg-neutral-800 ${
                                      open ? "rounded-b-lg" : ""
                                    }`}
                                  >
                                    {item.week.map((week, subindex) => (
                                      <button
                                        key={subindex}
                                        className='flex w-full flex-row items-center py-2 hover:rounded-lg hover:bg-neutral-400 hover:text-black focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75'
                                        onClick={() => setSelectedWeek(week)}
                                      >
                                        <div className='flex h-12 w-12'>
                                          {week.imageName ? (
                                            <img
                                              className='w-12 object-contain'
                                              src={`https://www.3klik.pl/images/przepisy/${week.imageName}`}
                                              alt={week.name}
                                            ></img>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                        <div className='ml-2 flex items-center pl-3'>
                                          <span>{week.name}</span>
                                        </div>
                                      </button>
                                    ))}
                                  </Disclosure.Panel>
                                </Transition>
                              </>
                            )}
                          </Disclosure>
                          <div className='mt-3 flex flex-col p-2 sm:p-0'>
                            <p>
                              Składniki których nie znajdziesz w naszych
                              paczkach:
                            </p>
                            <p className='font-bold'>
                              Masło, olej, oliwa, mleko, jajka, sól, pieprz
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className='shadow-xl flex h-fit w-full flex-col items-center rounded-none p-0 sm:rounded-md lg:w-1/3 lg:p-3'>
                  <div className='flex max-w-fit items-center justify-between gap-0 bg-neutral-200 p-2 dark:bg-neutral-800 sm:gap-5 sm:rounded-xl sm:p-5 sm:dark:bg-neutral-700/50'>
                    <div className='flex flex-col'>
                      <div className='mx-auto mb-2 flex flex-col items-center p-3 text-center text-2xl font-bold'>
                        {email ? (
                          <span className='text-lg font-bold text-klik'>
                            Zamawiasz zalogowany
                          </span>
                        ) : (
                          <span className='text-lg font-bold text-klik'>
                            Zamawiasz jako gość
                          </span>
                        )}
                        <span className='text-lg'>Podsumowanie zamówienia</span>
                      </div>
                      <div className='flex flex-row justify-between py-2'>
                        <div>Kwota zamówienia</div>
                        <div className='subtotal px-3'> {totalAmount} zł</div>
                      </div>
                      <div className='flex flex-col gap-3 py-3'>
                        <span>
                          Adres i kwota dostawy zostaną uzupełnione w formularzu
                          płatności
                        </span>
                        <label htmlFor='kurier-info'>
                          Dodatkowe informacje dla dostawcy:
                        </label>
                        <textarea
                          rows='4'
                          placeholder='Dodatkowe informacje...'
                          className='mt-2 block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 transition ease-in-out focus:border-klik focus:ring-klik dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-200 dark:focus:border-klik dark:focus:ring-klik'
                          style={{ resize: "none" }}
                          value={deliveryInfoInput}
                          onChange={(e) => {
                            setDeliveryInfoInput(e.target.value)
                          }}
                        ></textarea>
                      </div>
                      <div className='flex flex-col items-center justify-center py-3'>
                        <Link to='/oplac-zamowienie' onClick={addDeliveryInfo}>
                          <button className='mt-3 rounded-md bg-klik py-2 px-4'>
                            Przejdź do platności
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center sm:h-auto'>
              <div className='text-2xl font-bold'> Twój koszyk jest pusty</div>
              <img
                src={emptycart}
                alt='Zdjęcie pustego koszyka'
                className='max-h-64 items-center pt-3'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
