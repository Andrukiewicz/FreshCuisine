import React from "react"
import { useSelector } from "react-redux"
import { selectUserById } from "../../../features/usersApiSlice"

import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

const MailingList = ({ userId }) => {
  usePageTitleAdmin("Mailing")
  const user = useSelector((state) => selectUserById(state, userId))

  if (user) {
    return (
      <tr className='admin-table'>
        <td>{user.email}</td>
        <td>{user.fullName}</td>
      </tr>
    )
  } else return null
}

export default MailingList
