import React from "react";
import { useSelector } from "react-redux";

export default function NavbarMobile() {
  const cartstate = useSelector((state) => state.cartReducer);
  const { cartItems } = cartstate;
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  return (
    <nav className="nav nav__mobile">
      <a href="/" className="nav__link nav__link--active">
        <i className="bi bi-house-door"></i>
        <span className="nav__text">3klik.pl</span>
      </a>
      <a className="nav__link" href="/koszyk">
        <i className="bi bi-bag"></i>
        <span className="nav__text">
          ({cartItems ? cartstate.cartItems.length : 0})
        </span>
      </a>
      {currentUser ? (
        <a href="/konto" className="nav__link">
          <i className="bi bi-person"></i>
          <span className="nav__text">Konto</span>
        </a>
      ) : (
        <a href="/logowanie" className="nav__link">
          <i className="bi bi-person"></i>
          <span className="nav__text">Konto</span>
        </a>
      )}
    </nav>
  );
}
