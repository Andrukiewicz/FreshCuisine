import React from "react"
export default function UserReviews() {
  return (
    <div className='mx-auto w-full max-w-7xl flex-row flex-wrap items-center justify-between py-4 px-4 sm:py-8 sm:px-6 lg:px-0'>
      <div className='my-3 flex w-full flex-col items-center justify-center'>
        <h3 className='text-shadow mb-4 text-center text-3xl font-bold text-klik sm:text-4xl'>
          Nasi klienci mówią jak jest
        </h3>
      </div>
      <h2 className='sr-only'>Opinie klientów</h2>
      <div className='flex flex-col md:flex-row'>
        <div className='flex w-full justify-center md:w-1/2'>
          <div className='h-84 relative m-0 flex w-full flex-col justify-between rounded-md bg-neutral-100 bg-gradient-to-b from-neutral-100 to-neutral-200 px-4 py-16 text-center shadow-highlight dark:bg-gradient-to-b dark:from-neutral-900 dark:to-neutral-800 sm:m-8 sm:px-8'>
            <i className='fa fa-quote-left absolute left-4 top-4 text-4xl text-klik drop-shadow-2xl'></i>
            <blockquote className='mx-auto flex flex-col items-center text-center'>
              <p className='flex leading-6'>
                Jestem bardzo zadowolony z usług 3klik. Od kiedy dostarczają mi
                produkty wraz z przepisem na smaczne i proste do przyrządzenia
                posiłki nie muszę tracić czasu na stanie w kolejkach po zakupy i
                zastanawianie się co by tu dzisiaj zjeść, a co za tym idzie mam
                więcej wolnego czasu 😃.
              </p>
            </blockquote>
            <i className='fa fa-quote-left absolute bottom-4 right-4 text-4xl text-klik'></i>
            <div className='mt-2 flex items-center justify-center'>
              <div className='flex flex-col items-center justify-center'>
                <span className='text-lg font-bold'>Adrian</span>
                {/* <span className="orange">Biznesmen | Zawodnik MMA</span> */}
                <div className='mt-1 flex flex-row text-klik'>
                  <i className='fa fa-star orange'></i>
                  <i className='fa fa-star orange'></i>
                  <i className='fa fa-star orange'></i>
                  <i className='fa fa-star orange'></i>
                  <i className='fa fa-star orange'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full justify-center md:w-1/2'>
          <div className='h-84 relative my-2 flex w-full flex-col justify-between rounded-md bg-neutral-100 bg-gradient-to-b from-neutral-100 to-neutral-200 px-4 py-16 text-center shadow-highlight dark:bg-gradient-to-b dark:from-neutral-900 dark:to-neutral-800 sm:m-8 sm:px-8'>
            <i className='fa fa-quote-left absolute left-4 top-4 text-4xl text-klik'></i>
            <div className='mx-auto flex flex-col items-center text-center'>
              <p className='flex leading-6'>
                Smaczne, kolorowe dania w pół godziny. Pełnowartościowy posiłek.
                Łatwe przygotowanie. Nie zniechęca nawet tych, którzy nie lubią
                gotować
              </p>
              <p className='mt-4 leading-6'>Niebo na talerzu!</p>
            </div>
            <i className='fa fa-quote-left shadow-2xl absolute bottom-4 right-4 text-4xl text-klik shadow-neutral-900'></i>
            <div className='mt-2 flex items-center justify-center'>
              <div className='flex flex-col items-center justify-center'>
                <span className='text-lg font-bold'>Marzena</span>
                {/* <span className="orange">Projektant | Architekt</span> */}
                <div className='mt-1 flex flex-row text-klik'>
                  <i className='fa fa-star orange'></i>
                  <i className='fa fa-star orange'></i>
                  <i className='fa fa-star orange'></i>
                  <i className='fa fa-star orange'></i>
                  <i className='fa fa-star orange'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
