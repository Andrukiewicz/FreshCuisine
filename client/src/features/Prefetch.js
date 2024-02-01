import React, { useEffect } from "react"
import { store } from "../store.js"
import { ordersApiSlice } from "./ordersApiSlice"
import { usersApiSlice } from "./usersApiSlice"
import { przepisyApiSlice } from "./przepisyApiSlice"
import { kontrahenciApiSlice } from "./kontrahenciApiSlice.js"
import { productsApiSlice } from "./productsApiSlice"
import { skladnikiApiSlice } from "./skladnikiApiSlice"
import { producenciApiSlice } from "./producenciApiSlice.js"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing")
    const users = store.dispatch(usersApiSlice.endpoints.getAllUsers.initiate())
    const orders = store.dispatch(
      ordersApiSlice.endpoints.getAllOrders.initiate()
    )
    const przepisy = store.dispatch(
      przepisyApiSlice.endpoints.getAllPrzepisy.initiate()
    )
    const kontrahenci = store.dispatch(
      kontrahenciApiSlice.endpoints.getAllKontrahenci.initiate()
    )
    const products = store.dispatch(
      productsApiSlice.endpoints.getAllProducts.initiate()
    )
    const skladniki = store.dispatch(
      skladnikiApiSlice.endpoints.getAllSkladniki.initiate()
    )
    const producenci = store.dispatch(
      producenciApiSlice.endpoints.getAllProducenci.initiate()
    )

    return () => {
      console.log("unsubscribing")
      users.unsubscribe()
      orders.unsubscribe()
      przepisy.unsubscribe()
      kontrahenci.unsubscribe()
      products.unsubscribe()
      skladniki.unsubscribe()
      producenci.unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default Prefetch
