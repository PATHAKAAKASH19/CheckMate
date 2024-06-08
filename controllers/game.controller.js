const gameData = require("../models/game.model");
const userAuth= require("../models/auth.model")
const uniqueId = require("short-unique-id");

const uid = new uniqueId({length: 8});



async function startChessGame(req, res) {
     
    const gameId = uid.rnd()
    const playerBlack = await userAuth.find({name: req.body.userName})
    const game = await gameData.create({
        gameId : gameId,
        playerWhite: req.user._id,
        playerBlack: playerBlack._id
    })

    socket.on("joinRoom" , (gameId) => {
        
    })
}




async function showAllPlayerInLobby(req, res){
     
    const user = await userAuth.find({gamePlay: false, Online: true });
    res.render("lobby" , {user: user})
}



module.exports = {showAllPlayerInLobby, startChessGame }

