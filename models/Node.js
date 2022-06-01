const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
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
  // parentId: {
  //   type: String,
  //   required: true,
  //   ref: "Parent",
  // },
});

module.exports = new mongoose.model("Node", LocationSchema);
