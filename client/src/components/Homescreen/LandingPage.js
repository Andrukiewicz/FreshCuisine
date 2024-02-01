import React, { useEffect, useRef, useState } from "react"
// import maincarouseldark from "../../images/MainCarousel_dark.webp"
// import maincarousel from "../../images/MainCarousel.webp"
import "moment/locale/pl"
export default function LandingPage() {
  var secondText = ["czas", "stres", "pieniądze"]
  // var titleText = ["Twój", "Twój", "Twoje"]
  const updateNotificationRef = useRef()
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((second) => (second === 2 ? 0 : second + 1))
      updateNotificationRef.current.animate(
        {
          opacity: [0, 1, 1, 1, 0],
          // fontSize: ["1.5em", "2em", "2em", "2em", "1.5em"],
        },
        3000
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])
  return (
    <div className='mx-auto max-w-7xl py-4 px-4 sm:py-8 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8'>
      <div className='relative flex h-96 w-full bg-cover bg-center md:h-[32rem]'>
        <div className='bg-maincarousel dark:bg-maincarouseldark h-96 bg-cover bg-center md:h-[32rem]' />
        {/* <img
          alt='Landing page behind'
          src={require("../../images/LandingPage_light.webp")}
          className='light-ambient z-1 block h-96 bg-center object-cover dark:hidden md:h-[32rem]'
        />
        <img
          alt='Landing page dark behind'
          src={require("../../images/LandingPage_dark.webp")}
          className='light-ambient z-1 hidden h-96 bg-center object-cover dark:block md:h-[32rem]'
        /> */}
        <div className='relative flex w-full drop-shadow-md'>
          <img
            alt='Landing page front'
            src={require("../../images/LandingPage_light.webp")}
            className='absolute z-10 block h-96 rounded-lg bg-center bg-no-repeat object-cover dark:hidden md:h-[32rem]'
          />
          <img
            alt='Landing page dark front'
            src={require("../../images/LandingPage_dark.webp")}
            className='absolute z-10 hidden h-96 rounded-lg bg-center bg-no-repeat object-cover dark:block md:h-[32rem]'
          />
          <div className='z-10 m-auto flex flex-col items-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-5xl'>
              <span className='mb-6 block'>Oszczędź</span>
            </h2>
            <h2
              ref={updateNotificationRef}
              className='text-3xl font-bold tracking-tight  sm:text-4xl'
            >
              <span className='block text-klik'>{secondText[seconds]}</span>
            </h2>
            <h2 className='flex flex-row pt-6 text-3xl tracking-tight sm:text-2xl'>
              Obiad już od <p className='mx-2 font-bold'>8,99</p>zł/os.
            </h2>
            <div className='mt-8 flex lg:flex-shrink-0'>
              <div className='inline-flex rounded-md drop-shadow-md'>
                <a
                  href='#zamow'
                  className='flex h-12 w-full items-center justify-center rounded-lg bg-klik px-6 font-semibold text-white shadow-highlight hover:bg-kliklight focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto'
                >
                  Zamów
                </a>
                {/* <a
                  href='#zamow'
                  className='inline-flex items-center justify-center rounded-lg border border-transparent bg-klik px-5 py-3 text-xl font-medium transition-transform hover:scale-110 hover:bg-kliklight'
                >
                  Zamów
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
