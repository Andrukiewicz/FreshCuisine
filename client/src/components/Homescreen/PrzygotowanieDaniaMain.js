import pdphoto from "../../images/cooking_photo.webp"

export default function PrzygotowanieDaniaMain() {
  return (
    <div className='mx-auto grid w-full max-w-7xl grid-cols-1 flex-row flex-wrap items-center justify-between gap-3 py-3 px-4 sm:px-6 lg:px-8 lg:py-8'>
      <div className='mx-auto max-w-7xl'>
        <main className='rounded-lg bg-gradient-to-b from-neutral-100 to-neutral-200 p-2 text-center shadow-highlight dark:bg-gradient-to-b dark:from-neutral-800 dark:to-neutral-700/50 sm:p-8'>
          <div className='my-8 text-center sm:my-0'>
            <div className='flex flex-row justify-center text-2xl'>
              <p className='pr-2 font-bold leading-8 tracking-tight sm:text-4xl'>
                Dostarczamy
              </p>
              <p className='font-bold leading-8 tracking-tight text-klik sm:text-4xl'>
                WSZYSTKO
              </p>
            </div>
            <p className='text-2xl font-bold leading-8 tracking-tight sm:text-4xl'>
              na pyszny obiad każdego dnia
            </p>
            <p className='mx-auto mt-4 max-w-2xl text-xl text-zinc-900 dark:text-gray-400'>
              Przestań się martwić, zostań w domu i gotuj! My zadbamy o resztę.
            </p>
          </div>
          <div className='flex flex-col pt-0 sm:pt-8 lg:flex-row'>
            <div className='m-auto pt-0 sm:text-center md:pr-5 lg:w-1/2 lg:text-left'>
              <div className='w-full'>
                <div className=''>
                  <p className='text-2xl font-bold'>
                    <i className='fas fa-clock pr-3 text-neutral-800 dark:text-neutral-200'></i>
                    Oszczędzasz czas
                  </p>
                  <p className='mt-3'>
                    Dostarczamy wszystko, czego potrzebujesz do tworzenia
                    pysznych obiadów od podstaw, abyś nie tracił czasu krążąc po
                    sklepach!
                  </p>
                </div>
                <div className='mt-3'>
                  <p className='text-2xl font-bold text-klikgreen'>
                    <i className='fas fa-leaf pr-3 text-klikgreen'></i>
                    Ratujesz środowisko
                  </p>
                  <p className='mt-3'>
                    Dostarczając Ci dokładnie taką ilość składników jakiej
                    potrzebujesz do przygotowania pełnowartościowego obiadu,
                    ograniczamy marnowanie żywności, a także produkcję plastiku!
                  </p>
                </div>
                <div className='mt-3'>
                  <p className='text-2xl font-bold text-klik'>
                    <i className='fas fa-money-bill-alt pr-3 text-klik'></i>
                    Ograniczasz wydatki
                  </p>
                  <p className='mt-3'>
                    Ściśle współpracujemy z naszymi zaufanymi, lokalnymi
                    dostawcami, aby pozyskiwać świeże, wysokiej jakości
                    składniki do Twojego pudełka z przepisami. Nie musisz już
                    jeździć po sklepach i szukać swoich ulubionych produktów!
                  </p>
                </div>
              </div>
              <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                <div className='shadow-xl rounded-md dark:shadow-neutral-900'>
                  <a
                    href='#zamow'
                    className='flex h-12 w-full items-center justify-center rounded-lg bg-klik px-6 font-semibold text-white shadow-highlight hover:bg-kliklight focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto'
                  >
                    Przekonaj się
                  </a>
                </div>
              </div>
            </div>
            <div className='pt-8 lg:relative lg:inset-y-0 lg:right-0 lg:w-1/2 lg:pt-0'>
              <img
                className='z-1 shadow-xl relative h-56 w-full rounded-md object-cover dark:shadow-neutral-900 sm:z-10 sm:h-72 md:h-96 lg:h-full lg:w-full'
                src={pdphoto}
                alt='Przygotowywanie dania z przepisu'
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
