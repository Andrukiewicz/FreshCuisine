import React from "react"

export default function Success({ success }) {
  return (
    <div className='absolute left-0 right-0 mx-auto flex w-fit items-center justify-center text-center'>
      <div
        className='w-full rounded-md bg-klikgreen p-3 text-sm font-bold text-neutral-200'
        role='alert'
      >
        {success}
      </div>
    </div>
  )
}
