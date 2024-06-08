const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true

    },

    hash: {
        type: String,
        required: true

    },

    salt: {
      type:String,
      required: true
    },

    gamePlay: {
      type: Boolean,
      default: false
    },

    Online: {
      type: Boolean,
      default: false,
      required: true
      
  }
  
} , {timestamps: true});


const authModel = mongoose.model("userAuth" , authSchema);

module.exports = authModel;
