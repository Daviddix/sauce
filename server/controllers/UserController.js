const bcrypt = require("bcryptjs")
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key : process.env.CLOUD_API_KEY,
  api_secret : process.env.CLOUD_API_SECRET
})
const userModel = require("../models/user") 


const { userCreated, loginSuccessful, logoutSuccessful,} = require("../actions/successMessages")

const {duplicateUsername, noBodyDataError, unknownError, userNotFoundInDataBase, wrongPassword, logoutError, imageUploadError} = require("../actions/errorMessages")
const { checkForDuplicateUsername, generateJwtToken } = require("../libs/UserFunctions")
const timeBeforeItExpires = 90000000 * 300
const saltRounds = 10


async function signUserUp(req, res) {
try{
  const {profilePicture, username,password} = req.body
        if(username && profilePicture && password){

            const isDuplicateUsername = await checkForDuplicateUsername(username)

            if (isDuplicateUsername) {
                return res.status(400).json(duplicateUsername)
            }

            const imageBuffer = Buffer.from(profilePicture, "base64")

            cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
              async function (error, result) {
                if (error) {
                  return res.status(400).json(imageUploadError);
                }               

                const hashedPassword = await bcrypt.hash(password, saltRounds)
            
                const userMade = await userModel.create({
                  profilePicture: result.secure_url,
                  username,
                  password : hashedPassword,
                })

                const userToken = await generateJwtToken(userMade._id)

                res.cookie("jwt", userToken, {
                  httpOnly: true,
                  maxAge: timeBeforeItExpires,
                  path : "/",
                  secure: true,
                  sameSite: 'None'
                })

                res.status(201).json(userCreated);
              }
            ).end(imageBuffer)
                        
        }
        else{
            res.status(401).json(noBodyDataError)
        }
    }
    catch(err){
        
        res.status(400).json(unknownError)
    }
}

async function logUserIn(req, res){
    try{
      const {username, password} = req.body
        if(username && password){
            const userInDb = await userModel.findOne({username})
            if(!userInDb){
              return res.status(404).json(userNotFoundInDataBase)
            }
            
            
            const passwordIsCorrect = await bcrypt.compare(password, userInDb.password)
            
            if(!passwordIsCorrect){
                return res.status(401).json(wrongPassword)
            }

            const userToken = await generateJwtToken(userInDb._id)
            res.cookie("jwt", userToken, {
                httpOnly: true,
                maxAge: timeBeforeItExpires,
                path : "/",
                secure: true,
                sameSite: 'None' 
              })
            res.status(200).json(loginSuccessful)
        }
        else{
            res.status(400).json(noBodyDataError)
        }
    }
    catch(e){
      
        res.status(400).json(unknownError)
    }
}

async function getUserDetails(req, res){
  try{
    const id = req.user.userId
    const userInDb = await userModel.findById(id, ["profilePicture", "username"])
    if(!userInDb){
        return res.status(404).json(userNotFoundInDataBase)
    }
    res.status(200).json(userInDb)
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

async function logUserOut(req, res){
    try{
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0), 
        path : "/",
        secure: true,
        sameSite: 'None'
      }).json(logoutSuccessful)
    }
    catch(err){
      res.status(400).json(logoutError)
    }
}

module.exports = {
    signUserUp,
    logUserIn,
    getUserDetails,
    logUserOut
}