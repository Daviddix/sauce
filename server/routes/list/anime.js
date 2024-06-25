const express = require("express")
const { useAuth } = require("../../middlewares/UserMiddlewares")
const { getAllListByUser, createNewListAndAddAnimeToIt, addAnimeToExistingList, getInformationAboutParticularList, deleteAnimeFromList, deleteList} = require("../../controllers/list/AnimeListController")


animeListRouter = express.Router()

animeListRouter.get("/", useAuth, getAllListByUser) 

animeListRouter.get("/:listId", useAuth, getInformationAboutParticularList)

animeListRouter.post("/", useAuth, createNewListAndAddAnimeToIt)

animeListRouter.patch("/:listId", useAuth, addAnimeToExistingList)

animeListRouter.delete("/:listId/m", useAuth, deleteAnimeFromList)

animeListRouter.delete("/:listId/l", useAuth, deleteList)

module.exports = animeListRouter