const mongoose = require("mongoose");


const company = new mongoose.Schema({
    companyName: {
        type: String,
        unique: true,
        required: true
    },
    companyEmail: {
        type: String,
        unique: true,
        required: true
    },
    companyPhone: {
        type: Number,
        required: true,
        unique: true
    },
    personalPhone: {
        type: Number,
        required: true,
        unique: true
    },
    companyAddress: {
        type: String,
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

const companyModel = mongoose.model("company", company);

exports.companyModel = companyModel;