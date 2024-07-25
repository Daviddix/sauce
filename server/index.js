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
const animeRouter = require("./routes/anime")
const tvRouter = require("./routes/tv")

//list routers
const movieListRouter = require("./routes/list/movies")
const animeListRouter = require("./routes/list/anime") 
const tvShowListRouter = require("./routes/list/tv")

//server configs
const whitelist = ["https://use-sauce.vercel.app", "https://sauce-beta.vercel.app/", "http://localhost:5173"]
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
app.use("/app/anime", animeRouter)
app.use("/app/tv", tvRouter)

app.use("/app/list/movies", movieListRouter) 
app.use("/app/list/anime", animeListRouter) 
app.use("/app/list/tv", tvShowListRouter) 


//MongoDB connection
mongoose.connect(MONGO_URI) 
.then(()=>{
    app.listen(PORT, () => {
     
}) 
})
.catch((err)=>{ 
    
})