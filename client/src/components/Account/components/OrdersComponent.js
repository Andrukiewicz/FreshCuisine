import Moment from "react-moment"
import { Link } from "react-router-dom"

export default function OrdersComponent({ orders }) {
  return (
    <div className='flex h-full w-full flex-col rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800 sm:p-8'>
      <div className='w-full'>
        <span className='text-2xl font-bold'>Zamówienia</span>
      </div>
      <div className='mt-2 rounded-md p-0'>
        <div className='w-full'>
          {orders ? (
            orders?.map((order, index) => {
              return (
                <div
                  className='my-5 flex w-full rounded-md bg-neutral-200 p-2 dark:bg-neutral-900 sm:p-5'
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
                    <div className='mt-5 flex flex-col justify-between gap-3 lg:flex-row'>
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
