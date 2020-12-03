import Socket from './models/Socket.js'

export class Game {
    players;
    currentBid;
    activePlayer;
    id;
    io;
    socket;

    constructor(players, id, io) {
        this.players = players;
        this.id = id;
        this.io = io;
        this.initSocket(io);
    }

   /** initSocket(io) {
        io.on('connect'('/room' + this.id);
        conn.on('connect', function (data) {
            //TODO implement socket listeners maybe
        });

        conn.on('disconnect', function () {
            //TODO implement socket listeners
        });

        conn.on('action', function () {
            //TODO implement socket listeners
        });

        this.socket = new Socket(conn, this.id);
    }*/

    startGame()
    {
        if (!this.players.every( (player) => player.isReady))
        {
            //log error
            return;
        }

        //randomly select starting player
        this.activePlayer = this.players[Math.floor(Math.random()*this.players.length)];
        //roll dice for all players
        this.players.forEach(player => player.rollDice());
        //emit event notifying players that the game has begun
        this.socket.emit("gameStart");
    }

    /**
     * makes a bid and notifies the players that a bid has been made
     *
     * @param player
     * @param numDice
     * @param dieValue
     * @returns {boolean}
     */
    makeBid(player, numDice, dieValue) {
        if (player != this.activePlayer){
            return false;
        }

        this.currentBid = [numDice, dieValue, player]
        this.activePlayer = this.getNextPlayer();
        socket.emit('update', )
    }

    getNextPlayer()
    {

    }
}

