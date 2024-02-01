const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose")
const Product = require("../models/productsModel")
const Skladniki = require("../models/skladnikiModel")
const Przepisy = require("../models/przepisyModel")
const Producenci = require("../models/producenciModel")
const Kontrahenci = require("../models/kontrahenciModel")

const fs = require("fs")

// Fetch all products
// GET /api/products/getallproducts
// const getProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({});
//   res.send(products);
// });
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $unwind: "$week" },
      {
        $lookup: {
          from: "przepisy",
          localField: "week.name",
          foreignField: "name",
          as: "newField",
        },
      },
      { $unwind: "$newField" },
      {
        $set: {
          week: { $mergeObjects: ["$newField", "$week"] },
        },
      },
      {
        $unwind: "$week",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          category: { $first: "$category" },
          price: { $first: "$price" },
          image: { $first: "$image" },
          description: { $first: "$description" },
          description2: { $first: "$description2" },
          description3: { $first: "$description3" },
          number: { $first: "$number" },
          week: {
            $push: "$week",
          },
        },
      },
    ])

    // console.log(JSON.stringify(products, null, 4));
    // let data = JSON.stringify(skladniki, null, 4);
    // fs.writeFileSync("przepisy.json", data);
    res.send(products)
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

const getProductsClient = asyncHandler(async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $unwind: "$week" },
      {
        $lookup: {
          from: "przepisy",
          localField: "week.name",
          foreignField: "name",
          as: "newField",
        },
      },
      { $unwind: "$newField" },
      {
        $set: {
          week: { $mergeObjects: ["$newField", "$week"] },
        },
      },
      {
        $unwind: "$week",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          category: { $first: "$category" },
          price: { $first: "$price" },
          image: { $first: "$image" },
          description: { $first: "$description" },
          description2: { $first: "$description2" },
          description3: { $first: "$description3" },
          number: { $first: "$number" },
          week: {
            $push: "$week",
          },
        },
      },
      {
        $unset: [
          "week.skladniki",
          "week.opis",
          "week.karty",
          // "week.zdjecia",
          "week.category",
        ],
      },
    ])
    // console.log(JSON.stringify(products, null, 4));
    // let data = JSON.stringify(skladniki, null, 4);
    // fs.writeFileSync("przepisy.json", data);
    res.send(products)
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

// Fetch add product
// post /api/products/addproduct
const addProduct = asyncHandler(async (req, res) => {
  const product = req.body.product
  const newproduct = new Product({
    name: product.name,
    image: product.image,
    description: product.description,
    category: product.category,
    price: product.price,
    week: product.week,
    number: product.number,
  })
  await newproduct.save()
  res.send({
    message: `Produkt ${product.name} dodany pomyślnie`,
  })
})

