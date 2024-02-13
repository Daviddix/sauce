const express = require("express")
const { getMoviesThatMatchPrompt, getInfoAboutSpecificMovie, getThrillerForSpecificMovie, getImagesForSpecificMovie, getRelatedMovies } = require("../controllers/MovieController")


movieRouter = express.Router()

movieRouter.post("/", getMoviesThatMatchPrompt)

movieRouter.get("/:movieId", getInfoAboutSpecificMovie)

movieRouter.get("/:movieId/video", getThrillerForSpecificMovie)

movieRouter.get("/:movieId/images", getImagesForSpecificMovie)

movieRouter.get("/:movieId/related", getRelatedMovies)

module.exports = movieRouter