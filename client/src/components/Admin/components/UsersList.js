import React from "react"
import { useSelector } from "react-redux"
import { selectUserById } from "../../../features/usersApiSlice"

import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

const UsersList = ({ userId }) => {
  usePageTitleAdmin("Użytkownicy")
  const user = useSelector((state) => selectUserById(state, userId))

  if (user) {
    // const userRolesString = user.roles.toString().replaceAll(",", ", ")
    // <td>{userRolesString}</td>
    return (
      <tr className='bg-neutral-200 text-sm even:bg-neutral-300 dark:bg-neutral-900 dark:even:bg-neutral-800 sm:text-base'>
        <td className='border border-neutral-600 p-1 sm:p-3'>{user._id}</td>
        <td className='border border-neutral-600 p-1 sm:p-3'>{user.email}</td>
        <td className='border border-neutral-600 p-1 sm:p-3'>
          {user.shipping?.map((x, y) => (
            <option key={y} value={x.city}>
              {x.city}
            </option>
          ))}
        </td>
        <td className='border border-neutral-600 p-1 sm:p-3'>
          {user.phoneNumber}
        </td>
      </tr>
    )
  } else return null
}

export default UsersList
