const express = require("express")
const { useAuth } = require("../../middlewares/UserMiddlewares")
const { getAllListByUser, createNewListAndAddMovieToIt, addMovieToExistingList, getInformationAboutParticularList, deleteMovieFromList, deleteList} = require("../../controllers/list/MoviesListController")


movieListRouter = express.Router()

movieListRouter.get("/", useAuth, getAllListByUser) 

movieListRouter.get("/:listId", useAuth, getInformationAboutParticularList)

movieListRouter.post("/", useAuth, createNewListAndAddMovieToIt)

movieListRouter.patch("/:listId", useAuth, addMovieToExistingList)

movieListRouter.delete("/:listId/m", useAuth, deleteMovieFromList)

movieListRouter.delete("/:listId/l", useAuth, deleteList)

module.exports = movieListRouter