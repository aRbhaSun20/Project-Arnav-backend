const mongoose = require("mongoose");

const DIRECTION_ENUMS = ["FRONT", "RIGHT", "LEFT"];

const LocationSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    default: "",
  },
  userId: { type: String, required: true, ref: "User" },
  sourceId: {
    type: String,
    required: true,
    default: 0,
  },

  neightbors: {
    type: [
      {
        destinationId: {
          type: String,
          required: true,
          default: 0,
        },
        direction: {
          type: String,
          required: true,
          enum: DIRECTION_ENUMS,
          default: "FRONT",
        },
      },
    ],
    ref: "Location",
  },
  parentId: {
    type: String,
    required: true,
    ref: "Parent",
  },
});

module.exports = new mongoose.model("Location", LocationSchema);
