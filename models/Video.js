const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  videoUrl: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  sourceId: {
    type: String,
    ref: "Location",
    required: true,
  },
  destinationId: {
    type: String,
    ref: "Location",
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => DateTime.now().toString(),
  },
});

module.exports = new mongoose.model("Video", VideoSchema);
