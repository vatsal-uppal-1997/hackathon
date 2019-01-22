const express = require("express");
const userController = require("../controllers/userController").userController;
const router = express.Router();

/**
 *  User
 *      profile
 *          email
 *          name
 *          phone
 *          address 
 *          password
 *      posts
 *          id-1
 *          id-2
 *          id-3  
 */

 router.post("/", async (req, res) => {
    try {
        await userController.createProfile(req.body);
        res.status(200).json({});
    } catch (err) {
        res.status(500).json(err);
    }
 });

 router.get("/profile", async (req, res) => {
     try {
        const profile = await userController.getProfile(req.user.id);
        res.json(profile);
     } catch (err) {
         res.status(500).json(err);
     }
 });

 router.post("/profile", async (req, res) => {
    try {
        const profile = await userController.updateProfile(req.user.id, req.body);
        res.json(profile);
    } catch(err) {
        res.status(500).json(err);
    }
 });

router.get("/posts", async (req, res) => {
    try {
        const posts = await userController.getPosts(req.user.id);
        res.json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
})

exports.userRoutes = router;