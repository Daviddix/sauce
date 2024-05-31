const express = require("express")
const { signUserUp, logUserIn, getUserDetails, logUserOut } = require("../controllers/UserController")
const { useAuth } = require("../middlewares/UserMiddlewares")

userRouter = express.Router()

userRouter.post("/signup", signUserUp)

userRouter.post("/login", logUserIn) 

userRouter.get("/info", useAuth , getUserDetails)

userRouter.get("/logout", logUserOut)

module.exports = userRouter