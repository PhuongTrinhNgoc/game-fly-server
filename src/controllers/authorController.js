const {Author,Game} = require("../../src/model/model")

const authorController = {
    addAuthor : async (req,res)=>{
        try {
            const newAuthor = new Author(req.body);
            const saveAuthor = await newAuthor.save();
            res.status(200).json(saveAuthor);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    getAllAuthor : async (req,res)=>{
        try {
            const authors = await Author.find();
            res.status(200).json(authors)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    getAnAuthor : async (req,res)=>{
        try {
            const author = await Author.findById(req.params.id).populate("games")
            res.status(200).json(author)
        } catch (err) {
            res.status(500).json(err)
            
        }
    }
}
module.exports = authorController;