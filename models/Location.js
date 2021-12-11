const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    coordinates: {
        latitude: {
            type: SchemaTypes.Double,
            required: true,
        },
        longitude: {
            type: SchemaTypes.Double,
            required: true,

        },
    },
})


module.exports = new mongoose.model("Location", LocationSchema);