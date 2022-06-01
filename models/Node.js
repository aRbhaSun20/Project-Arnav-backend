const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: () => DateTime.now().toString(),
  },
  userId: { type: String, required: true, ref: "User" },
  // parentId: {
  //   type: String,
  //   required: true,
  //   ref: "Parent",
  // },
});

module.exports = new mongoose.model("Node", NodeSchema);
