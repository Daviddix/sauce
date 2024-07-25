const mongoose = require("mongoose")

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
    }], 

    savedAnimeLists : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : "AnimeLists"
    }],

    savedTvShowsLists : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : "TvShowsLists"
    }]
})

const userModel = mongoose.model("Users", userSchema)

module.exports = userModel