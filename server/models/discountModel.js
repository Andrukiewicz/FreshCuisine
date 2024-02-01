const mongoose = require("mongoose")

const discountSchema = new mongoose.Schema({
  code: { type: String, require: true, unique: true },
  isPercent: { type: Boolean, require: true, default: true },
  amount: { type: Number, required: true },
  isActive: { type: Boolean, require: true, default: true },
})

module.exports = mongoose.model("discount", discountSchema)
