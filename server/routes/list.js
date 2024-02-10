const express = require("express")
const { useAuth } = require("../middlewares/UserMiddlewares")
const { getAllListByUser, createNewListAndAddMovieToIt, addMovieToExistingList } = require("../controllers/ListController")


listRouter = express.Router()

listRouter.get("/", useAuth, getAllListByUser)

listRouter.post("/", useAuth, createNewListAndAddMovieToIt)

listRouter.post("/:listId", addMovieToExistingList)

module.exports = listRouter