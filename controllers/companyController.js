const companyModel = require("../models/schemas/companySchema").companyModel;
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
    if (data.hasOwnProperty("companyEmail") || 
        data.hasOwnProperty("companyName") ||
        data.hasOwnProperty("companyPhone") ||
        data.hasOwnProperty("personalPhone") ||
        data.hasOwnProperty("companyAddress")) 
            return true;
    return false;
}
function sanitizeProfileCreation(data) {
    if (data.hasOwnProperty("companyEmail") && 
        data.hasOwnProperty("companyName") &&
        data.hasOwnProperty("companyPhone") &&
        data.hasOwnProperty("personalPhone") &&
        data.hasOwnProperty("companyAddress") &&
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
            const company = new companyModel({
                email: profile.email,
                name: profile.name,
                phone: profile.phone,
                address: profile.address,
                age: profile.age
            });
            const account = new accountModel({
                user: company.id,
                onModel: "company",
                password: profile.password,
                type: "company"
            });
            await company.save();
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
        const company = await companyModel.findById(id);
        const profile = {
            companyEmail: company.companyEmail,
            companyName: company.companyName,
            companyPhone: company.companyPhone,
            personalPhone: company.personalPhone,
            companyAddress: company.address,
        };
        return profile;
    } catch (err) {
        throw err;
    }
}

async function updateProfile(id, update) {
    try {
        if (sanitizeInput(update)) {
            await companyModel.findByIdAndUpdate(id, update);
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
        const company = await companyModel.findById(id).populate("posts");
        return company.posts;        
    } catch (err) {
        throw err;
    }
}

const companyController = {
    sanitizeInput,
    sanitizeProfileCreation,
    createProfile,
    getProfile,
    updateProfile,
    getPosts
}

exports.companyController = companyController;