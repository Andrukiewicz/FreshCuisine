import Editaccount from "./components/Editaccount"
import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"

import useAuth from "../../hooks/useAuth"
import { useGetOneUserQuery } from "../../features/userApiSlice"

export default function EditAccount() {
  const { id } = useAuth()

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
  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const tableContent = user ? <Editaccount key={user} user={user} /> : null

    content = <>{tableContent}</>
  }
  return content
}
