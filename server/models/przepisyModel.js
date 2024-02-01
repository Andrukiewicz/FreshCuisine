const mongoose = require("mongoose");

const daniaSkladnikiSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  value: { type: Number, required: false },
  jednostka: { type: String, required: false },
});

const przepisySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  opis: { type: String, required: false },
  karty: { type: Boolean, required: false },
  imageName: { type: String, required: false },
  zdjecia: { type: Boolean, required: false },
  image: { type: String, required: false },
  skladniki: [daniaSkladnikiSchema],
});

module.exports = mongoose.model("przepisy", przepisySchema, "przepisy");
