const joi = require("joi");
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

async function createProfile(profile) {
    try {
        const schema = joi.object().keys({
            email : joi.string().email({minDomainAtoms: 2}).required(),
            name : joi.string().min(3).max(15).required(),
            phone: joi.string().regex(/^[0-9]{10}$/).required(),
            address: joi.string().min(3).required(),
            confirmPassword: joi.string().alphanum().min(3).max(30).required(),
            age: joi.number().max(200).required(),
            password: joi.string().alphanum().min(3).max(30).required()
        });
        const result = joi.validate(profile, schema);

        if (result.error === null) {
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
            const saveUser = user.save();
            const saveAccount = account.save();
            await Promise.all([saveUser, saveAccount]);
            return user.id;
        } else {
            throw new Error(result.error);
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