// Fetch wylicz product
// post /api/products/wyliczproduct
const wyliczProduct = asyncHandler(async (req, res) => {
  const { productId } = req.body
  await Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(productId),
      },
    },
    { $unwind: "$week" },
    {
      $lookup: {
        from: "przepisy",
        localField: "week.name",
        foreignField: "name",
        as: "orderItems.week",
      },
    },
    { $unwind: "$orderItems.week" },
    {
      $group: {
        _id: "$_id",
        orderItems: {
          $push: "$orderItems.week",
        },
      },
    },
    {
      $unwind: "$orderItems",
    },
    { $group: { _id: "$orderItems.name", ilosc: { $sum: 1 } } },
    {
      $lookup: {
        from: "przepisy",
        localField: "_id",
        foreignField: "name",
        as: "towar",
      },
    },
    {
      $unwind: "$towar",
    },
    {
      $set: {
        towar: {
          ilosc: "$ilosc",
        },
      },
    },
    {
      $set: {
        towar: "$towar.skladniki",
      },
    },
    {
      $unwind: "$towar",
    },
    {
      $set: {
        towar: {
          value: {
            $multiply: [{ $toDouble: "$towar.value" }, "$ilosc"],
          },
        },
      },
    },
    {
      $set: {
        towar: {
          value: {
            $round: ["$towar.value", 4],
          },
        },
      },
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: ["$towar"] } },
    },
    {
      $group: {
        _id: "$_id",
        jednostka: { $first: "$jednostka" },
        value: {
          $sum: "$value",
        },
      },
    },
    {
      $lookup: {
        from: "skladniki",
        localField: "_id",
        foreignField: "_id",
        as: "zamowienie",
      },
    },
    {
      $unwind: "$zamowienie",
    },
    {
      $match: {
        "zamowienie.invoice": true,
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        quantity: "$value",
        total_price_gross: {
          $round: [{ $multiply: ["$zamowienie.cena", "$value"] }, 2],
        },
        tax: "$zamowienie.tax",
      },
    },
    {
      $group: {
        _id: { tax: "$tax" },
        quantity: { $sum: 1 },
        total_price_gross: { $sum: "$total_price_gross" },
      },
    },
    {
      $project: {
        _id: 0,
        name: {
          $concat: ["Artykuły spożywcze ", { $toString: "$_id.tax" }, "%"],
        },
        quantity: 1,
        total_price_gross: 1,
        tax: "$_id.tax",
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$total_price_gross" },
      },
    },
  ])
    .then((wyliczproduct) => {
      const total = wyliczproduct[0].total
      res.send({
        message: total,
      })
    })
    .catch((err) => {
      // console.log(err)
      const parsedError = JSON.stringify(err)
      res.status(400).json({ err: parsedError })
    })
})

const getProductById = asyncHandler(async (req, res) => {
  const productid = req.body.productid
  const product = await Product.findOne({ _id: productid })
  res.send(product)
})

const editProduct = asyncHandler(async (req, res) => {
  const editedproduct = req.body.editedproduct
  const product = await Product.findOne({ _id: editedproduct._id })
  ;(product.name = editedproduct.name),
    (product.description = editedproduct.description),
    (product.image = editedproduct.image),
    (product.category = editedproduct.category),
    (product.price = editedproduct.price),
    (product.week = editedproduct.week),
    (product.number = editedproduct.number),
    // console.log(editedproduct);
    await product.save()
  res.send({
    message: `Produkt ${editedproduct.name} edytowany pomyślnie`,
  })
})

// Fetch add skladnik
// post /api/products/addskladniki
const addSkladniki = asyncHandler(async (req, res) => {
  const skladniki = req.body.skladniki
  const newskladniki = new Skladniki({
    name: skladniki.name,
    kontrahent: skladniki.kontrahent,
    producent: skladniki.producent,
    category: skladniki.category,
    cena: skladniki.cena,
    tax: skladniki.tax,
    invoice: skladniki.invoice,
  })
  await newskladniki.save()
  res.send({
    message: `Składnik ${skladniki.name} dodany pomyślnie`,
  })
})

// Fetch all skladniki
// post /api/products/getallskladniki
const getAllSkladniki = asyncHandler(async (req, res) => {
  const skladniki = await Skladniki.find({})
  res.send(skladniki)
})

// Edit skladniki
// patch /api/products/editskladniki
const editSkladniki = asyncHandler(async (req, res) => {
  const editedskladniki = req.body.editedskladniki
  // console.log(editedskladniki)
  const skladniki = await Skladniki.findOne({ _id: editedskladniki._id })
  ;(skladniki.name = editedskladniki.name),
    (skladniki.kontrahent = editedskladniki.kontrahent),
    (skladniki.producent = editedskladniki.producent),
    (skladniki.category = editedskladniki.category),
    (skladniki.cena = editedskladniki.cena),
    (skladniki.tax = editedskladniki.tax),
    (skladniki.invoice = editedskladniki.invoice),
    // console.log(editedskladniki );
    await skladniki.save()
  res.send({
    message: `Składnik ${editedskladniki.name} edytowany pomyślnie`,
  })
})

