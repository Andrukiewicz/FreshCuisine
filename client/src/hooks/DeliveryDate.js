import React, { useEffect, useState } from "react"
import moment from "moment"
import "moment/locale/pl"

const DeliveryDate = () => {
  const [deliveryDate, setDeliveryDate] = useState("")

  useEffect(() => {
    let d = new Date()
    let day = d.getDay()

    if (day === 0) {
      d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 3) % 7))
      moment.locale("pl")
      const date = moment(d).format("D MMMM (dddd)")
      setDeliveryDate(date)
    } else {
      if (day === 1) {
        d.setDate(d.getDate() + (((7 - d.getDay()) % 7) + 3))
        moment.locale("pl")
        const date = moment(d).format("D MMMM (dddd)")
        setDeliveryDate(date)
      } else {
        d.setDate(d.getDate() + (((7 - d.getDay()) % 7) + 3))
        moment.locale("pl")
        const date = moment(d).format("D MMMM (dddd)")
        setDeliveryDate(date)
      }
    }
  }, [])
  return (
    <div className='text-md flex flex-col items-center justify-center text-center font-bold leading-8 tracking-tight text-neutral-900 dark:text-klik sm:text-xl'>
      <span>Zamówienia przyjmujemy do niedzieli godz. 24:00</span>
      <span>Następna dostawa {deliveryDate}</span>
    </div>
  )
}

export default DeliveryDate
