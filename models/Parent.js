const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  userId: { type: String, required: true, ref: "User" },
  childrenId: {
    type: [String],
    ref: "Location",
  },
});

module.exports = new mongoose.model("Parent", ParentSchema);
