import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectProductById } from "../../../features/productsApiSlice"

import { Link } from "react-router-dom"

import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

const ProductsList = ({ productId }) => {
  usePageTitleAdmin("Zestawy")
  const product = useSelector((state) => selectProductById(state, productId))

  if (product) {
    return (
      <tr className='bg-neutral-200 text-sm even:bg-neutral-300 dark:bg-neutral-900 dark:even:bg-neutral-800 sm:text-base'>
        <td className='border border-neutral-600 p-1 sm:p-3'>{product.name}</td>
        <td className='border border-neutral-600 p-1 sm:p-3'>
          {product.price}
        </td>
        <td className='hidden border border-neutral-600 p-1 sm:p-3 md:table-cell'>
          {product.category}
        </td>
        <td className='w-auto border border-neutral-600 p-1 sm:p-3'>
          <Link to={`/admin/editproduct/${product._id}`}>
            <i className='fa fa-edit m-1'></i>
          </Link>
          {/* <i className='fa fa-trash m-1'></i> */}
        </td>
      </tr>
    )
  } else return null
}

export default ProductsList
