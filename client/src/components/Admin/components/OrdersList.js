import { useState } from "react"
import { useSelector } from "react-redux"
import Moment from "react-moment"
import axios from "axios"

import {
  selectOrderById,
  useDeliverOrderMutation,
} from "../../../features/ordersApiSlice"

import Error from "../../Notifications/Error"
import Success from "../../Notifications/Success"
import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

const OrdersList = ({ orderId }) => {
  usePageTitleAdmin("Zamówienia")
  const [DPDResponse, setDPDResponse] = useState("")
  const order = useSelector((state) => selectOrderById(state, orderId))
  const [deliverOrder, { isSuccess, isError, error, data }] =
    useDeliverOrderMutation()

  const orderDelivery = async () => {
    const orderid = {
      _id: order.id,
    }
    await deliverOrder({ orderid })
  }

  const dpdLabel = async () => {
    const confirm = window.confirm("Utworzyć list przewozowy?")
    if (confirm) {
      try {
        const address =
          order.shippingAddress.line1 +
          (order.shippingAddress.line2 ? " " + order.shippingAddress.line2 : "")
        const res = await axios
          .post("/api/orders/dpdlabel", {
            name: order.name,
            customerData1: order.deliveryInfo,
            // customerData1: "test",
            email: order.email,
            address,
            city: order.shippingAddress.city,
            postal_code: order.shippingAddress.postal_code,
            phone: order.phoneNumber,
          })
          .then((response) => response.blob())
          .then((blob) => {
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = order.name + ".pdf"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          })
        setDPDResponse(res.data.message + " " + res.data.body)
        // console.log(res.data.message)
      } catch (err) {
        setDPDResponse(err.response.data.error)
        // console.log(err.response.data.error)
      }
    }
  }

  const faktura = async () => {
    const confirm = window.confirm("Utworzyć fakturę?")
    if (confirm) {
      try {
        const res = await axios.post("/api/orders/fakturownia", {
          orderId: order._id,
          deliveryFee: order.deliveryFee,
        })
        setDPDResponse(res.data.message)
        // console.log(res.data.message)
      } catch (err) {
        setDPDResponse(err.response.data.error)
        // console.log(err.response.data.error)
      }
    }
  }

  if (order) {
    return (
      <div className='mb-2 flex flex-col gap-3 rounded-xl bg-neutral-200 p-8 text-sm dark:bg-neutral-800 sm:text-base lg:flex-row'>
        <div className='flex w-full flex-col gap-3 lg:w-1/2'>
          <div className='flex flex-col'>
            <span className='font-bold'>Data zamówienia</span>
            <span className='font-bold text-klik'>
              {order.createdAt.substring(0, 10)}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>Przewidywana data dostarczenia</span>
            <div className='flex flex-row gap-3'>
              <Moment
                interval={0}
                className='font-bold text-klik'
                format='D-MM-YYYY'
                date={order.deliveryDay}
              ></Moment>
              <span className='font-bold text-klik'>
                {order.deliveryTime.replaceAll("0", "")}
              </span>
            </div>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>Numer zamówienia</span>
            <span className='font-bold text-klik'>{order._id}</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>ID użytkownika</span>
            <span className='font-bold text-klik'>{order.userid}</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>E-mail</span>
            <span className='font-bold text-klik'>{order.email}</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>Adres dostawy:</span>
            <div className='flex-row'>
              <span className='pr-2'>{order.shippingAddress?.line1}</span>
              <span>{order.shippingAddress?.line2}</span>
            </div>
            <div className='flex-row'>
              <span className='pr-2'>{order.shippingAddress?.postal_code}</span>
              <span>{order.shippingAddress?.city}</span>
            </div>
          </div>
          <hr></hr>
          <div className='flex flex-col'>
            <span className='font-bold'>Kwota zamówienia:</span>
            <span className='font-bold text-klik'>{order.orderAmount}zł</span>
          </div>
          <div className='flex flex-col rounded-lg bg-neutral-200 p-5 dark:bg-neutral-900'>
            <span className='font-bold'>Zestawy:</span>
            {order.orderItems.map((item, index) => (
              <div key={index}>
                <span>{item.name}</span>
                <span className='font-weight-bold ml-2'>x {item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='flex w-full flex-col gap-3 lg:w-1/2'>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-row gap-3'>
              {order.isSent ? (
                <div className='flex'>
                  <span className='pr-1'>Wysłana</span>
                  <Moment
                    interval={0}
                    className='font-bold text-klik'
                    format='D-MM-YYYY'
                    date={order.sentDate}
                  ></Moment>
                </div>
              ) : (
                <button
                  className='flex items-center justify-center rounded-lg border border-transparent bg-klik px-2 py-2 text-sm text-white transition-transform hover:scale-105 hover:bg-kliklight'
                  onClick={() => {
                    // dispatch(orderDelivery(order));
                    orderDelivery()
                  }}
                >
                  Powiadom klienta o wysyłce
                </button>
              )}
              <button
                className='flex items-center justify-center rounded-lg border border-transparent bg-klik px-2 py-2 text-sm text-white transition-transform hover:scale-105 hover:bg-kliklight'
                onClick={() => {
                  // dispatch(orderDelivery(order));
                  dpdLabel()
                }}
              >
                Utwórz list przewozowy
              </button>
              <button
                className='flex items-center justify-center rounded-lg border border-transparent bg-klik px-2 py-2 text-sm text-white transition-transform hover:scale-105 hover:bg-kliklight'
                onClick={() => {
                  // dispatch(orderDelivery(order));
                  faktura()
                }}
              >
                Utwórz fakturę
              </button>
            </div>
            <div className='flex flex-col items-center gap-3 rounded-xl bg-neutral-200 p-5 dark:bg-neutral-900'>
              Api odpowiedź
              <div className='flex w-full flex-col gap-3 lg:flex-row'>
                <textarea
                  className='h-32 w-full rounded-md border bg-neutral-200 dark:bg-neutral-800'
                  value={DPDResponse}
                  readOnly
                ></textarea>
              </div>
            </div>
            {isSuccess ? <Success success={data?.message} /> : ""}
            {isError ? <Error error={error?.data} /> : ""}
          </div>
          {isSuccess ? <Success success={data?.message} /> : ""}
          {isError ? <Error error={error?.data} /> : ""}
        </div>
      </div>
    )
  } else return null
}

export default OrdersList
