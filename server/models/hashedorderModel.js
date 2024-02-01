const mongoose = require("mongoose")

const hashedOrderSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true },
    metadata: { type: String, required: true },
    deliveryFee: { type: Boolean },
    createdAt: { type: Date },
    expiresAt: { type: Date },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("hashedorder", hashedOrderSchema)
