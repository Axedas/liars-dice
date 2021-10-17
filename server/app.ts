import GameManager from './managers/GameManager.mjs';
import PlayerManager from './managers/PlayerManager.mjs';
import express from 'express';
import {Server} from 'socket.io';
import session from 'express-session';

const port = 3000;
const app = express();
const server = app.listen(port, () => {
  console.log(`Dev Liars Dice app listening at http://localhost:${port}`);
});

//this creates a session object and attaches it to the express app
const expSession = session({
  secret: "my-secret",
  resave: true,
  saveUninitialized: true
})
app.use(expSession);

const io = new Server(server,{
  //options for socket server
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

//this attaches the session to socket connections
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(expSession));

const gameManager = new GameManager();
const playerManager = new PlayerManager();

//Socket stuff, maybe export to a class
io.on("connection", socket =>
{
  console.log("trying to read session");
  if (socket.request.session.player)
  {
    console.log(`Client reconnected... id: ${socket.request.session.player.id}`);
  }
  else
  {
    console.log('player: ' + socket.request.session.player);
    console.log('Client connected...');
    //create a Player object for the connection and send a success to the client
    //will need to change this  to only create a player once per client,
    //currently, refreshing page destroys the socket and creates a new one
    let player = playerManager.createPlayer();
    socket.request.session.player = player;
    socket.request.session.save();
    console.log('player: ' + socket.request.session.player);
    console.log(`${player.id} connected to the server`);
    socket.emit("connected",{ playerId: player.id });
  }

  socket.on("changeName", (name) =>{
    player.name = name;
    //let the players in the room know that the players name changed
    if (player.inGame)
    {
      let room = `room${player.currentGame.gameId}`;
      socket.to(room).emit("playerChangedName",{playerId: player.id, newName: name });
    }
    //do we need to send a success to the client? I think no
  });

  //register handlers for lobby functions
  socket.on("createGame", () =>
  {
    let game = gameManager.createGame();
    player.currentGame = game;
    socket.emit('createGameSuccess', game.id);
  });

  //join the 'room' for the given game
  socket.on("joinGame",(gameId) =>
  {
    socket.join(`/room${gameId}`);
    //let all users in the room know that a player joined, send their playerId with it
    io.to(`/room${gameId}`).emit('playerJoinedGame',{playerId: player.id});
    player.currentGame = gameManager.getGameById(gameId);
    socket.emit('joinGameSuccess', player.currentGame.players);
  });

  //when the client changes ready status in the lobby
  socket.on("ready",(status) =>
  {
    //set the players status
    player.ready = status
    //get the players current game, and send an event to players in the game indicating that the players status has changed
    let room = `room${player.currentGame.gameId}`;
    socket.to(room).emit("playerChangedReadyStatus",{playerId: player.id, newStatus: status });
  });

  socket.on("startGame",()=>{
    //verify that this player is the host
    if (!player.isHost){
      //error here
    }
    //verify that all players are ready
    if (!player.currentGame.players.every((player)=>{return player.ready}))
    {
      //error here
    }
    player.currentGame.startGame();
  });
});

//serves static files such as html or in this case, node modules
app.use(express.static('/node_modules'));

//this brings us to the index page when hitting the default url, for now https://localhost:3000
app.get('/', function(req, res,next) {
  res.sendFile(new URL('./index.html', import.meta.url).href.substr(8));
});

//this may return later, but for now we're gonna try to do most stuff through the socket
/*app.post('/createGame',(req,res)=>{
  let host = playerManager.getById(req.body.hostId);
  let gameId = gameManager.createAvailableId();
  let socket = SocketManager.createSocketForGame(gameId);
  let game = gameManager.createGame([host], socket, gameId);

  res.send(game.id);
})

/!**
 *  @param int gameId: integer representing the game
 *  @param int playerId: integer representing player making bid
 *  @param int numDice: number of dice bid
 *  @param int dieValue: value of die bid
 *!/
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
})*/

//app.get('/gameState' )



