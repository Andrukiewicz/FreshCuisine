import OrdersComponent from "./components/OrdersComponent"
import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"

import useAuth from "../../hooks/useAuth"
import { useGetUserOrderQuery } from "../../features/userOrderApiSlice"

export default function Orders() {
  const { email } = useAuth()

  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserOrderQuery(email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const tableContent = orders ? (
      <OrdersComponent key={orders._id} orders={orders} />
    ) : null

    content = <>{tableContent}</>
  }
  return content
}
