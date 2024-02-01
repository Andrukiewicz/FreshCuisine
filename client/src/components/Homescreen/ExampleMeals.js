import React from "react"
export default function ExampleMeals() {
  return (
    <div className='mx-auto grid w-full max-w-7xl grid-cols-2 grid-rows-2 flex-row flex-wrap items-center justify-between gap-3 py-4 px-4 sm:grid-rows-1 sm:py-8 sm:px-6 lg:grid-cols-4 lg:px-8'>
      <div className='my-3 flex flex-col'>
        <img
          src={require("../../images/home/home1_500.webp")}
          className='shadow-xl mx-auto h-48 w-full rounded-xl object-cover object-center'
          alt='placeholder'
        />
        <div className='mt-2 flex h-24 flex-col text-center sm:h-auto sm:text-start'>
          <p className='text-xl font-bold lg:text-base'>Twoje ulubione dania</p>
          <p className='card-text'>Już w 20 minut</p>
        </div>
      </div>
      <div className='my-3 flex flex-col'>
        <img
          src={require("../../images/home/home2_500.webp")}
          className='shadow-xl mx-auto h-48 w-full rounded-xl object-cover object-center'
          alt='placeholder'
        />
        <div className='mt-2 flex h-24 flex-col text-center sm:h-auto sm:text-start'>
          <p className='text-xl font-bold lg:text-base'>Na specjalne okazje</p>
          <p className='card-text'>Zaskocz swoich gości</p>
        </div>
      </div>
      <div className='my-3 flex flex-col'>
        <img
          src={require("../../images/home/home3_500.webp")}
          className='shadow-xl mx-auto h-48 w-full rounded-xl object-cover object-center'
          alt='placeholder'
        />
        <div className='mt-2 flex h-24 flex-col text-center sm:h-auto sm:text-start'>
          <p className='text-xl font-bold lg:text-base'>
            Popołudnia spędzone razem
          </p>
          <p className='card-text'>Gotuj razem z dziećmi</p>
        </div>
      </div>
      <div className='my-3 flex flex-col'>
        <img
          src={require("../../images/home/home4_500.webp")}
          className='shadow-xl mx-auto h-48 w-full rounded-xl object-cover object-center'
          alt='placeholder'
        />
        <div className='mt-2 flex h-24 flex-col text-center sm:h-auto sm:text-start'>
          <p className='text-xl font-bold lg:text-base'>Koniec z pytaniem</p>
          <p className='card-text'>"Co dziś na obiad?"</p>
        </div>
      </div>
      {/* <a href='#zamow'>
          <button className='mt-4'>Przekonaj się</button>
        </a> */}
    </div>
  )
}
