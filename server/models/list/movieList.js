const movieSchema = require("../movie")
const mongoose = require("mongoose") 

const listSchema = new mongoose.Schema({
    listName : {
        type : String,
        required : true
    },

    listCoverImage : {
        type: String,
        required : true
    },

    moviesInList : {
        type : [movieSchema],
        required : true
    },

    listAuthor : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Users"
    }
})

const listModel = mongoose.model("Lists", listSchema)

module.exports = listModel