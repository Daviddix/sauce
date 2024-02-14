const express = require("express")
const { useAuth } = require("../middlewares/UserMiddlewares")
const { getAllListByUser, createNewListAndAddMovieToIt, addMovieToExistingList, getInformationAboutParticularList } = require("../controllers/ListController")


listRouter = express.Router()

listRouter.get("/", useAuth, getAllListByUser)

listRouter.get("/:listId", useAuth, getInformationAboutParticularList)

listRouter.post("/", useAuth, createNewListAndAddMovieToIt)

listRouter.patch("/:listId", useAuth, addMovieToExistingList)

module.exports = listRouter