const {Author,Game} = require("../../src/model/model")

const gameController = {
    addGame : async(req,res)=>{
        try {
            const game = new Game(req.body)
            const saveGame = await game.save()
            if(req.body.publisher){
                // const author = Author.find({_id:res.body.author})
                const author = Author.findById(req.body.publisher)
              await  author.updateOne({$push : {games:saveGame._id}})
            }
            res.status(200).json(saveGame)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    getGame : async(req,res)=>{
        try {
                const games =  await Game.find();
                res.status(200).json(games)
            } catch (err) {
            res.status(500).json(err)
        }
    },
    getAnGame : async (req,res)=>{
        try {
                const game = await Game.findById(req.params.id).populate("publisher")
                res.status(200).json(game)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
module.exports = gameController