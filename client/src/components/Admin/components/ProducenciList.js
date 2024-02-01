import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectProducenciById } from "../../../features/producenciApiSlice"

import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

const ProducenciList = ({ producenciId }) => {
  usePageTitleAdmin("Producenci")
  const producenci = useSelector((state) =>
    selectProducenciById(state, producenciId)
  )

  if (producenci) {
    return (
      <tr className='text-sm even:bg-neutral-300 dark:even:bg-neutral-800 sm:text-base'>
        <td className='border border-neutral-600 p-1 sm:w-auto sm:p-3'>
          {producenci.name}
          {/* {skladniki.week.map((week, subindex) => (
                      <p key={subindex}>{week.name}</p>
                    ))} */}
        </td>
        <td className='border border-neutral-600 p-1 text-center sm:w-auto sm:p-3'>
          <Link to={`/admin/editproducenci/${producenci._id}`}>
            <i className='fa fa-edit m-1 text-lg'></i>
          </Link>
          {/* <i className='fa fa-trash m-1'></i> */}
        </td>
      </tr>
    )
  } else return null
}

export default ProducenciList
