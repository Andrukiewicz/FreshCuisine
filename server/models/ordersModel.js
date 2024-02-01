const mongoose = require("mongoose")

const ordersSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    userid: { type: String },
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    orderItems: [],
    shippingAddress: { type: Object },
    deliveryInfo: { type: String, required: false },
    deliveryTime: { type: String, required: false, default: "1200-2200" },
    deliveryDay: { type: Date, required: true },
    orderAmount: { type: Number, required: true },
    isSent: { type: Boolean, required: true, default: false },
    paid: { type: Boolean, required: true, default: false },
    paymentId: { type: String },
    sentDate: { type: Date, required: false },
    deliveryFee: { type: Boolean },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("orders", ordersSchema)
