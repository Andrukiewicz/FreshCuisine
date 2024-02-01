const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const productController = require("../controllers/productController")

// Zestawy
// @route /api/products
router.get("/getallproducts", productController.getProducts)
router.post("/getproductbyid", verifyJWT, productController.getProductById)
router.post("/addproduct", verifyJWT, productController.addProduct)
router.patch("/editproduct", verifyJWT, productController.editProduct)
router.get("/getproductsclient", productController.getProductsClient)
router.post("/wyliczproduct", productController.wyliczProduct)

// Skladniki
// @route /api/products
router.post("/getskladnikibyid", verifyJWT, productController.getSkladnikiById)
router.get("/getallskladniki", verifyJWT, productController.getAllSkladniki)
router.post("/addskladniki", verifyJWT, productController.addSkladniki)
router.patch("/editskladniki", verifyJWT, productController.editSkladniki)

// Przepisy
// @route /api/products
router.get("/getallprzepisy", verifyJWT, productController.getAllPrzepisy)
router.post("/getprzepisybyid", verifyJWT, productController.getPrzepisyById)
router.post("/addprzepisy", verifyJWT, productController.addPrzepisy)
router.patch("/editprzepisy", verifyJWT, productController.editPrzepisy)
router.post("/getprzepisybyskladniki", productController.getPrzepisyBySkladniki)

// Producenci
// @route /api/products
router.post("/addproducenci", verifyJWT, productController.addProducenci)
router.patch("/editproducenci", verifyJWT, productController.editProducenci)
router.get("/getallproducenci", verifyJWT, productController.getAllProducenci)
router.post(
  "/getproducencibyid",
  verifyJWT,
  productController.getProducenciById
)

// Kontrahenci
// @route /api/products
router.post("/addkontrahenci", verifyJWT, productController.addKontrahenci)
router.patch("/editkontrahenci", verifyJWT, productController.editKontrahenci)
router.get("/getallkontrahenci", verifyJWT, productController.getAllKontrahenci)
router.post(
  "/getkontrahencibyid",
  verifyJWT,
  productController.getKontrahenciById
)

module.exports = router
