const { unknownError, noBodyDataError, listNotFound, noID, notAuthorizedToView } = require("../../actions/errorMessages")
const animeListModel = require("../../models/list/animeList") 
const { listCreated, listUpdated, movieInListDeletedSuccessfully, ListDeletedSuccessfully } = require("../../actions/successMessages")
const userModel = require("../../models/user")

async function getAllListByUser(req, res){
    try{
        const {userId} = req.user
        const userThatMadeTheList = await userModel.findById(userId).populate("savedAnimeLists")
        const savedAnimeLists = userThatMadeTheList.savedAnimeLists
        res.status(200).json(savedAnimeLists)
    }
    catch(err){ 
        res.status(500).json(unknownError)
    }
}

async function getInformationAboutParticularList(req, res){
    try{
        const {listId} = req.params
        const {userId} = req.user
        const particularList = await animeListModel.findById(listId)
        if(!particularList.listAuthor == userId){
            return res.status(404).json(notAuthorizedToView)
        }
        
        res.status(200).json(particularList)
    }
    catch(err){
        res.status(500).json(unknownError) 
    }
}

async function createNewListAndAddAnimeToIt(req, res){
    try{
        const {userId} = req.user
        const {listName, listCoverImage, animeInList, listAuthor} = req.body 
        if(req.body == {}){
            return res.status(400).json(noBodyDataError)
        }
        const listMade = await animeListModel.create({
            listName,
            listCoverImage,
            animeInList,
            listAuthor
        })
        const userThatMadeTheList = await userModel.findById(userId)
        userThatMadeTheList.savedAnimeLists.push(listMade._id)
        await userThatMadeTheList.save()
        res.status(201).json(listCreated)
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

async function addAnimeToExistingList(req, res){
    try{
        const {animeData} = req.body 
        const {listId} = req.params
        const particularList = await animeListModel.findById(listId)
        particularList.animeInList.push(animeData)
        await particularList.save()
        res.status(200).json(listUpdated)
    }
    catch(err){ 
        
        res.status(500).json(unknownError)
    } 
} 

async function deleteAnimeFromList(req, res){
    try{
        const {listId} = req.params  
        const animeId = req.body.animeId 
        if(listId == "" || animeId == ""){
            return res.status(400).json(noID) 
        }
        const particularList = await animeListModel.findById(listId)
        if(!particularList){
            return res.status(404).json(listNotFound) 
        }
        const newAnime = particularList.animeInList.filter((anime)=> anime.animeId !== animeId) 
        particularList.animeInList = newAnime
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
        await animeListModel.findByIdAndDelete(listId)
        res.status(200).json(ListDeletedSuccessfully) 
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

module.exports = {
    getAllListByUser,
    createNewListAndAddAnimeToIt,
    addAnimeToExistingList,
    getInformationAboutParticularList,
    deleteAnimeFromList,
    deleteList
}