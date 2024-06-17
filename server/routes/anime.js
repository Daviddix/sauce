const express = require("express")
const { getAnimeThatMatchPrompt, getInfoAboutSpecificAnime, getThrillerForSpecificAnime, getImagesForSpecificAnime, getRelatedAnime } = require("../controllers/AnimeController")


animeRouter = express.Router()

animeRouter.post("/", getAnimeThatMatchPrompt)

animeRouter.get("/:animeId", getInfoAboutSpecificAnime)

animeRouter.get("/:animeId/video", getThrillerForSpecificAnime)

animeRouter.get("/:animeId/images", getImagesForSpecificAnime)

animeRouter.get("/:animeId/related", getRelatedAnime)

module.exports = animeRouter