const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
        movieName: {
            type : String,
            required : true
        },
        matchPercent: {
            type : Number,
            required : true
        },
        movieId: {
            type : Number,
            required : true
        },
        movieReleaseDate: {
            type : String,
            required : true
        },
        movieOverview: {
            type : String,
            required : true
        },
        movieRating : {
            type : Number,
            required : true
        },
        moviePoster : {
            type : String,
            required : true
        }
})


module.exports = movieSchema