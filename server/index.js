//libraries
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI
const cookieParser = require("cookie-parser") 

//routers
const userRouter = require("./routes/user")
const movieRouter = require("./routes/movies")
const listRouter = require("./routes/list")


//server configs
const whitelist = ["http://localhost:5173", "https://sauce-beta.vercel.app/"]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials : true 
}

//middlewares
app.use(cors(corsOptions))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(cookieParser())


//routes
app.use("/app/user", userRouter)
app.use("/app/movie", movieRouter)
app.use("/app/list", listRouter) 


//MongoDB connection
mongoose.connect(MONGO_URI) 
.then(()=>{
    app.listen(PORT, () => {
    console.log('App listening on port 3000!') 
}) 
})
.catch((err)=>{ 
    console.log("an error ocurred", err)
})