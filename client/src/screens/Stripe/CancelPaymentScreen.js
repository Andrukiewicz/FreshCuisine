export default function CancelPaymentScreen() {
  return (
    <div className="panel-black flex-column center-all p-5">
      <span className="h3 font-weight-bold">Płatność niepowiodła się</span>
      Przejdź do koszyka aby spróbować ponownie
      <a className="my-3" href="/koszyk">
        <button className="pt-2 pb-2 d-flex center-all flex-row">
          <i className="fas fa-cart-shopping"></i>
          <span className="ps-2">koszyk</span>
        </button>
      </a>
    </div>
  );
}
