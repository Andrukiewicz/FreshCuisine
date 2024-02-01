import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectSkladnikiById } from "../../../features/skladnikiApiSlice"

import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

const SkladnikiList = ({ skladnikiId, index }) => {
  usePageTitleAdmin("Składniki")
  const skladniki = useSelector((state) =>
    selectSkladnikiById(state, skladnikiId)
  )
  if (skladniki) {
    return (
      <tr
        key={index}
        className='text-sm even:bg-neutral-300 dark:even:bg-neutral-800 sm:text-base'
      >
        <td className='w-1/6 border border-neutral-600 p-1 sm:w-auto sm:p-3'>
          {skladniki?.cena}
          {/* {skladniki.week.map((week, subindex) => (
                      <p key={subindex}>{week.name}</p>
                    ))} */}
        </td>
        <td className='hidden border border-neutral-600 p-1 sm:p-3 md:table-cell'>
          {skladniki?.tax}
        </td>
        <td className='w-1/3 border border-neutral-600 p-1 sm:w-auto sm:p-3'>
          {skladniki?.name}
          {/* {skladniki.week.map((week, subindex) => (
                      <p key={subindex}>{week.name}</p>
                    ))} */}
        </td>
        <td className='hidden border border-neutral-600 p-1 sm:table-cell sm:w-auto sm:p-3'>
          {skladniki?.kontrahent}
        </td>
        <td className='w-1/6 border border-neutral-600 p-1 sm:w-auto sm:p-3'>
          {skladniki?.producent}
        </td>
        <td className='hidden border border-neutral-600 p-1 sm:p-3 md:table-cell'>
          {skladniki?.category}
        </td>
        <td className='w-1/6 border border-neutral-600 p-1 text-center sm:w-auto sm:p-3'>
          <Link to={`/admin/editskladniki/${skladniki._id}`}>
            <i className='fa fa-edit m-1'></i>
          </Link>
          {/* <i className='fa fa-trash m-1'></i> */}
        </td>
      </tr>
    )
  }
}

export default SkladnikiList
