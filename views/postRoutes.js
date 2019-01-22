const express = require("express");
const router = express.Router();
const postModel = require("../controllers/postController").postController;

/**
 * posts
 *  comments
*/

router.get("/", async (req, res) => {
    try {
        const posts = await postModel.getPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const post = await postModel.createPost(req.user.id, req.user.role, req.body);
        res.json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/comments", async (req, res) => {
    try {
        const comments = await postModel.getComments(req.body.id);
        res.json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/comments", async (req, res) => {
    try {
        const comments = await postModel.createPost(req.user.id, req.user.role, req.body);
        res.json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

exports.postRoutes = router;

