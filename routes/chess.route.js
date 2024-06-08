const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../controllers/auth.controller")
const { showAllPlayerInLobby} = require("../controllers/game.controller")




router.get("/lobby" , isAuthenticated, showAllPlayerInLobby)

router.get("/lobby/:room" , isAuthenticated , (req, res) => {
    res.render("index")
})




module.exports = router;