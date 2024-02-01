const User = require("../models/usersModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

// @desc Login
// @route POST /api/auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Wypełnij wszystkie pola" })
  }

  const foundUser = await User.findOne({ email }).exec()
  // console.log(foundUser)

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Użytkownik nie istnieje" })
  }

  const match = await bcrypt.compare(password, foundUser.password)

  if (!match)
    return res.status(401).json({ message: "Nieprawidłowe dane logowania" })

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
        roles: foundUser.roles,
        id: foundUser._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  )

  const refreshToken = jwt.sign(
    {
      email: foundUser.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  )

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "Strict", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  })
  // Send accessToken containing email and roles
  res.json({ accessToken })
})

// @desc Refresh token
// @route GET /api/auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt)
    return res.status(401).json({ message: "Błąd autoryzacji" })

  const refreshToken = cookies.jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Brak uprawnień" })

      const foundUser = await User.findOne({ email: decoded.email })

      if (!foundUser)
        return res.status(401).json({ message: "Błąd autoryzacji" })

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            roles: foundUser.roles,
            id: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      )

      res.json({ accessToken })
    })
  )
}

// @desc Logout
// @route POST /api/auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) // No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "Strict", secure: true })
  res.json({ message: "User logged out" })
}

module.exports = {
  login,
  refresh,
  logout,
}
