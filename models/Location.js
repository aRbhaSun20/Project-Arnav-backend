const { DateTime } = require("luxon");
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
    ref: "Node",
  },
  fileName: {
    type: String,
    default: "",
  },
  neighborIds: {
    type: [
      {
        destinationId: {
          type: String,
          required: true,
          default: 0,
          ref: "Node",
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
  createdAt: {
    type: Date,
    default: () => DateTime.now().toString(),
  },
});

module.exports = new mongoose.model("Location", LocationSchema);
