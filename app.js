import GameManager from 'managers/GameManager.js'
import PlayerManager from 'managers/PlayerManager.js'

const express = require('express')
const app = express()
const port = 3000
const gameManager = new GameManager();
const playerManager = new PlayerManager();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/createGame',(req,res)=>{
  let host = playerManager.getById(req.get('hostId'));
  let game = gameManager.createGame([host]);
  res.send(game.id);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

