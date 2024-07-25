const express = require("express")
const { useAuth } = require("../../middlewares/UserMiddlewares")
const { getAllListByUser, createNewListAndAddTvShowToIt, addTvShowToExistingList, getInformationAboutParticularList, deleteTvShowFromList, deleteList} = require("../../controllers/list/TvListController")


tvRouter = express.Router()

tvRouter.get("/", useAuth, getAllListByUser) 

tvRouter.get("/:listId", useAuth, getInformationAboutParticularList)

tvRouter.post("/", useAuth, createNewListAndAddTvShowToIt)

tvRouter.patch("/:listId", useAuth, addTvShowToExistingList)

tvRouter.delete("/:listId/m", useAuth, deleteTvShowFromList)

tvRouter.delete("/:listId/l", useAuth, deleteList)

module.exports = tvRouter