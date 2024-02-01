const mongoose = require("mongoose")

const postcodeSchema = new mongoose.Schema({
  postcode: { type: String, required: true, lowercase: true, unique: true },
  deliveryFee: { type: Boolean, required: true },
})

module.exports = mongoose.model("postcode", postcodeSchema)
