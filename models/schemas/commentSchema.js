const mongoose = require("mongoose");


const comment = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel' 
    },
    date: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

const commentModel = mongoose.model("comment", comment);

exports.commentModel = commentModel;