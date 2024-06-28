const mongoose = require("mongoose")

const tvShowSchema = new mongoose.Schema({
        tvShowName: {
            type : String,
            required : true
        },
        matchPercent: {
            type : Number,
            required : true
        }, 
        tvShowId: {
            type : Number,
            required : true
        },
        tvShowReleaseDate: {
            type : String,
            required : true
        },
        tvShowOverview: {
            type : String,
            required : true
        },
        tvShowRating : {
            type : Number,
            required : true
        },
        tvShowPoster : {
            type : String,
            required : true
        }
})


module.exports = tvShowSchema