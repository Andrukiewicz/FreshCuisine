import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateUser } from "../../actions/userActions"
import Error from "../../components/Notifications/Error"
import Loading from "../../components/Notifications/Loading"
import Success from "../../components/Notifications/Success"
import { logoutUser } from "../../actions/userActions"
import { clearCart } from "../../actions/cartActions"

export default function Profilscreen() {
  const userstate = useSelector((state) => state.loginUserReducer)
  const updateUserState = useSelector((state) => state.updateUserReducer)
  const { error, loading, success } = updateUserState
  const { currentUser } = userstate
  const [fullName, setFullName] = useState(currentUser.fullName)
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber)
  const [email, setEmail] = useState(currentUser.email)
  const [line1, setLine1] = useState(currentUser.line1)
  const [postalCode, setPostalCode] = useState(currentUser.postalCode)
  const [city, setCity] = useState(currentUser.city)

  const dispatch = useDispatch()

  function formHandler(e) {
    e.preventDefault()

    dispatch(
      updateUser({
        ...currentUser,
        _id: currentUser._id,
        fullName,
        phoneNumber,
        email,
        line1,
        postalCode,
        city,
      })
    )
  }
  return (
    <div className='account-page'>
      <h4 className='d-flex center-all font-weight-bold'>Twoje konto</h4>
      <div className='account-page-container container'>
        <div className='account-page-wrapper row gutter0 panel-black'>
          <div className='account-page-menu col-12 col-sm-3'>
            <ul>
              <li className='account-page-menu-item'>
                <a className='nav__link active' href='/konto'>
                  <i className='fa fa-circle-user'></i>
                  <span className='nav__text'>Przegląd konta</span>
                </a>
              </li>
              <li className='account-page-menu-item account-page-visiting'>
                <a className='nav__link active' href='/edytuj-dane'>
                  <i className='fa fa-user-pen'></i>
                  <span className='nav__text'>Twoje Dane</span>
                </a>
              </li>
              <li className='account-page-menu-item'>
                <a className='nav__link' href='/edytuj-haslo'>
                  <i className='fa fa-key'></i>
                  <span className='nav__text'>Hasło</span>
                </a>
              </li>
              <li className='account-page-menu-item'>
                <a className='nav__link' href='/zamowienia'>
                  <i className='fas fa-bag-shopping'></i>
                  <span className='nav__text'>Zamówienia</span>
                </a>
              </li>
              <li className='account-page-menu-item'>
                <a className='nav__link' href='/edytuj-adres'>
                  <i className='fas fa-house'></i>
                  <span className='nav__text'>Książka adresowa</span>
                </a>
              </li>
              <li className='account-page-menu-item'>
                <a className='nav__link' href='/#'>
                  <i className='fas fa-credit-card'></i>
                  <span className='nav__text'>Sposób płatności</span>
                </a>
              </li>
              <li className='account-page-menu-item'>
                <a className='nav__link' href='/newsletter'>
                  <i className='fas fa-envelope'></i>
                  <span className='nav__text'>Newsletter</span>
                </a>
              </li>
              <li className='account-page-menu-item'>
                <a
                  className='nav__link'
                  href='/'
                  onClick={() => {
                    dispatch(logoutUser())
                    dispatch(clearCart())
                    // dodane usuwanie koszyka przy wylogowaniu
                  }}
                >
                  <i className='fas fa-power-off'></i>
                  <span className='nav__text'>Wyloguj się</span>
                </a>
              </li>
            </ul>
            <div className='account-page-help'>
              <div className='account-page-details center-all d-flex flex-column p-0'>
                <div className='account-page-breadcrumb'>
                  <div className='account-page-title d-block w-100 text-center'>
                    <span>Pytania?</span>
                  </div>
                </div>
                <div className='d-flex flex-column p-2'>
                  <a href='tel:796445923'>
                    <i className='fas fa-phone text-orange' />{" "}
                    <span>796 445 923</span>
                  </a>
                  <div className='d-flex flex-column w-100 pb-3'>
                    <span>pon. - pt. 9:00 - 22:30</span>
                    <span>nd. 12:00 - 16:00</span>
                  </div>
                  <div className='account-page-help-email'>
                    <a href='mailto:kontakt@3klik.pl'>
                      <i className='fas fa-envelope text-orange' />{" "}
                      <span>Napisz do nas</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='account-page-content col-12 col-sm-9'>
            <div className='account-page-details'>
              {loading && <Loading />}
              <div className='account-page-card'>
                <div className='account-page-breadcrumb col-md-12 w-100'>
                  <div className='account-page-title'>
                    <span className=''>Twoje dane</span>
                  </div>
                  <div className='col-md-12 w-100 font-weight-bold px-3'>
                    W tym miejscu zmienisz swoje dane.
                  </div>
                </div>
                <form onSubmit={formHandler}>
                  <div className='row'>
                    <div className='col'>
                      <div className='row p-3'>
                        <div className='form-group'>
                          <label>Imię i nazwisko</label>
                          <input
                            className='form-control'
                            type='text'
                            name='name'
                            placeholder='Nazwa użytkownika'
                            maxLength='20'
                            onChange={(e) => {
                              setFullName(e.target.value)
                            }}
                            value={fullName}
                          />
                        </div>
                        <div className='form-group'>
                          <label>Numer telefonu (opcjonalnie)</label>
                          <input
                            className='form-control'
                            type='tel'
                            pattern='[0-9]{3}[0-9]{3}[0-9]{3}'
                            maxLength='9'
                            name='numertelefonu'
                            placeholder='Numer telefonu'
                            onChange={(e) => {
                              setPhoneNumber(e.target.value)
                            }}
                            value={phoneNumber}
                          />
                        </div>
                        <div className='form-group'>
                          <label>Email</label>
                          <input
                            className='form-control'
                            type='text'
                            placeholder='Email'
                            maxLength='35'
                            onChange={(e) => {
                              setEmail(e.target.value)
                            }}
                            value={email}
                          />
                        </div>
                        <div className='form-group'>
                          <label>Adres</label>
                          <input
                            className='form-control'
                            type='text'
                            placeholder='np. Pyszna 6/9'
                            maxLength='35'
                            onChange={(e) => {
                              setLine1(e.target.value)
                            }}
                            value={line1}
                          />
                        </div>
                        <div className='form-group'>
                          <label>Kod pocztowy</label>
                          <input
                            className='form-control'
                            type='text'
                            placeholder='XX-XXX'
                            maxLength='6'
                            onChange={(e) => {
                              setPostalCode(e.target.value)
                            }}
                            value={postalCode}
                          />
                        </div>
                        <div className='form-group'>
                          <label>Miejscowość</label>
                          <input
                            className='form-control'
                            type='text'
                            placeholder='Miejscowość'
                            maxLength='35'
                            onChange={(e) => {
                              setCity(e.target.value)
                            }}
                            value={city}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row item-center'>
                    <button type='submit'>Zapisz zmiany</button>
                  </div>
                  {success && <Success success='Dane zaktualizowane!' />}
                  {error && <Error error='Coś poszło nie tak' />}
                </form>
                <div className='row item-center pt-5'>
                  <button
                    href='#'
                    onClick={() => {
                      dispatch(logoutUser())
                      dispatch(clearCart())
                      // dodane usuwanie koszyka przy wylogowaniu
                    }}
                  >
                    Wyloguj
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
