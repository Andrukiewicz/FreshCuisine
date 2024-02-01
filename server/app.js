const express = require("express")
const path = require("path")
const cors = require("cors")
const dotenv = require("dotenv")
const cookies = require("cookie-parser")
const compression = require("compression")
const app = express()
const connectDB = require("./config/db")
// const Skladniki = require("./models/skladnikiModel");
const webhook = require("./config/webhook")
const helmet = require("helmet")

const multer = require("multer")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "build/images/przepisy/")
  },
  filename: function (req, file, cb) {
    // const filenameshort = file.originalname.replace(/\..+$/, "");
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    )
    cb(null, file.originalname)
  },
})

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb("Wrzucaj tylko zdjecia.", false)
  }
}

const upload = multer({ storage: storage }).single("file")

dotenv.config()
connectDB()

app.use(compression())

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        frameSrc: [
          "'self'",
          "*.stripe.com",
          "r.stripe.com",
          "r.stripe.com/0",
          "api.stripe.com",
          "api.stripe.com/*",
          "*.google.com",
        ],
        scriptSrc: [
          "'self'",
          "https:",
          "3klik.pl",
          "data:",
          "localhost",
          "*.google.com",
          "*.google.co.in",
          "*.google-analytics.com",
          "*.googlesyndication.com",
          "*.googleadservices.com",
          "*.googletagservices.com",
          "*.googleapis.com",
          "*.doubleclick.net",
          "*.gstatic.com",
          "*.cloudflare.com",
          "youtu.be",
          "*.youtu.be",
          "*.youtube.com",
          "*.stripe.com",
          "*.fasttony.com",
          "'unsafe-inline'",
          "*.discord.com",
          "*.facebook.com",
        ],
        styleSrc: [
          "'self'",
          "*.gstatic.com",
          "cdnjs.cloudflare.com",
          "fonts.googleapis.com",
          "*.google.com",
          "data:",
          "'unsafe-inline'",
        ],
        fontSrc: [
          "'self'",
          "https:",
          "data:",
          "*.gstatic.com/*",
          "*.cloudflare.com/*",
          "*.googleapis.com/*",
          "*.google.com",
        ],
        imgSrc: ["'self'", "https:", "data:", "*.google.com"],
        connectSrc: [
          "'self'",
          "*.google-analytics.com",
          "*.google.com",
          "*.stripe.com",
          "*.discord.com",
          "*.facebook.com",
          "*.fasttony.com",
          "connect.facebook.net",
        ],
        scriptSrcAttr: [
          "'self'",
          "https:",
          "*.stripe.com",
          "'unsafe-inline'",
          "*.facebook.com",
          "*.fasttony.com",
        ],
      },
    },
  })
)

// Load config
app.use(
  express.json({
    extended: false,
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
)
app.use(express.urlencoded({ extended: false }))

app.use(
  cookies({
    sameSite: "none",
    secure: true,
  })
)
app.use(cors({ origin: true }))

const productsRoute = require("./routes/productsRoute")
const usersRoute = require("./routes/usersRoute")
const ordersRoute = require("./routes/ordersRoute")
const authRoute = require("./routes/authRoute")

app.use("/api/products/", productsRoute)
app.use("/api/users/", usersRoute)
app.use("/api/orders/", ordersRoute)
app.use("/api/auth/", authRoute)

app.post("/webhook", webhook)

app.post("/uploadimage", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong!")
    }
    res.send(req.file)
  })
})

app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "build")))

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

const port = process.env.PORT || 8080
app.listen(port, () => `Server running on port - ${process.env.NODE_ENV}`)
