const express = require("express")
const router = express.Router()
const ordersController = require("../controllers/ordersController")
const verifyJWT = require("../middleware/verifyJWT")
const loginLimiter = require("../middleware/loginLimiter")

// Zmienic na przyszlosc na zczytywanie ceny subtotal z bazy nie z req body bo przypał

router.post("/fakturownia", ordersController.fakturownia)

router.post(
  "/create-payment-intent",
  loginLimiter,
  ordersController.paymentIntent
)

router.post("/paymentstatus", loginLimiter, ordersController.paymentStatus)

router.post(
  "/getuserorders",
  verifyJWT,
  loginLimiter,
  ordersController.getUserOrders
)

router.get(
  "/kalkulator-towaru",
  verifyJWT,
  loginLimiter,
  ordersController.kalkulatorTowaru
)

router.get("/pakowanie", verifyJWT, loginLimiter, ordersController.pakowanie)

router.get(
  "/getallorders",
  loginLimiter,
  verifyJWT,
  ordersController.getAllOrders
)

router.post(
  "/deliverorder",
  loginLimiter,
  verifyJWT,
  ordersController.deliverOrder
)

router.post("/dpdlabel", loginLimiter, ordersController.dpdLabel)

router.post("/postcode", loginLimiter, ordersController.postCode)
router.post("/postcodehome", loginLimiter, ordersController.postCodeHome)

module.exports = router
