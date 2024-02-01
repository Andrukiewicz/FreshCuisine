import React, { useEffect } from "react"
import LandingPage from "../components/Homescreen/LandingPage"
import LandingPageFirst from "../components/Homescreen/LandingPageFirst"
import PrzygotowanieDaniaMain from "../components/Homescreen/PrzygotowanieDaniaMain"
import UserReviews from "../components/Homescreen/UserReviews"
import ExampleMeals from "../components/Homescreen/ExampleMeals"
import LandingProducts from "../components/Homescreen/LandingProducts"
import PostCode from "../components/Layout/PostCode"

export default function Homescreen() {
  useEffect(() => {
    document.title =
      "3klik: #1 Dostawca składników z przepisami | Pyszne obiady"
  }, [])
  return (
    <div id='app-container' className='min-h-full'>
      <main>
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
          <PostCode />
          <PrzygotowanieDaniaMain />
          <LandingProducts />
          <LandingPage />
          {/* <LandingPageFirst /> */}
          <ExampleMeals />
          <UserReviews />
        </div>
      </main>
    </div>
  )
}
