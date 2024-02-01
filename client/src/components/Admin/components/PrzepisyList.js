import React from "react"
import { useSelector } from "react-redux"
import { selectPrzepisyById } from "../../../features/przepisyApiSlice"

import { Link } from "react-router-dom"

import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

const PrzepisyList = ({ przepisyId, index }) => {
  usePageTitleAdmin("Przepisy")
  const przepisy = useSelector((state) => selectPrzepisyById(state, przepisyId))

  if (przepisy) {
    return (
      <tr
        key={index}
        className='text-sm even:bg-neutral-300 dark:even:bg-neutral-800 sm:text-base'
      >
        <td className='hidden border border-neutral-600 p-1 sm:table-cell sm:w-auto sm:p-3'>
          {index + 1}
        </td>
        <td className='border border-neutral-600 p-1 sm:w-auto sm:p-3'>
          {przepisy.name}
        </td>
        <td
          className={`
            ${przepisy.zdjecia ? "text-green-400" : "text-red-400"}
                hidden border border-neutral-600  p-1 sm:table-cell sm:w-auto sm:p-3
          `}
        >
          {przepisy.zdjecia ? "tak" : "nie"}
        </td>
        <td
          className={`${
            przepisy.karty ? "text-green-400" : "text-red-400"
          } hidden border border-neutral-600  p-1 sm:table-cell sm:w-auto sm:p-3`}
        >
          {przepisy.karty ? "tak" : "nie"}
        </td>
        <td className='hidden border border-neutral-600 p-1 sm:table-cell sm:w-auto sm:p-3'>
          {przepisy.category}
        </td>
        <td
          className={`${
            przepisy.totalprzepis < 35 ? "text-green-400" : "text-red-400"
          } border border-neutral-600 p-1 sm:w-auto sm:p-3`}
        >
          {przepisy.totalprzepis.toFixed(2)}
        </td>
        <td className='border border-neutral-600 p-1 text-center sm:w-auto sm:p-3'>
          <Link to={`/admin/editprzepisy/${przepisy._id}`}>
            <i className='fa fa-edit m-1'></i>
          </Link>
          {/* <i className='fa fa-trash m-1'></i> */}
        </td>
      </tr>
    )
  } else return null
}

export default PrzepisyList