const getAllPrzepisy = asyncHandler(async (req, res) => {
  // console.log(req.query.limit)
  // let limit = parseInt(req.query.limit) || 10
  // let skip = parseInt(req.query.skip) || 0
  try {
    const przepisy = await Przepisy.aggregate([
      { $unwind: "$skladniki" },
      {
        $lookup: {
          from: "skladniki",
          localField: "skladniki._id",
          foreignField: "_id",
          as: "newField",
        },
      },
      { $unwind: "$newField" },
      {
        $set: {
          skladniki: { $mergeObjects: ["$newField", "$skladniki"] },
        },
      },
      {
        $unwind: "$skladniki",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          category: { $first: "$category" },
          opis: { $first: "$opis" },
          zdjecia: { $first: "$zdjecia" },
          imageName: { $first: "$imageName" },
          karty: { $first: "$karty" },
          skladniki: {
            $push: "$skladniki",
          },
        },
      },
      {
        $unwind: "$skladniki",
      },
      {
        $set: {
          skladniki: {
            total: {
              $multiply: [{ $toDouble: "$skladniki.value" }, "$skladniki.cena"],
            },
            // $multiply: [{ $toInt: "$$skladniki.value" }, "$skladniki.cena"],
          },
        },
      },
      {
        $unwind: "$skladniki",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          category: { $first: "$category" },
          opis: { $first: "$opis" },
          zdjecia: { $first: "$zdjecia" },
          imageName: { $first: "$imageName" },
          karty: { $first: "$karty" },
          skladniki: {
            $push: "$skladniki",
          },
          totalprzepis: {
            $sum: "$skladniki.total",
          },
        },
      },
    ])
    res.send(przepisy)
  } catch (err) {
    return res.status(400).send({ error: "Error fetching data" })
  }
  // res.send(przepisy);
})

const getPrzepisyById = asyncHandler(async (req, res) => {
  const przepisyid = req.body.przepisyid
  const przepisy = await Przepisy.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(przepisyid),
      },
    },
    {
      $lookup: {
        from: "skladniki",
        localField: "skladniki._id",
        foreignField: "_id",
        as: "skladniki",
      },
    },
  ])
  // console.log(przepisyid)
  res.send(przepisy)
})

const addPrzepisy = asyncHandler(async (req, res) => {
  const przepisy = req.body.przepisy
  const newprzepisy = new Przepisy({
    name: przepisy.name,
    category: przepisy.category,
    opis: przepisy.opis,
    karty: przepisy.karty,
    zdjecia: przepisy.zdjecia,
    skladniki: przepisy.skladniki,
  })
  await newprzepisy.save()
  res.send({ message: `Przepis ${przepisy.name} dodany pomyślnie` })
})

const editPrzepisy = asyncHandler(async (req, res) => {
  const editedprzepisy = req.body.editedprzepisy
  const przepisy = await Przepisy.findOne({ _id: editedprzepisy._id })
  ;(przepisy.name = editedprzepisy.name),
    (przepisy.category = editedprzepisy.category),
    (przepisy.opis = editedprzepisy.opis),
    (przepisy.imageName = editedprzepisy.imageName),
    (przepisy.karty = editedprzepisy.karty),
    (przepisy.zdjecia = editedprzepisy.zdjecia),
    (przepisy.skladniki = editedprzepisy.skladniki)
  // console.log(editedprzepisy);
  await przepisy.save()
  res.send({ message: `Przepis ${editedprzepisy.name} edytowany pomyślnie` })
})

const getSkladnikiById = asyncHandler(async (req, res) => {
  const skladnikiid = req.body.skladnikiid
  const skladniki = await Skladniki.findOne({ _id: skladnikiid })
  res.send(skladniki)
})

const getAllProducenci = asyncHandler(async (req, res) => {
  const producenci = await Producenci.find({})
  res.send(producenci)
})

const addProducenci = asyncHandler(async (req, res) => {
  const producenci = req.body.producenci
  // console.log(req.body.producenci)
  const newproducenci = new Producenci({
    name: producenci.name,
  })
  await newproducenci.save()
  res.send({ message: `Producent ${producenci.name} dodany pomyślnie` })
})

