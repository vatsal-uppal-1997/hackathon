const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const account = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel' 
    },
    onModel: {
        type: String,
        required: true,
        enum: ["user", "company"]
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["user", "company"]
    }
});

function hashNSave(account, cb){
    bcrypt.genSalt(10, function(err, salt) {
        if (err)
            return cb(err);
        bcrypt.hash(account.get("password"), salt, function(err, hash){
            if (err)
                return cb(err);
            account.set("password", hash);
            cb(null);
        });
    });
}

account.pre("save", function(next){
    let account = this;
    if (!account.isModified("password"))
        return next();
    hashNSave(account, function(err){
        if (err)
            return next(err);
        next();
    });    
});

account.methods.checkPassword = function (toCheck, cb) {
    const passwordHashed = this.get("password"); 
    bcrypt.compare(toCheck, passwordHashed, function(err, res) {
        if (err)
            return cb(err, false);
        cb(null, res); 
    });
}

account.path("type").validate(function(role) {
    if (type !== "user" && role !== "corporate")
        return false;
    return true;
}, "Invalid role");

const accountModel = mongoose.model("account", account);

exports.accountModel = accountModel;