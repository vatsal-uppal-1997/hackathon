const postModel = require("../models/schemas/postSchema").postModel;
const commentModel = require("../models/schemas/commentSchema").commentModel;

function sanitizePostCreation(data) {
    if (data.hasOwnProperty("date") &&
        data.hasOwnProperty("title") &&
        data.hasOwnProperty("body"))
        return true;
    return false;
}

function sanitizeCommentCreation(data) {
    if (data.hasOwnProperty("owner") &&
        data.hasOwnProperty("data") &&
        data.hasOwnProperty("body"))
        return true;
    return false;
}

async function createPost(id, role, postData) {
    try {
        if (sanitizePostCreation(postData)) {
            postData.owner = id;
            postData.onModel = role;
            const post = new postModel(postData);
            await post.save();
            return post;
        } else {
            throw new Error("Invalid post format !");
        }
    } catch (err) {
        throw err;
    }
}

async function getPosts() {
    try {
        const posts = await postModel.find({}).populate("owner");
        posts = posts.map((val) => {
            let ownerName = undefined;
            if (val.owner.companyName)
                ownerName = val.owner.companyName;
            else 
                ownerName = val.owner.name;
            let postFormatted = {
                id: val.id,
                owner: ownerName,
                date: val.date,
                title: val.title,
                body: val.body
            };
            return postFormatted;
        });
        return posts;
    } catch (err) {
        throw err;
    }
}

async function editPost(id, data) {
    try {
        if ((data.body || data.title)) {
            let post;
            if (data.body)
                post = await postModel.findByIdAndUpdate(id, {body: data.body}, {new:true});
            else
                post = await postModel.findByIdAndUpdate(id, {title: data.title}, {new:true});
            const postFormatted = {
                id: post.id,
                title: post.title,
                body: post.body
            };
            return postFormatted;
        } else {
            throw new Error("Invalid post update format !");
        }
    } catch (err) {
        throw err;
    }
}

async function getComments(id) {
    try {
        const post = await postModel.findById(id).populate("comments");
        return post.comments;
    } catch(err) {
        throw err;
    }
}

async function postComment(id, commentData) {
    try {
        if (sanitizeCommentCreation(commentData)) {
            const comment = new commentModel(commentData);
            await comment.save();
            await postModel.findByIdAndUpdate(id, {
                "$addToSet": {
                    comments: comment.id
                }
            });
            return comment;
        }
    } catch (err) {
        throw err;
    }
}

const postController = {
    sanitizePostCreation,
    sanitizeCommentCreation,
    createPost,
    getPosts,
    editPost,
    getComments,
    postComment
};

exports.postController = postController;