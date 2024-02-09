const userModel = require("../models/user")
const JWT_SECRET = process.env.JWT_SECRET
const timeBeforeItExpires = 500000000
const jwt = require("jsonwebtoken")


 function generateJwtToken(userId){
    return jwt.sign({userId}, JWT_SECRET, {expiresIn : timeBeforeItExpires})
}

 async function checkForDuplicateUsername(username){
    const existingUser = await userModel.findOne({ username });
    return !!existingUser;
}

 async function checkForDuplicateEmail(email){
    const existingAddress = await userModel.findOne({ email });
    return !!existingAddress;
}

module.exports = {
    generateJwtToken,
    checkForDuplicateUsername,
    checkForDuplicateEmail
}