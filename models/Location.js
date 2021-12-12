const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true,
    unique: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  userId: { type: String, required: true },
});

module.exports = new mongoose.model("Location", LocationSchema);
