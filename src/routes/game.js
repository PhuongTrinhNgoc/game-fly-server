const router = require("express").Router();
const gameController = require("../controllers/gameController")
//add game
router.post("/add-game",gameController.addGame)
router.get("/getAllGame",gameController.getGame)
router.get("/getAllGame/:id",gameController.getAnGame)
module.exports = router