import { useSelector } from "react-redux"
import { selectKontrahenciById } from "../../../features/kontrahenciApiSlice"

import React from "react"
import { Link } from "react-router-dom"
import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

const KontrahenciList = ({ kontrahenciId }) => {
  usePageTitleAdmin("Dostawcy")

  const kontrahenci = useSelector((state) =>
    selectKontrahenciById(state, kontrahenciId)
  )

  if (kontrahenci) {
    return (
      <tr className='admin-table'>
        <td>
          {kontrahenci.shortName}
          {/* {skladniki.week.map((week, subindex) => (
                      <p key={subindex}>{week.name}</p>
                    ))} */}
        </td>
        <td key={kontrahenci.nip}>{kontrahenci.nip}</td>
        <td key={kontrahenci.phoneNumber}>
          <a href={"tel:" + kontrahenci.phoneNumber}>
            {kontrahenci.phoneNumber}
          </a>
        </td>
        <td key={kontrahenci.email}>{kontrahenci.email}</td>
        <td>
          <Link to={`/admin/editkontrahenci/${kontrahenci._id}`}>
            <i className='fa fa-edit m-1'></i>
          </Link>
          <i className='fa fa-trash m-1'></i>
        </td>
      </tr>
    )
  } else return null
}

export default KontrahenciList
