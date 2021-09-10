import Player from '.././models/Player.js'

export default class PlayerManager
{
    playerList;
    numPlayers=0;

    constructor()
    {
        this.playerList = [];
    };

    /**
     * Creates a player with a unique id
     * @returns {Player object representing the new player}
     */
    createPlayer()
    {
        let id=this.numPlayers;
        this.numPlayers++;

        //TODO
        // create a unique integer id for the player

        let player = new Player(id)
        this.playerList.push(player);

        return player;
    }

    getById(id)
    {
        //TODO
        // search for player by id EFFICIENTLY
        // return that player from the list
    }
}