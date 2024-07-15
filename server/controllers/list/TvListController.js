const { unknownError, noBodyDataError, listNotFound, noID, notAuthorizedToView } = require("../../actions/errorMessages")
const tvShowsListModel = require("../../models/list/tvList") 
const { listCreated, listUpdated, movieInListDeletedSuccessfully, ListDeletedSuccessfully } = require("../../actions/successMessages")
const userModel = require("../../models/user")

async function getAllListByUser(req, res){
    try{
        const {userId} = req.user
        const userThatMadeTheList = await userModel.findById(userId).populate("savedTvShowsLists")
        const user = await userModel.findById(userId)
        const savedTvShowsList = userThatMadeTheList.savedTvShowsLists
        res.status(200).json(savedTvShowsList)
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

async function getInformationAboutParticularList(req, res){
    try{
        const {listId} = req.params
        const {userId} = req.user
        const particularList = await tvShowsListModel.findById(listId)
        if(!particularList.listAuthor == userId){
            return res.status(404).json(notAuthorizedToView)
        }
        res.status(200).json(particularList)
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

async function createNewListAndAddTvShowToIt(req, res){
    try{
        const {userId} = req.user
        const {listName, listCoverImage, tvShowsInList, listAuthor} = req.body 
        if(req.body == {}){
            return res.status(400).json(noBodyDataError)
        }
        const listMade = await tvShowsListModel.create({
            listName,
            listCoverImage,
            tvShowsInList,
            listAuthor
        })
        const userThatMadeTheList = await userModel.findById(userId)
        userThatMadeTheList.savedTvShowsLists.push(listMade._id)
        await userThatMadeTheList.save()
        res.status(201).json(listCreated)
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

async function addTvShowToExistingList(req, res){
    try{
        const {tvShowData} = req.body 
        const {listId} = req.params
        const particularList = await tvShowsListModel.findById(listId)
        particularList.tvShowsInList.push(tvShowData)
        await particularList.save()
        res.status(200).json(listUpdated)
    }
    catch(err){ 
        
        res.status(500).json(unknownError)
    } 
} 

async function deleteTvShowFromList(req, res){
    try{
        const {listId} = req.params  
        const {tvShowId} = req.body 
        if(listId == "" || tvShowId == ""){
            return res.status(400).json(noID) 
        }
        const particularList = await tvShowsListModel.findById(listId)
        if(!particularList){
            return res.status(404).json(listNotFound) 
        }
        const newTvShows = particularList.tvShowsInList.filter((tvShow)=> tvShow.tvShowId !== tvShowId) 
        particularList.tvShowsInList = newTvShows
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
        await tvShowsListModel.findByIdAndDelete(listId)
        res.status(200).json(ListDeletedSuccessfully) 
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

module.exports = {
    getAllListByUser,
    createNewListAndAddTvShowToIt,
    addTvShowToExistingList,
    getInformationAboutParticularList,
    deleteTvShowFromList,
    deleteList
}