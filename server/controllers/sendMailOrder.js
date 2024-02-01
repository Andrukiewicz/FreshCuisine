const nodemailer = require("nodemailer")

const sendEmailOrder = async (
  email,
  url,
  txt,
  orderID,
  createdAt,
  userName,
  adres1,
  adres2,
  city,
  postalCode,
  deliveryDay,
  fullYear,
  deliveryTime
) => {
  try {
    const createdAtFormatted = createdAt.toLocaleDateString()
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: Number(process.env.EMAIL_PORT),
      secureConnection: Boolean(process.env.SECURE),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: "SSLv3",
      },
    })

    const mailOptions = {
      from: {
        name: "3KLIK",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: `${txt}`,
      html: `
      <html>
  <style>
    body {
      position: relative;
      height: 100%;
      margin: 0;
      padding: 0;
      font-size: 16px;
      display: flex;
    }
    body div div {
      padding-top: 1em;
    }
    .email-inner-container p {
      padding: 0;
      margin: 0;
    }
  </style>
  <body>
    <div
      class="email-inner-container"
      style="
        font-family: 'Lato';
        max-width: 700px;
        margin: auto;
        justify-content: center;
        border: 10px solid #ddd;
        padding: 1em 1em;
      "
    >
      <img
        style="
          align-items: center;
          margin: 0 auto;
          display: flex;
          border-radius: 0.5em;
          padding: 0.5em;
          max-width: 75px;
        "
        src="https://3klik.pl/logo128.webp"
        alt="3klik.pl logo"
      />
      <span style="color: #737c84; font-size: 0.8rem"
        >Zamówienie ${orderID} z dnia ${createdAtFormatted}</span
      >
      <h3>Twoje zamówienie jest już w drodze!</h3>
      <p>Cześć ${userName},</p>

      <p>Dziękujemy za dokonane zakupy! 🔥</p>
      <div style="display: flex; flex-direction: column">
        <div>
          <p>Twoja przesyłka została wysłana na następujący adres:</p>
          <p>${adres1} ${adres2}</p>
          <p>${postalCode}, ${city}</p>
        </div>
        <div>
          <p>Spodziewany czas dostawy:</p>
          <p style="font-size: 1.2rem; font-weight: bold">${deliveryDay}</p>
          <p style="font-size: 1.2rem; font-weight: bold">w godzinach ${deliveryTime}</p>
        </div>

        <div>
          <p>Próbujesz odnaleźć swoją przesyłkę?</p>
          <p>
            Nasi kurierzy nie zostawiają paczek u sąsiadów ani pod drzwiami.
          </p>
          <p>
            Jeśli paczka została oznaczona jako dostarczona a nadal jej nie
            otrzymałeś, skontaktuj się z nami poprzez adres e-mail i podaj numer
            zamówienia:
          </p>
          <a href="mailto:zamowienia@3klik.pl">zamowienia@3klik.pl</a>
        </div>
        <div>
          <p>Z pozdrowieniami,</p>
          <p>zespół 3KLIK</p>
        </div>
      </div>
      <div style="display: flex; justify-content: center">
        <a
          href="${url}"
          style="
            display: inline-block;
            margin: 1em 0;
            padding: 0.5em;
            border-radius: 0.5em;
            background: #e84822;
            text-decoration: none;
            color: #fff;
            font-weight: bold;
          "
          >Szczegóły zamówienia</a
        >
      </div>
      <div style="display:flex; justify-content:center; border-top: 1px solid #737c84; padding-top: 1em;">
    <p style="font-weight:bold; font-size: 0.8rem;">© ${fullYear} 3KLIK.PL</p>
    </div>
    </div>
  </body>
</html>
`,
    }
    transporter.sendMail(mailOptions, (err, infor) => {
      if (err) return err
      return infor
    })
    console.log("Email wysłany pomyślnie")
  } catch (error) {
    console.log("Email nie został wysłany")
    console.log(error)
  }
}

module.exports = sendEmailOrder
