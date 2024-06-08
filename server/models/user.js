const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    profilePicture : {
        type : String,
         required : true
        },

    username : {
        type : String,
         required : true, 
         unique : true
        },
    password :  {
        type : String, 
        required : true
    },

    savedLists : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Lists"
    }]
})

const userModel = mongoose.model("Users", userSchema)

module.exports = userModel