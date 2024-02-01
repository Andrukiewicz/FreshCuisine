const mongoose = require("mongoose")
const weekSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("week", weekSchema)
