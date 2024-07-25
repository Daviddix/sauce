const mongoose = require("mongoose")

const animeSchema = new mongoose.Schema({
        animeName: {
            type : String,
            required : true
        },
        matchPercent: {
            type : Number,
            required : true
        }, 
        animeId: {
            type : Number,
            required : true
        },
        animeReleaseDate: {
            type : String,
            required : true
        },
        animeOverview: {
            type : String,
            required : true
        },
        animeRating : {
            type : Number,
            required : true
        },
        animePoster : {
            type : String,
            required : true
        }
})


module.exports = animeSchema