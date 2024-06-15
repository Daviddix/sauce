const express = require("express")


animeRouter = express.Router()

animeRouter.post("/", getMoviesThatMatchPrompt)

animeRouter.get("/:animeId", getInfoAboutSpecificMovie)

animeRouter.get("/:animeId/video", getThrillerForSpecificMovie)

animeRouter.get("/:animeId/images", getImagesForSpecificMovie)

animeRouter.get("/:animeId/related", getRelatedMovies)

module.exports = animeRouter