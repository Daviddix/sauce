const tvShowSchema = require("../tv")
const mongoose = require("mongoose") 

const tvShowsListSchema = new mongoose.Schema({
    listName : {
        type : String,
        required : true
    },

    listCoverImage : {
        type: String,
        required : true
    },

    tvShowsInList : {
        type : [tvShowSchema],
        required : true
    },

    listAuthor : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Users"
    }
})

const animeListModel = mongoose.model("TvShowsLists", tvShowsListSchema)

module.exports = animeListModel