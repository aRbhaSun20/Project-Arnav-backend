const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema({
  parentName: {
    type: String,
    required: true,
  },
  parentImageUrl: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: () => DateTime.now().toString(),
  },
  userId: { type: String, required: true, ref: "User" },
});

module.exports = new mongoose.model("Parent", ParentSchema);
