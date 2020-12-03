import GameManager from 'managers/GameManager.js'
import PlayerManager from 'managers/PlayerManager.js'
import SocketManager from 'managers/SocketManager.js'

const express = require('express')
const app = express()
const io = require('socket.io')(app);
const port = 3000
const gameManager = new GameManager();
const playerManager = new PlayerManager();

//Socket stuff, maybe export to a class
io.on("connection", socket =>
{
  //create a Player object for the connection and send a success to the client
  let player = playerManager.createPlayer();
  socket.emit("connected",{ playerId: player.id });

  socket.on("changeName", (name) =>{
    player.setName(name);
    //let the players in
    socket.rooms.forEach(room =>
    {
      socket.to(room).emit("playerChangedName",{playerId: player.id, newName: name });
    });
  });

  //register handlers for lobby functions
  socket.on("joinGame",(gameId) =>
  {
    socket.join('/room'+gameId)
    io.to('/room'+gameId)
  });

  socket.on("ready",(gameId) =>
  {
    socket.join('/roomGameId')
  });
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/createGame',(req,res)=>{
  let host = playerManager.getById(req.body.hostId);
  let gameId = gameManager.createAvailableId();
  let socket = SocketManager.createSocketForGame(gameId);
  let game = gameManager.createGame([host], socket, gameId);

  res.send(game.id);
})

/**
 *  @param int gameId: integer representing the game
 *  @param int playerId: integer representing player making bid
 *  @param int numDice: number of dice bid
 *  @param int dieValue: value of die bid
 */
app.post('/bid',(req,res)=>{
  let game = gameManager.getById(req.body.gameId);
  let player = playerManager.getById(req.body.playerId)
  if (!game.isValidBid(player, req.body.numDice, req.body.dieValue))
  {
    //handle invalid bid error here
  }
  else
  {
    if (!game.makeBid(player, req.get('numDice'), req.get('dieValue') ))
    {
      //handle error with bid here
    }

  }
})

app.get('/gameState' )

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

