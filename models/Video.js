const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },

  user_id: {
    type: String,
    ref: "User",
    required: true,
  },
  video_id: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Video", VideoSchema);