const editProducenci = asyncHandler(async (req, res) => {
  const editedproducenci = req.body.editedproducenci
  // console.log(editedproducenci)
  try {
    const producenci = await Producenci.findOne({ _id: editedproducenci._id })
    producenci.name = editedproducenci.name
    await producenci.save()
    res.send({ message: "Producent edytowany pomyślnie" })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
})

const getProducenciById = asyncHandler(async (req, res) => {
  const producenciid = req.body.producenciid
  const producenci = await Producenci.findOne({ _id: producenciid })
  res.send(producenci)
})

// Kontrahenci
const getAllKontrahenci = asyncHandler(async (req, res) => {
  const kontrahenci = await Kontrahenci.find({})
  res.send(kontrahenci)
})

const addKontrahenci = asyncHandler(async (req, res) => {
  const kontrahenci = req.body.kontrahenci

  // Check for duplicate
  const duplicate = await Kontrahenci.findOne({
    shortName: kontrahenci.shortName,
  })
    .lean()
    .exec()

  if (duplicate) {
    return res.status(409).json({ message: "Kontrahent już istnieje w bazie" })
  }

  const newkontrahenci = new Kontrahenci({
    shortName: kontrahenci.shortName,
    name: kontrahenci.name,
    address: kontrahenci.address,
    postCode: kontrahenci.postCode,
    city: kontrahenci.city,
    nip: kontrahenci.nip,
    phoneNumber: kontrahenci.phoneNumber,
    email: kontrahenci.email,
    accountNumber: kontrahenci.accountNumber,
  })
  await newkontrahenci.save()
  res.send({ message: `Kontrahent ${kontrahenci.shortName} dodany pomyślnie` })
})

const editKontrahenci = asyncHandler(async (req, res) => {
  const editedkontrahenci = req.body.editedkontrahenci
  // console.log(editeddania)
  try {
    const kontrahenci = await Kontrahenci.findOne({
      _id: editedkontrahenci._id,
    })
    ;(kontrahenci.shortName = editedkontrahenci.shortName),
      (kontrahenci.phoneNumber = editedkontrahenci.phoneNumber)
    ;(kontrahenci.name = editedkontrahenci.name),
      (kontrahenci.address = editedkontrahenci.address),
      (kontrahenci.postCode = editedkontrahenci.postCode),
      (kontrahenci.city = editedkontrahenci.city)
    kontrahenci.nip = editedkontrahenci.nip
    kontrahenci.email = editedkontrahenci.email
    kontrahenci.accountNumber = editedkontrahenci.accountNumber
    await kontrahenci.save()
    res.send({
      message: `Kontrahent ${kontrahenci.shortName} edytowany pomyślnie`,
    })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
})

const getKontrahenciById = asyncHandler(async (req, res) => {
  const kontrahenciid = req.body.kontrahenciid
  const kontrahenci = await Kontrahenci.findOne({ _id: kontrahenciid })
  res.send(kontrahenci)
})

const getPrzepisyBySkladniki = asyncHandler(async (req, res) => {
  try {
    const { kalkulatorId } = req.body
    const skladniki = await Przepisy.find(
      { skladniki: { $elemMatch: { _id: kalkulatorId } } } // Include only 'nazwa' field, exclude '_id' field
    )
    res.send(skladniki)
  } catch (err) {
    console.log(err)
  }
})

module.exports = {
  getProducts,
  getProductsClient,
  addProduct,
  getProductById,
  editProduct,
  wyliczProduct,
  addSkladniki,
  getAllSkladniki,
  getSkladnikiById,
  editSkladniki,
  getAllPrzepisy,
  getPrzepisyById,
  addPrzepisy,
  editPrzepisy,
  getPrzepisyBySkladniki,
  getAllProducenci,
  addProducenci,
  editProducenci,
  getProducenciById,
  getAllKontrahenci,
  addKontrahenci,
  editKontrahenci,
  getKontrahenciById,
}
