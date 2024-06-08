
const playbtns = document.querySelectorAll("#button")
const opponents = document.querySelectorAll(".playerName")

var board 
var game
var socket = io()



  // Set username when connected
  



// Listen for game requests
socket.on('gameRequest', (player) => {
    const response = confirm(`${player} has sent you a game request. Do you accept?`);
    if(response){
        const roomId = Math.floor(Math.random() * 1000) + 1
        const currentPath = window.location.pathname;
        
        socket.emit('gameRequestResponse', player, response, roomId);

        window.location.href = currentPath + `/${roomId}`;
       
    }
   
});

// Listen for game request response
socket.on('gameRequestResponse', (response , roomId) => {
    if (response) {
        alert('Your game request was accepted!');
        
        const currentPath = window.location.pathname
        window.location.href = currentPath + `/${roomId}`;

        socket.emit('joinRoom', roomId);

       
    } else {
        alert('Your game request was declined.');
        // Handle declined request
    }
});

// Function to send a game request

playbtns.forEach((playbtn) => {

    playbtn.addEventListener("click" ,() => {
            const opponent = playbtn.previousElementSibling.textContent
            console.log(opponent)
            socket.emit('sendGameRequest', opponent);
      
         
     })
})



window.onload = () => {
    startGame();
}



function startGame() {

    const config = {
        draggable: true,
        position: 'start',
        orientation: "white",
        onDrop: onDrop,
     
        pieceTheme: '/img/chesspieces/wikipedia/{piece}.png'
    }

    board = new Chessboard("myBoard" , config)
    game = new Chess();
}



function onDrop(source, target) {
   
    const move = game.move({from: source, to: target})
     if(move === null) return 'snapback';
    else socket.emit("move" , move)
}

socket.on("move" , (move) => {
    
    game.move(move)
    board.position(game.fen())
})






