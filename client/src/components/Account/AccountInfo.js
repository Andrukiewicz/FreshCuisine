import Accountinfo from "./components/Accountinfo"
import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"

import useAuth from "../../hooks/useAuth"
import { useGetOneUserQuery } from "../../features/userApiSlice"
import { useGetUserOrderQuery } from "../../features/userOrderApiSlice"

export default function AccountInfo() {
  const { id, email } = useAuth()

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOneUserQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })
  const { data: orders } = useGetUserOrderQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const tableContent = user ? (
      <Accountinfo key={user} orders={orders} user={user} />
    ) : null

    content = <>{tableContent}</>
  }
  return content
}
