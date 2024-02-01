import { useEffect } from "react"

export default function ImageModal({ week, onClose }) {
  // Add this to disable scrolling on the website while the modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div
      className='fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-neutral-100/30 bg-opacity-75 backdrop-blur-sm dark:bg-neutral-900/30'
      onClick={onClose}
    >
      <div className='shadow-xl max-w-3xl overflow-hidden rounded-lg bg-neutral-100/95 backdrop-blur-sm dark:bg-neutral-900/95'>
        <div className='relative flex flex-col items-center p-16'>
          <button
            className='absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-400'
            onClick={onClose}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
          <p className='mb-4 text-xl font-semibold'>{week.name}</p>
          <img
            className='max-w-sm object-contain'
            src={`https://www.3klik.pl/images/przepisy/${week.imageName}`}
            alt={week.name}
          />
        </div>
      </div>
    </div>
  )
}
