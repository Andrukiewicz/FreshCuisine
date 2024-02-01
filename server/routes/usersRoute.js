const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const verifyJWT = require("../middleware/verifyJWT")

router.post("/register", userController.registerUser)

router.post("/weryfikacja", userController.activateUser)

router.post("/updatepassword", userController.updatePassword)

router.post("/forgotpassword", userController.forgotPassword)

router.post("/getuser", verifyJWT, userController.getUser)

router.get("/allusers", verifyJWT, userController.getAllUsers)

router.post("/updateaddress", verifyJWT, userController.updateAddress)

router.patch("/updateprofile", verifyJWT, userController.updateUser)

router.post("/deleteuser", verifyJWT, userController.deleteUser)

module.exports = router
