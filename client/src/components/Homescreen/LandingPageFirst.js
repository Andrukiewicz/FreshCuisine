import {
  ShoppingBagIcon,
  ClockIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"

const features = [
  {
    name: "Proste przepisy",
    description:
      "Raz w tygodniu dostajesz od nas 6 przepisów przygotowanych przez naszych specjalistów od pyszności!",
    icon: DocumentTextIcon,
  },
  {
    name: "Wymierzone składniki",
    description:
      "Wstępnie odmierzone składniki - wszystko czego potrzebujesz do przygotowania w pełni wartościowego obiadu.",
    icon: ShoppingBagIcon,
  },
  {
    name: "Godziny dostawy",
    description:
      "Dostawa pod drzwi o wybranej godzinie raz w tygodniu? Już nie musisz jeździć po sklepach i szukać swoich ulubionych produktów!",
    icon: ClockIcon,
  },
]

export default function LandingPageFirst() {
  return (
    <div className='relative max-w-7xl items-center justify-between py-4 px-4 sm:px-0 lg:py-8'>
      <div className='absolute hidden w-full rounded-2xl bg-neutral-200 dark:bg-stone-900 md:flex md:h-[450px]'></div>
      <div className='relative mx-auto max-w-7xl rounded-2xl bg-neutral-200 px-4 py-4 shadow-highlight dark:bg-stone-900 sm:py-8 sm:px-6 md:bg-transparent md:dark:bg-transparent lg:px-8'>
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
        <div className='mt-10'>
          <dl className='space-y-10 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 md:space-y-0'>
            {features.map((feature) => (
              <div
                key={feature.name}
                className='shadow-xl flex flex-col items-center rounded-2xl bg-neutral-100 p-5 shadow-highlight dark:bg-neutral-800'
              >
                <dt className='flex flex-col items-center justify-center'>
                  <p className='ml-0 text-2xl font-medium md:text-xl'>
                    {feature.name}
                  </p>
                  <div className='my-5 flex h-16 w-16 items-center justify-center text-klik sm:h-32 sm:w-32'>
                    <feature.icon
                      className='h-16 w-16 sm:h-32 sm:w-32'
                      aria-hidden='true'
                    />
                  </div>
                </dt>
                <dd className='mt-2 ml-0 text-center text-base'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
