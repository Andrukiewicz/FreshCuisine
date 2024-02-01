import React from "react"
import Preloader from "../components/Preloader/Preloader"
import Timer from "../components/Countdown/Timer"
import logo from "../images/logo128.webp"

export default function Comingsoon() {
  return (
    <div className='mx-auto h-[calc(100vh-64px)] max-w-2xl py-4 px-4 sm:py-24 sm:px-6 md:py-16 lg:max-w-7xl lg:px-8'>
      <div className='relative mx-auto max-w-7xl'>
        <div className='fixed top-[50%] left-[50%] flex translate-y-[-50%] translate-x-[-50%] transform flex-col items-center justify-center gap-5 text-center'>
          {/* <img
            className='navbar-brand-logo img-shadow p-1'
            src={logo}
            alt='3klik logo'
          /> */}
          <h2 className='text-4xl font-bold'>Wkrótce startujemy!</h2>
          <span>
            Dostarczamy przepisy krok po kroku i świeże, wstępnie porcjowane
            składniki prosto pod Twoje drzwi.
          </span>{" "}
          <span>Zawsze jedz to co lubisz!</span>{" "}
          <span>Ostatnia książka kucharska jakiej potrzebujesz!</span>
          {/* <Timer /> */}
          <Preloader />
        </div>
      </div>
    </div>
  )
}
