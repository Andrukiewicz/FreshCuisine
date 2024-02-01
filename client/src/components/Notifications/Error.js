import React from "react"

export default function Error({ error, errRef }) {
  return (
    <div
      className='absolute left-0 right-0 mx-auto flex w-fit items-center justify-center text-center'
      ref={errRef}
    >
      <div
        className='w-full rounded-md bg-red-900 p-3 text-sm font-bold text-neutral-200'
        role='alert'
      >
        {error}
      </div>
    </div>
  )
}
