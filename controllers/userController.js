const userModel = require("../models/schemas/userSchema").userModel;
const accountModel = require("../models/schemas/accountSchema").accountModel;

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

function sanitizeInput(data) {
    if (data.hasOwnProperty("email") || 
        data.hasOwnProperty("name") ||
        data.hasOwnProperty("phone") ||
        data.hasOwnProperty("age") ||
        data.hasOwnProperty("address")) 
            return true;
    return false;
}
function sanitizeProfileCreation(data) {
    if (data.hasOwnProperty("email") && 
        data.hasOwnProperty("name") &&
        data.hasOwnProperty("phone") &&
        data.hasOwnProperty("address") &&
        data.hasOwnProperty("confirmPassword") &&
        data.hasOwnProperty("password"))
        if (data.confirmPassword === data.password)
            return false;
        else 
            return true;
    return false;
}

async function createProfile(profile) {
    try {
        if (sanitizeProfileCreation(profile)) {
            const user = new userModel({
                email: profile.email,
                name: profile.name,
                phone: profile.phone,
                address: profile.address,
                age: profile.age
            });
            const account = new accountModel({
                user: user.id,
                onModel: "user",
                password: profile.password,
                type: "user"
            });
            await user.save();
            await account.save();
        } else {
            throw new Error("Wrong profile creation format !");
        }
    } catch (err) {
        throw err;
    }
}

async function getProfile(id) {
    try {
        const user = await userModel.findById(id);
        const profile = {
            email: user.profile,
            name: user.name,
            phone: user.phone,
            address: user.address,
            age: user.age
        };
        return profile;
    } catch (err) {
        throw err;
    }
}

async function updateProfile(id, update) {
    try {
        if (sanitizeInput(update)) {
            await userModel.findByIdAndUpdate(id, update);
            return await getProfile(id);
        } else {
            throw new Error("Wrong update format !");
        }
    } catch (err) {
        throw err;
    }
}

async function getPosts(id) {
    try {
        const user = await userModel.findById(id).populate("posts");
        return user.posts;        
    } catch (err) {
        throw err;
    }
}

const userController = {
    sanitizeInput,
    sanitizeProfileCreation,
    createProfile,
    getProfile,
    updateProfile,
    getPosts
}

exports.userController = userController;