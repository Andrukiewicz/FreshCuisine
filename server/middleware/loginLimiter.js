const rateLimit = require("express-rate-limit")
// const { logEvents } = require("./logger")

const loginLimiter = rateLimit({
  windowsMS: 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 5 login requests per 'window' per minute
  message: {
    message: "API Anti Spam",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}\n${req.ip}\n`,
      "errLog.log"
    )
    res.status(options.statusCode).send(options.message)
  },
  standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
  legacyHeaders: false, // Disable the 'X-RateLimit-*' headers
})

module.exports = loginLimiter
