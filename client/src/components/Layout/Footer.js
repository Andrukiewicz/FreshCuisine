import React from "react"
import { useLocation } from "react-router-dom"

import logo from "../../images/logo128.webp"

export default function Footer() {
  const { pathname } = useLocation()

  if (
    pathname.includes("/admin") ||
    pathname.includes("/logowanie") ||
    pathname.includes("/rejestracja")
  )
    return null
  // if (pathname.includes("/")) return null;
  return (
    <footer className='mx-auto bg-neutral-100 px-4 py-8 pb-[54px] dark:bg-neutral-800 sm:py-16 sm:px-6 sm:pb-0 lg:px-8'>
      <div className='relative mx-auto flex max-w-7xl items-center justify-between px-0 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 text-center sm:grid-cols-4 sm:text-left'>
          <div className='px-2 py-6 sm:px-8 sm:py-8'>
            <h3 className='mb-3 font-bold uppercase text-klik drop-shadow-md'>
              Informacje
            </h3>
            <ul className='flex flex-col gap-2 text-sm'>
              <li>
                <a href='/regulamin'>Regulamin</a>
                {/* <a href='#'>Regulamin</a> */}
              </li>
              <li>
                {/* <a href='/polityka-prywatnosci'>Polityka prywatności</a> */}
                <a href='/polityka-prywatnosci'>Polityka prywatności</a>
              </li>
              <li>
                {/* <a href='/polityka-prywatnosci'>Ciasteczka</a> */}
                <a href='/polityka-prywatnosci#cookies'>Ciasteczka</a>
              </li>
              <li>
                {/* <a href='/faq#platnosc'>Płatności</a> */}
                <a href='/regulamin#faq-6'>Płatności</a>
              </li>
            </ul>
          </div>
          <div className='px-2 py-6 sm:px-8 sm:py-8'>
            <h3 className='mb-3 font-bold uppercase text-klik drop-shadow-md'>
              Jak działamy
            </h3>
            <ul className='flex flex-col gap-2 text-sm'>
              <li>
                <a href='/o-nas'>O nas</a>
              </li>
              {/* <li> */}
              {/* <a href='/faq#dostawa'>Dostawy</a> */}
              {/* <a href='/faq'>Dostawy</a> */}
              {/* </li> */}
              <li>
                {/* <a href='/faq'>Pytania i odpowiedzi FAQ</a> */}
                <a href='/faq'>Najczęściej zadawane pytania</a>
              </li>
              <li>
                <p className='text-neutral-200 dark:text-neutral-400'>
                  Nasi producenci (Wkrótce!)
                </p>
              </li>
            </ul>
          </div>
          <div className='px-2 py-6 sm:px-8 sm:py-8'>
            <h3 className='mb-3 font-bold uppercase text-klik drop-shadow-md'>
              Newsletter
            </h3>
            <div className='flex flex-col gap-2 text-sm'>
              <p className='text-sm'>
                Zapisz się do Newsletter'a aby otrzymywać informacje o zdrowym
                żywieniu i rabatach!
              </p>
              <p className='text-sm'>Nie wysyłamy spamu! Obiecujemy!</p>
            </div>
            <form className='py-6 sm:py-8' action='#'>
              <div className='mt-2 flex flex-row'>
                <input
                  className='block w-full rounded-l-lg border  border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 transition ease-in-out focus:border-klik focus:ring-klik dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-200 dark:focus:border-klik dark:focus:ring-klik'
                  type='text'
                  placeholder='Adres e-mail'
                  aria-label='Adres e-mail'
                  disabled
                  aria-describedby='button-addon2'
                />
                <button
                  aria-label='Zapisz do newslettera'
                  name='Zapisz się do newslettera!'
                  type='button'
                  disabled
                  className='mx-auto flex items-center justify-center rounded-r-lg border border-transparent bg-klik px-8 text-white transition-transform hover:scale-105 hover:bg-kliklight md:px-2'
                >
                  <i className='fas fa-paper-plane'></i>
                </button>
              </div>
            </form>
          </div>
          <div className='px-2 py-2 sm:px-8 sm:py-8'>
            <h3 className='mb-3 font-bold uppercase text-klik drop-shadow-md'>
              Kontakt
            </h3>
            <div className='flex flex-col items-center sm:items-start'>
              <a
                href='tel:796445923'
                className='flex w-fit flex-row items-center gap-2 hover:underline'
              >
                <span className='h-5 w-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-full w-full'
                  >
                    <path
                      fillRule='evenodd'
                      d='M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>

                <span className='text-2xl'>796 445 923</span>
              </a>
              <div className='ml-7 mt-2 flex flex-row gap-2 sm:items-start'>
                <div className='flex flex-col items-start gap-1 text-xs'>
                  <span>pon. - pt.</span>
                  <span>sob. - niedz.</span>
                </div>
                <div className='flex flex-col items-end gap-1 text-xs'>
                  <span>8:00 - 21:00</span>
                  <span>8:00 - 19:00</span>
                </div>
              </div>
              <a
                href='mailto:kontakt@3klik.pl'
                className='mt-5 flex w-fit flex-row items-center gap-2 hover:underline'
              >
                <span className='flex h-5 w-5 items-center'>
                  <i className='fas fa-envelope' />
                </span>
                <span>kontakt@3klik.pl</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className='my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8' />
      <div className='flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between'>
        <a href='https://3klik.pl' className='mb-4 flex items-center sm:mb-0'>
          <img src={logo} className='mr-3 h-8 w-8' alt='3klik Logo' />
          <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
            3klik
          </span>
        </a>
        <div className='flex w-full flex-row justify-between sm:w-auto'>
          <ul className='flex w-full flex-row items-center justify-between gap-5'>
            <li>
              <a className='my-2 flex' href='https://www.facebook.com/3klikpl'>
                <button
                  name='facebook'
                  aria-label='Link do facebooka'
                  className='mx-auto flex h-8 w-8 items-center justify-center rounded-md border border-transparent bg-[#4267B2] p-2 text-base font-medium text-white transition-transform hover:scale-105 md:text-lg'
                >
                  <i className='fab fa-facebook-f'></i>
                </button>
              </a>
            </li>
            <li>
              <a
                className='my-2 flex'
                href='https://www.instagram.com/3klikpl/'
              >
                <button
                  name='instagram'
                  aria-label='Link do instagrama'
                  className='instagram mx-auto flex h-8 w-8 items-center justify-center rounded-md border border-transparent p-2 text-base font-medium text-white transition-transform hover:scale-105 md:text-lg'
                >
                  <i className='fab fa-instagram'></i>
                </button>
              </a>
            </li>
            <li>
              <a className='my-2 flex' href='https://www.youtube.com/@3klikpl/'>
                <button
                  name='youtube'
                  aria-label='Link do youtube'
                  className='mx-auto flex h-8 w-8 items-center justify-center rounded-md border border-transparent bg-[#FF0000] p-2 text-base font-medium text-white transition-transform hover:scale-105 md:text-lg'
                >
                  <i className='fa-brands fa-youtube'></i>
                </button>
              </a>
            </li>
            <li>
              <a className='my-2 flex' href='https://www.tiktok.com/@3klik.pl/'>
                <button
                  name='tik-tok'
                  aria-label='Link do tik toka'
                  className='mx-auto flex h-8 w-8 items-center justify-center rounded-md border border-transparent bg-neutral-700 p-2 text-base font-medium text-white transition-transform hover:scale-105 md:text-lg'
                >
                  <i className='fa-brands fa-tiktok'></i>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className='my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8' />
      <span className='flex items-center justify-center gap-1 pb-6 text-sm text-gray-500 dark:text-gray-400 sm:text-center'>
        {/* © */}
        {new Date().getFullYear()}
        {" - "}
        <a href='https://3klik.pl/' className='hover:underline'>
          3klik
        </a>
        {/* ™. Wszelkie prawa zastrzeżone. */}
      </span>
    </footer>
  )
}
