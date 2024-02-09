const listSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    coverImage : {
        type: String,
        required : true
    },

    moviesInList : {
        type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
    },

    listAuthor : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Users"
    }
})

const listModel = mongoose.model("Lists", listSchema)

module.exports = listModel