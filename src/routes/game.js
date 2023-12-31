const router = require("express").Router();
const gameController = require("../controllers/gameController")
//add game
router.post("/add-game",gameController.addGame)
router.get("/getAllGame",gameController.getGame)
router.get("/getAllGame/:id",gameController.getAnGame)
router.put("/editAnGame/:id",gameController.updateAnGame)
router.delete("/destroyAnGame/:id",gameController.destroyAnGame)
module.exports = router