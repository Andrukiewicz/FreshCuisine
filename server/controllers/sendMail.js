const nodemailer = require("nodemailer")
const fs = require("fs")

const sendEmail = async (email, url, txt, file) => {
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
        rejectUnauthorized: false,
      },
    })

    fs.readFile(`./htmlTemplates/${file}.html`, "utf-8", (error, data) => {
      if (error) {
        console.error(error)
      } else {
        let mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: `3klik - ${txt}`,
        }

        // Replace the variables in the HTML file with actual values
        mailOptions.html = data.toString().replace(/\$\{url\}/g, url)

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error)
          } else {
            console.log("Email wysłany pomyślnie: " + info.response)
          }
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendEmail
