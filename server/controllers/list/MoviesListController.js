const { unknownError, noBodyDataError, listNotFound, noID, notAuthorizedToView } = require("../../actions/errorMessages")
const listModel = require("../../models/list/movieList") 
const { listCreated, listUpdated, movieInListDeletedSuccessfully, ListDeletedSuccessfully } = require("../../actions/successMessages")
const userModel = require("../../models/user")

async function getAllListByUser(req, res){
    try{
        const {userId} = req.user
        const userThatMadeTheLists = await userModel.findById(userId).populate("savedLists")
        const savedLists = userThatMadeTheLists.savedLists
        res.status(200).json(savedLists)
    }
    catch(err){ 
        res.status(500).json(unknownError)
    }
}

async function getInformationAboutParticularList(req, res){
    try{
        const {listId} = req.params
        const {userId} = req.user
        const particularList = await listModel.findById(listId)
        if(!particularList.listAuthor == userId){
            return res.status(404).json(notAuthorizedToView)
        }
        res.status(200).json(particularList)
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

async function createNewListAndAddMovieToIt(req, res){
    try{
        const {userId} = req.user
        const {listName, listCoverImage, moviesInList, listAuthor} = req.body 
        if(req.body == {}){
            return res.status(400).json(noBodyDataError)
        }
        const listMade = await listModel.create({
            listName,
            listCoverImage,
            moviesInList,
            listAuthor
        })
        const userThatMadeTheList = await userModel.findById(userId)
        userThatMadeTheList.savedLists.push(listMade._id)
        await userThatMadeTheList.save()
        res.status(201).json(listCreated)
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

async function addMovieToExistingList(req, res){
    try{
        const {movieData} = req.body 
        const {listId} = req.params
        const particularList = await listModel.findById(listId)
        particularList.moviesInList.push(movieData)
        await particularList.save()
        res.status(200).json(listUpdated)
    }
    catch(err){ 
        
        res.status(500).json(unknownError)
    } 
} 

async function deleteMovieFromList(req, res){
    try{
        const {listId} = req.params  
        const movieId = req.body.movieId 
        if(listId == "" || movieId == ""){
            return res.status(400).json(noID) 
        }
        const particularList = await listModel.findById(listId)
        if(!particularList){
            return res.status(404).json(listNotFound) 
        }
        const newMovies = particularList.moviesInList.filter((movie)=> movie.movieId !== movieId) 
        particularList.moviesInList = newMovies
        await particularList.save()
        res.status(200).json(movieInListDeletedSuccessfully) 
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

async function deleteList(req, res){
    try{
        const {listId} = req.params 
        if(listId == ""){
            return res.status(400).json(noID) 
        }
        await listModel.findByIdAndDelete(listId)
        res.status(200).json(ListDeletedSuccessfully) 
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

module.exports = {
    getAllListByUser,
    createNewListAndAddMovieToIt,
    addMovieToExistingList,
    getInformationAboutParticularList,
    deleteMovieFromList,
    deleteList
}