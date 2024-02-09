const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/user")
const movieRouter = require("./routes/movies")

const whitelist = ["http://localhost:5173", "https://deliciouso.netlify.app/", "https://deliciouso.netlify.app"]
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

app.use(cors(corsOptions))

//middlewares
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(cookieParser())


//routes
app.use("/app/user", userRouter)
app.use("/app/movie", movieRouter)



//MongoDB connection
mongoose.connect(MONGO_URI)
.then(()=>{
    app.listen(PORT, () => {
    console.log('App listening on port 3000!');
}) 
})
.catch((err)=>{ 
    console.log("an error ocurred", err)
})