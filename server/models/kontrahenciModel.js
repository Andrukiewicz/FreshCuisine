const mongoose = require("mongoose")

const kontrahenciSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  phoneNumber: { type: Number, required: false },
  address: { type: String, required: false },
  postCode: { type: String, required: false },
  city: { type: String, required: false },
  nip: { type: Number, required: false },
  email: { type: String, required: false },
  accountNumber: { type: String, required: false },
})

module.exports = mongoose.model("kontrahenci", kontrahenciSchema, "kontrahenci")
