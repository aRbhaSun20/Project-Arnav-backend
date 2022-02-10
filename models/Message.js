const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  senderUserId: {
    type: String,
    required: true,
  },
  receiverUserId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: () => DateTime.now().toString(),
  },
});

module.exports = new mongoose.model("Messages", messageSchema);
