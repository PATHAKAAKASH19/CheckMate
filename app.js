
const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io")
const session = require("express-session");
const mongoStore = require("connect-mongo");
const passport = require("passport");
const path = require("path");
const  mongoose  = require("mongoose");


// routes 
const authRoute = require("./routes/auth.route")
const chessRoute = require("./routes/chess.route")

// server config
const app = express();
const server = createServer(app);
const io = new Server(server)
const port = process.env.PORT || 3000



// database 

mongoose.connect("mongodb://localhost:27017/mychessApp")
.then(() => {
    console.log("mongodb is running")
}).catch((err) => {
   console.log("err :" + err)
})


// template engine config
app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))

// public folder config
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(express.urlencoded({extended: true}))


// express session initialize
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: "chessGameChessGame",
    store:  mongoStore.create({
        mongoUrl: "mongodb://localhost:27017/mychessApp",
        collectionName: "userSession"
    })
}))


// passport initialize
require("./middlewares/auth.middleware")
app.use(passport.initialize())
app.use(passport.session())

let player;
 
app.use((req, res, next) => {

    player = req.user.userName
    next()
})
const connectedUsers = {};

io.on("connection" , (socket) => {
   console.log("user connected")
   console.log(player)
   connectedUsers[player] = socket.id;
    socket.on("move" , (move) => {
      socket.broadcast.emit("move" , move)
    })

 
   

    // Send game request
    socket.on('sendGameRequest', (opponent) => {
        const recipientSocketId = connectedUsers[opponent];
        io.to(recipientSocketId).emit('gameRequest', player);
    });

    // Handle game request response
    socket.on('gameRequestResponse', (player, response, roomId) => {
        const senderSocketId = connectedUsers[player];
        io.to(senderSocketId).emit('gameRequestResponse', response, roomId);
    });


    });
       



global.io = io;


// routes


app.use("/auth" , authRoute)
app.use("/chess" , chessRoute)



server.listen(port , () => {
    console.log("server is running now")
})