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

userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err){
                return next(err)
            }else{
                user.password = hash
                next()
            }
        })
    })    
})

const userModel = mongoose.model("Users", userSchema)

module.exports = userModel