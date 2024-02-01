import React, { useEffect } from "react"
import { store } from "../store.js"
import { userApiSlice } from "./userApiSlice"
import { Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth.js"
import { userOrderApiSlice } from "./userOrderApiSlice.js"

const PrefetchUser = () => {
  const { id, email } = useAuth()
  useEffect(() => {
    console.log("fetching user data")
    const users = store.dispatch(userApiSlice.endpoints.getOneUser.initiate(id))
    const userOrders = store.dispatch(
      userOrderApiSlice.endpoints.getUserOrder.initiate(email)
    )

    return () => {
      console.log("unsubscribing")
      users.unsubscribe()
      userOrders.unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default PrefetchUser
