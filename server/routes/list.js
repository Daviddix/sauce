const express = require("express")
const { useAuth } = require("../middlewares/UserMiddlewares")
const { getAllListByUser, createNewListAndAddMovieToIt, addMovieToExistingList, getInformationAboutParticularList, deleteMovieFromList, deleteList} = require("../controllers/ListController")


listRouter = express.Router()

listRouter.get("/", useAuth, getAllListByUser) 

listRouter.get("/:listId", useAuth, getInformationAboutParticularList)

listRouter.post("/", useAuth, createNewListAndAddMovieToIt)

listRouter.patch("/:listId", useAuth, addMovieToExistingList)

listRouter.delete("/:listId/m", useAuth, deleteMovieFromList)

listRouter.delete("/:listId/l", useAuth, deleteList)

module.exports = listRouter