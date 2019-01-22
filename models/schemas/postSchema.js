const mongoose = require("mongoose");


const post = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel' 
    },
    onModel: {
        type: String,
        required: true,
        enum: ["user", "company"]
    },
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    comments: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }],
        required: true,
        default: []
    }
});

const postModel = mongoose.model("post", post);

exports.postModel = postModel;