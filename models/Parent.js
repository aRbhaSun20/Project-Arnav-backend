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
  userId: { type: String, required: true, ref: "User" },
});

module.exports = new mongoose.model("Parent", ParentSchema);
