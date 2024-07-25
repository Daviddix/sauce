const animeSchema = require("../anime")
const mongoose = require("mongoose") 

const animeListSchema = new mongoose.Schema({
    listName : {
        type : String,
        required : true
    },

    listCoverImage : {
        type: String,
        required : true
    },

    animeInList : {
        type : [animeSchema],
        required : true
    },

    listAuthor : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Users"
    }
})

const animeListModel = mongoose.model("AnimeLists", animeListSchema)

module.exports = animeListModel