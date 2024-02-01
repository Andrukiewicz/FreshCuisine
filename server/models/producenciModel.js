const mongoose = require("mongoose");

const producenciSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("producenci", producenciSchema, "producenci");
