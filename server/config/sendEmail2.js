const nodemailer = require("nodemailer")

const sendEmail = async (email, subject, text) => {
  try {
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

    await transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
      },
      function (err) {
        if (err) console.log(err)
      }
    )
    console.log("Email wysłany pomyślnie")
  } catch (error) {
    console.log("Email nie został wysłany")
    console.log(error)
  }
}

module.exports = sendEmail
