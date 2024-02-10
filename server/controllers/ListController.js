const { unknownError, noBodyDataError } = require("../actions/errorMessages")
const listModel = require("../models/list")
const { listCreated, listUpdated } = require("../actions/successMessages")

async function getAllListByUser(req, res){
    try{
        const {userId} = req.user
        const listsByUser = await listModel.find({listAuthor : userId})
        res.status(200).json(listsByUser)
    }
    catch(err){
        res.status(500).json(unknownError)
        console.log(err)
    }
}

async function createNewListAndAddMovieToIt(req, res){
    try{
        const {listName, listCoverImage, moviesInList, listAuthor} = req.body
        if(req.body == {}){
            return res.status(500).json(noBodyDataError)
        }
        const listMade = await listModel.create({
            listName,
            listCoverImage,
            moviesInList,
            listAuthor
        })
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

module.exports = {
    getAllListByUser,
    createNewListAndAddMovieToIt,
    addMovieToExistingList
}