const router = require('express').Router();
const authorController  = require("../controllers/authorController")
//add game
router.post("/add-author",authorController.addAuthor)
router.get("/getAuthor", authorController.getAllAuthor)
router.get("/getAuthor/:id", authorController.getAnAuthor)
router.put("/putAuthor/:id", authorController.putAnAuthor)
router.delete("/deleteAuthor/:id", authorController.deteleAuthor)
module.exports = router 