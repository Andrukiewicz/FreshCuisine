const mongoose = require("mongoose")

const weekSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  name: { type: String, required: true },
})

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  description2: { type: String, required: false },
  description3: { type: String, require: false },
  number: { type: String, require: true },
  priority: { type: Number, required: true },
  week: [weekSchema],
})

module.exports = mongoose.model("products", productSchema, "products")
