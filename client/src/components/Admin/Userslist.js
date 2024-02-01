import React, { useState, useEffect } from "react"
import Loading from "../Notifications/Loading"
import Error from "../Notifications/Error"

import { useGetAllUsersQuery } from "../../features/usersApiSlice"
import UsersList from "./components/UsersList"

import DOMPurify from "dompurify"

const Preview = ({ template }) => {
  const sanitizedHTML = DOMPurify.sanitize(template)

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
}

const Editor = ({ template, onChange }) => (
  <textarea value={template} onChange={onChange} />
)

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

  const [filter, setFilter] = useState("")

  let content

  if (isLoading) content = <Loading />

  if (isError) {
    content = <Error error={error?.data?.message} />
  }

  if (isSuccess) {
    const { ids, entities } = users

    let filteredIds
    filteredIds = ids.filter((userId) =>
      entities[userId].email.toLowerCase().includes(filter.toLowerCase())
    )

    const tableContent = ids?.length
      ? filteredIds.map((userId) => <UsersList key={userId} userId={userId} />)
      : null

    content = (
      <div className='flex w-full flex-col items-center gap-5'>
        <h3 className='text-2xl font-bold'>Lista użytkowników</h3>
        <div className='flex flex-row items-center'>
          <input
            type='text'
            placeholder='Email...'
            className='w-full appearance-none rounded-l-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-base'
            onChange={(e) => setFilter(e.target.value)}
          ></input>
        </div>
        <table className='w-full max-w-6xl table-auto border-collapse border-neutral-800'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Miasto</th>
              <th>Numer</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    )
  }
  return content
}
