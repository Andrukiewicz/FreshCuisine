import React from "react"
import { Link } from "react-router-dom"

export function NotFoundPage() {
  const content = (
    <div className='flex min-h-full items-center justify-center px-4 py-6 sm:px-0 lg:px-8'>
      <div className='shadow-lg w-full max-w-md rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800 dark:shadow-black/50'>
        <div class='flex flex-col items-center justify-center gap-8 px-4 py-8 md:py-8 md:px-4 lg:flex-col'>
          {/* <div>
                <img src='https://i.ibb.co/G9DC8S0/404-2.png' />
              </div> */}
          <div className='max-w-sm'>
            <img src='https://i.ibb.co/ck1SGFJ/Group.png' />
          </div>
          <div class='flex flex-col items-center gap-3 text-center'>
            <h1 class='my-2 text-2xl font-bold'>
              Wygląda na to, że znalazłeś się tu przez przypadek
            </h1>
            <p class='my-2'>
              Przepraszam, nie znajdziesz tu pysznego jedzonka! Przejdź na
              stronę główną.
            </p>
            <Link to='/'>
              <button class='shadow-sm ml-2 inline-flex items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-klik px-4 py-2 text-lg font-medium text-white hover:bg-kliklight'>
                Wróć!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
  return content
}

export default NotFoundPage
