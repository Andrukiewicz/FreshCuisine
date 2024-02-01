import Moment from "react-moment"
import { Link } from "react-router-dom"

export default function Accountinfo({ user, orders }) {
  return (
    <div className='flex h-full w-full flex-col rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800 sm:p-8'>
      <div className='flex flex-col gap-5'>
        <div className='w-full'>
          <span className='text-2xl font-bold'>Przegląd</span>
        </div>
        <div className='w-1/2'>
          {user?.fullName ? (
            <span className='font-weight-bold'>
              Cześć {user?.fullName.split(/ (.*)/)[0]} !
            </span>
          ) : (
            <span className='font-weight-bold'>Cześć {user?.email}</span>
          )}
        </div>
        <div className='w-1/2'>
          <span>Numer klienta: {user?._id}</span>
        </div>
        <div className='w-full py-3'>
          Zmień swoje dane, adres, sprawdź status Twoich zamówień.
        </div>
      </div>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
        <div className='rounded-md p-0'>
          <div className='mx-auto flex'>
            <div className='mx-auto flex w-full items-center justify-between rounded-md bg-neutral-200 p-2 dark:bg-neutral-700'>
              <span className='text-sm'>Twoje dane</span>
              <Link to='/konto/ustawienia-konta'>
                <button className='flex items-center gap-2 rounded-lg bg-klik px-2.5 py-2.5 text-xs font-medium uppercase text-white hover:bg-kliklight focus:outline-none focus:ring-4 focus:ring-klikdark sm:px-5'>
                  <i className='fas fa-pen-to-square'></i>
                  <span>Edytuj</span>
                </button>
              </Link>
            </div>
          </div>
          <div className='flex flex-col px-2 py-5 pt-0 sm:py-0 sm:pt-5'>
            <div className='grid grid-cols-1 py-3'>
              <div className='items-center font-bold'>
                <span>Imię i nazwisko</span>
              </div>
              <div className='items-center'>
                <span>{user?.fullName}</span>
              </div>
            </div>
            <div className='grid grid-cols-1 py-3 '>
              <div className='items-center font-bold'>
                <span>E-mail</span>
              </div>
              <div className='items-center'>
                <span>{user?.email}</span>
              </div>
            </div>
            <div className='grid grid-cols-1 py-3'>
              <div className='items-center font-bold'>
                <span>Nr telefonu</span>
              </div>
              <div className='items-center'>
                <span>{user?.phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='rounded-md p-0'>
          <div className='mx-auto flex'>
            <div className='mx-auto flex w-full items-center justify-between rounded-md bg-neutral-200 p-2 dark:bg-neutral-700'>
              <span className='text-sm'>Twój adres</span>
              <a href='/edytuj-adres'>
                <button className='flex items-center gap-2 rounded-lg bg-klik px-2.5 py-2.5 text-xs font-medium uppercase text-white hover:bg-kliklight focus:outline-none focus:ring-4 focus:ring-klikdark sm:px-5'>
                  <i className='fas fa-pen-to-square'></i>
                  <span>Edytuj</span>
                </button>
              </a>
            </div>
          </div>
          <div className='flex flex-col px-2 py-5 pt-0 sm:py-0 sm:pt-5'>
            <div className='grid grid-cols-1 py-3'>
              <div className='items-center font-bold'>
                <span>Ulica</span>
              </div>
              <div className='flex flex-row items-center'>
                <span>{user?.shipping[0].line1}</span>
                <span className='ml-2'>{user?.shipping[0].line2}</span>
              </div>
            </div>
            <div className='grid grid-cols-1 py-3'>
              <div className='items-center font-bold'>
                <span>Miejscowość</span>
              </div>
              <div className='items-center'>
                <span>{user?.shipping[0].city}</span>
              </div>
            </div>
            <div className='grid grid-cols-1 py-3'>
              <div className='items-center font-bold'>
                <span>Kod pocztowy</span>
              </div>
              <div className='items-center'>
                <span>{user?.shipping[0].postal_code}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-2 rounded-md p-0'>
        <div className='w-full'>
          <div className='mx-auto flex w-full items-center justify-between rounded-md bg-neutral-200 p-2 dark:bg-neutral-700'>
            <span className='text-sm'>Zamówienia</span>
            <a className='flex' href='/konto/zamowienia'>
              <button className='flex items-center gap-2 rounded-lg bg-klik px-2.5 py-2.5 text-xs font-medium uppercase text-white hover:bg-kliklight focus:outline-none focus:ring-4 focus:ring-klikdark sm:px-5'>
                <i className='fas fa-eye'></i>
                <span>wszystkie</span>
              </button>
            </a>
          </div>
        </div>
        <div className='w-full'>
          {orders ? (
            orders
              ?.slice(0, 4)
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((order, index) => {
                return (
                  <div
                    className='my-5 flex w-full rounded-md p-2 sm:p-5'
                    key={index}
                  >
                    <div className='flex w-full flex-col'>
                      <div className='flex flex-col justify-between gap-3 text-xl font-bold lg:flex-row'>
                        <div>
                          <span>Numer zamówienia {order._id}</span>
                        </div>
                        <div className='flex flex-row gap-2'>
                          <span>Status</span>
                          <span>
                            {order.paid ? (
                              <>
                                {order.isSent ? (
                                  <span className='items-center rounded-md font-bold text-lime-600'>
                                    <i className='bi bi-truck'></i> Wysłane
                                  </span>
                                ) : (
                                  <span className='items-center rounded-md font-bold text-klikgreen'>
                                    <i className='bi bi-box-seam'></i> Opłacone
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className='items-center rounded-md font-bold text-red-700'>
                                <i className='bi bi-box-seam'></i> Nieopłacone
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      <hr className='my-2 border-neutral-200 dark:border-neutral-700 sm:mx-auto lg:my-2' />
                      <div className='mt-0 flex flex-col justify-between gap-3 sm:mt-5 lg:flex-row'>
                        <div className='flex-col'>
                          <div className='font-bold'>
                            <span>Data zamówienia</span>
                          </div>
                          <div>
                            <span>
                              <Moment
                                locale='pl'
                                interval={0}
                                format='dd, DD.MM.YYYY'
                                date={order.createdAt}
                              ></Moment>
                            </span>
                          </div>
                        </div>
                        <div className='flex flex-row'>
                          {order.isSent ? (
                            <div className='flex-col'>
                              <div className='font-bold'>
                                <span>Data dostawy</span>
                              </div>
                              <span>
                                <Moment
                                  locale='pl'
                                  interval={0}
                                  format='dd, DD.MM.YYYY'
                                  date={order.sentDate}
                                ></Moment>
                              </span>
                            </div>
                          ) : (
                            <div className='flex flex-row'>
                              <div className='flex flex-col'>
                                <span className='font-bold'>
                                  Planowany czas dostawy
                                </span>
                                <div className='flex flex-row justify-between gap-3'>
                                  <span>
                                    <Moment
                                      locale='pl'
                                      interval={0}
                                      format='dd, DD.MM.YYYY'
                                      date={order.deliveryDay}
                                    ></Moment>
                                  </span>
                                  <span>
                                    {order.deliveryTime.replaceAll("0", "")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className='flex flex-col'>
                          <span className='font-bold'>Kwota zamówienia</span>
                          <span>{order.orderAmount}zł</span>
                        </div>
                      </div>
                      <hr className='my-2 border-neutral-200 dark:border-neutral-700 sm:mx-auto lg:my-2' />
                      <div className='flex flex-row justify-between'>
                        <div>
                          <h3 className='text-lg font-bold sm:text-xl'>
                            Produkty
                          </h3>
                          {order.orderItems?.map((item, index) => (
                            <div
                              className='mt-2 flex h-12 w-full flex-row items-center gap-2 rounded-md py-3'
                              key={index}
                            >
                              <img
                                key={index}
                                alt='Zestaw karton paczka'
                                className='h-12 w-12'
                                src={require(`../../../images/box/${item.images}`)}
                              ></img>
                              <span>{item.name}</span>
                              <span className='font-weight-bold'>
                                x{item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
          ) : (
            <div className='my-5 flex w-full rounded-md bg-neutral-300 p-5 dark:bg-neutral-800'>
              <div className='flex items-center justify-center text-center'>
                <span className='text-2xl font-bold'>Brak zamówień</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
