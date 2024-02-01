// COOKIES
import CookieConsent from "react-cookie-consent"

export default function CookieBar() {
  return (
    <CookieConsent
      location='bottom'
      buttonText='Akceptuj'
      cookieName='3klik_cookie_consent'
      containerClasses='items-center flex'
      buttonClasses='rounded-md bg-klik text-white'
      buttonStyle={{
        fontWeight: "bold",
        background: "#e84822",
        color: "white",
      }}
    >
      <div className='flex w-full flex-row items-center'>
        <div className='mr-3'>
          <i className='fas fa-cookie-bite text-2xl text-klik'></i>
        </div>
        <div className='flex flex-col'>
          <p className='font-bold'>Ta strona korzysta z cookies.</p>
          <p className=''>
            Akceptując, wyrażasz zgodę na naszą{" "}
            <a
              className='text-klik'
              href='https://3klik.pl/polityka-prywatnosci'
            >
              Politykę prywatności
            </a>
            , łącznie z korzystaniem z cookies i innych technologii śledzących.
          </p>
        </div>
      </div>
    </CookieConsent>
  )
}
