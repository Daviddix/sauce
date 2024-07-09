const express = require("express")
const { getMoviesThatMatchPrompt, getInfoAboutSpecificMovie, getThrillerForSpecificMovie, getImagesForSpecificMovie, getRelatedMovies, getWatchProvidersForSpecificMovie } = require("../controllers/MovieController")


movieRouter = express.Router()

movieRouter.post("/", getMoviesThatMatchPrompt)

movieRouter.get("/:movieId", getInfoAboutSpecificMovie)

movieRouter.get("/:movieId/video", getThrillerForSpecificMovie)

movieRouter.get("/:movieId/images", getImagesForSpecificMovie)

movieRouter.get("/:movieId/related", getRelatedMovies)

movieRouter.get("/:movieId/watch-providers", getWatchProvidersForSpecificMovie)

module.exports = movieRouter