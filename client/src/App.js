// import "./App.css"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

// Layout
import Navbar from "./components/Layout/Navbar"
import Footer from "./components/Layout/Footer"
// import NavbarMobile from "./components/NavbarMobile";
import CookieBar from "./components/Layout/CookieBar"

import Homescreen from "./screens/Homescreen"
import Registerscreen from "./screens/Registerscreen"
import Loginscreen from "./screens/Loginscreen"
import Adminscreen from "./screens/Adminscreen"
// import Dostawyscreen from "./screens/Footer/Dostawyscreen"
import Faqscreen from "./screens/Footer/Faqscreen"
// import Platnosciscreen from "./screens/Footer/Platnosciscreen"
import Politykascreen from "./screens/Footer/Politykascreen"
import Producenciscreen from "./screens/Footer/Producenciscreen"
import Regulaminscreen from "./screens/Footer/Regulaminscreen"
import Onasscreen from "./screens/Footer/Onasscreen"

// PROFIL
import Accountscreen from "./screens/Accountscreen"

// AKTYWACJA KONTA
import ActivationScreen from "./screens/Profil/ActivationScreen"

// RESET HASLA
import ForgotPasswordScreen from "./screens/Profil/ForgotPassScreen"
import UpdatePasswordScreen from "./screens/Profil/UpdatePassScreen"

// PŁATNOŚCI
import SuccessPaymentScreen from "./screens/Stripe/SuccessPaymentScreen"
import CancelPaymentScreen from "./screens/Stripe/CancelPaymentScreen"

// KOSZYK
import Cartscreen from "./screens/Cartscreen"
import Paymentscreen from "./screens/Paymentscreen"

// eslint-disable-next-line
// import Comingsoon from "./screens/Comingsoon"

// Not found 404
import NotFoundPage from "./screens/Error/NotFoundPage"

// REACT GOOGLE ANALYTICS
// ReactGA.initialize("G-ES0RNRE8BW")

import Prefetch from "./features/Prefetch"
import PrefetchUser from "./features/PrefetchUser"

import PersistLogin from "./features/PersistLogin"

// Roles
import RequireAuth from "./features/RequireAuth"
import { ROLES } from "./config/roles"
import ScrollToTop from "./features/ScrollToTop"

function App() {
  return (
    <div className='App'>
      <div
        id='app-container'
        className='min-h-screen bg-white text-gray-800 antialiased transition duration-200 ease-in-out dark:bg-neutral-900 dark:text-white'
      >
        <Router>
          <ScrollToTop />
          <Navbar />
          {/* <NavbarMobile /> */}
          <Routes>
            {/* Protected Routes */}
            <Route element={<PersistLogin />}>
              {/* Routes we want user  to be logged in so basically everything */}
              <Route path='/' element={<Homescreen />} />
              {/* <Route path='/' element={<Comingsoon />} /> */}

              {/* ACCOUNT KONTO */}
              <Route
                path='/zmiana-hasla/:reset_token'
                element={<UpdatePasswordScreen />}
              />
              <Route
                path='/przypomnienie-hasla'
                element={<ForgotPasswordScreen />}
              />
              <Route path='logowanie' element={<Loginscreen />} />
              <Route path='rejestracja' element={<Registerscreen />} />
              {/* KONIEC ACCOUNT KONTO */}

              {/* <Route path='dostawy' element={<Dostawyscreen />} /> */}
              <Route path='faq' element={<Faqscreen />} />
              {/* <Route path='platnosci' element={<Platnosciscreen />} /> */}
              <Route
                path='/polityka-prywatnosci'
                element={<Politykascreen />}
              />
              <Route path='/nasi-producenci' element={<Producenciscreen />} />
              <Route path='/regulamin' element={<Regulaminscreen />} />
              <Route path='/o-nas' element={<Onasscreen />} />

              <Route path='koszyk' element={<Cartscreen />} />
              <Route path='oplac-zamowienie' element={<Paymentscreen />} />

              {/* Admin panel with prefetch */}
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                }
              >
                <Route element={<Prefetch />}>
                  <Route path='admin/*' element={<Adminscreen />} />
                </Route>
              </Route>

              {/* PROFIL ACCOUNT KONTO */}
              <Route element={<PrefetchUser />}>
                <Route path='konto/*' element={<Accountscreen />} />
              </Route>

              <Route
                path='/konto/aktywacja/:activation_token'
                element={<ActivationScreen />}
              />

              <Route path='/cancelpayment' element={<CancelPaymentScreen />} />
              <Route
                path='/successpayment'
                element={<SuccessPaymentScreen />}
              />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
          <CookieBar />
          <Footer />
          {/* <MessengerCustomerChat
          pageId='102160918901548'
          appId='616459879576815'
          language='pl_PL'
        /> */}
        </Router>
      </div>
    </div>
  )
}

export default App
