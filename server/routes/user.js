const express = require("express")
const { signUserUp, logUserIn, getUserDetails } = require("../controllers/UserController")
const { useAuth } = require("../middlewares/UserMiddlewares")
const userModel = require("../models/user")

userRouter = express.Router()

userRouter.post("/signup", signUserUp)

userRouter.post("/login", logUserIn) 

userRouter.get("/info", useAuth , getUserDetails)

// userRouter.get("/logout", async(req,res)=>{
//     try{
//         res.cookie("jwt", "", {
//             httpOnly: true,
//             expires: new Date(0),
//             path : "/",
//             secure: true,
//             sameSite: 'None'
//           }).json(logoutSuccessful)
//     }
//     catch(err){
//         res.status(400).json(logoutError)
//     }
// })

module.exports = userRouter