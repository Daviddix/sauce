const express = require("express")
const { getTvShowsThatMatchPrompt, getInfoAboutSpecificTvShow, getThrillerForSpecificTvShow, getImagesForSpecificTvShow, getRelatedTvShows } = require("../controllers/TvController")


tvRouter = express.Router()

tvRouter.post("/", getTvShowsThatMatchPrompt) 

tvRouter.get("/:tvShowId", getInfoAboutSpecificTvShow)

tvRouter.get("/:tvShowId/video", getThrillerForSpecificTvShow)

tvRouter.get("/:tvShowId/images", getImagesForSpecificTvShow)

tvRouter.get("/:tvShowId/related", getRelatedTvShows)

module.exports = tvRouter