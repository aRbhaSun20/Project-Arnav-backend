const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: { type: Number, default: 0 },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => DateTime.now().toString(),
    },
    location: {
        type: [String],
        required: true,
    },
    alerts: {
        type: [String],
    },
});

userSchema.statics.login = async function(email) {
    const user = await this.findOne({ email });
    try {
        return user;
    } catch (e) {
        console.log(e);
    }
};

module.exports = new mongoose.model("User", userSchema);