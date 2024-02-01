import React from "react"
import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"

import { useGetAllUsersQuery } from "../../features/usersApiSlice"
import MailingList from "./components/MailingList"

export default function Userslist() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllUsersQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const { ids } = users

    const tableContent = ids?.length
      ? ids.map((userId) => <MailingList key={userId} userId={userId} />)
      : null

    content = (
      <div className='flex-column withSidebar'>
        <div className='pt-3 pb-3'>
          <h3>Maile (prawdopodobnie won - freshmail)</h3>
        </div>
        <table className='table-striped table-bordered table'>
          <thead>
            <tr>
              <th>E-mail</th>
              <th>Imię i nazwisko</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    )
  }
  return content
}
