const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

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
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})


module.exports = new mongoose.model("Video", VideoSchema);