const asyncHandler = require("express-async-handler")
const User = require("../models/usersModel")
const jwt = require("jsonwebtoken")
const sendMail = require("./sendMail")
const bcrypt = require("bcryptjs")

const { EMAIL_URL } = process.env

// Get User info
const getUser = asyncHandler(async (req, res) => {
  const id = req.id
  const user = await User.findOne({ _id: id }).select("-password").lean()
  // console.log(user)
  res.json(user)
})

const getAllUsers = asyncHandler(async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find().select("-password").lean()

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" })
  }

  res.json(users)
})
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body

    // Sprawdz czy uzytkownik z danym emailem istnieje
    if (!email || !password) {
      return res.status(400).json({ error: "Wypełnij wszystkie pola" })
    }
    await User.findOne({ email: email }, async function (err, existingUser) {
      if (err) {
        return res.status(400).json({ error: "Nieprawidłowe dane" })
      }
      // If a user with email exists, return an error
      if (existingUser) {
        return res
          .status(422)
          .json({ error: "Użytkownik o danym adresie już istnieje!" })
      } else {
        const newUser = {
          email,
          password,
        }
        const activation_token = createActivationToken(newUser)

        const url = `${EMAIL_URL}/konto/aktywacja/${activation_token}`
        // console.log(url)
        sendMail(email, url, "Aktywuj konto", "newAccount")

        return res.status(200).json({
          message: "Link aktywacyjny został wysłany na twój adres e-mail!",
        })
      }
    }).clone()
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Nie udało się wysłać maila, spróbuj ponownie!" })
  }
})

const activateUser = asyncHandler(async (req, res) => {
  try {
    const { activation_token } = req.body
    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    )

    const { email, password } = user

    const check = await User.findOne({ email })
    if (check)
      return res.status(400).json({ error: "To konto jest już aktywne" })

    function customId(length) {
      var result = ""
      const characters = "0123456789"
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return Number(result)
    }

    const newUser = new User({
      _id: customId(14),
      email,
      password,
    })

    await newUser.save()

    res.status(200).json({ message: "Konto zostało aktywowane!" })
  } catch (error) {
    res.status(400).json({ error: "Link wygasł! Zarejestruj się ponownie!" })
  }
})

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  })
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  })
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  })
}

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (process.env.NODE_ENV === "development") {
    console.log(email)
    console.log(user._id)
  }
  if (!user)
    return res.status(400).json({ error: "Email nie istnieje w bazie!" })

  const access_token = createAccessToken({ id: user._id })
  const url = `${EMAIL_URL}/zmiana-hasla/${access_token}`

  if (process.env.NODE_ENV === "development") {
    console.log(url)
  } else {
    sendMail(email, url, "Zmiana hasła", "forgotPassword")
  }
  res.json({ message: "Link do zresetowania hasła wysłany, sprawdź e-mail!" })
})

const updatePassword = asyncHandler(async (req, res) => {
  const { reset_token, password } = req.body

  if (reset_token) {
    jwt.verify(
      reset_token,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, decodedData) {
        if (err) {
          return res
            .status(400)
            .json({ error: "Kod resetujący wygasł, spróbuj ponownie!" })
        }
        const { id } = decodedData
        // console.log(decodedData)
        // console.log(id)
        User.findOne({ _id: id }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({ error: "Użytkownik nie istnieje" })
          }

          user.password = password
          // console.log(password)
          // console.log(user)
          user.save((err, result) => {
            if (err) {
              console.log("USER SAVE " + err)
              return res.status(400).json({ error: "Błąd resetowania hasła" })
            } else {
              // console.log(result)
              return res
                .status(200)
                .json({ message: "Hasło zostało zmienione!" })
            }
          })
        })
      }
    )
  } else {
    return res.status(401).json({ error: "Błąd autoryzacji, spróbuj ponownie" })
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const { user } = req.body
  // console.log(req.body.user)
  const userData = await User.findOne({ _id: req.user.id }).select("-password")
  // console.log(userData)
  if (userData) {
    ;(userData.fullName = user.fullName),
      (userData.email = user.email),
      (userData.phoneNumber = user.phoneNumber)
    const updatedUser = await userData.save()

    res.status(200).json(updatedUser)
    // res.json(updatedUser)
    // console.log(updatedUser)
  } else {
    return res.status(404).json("Coś poszło nie tak")
  }
})

const updateAddress = asyncHandler(async (req, res) => {
  const { email, fullName, phoneNumber } = req.body
  const user = await User.findOne({ _id: req.user.id })
  if (user) {
    ;(user.shipping[0].line1 = line1),
      (user.shipping[0].postal_code = postalCode),
      (user.shipping[0].city = city)
    const updatedUser = await user.save()

    res.status(200).json(updatedUser)
    // res.json(updatedUser)
    // console.log(updatedUser)
  } else {
    return res.status(404).json("Coś poszło nie tak")
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const userid = req.body.userid
  await User.findOneAndDelete({ _id: userid })
  res.send("Konto uzytkownika usuniete pomyslnie")
})

module.exports = {
  registerUser,
  updateAddress,
  updateUser,
  getAllUsers,
  deleteUser,
  activateUser,
  forgotPassword,
  updatePassword,
  getUser,
}
