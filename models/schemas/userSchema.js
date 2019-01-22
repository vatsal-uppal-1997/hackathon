const mongoose = require("mongoose");


const user = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    posts: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }],
        required: true,
        default: []
    }
});

const userModel = mongoose.model("user", user);

exports.userModel = userModel;