const express = require("express")
const { getMoviesThatMatchPrompt, getInfoAboutSpecificMovie, getThrillerForSpecificMovie, getImagesForSpecificMovie } = require("../controllers/MovieController")


movieRouter = express.Router()

movieRouter.post("/", getMoviesThatMatchPrompt)

movieRouter.get("/:movieId", getInfoAboutSpecificMovie)

movieRouter.get("/:movieId/video", getThrillerForSpecificMovie)

movieRouter.get(":movieId/images", getImagesForSpecificMovie)

module.exports = movieRouter