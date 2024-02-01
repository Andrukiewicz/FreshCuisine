const mongoose = require("mongoose")

const skladnikiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  producent: { type: String, required: false },
  kontrahent: { type: String, required: false },
  category: { type: String, required: false },
  cena: { type: Number, required: false },
  tax: { type: Number, required: false },
  invoice: { type: Boolean, required: false },
})

module.exports = mongoose.model("skladniki", skladnikiSchema, "skladniki")
