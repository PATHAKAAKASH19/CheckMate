const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({

    gameId: {
        type: String,
        required:true
    },
    
    playerWhite: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"userAuth",
        required:true
    },

    playerBlack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userAuth",
        required: true
    },

    boardState: {
        type: [String],
        default: [],
        required: true
    },

    
}, {timestamps: true})

const gameModel = mongoose.model("gameData" , gameSchema )

module.exports = gameModel

